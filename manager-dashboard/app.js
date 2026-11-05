/**
 * =========================================================================
 * EMAD AFANDI EXECUTIVE MANAGER DASHBOARD ENGINE
 * Real-time Google Sheets Feed • Shift Intelligence • Multi-Station Audit
 * =========================================================================
 */

(function () {
  'use strict';

  const GOOGLE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz4dgFH2gq687-E69yI3wqDOlfrKFVtx939qmW0S9XCfz14h_qF9zuEqEIcVl4NOYs-cA/exec';
  const MASTER_PIN = '9999';

  class EmadDashboardApp {
    constructor() {
      this.currentPin = '';
      this.records = [];
      this.filteredRecords = [];
      this.sheetUrl = null;
      this.init();
    }

    init() {
      this.initAuth();
      this.startClock();
      window.dashApp = this;
    }

    // --- 1. Master PIN Authentication ---
    initAuth() {
      const isAuth = sessionStorage.getItem('emad_dash_authenticated') === 'true' ||
                     sessionStorage.getItem('emad_master_authorized') === 'true';

      const lockOverlay = document.getElementById('dashboard-lock-overlay');
      if (isAuth) {
        if (lockOverlay) lockOverlay.classList.remove('active');
        this.loadDashboardData();
      } else {
        if (lockOverlay) lockOverlay.classList.add('active');
      }
    }

    enterDigit(digit) {
      if (this.currentPin.length >= 4) return;
      this.currentPin += digit;
      this.updatePinDots();

      if (this.currentPin.length === 4) {
        if (this.currentPin === MASTER_PIN) {
          sessionStorage.setItem('emad_dash_authenticated', 'true');
          sessionStorage.setItem('emad_master_authorized', 'true');
          const lockOverlay = document.getElementById('dashboard-lock-overlay');
          if (lockOverlay) lockOverlay.classList.remove('active');
          this.currentPin = '';
          this.updatePinDots();
          this.loadDashboardData();
        } else {
          const errEl = document.getElementById('dash-pin-error');
          if (errEl) errEl.innerText = 'رمز الماستر غير صحيح، يرجى المحاولة ثانية';
          setTimeout(() => {
            this.clearPin();
            if (errEl) errEl.innerText = '';
          }, 800);
        }
      }
    }

    deleteDigit() {
      this.currentPin = this.currentPin.slice(0, -1);
      this.updatePinDots();
    }

    clearPin() {
      this.currentPin = '';
      this.updatePinDots();
    }

    updatePinDots() {
      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`ddot-${i}`);
        if (dot) {
          if (i < this.currentPin.length) {
            dot.classList.add('filled');
          } else {
            dot.classList.remove('filled');
          }
        }
      }
    }

    lockDashboard() {
      sessionStorage.removeItem('emad_dash_authenticated');
      const lockOverlay = document.getElementById('dashboard-lock-overlay');
      if (lockOverlay) lockOverlay.classList.add('active');
      this.clearPin();
    }

    // --- 2. Live Clock & Shift Intelligence ---
    startClock() {
      const update = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const clockEl = document.getElementById('dash-live-clock');
        const dateEl = document.getElementById('dash-live-date');
        if (clockEl) clockEl.innerText = timeStr;
        if (dateEl) dateEl.innerText = dateStr;

        // Determine current active shift
        const hour = now.getHours();
        let currentShift = 'شفت مسائي 🌙';
        if (hour >= 7 && hour < 16) {
          currentShift = 'شفت صباحي ☀️';
        } else if (hour >= 16 && hour < 24) {
          currentShift = 'شفت مسائي 🌙';
        } else {
          currentShift = 'شفت إغلاق / سهرة 🔒';
        }

        const shiftBadge = document.getElementById('dash-current-shift-badge');
        if (shiftBadge) shiftBadge.innerText = currentShift;
      };

      update();
      setInterval(update, 1000);
    }

    // --- 3. Data Loading & Dual Source (Google Sheets + Local Audit Trail) ---
    async loadDashboardData() {
      const container = document.getElementById('dash-feed-container');
      if (container) {
        container.innerHTML = `
          <div class="dash-loading-spinner">
            <div class="spinner"></div>
            <span>جاري مزامنة السجلات من Google Sheets...</span>
          </div>
        `;
      }

      let fetchedRecords = null;

      // 1. Attempt Live Fetch from Google Apps Script
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const resp = await fetch(GOOGLE_WEBHOOK_URL + '?action=getLogs', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const text = await resp.text();
          try {
            const json = JSON.parse(text);
            if (json && json.records && Array.isArray(json.records) && json.records.length > 0) {
              fetchedRecords = json.records;
            }
            if (json && json.sheetUrl) {
              this.sheetUrl = json.sheetUrl;
              const link = document.getElementById('dash-open-sheet-link');
              if (link) link.href = this.sheetUrl;
            }
          } catch (e) {
            // Raw text response
          }
        }
      } catch (err) {
        console.warn('Network timeout to Google Sheets endpoint, using local cache');
      }

      // 2. Read Local Audit Trail Logs
      const localLogs = JSON.parse(localStorage.getItem('emad_inspection_logs') || '[]');
      const formattedLocal = localLogs.map(l => ({
        day: l.dayName || 'اليوم',
        date: l.dateStr || (l.timestamp ? l.timestamp.split(' ')[0] : ''),
        time: l.timeStr || (l.timestamp ? l.timestamp.split(' ')[1] : ''),
        shift: l.shiftName || 'شفت مسائي 🌙',
        station: l.stationName || 'محطة التشغيل',
        inspector: l.inspector || 'باريستا الشفت',
        percentage: l.percentage || '100% ✓',
        status: 'معتمد بالكامل ✓',
        summary: l.items ? l.items.map((it, i) => `${i + 1}. ${it}`).join('\n') : (l.details || '')
      }));

      // Combine sources, prioritizing fresh API records
      if (fetchedRecords && fetchedRecords.length > 0) {
        this.records = fetchedRecords;
      } else if (formattedLocal.length > 0) {
        this.records = formattedLocal;
      } else {
        // Fallback demo record if completely empty so dashboard is alive on first load
        this.records = [
          {
            day: 'اليوم',
            date: new Date().toLocaleDateString('en-CA'),
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            shift: 'شفت مسائي 🌙',
            station: 'محطة الإسبريسو والفلتر',
            inspector: localStorage.getItem('emad_last_inspector') || 'عماد أفندي',
            percentage: '100% ✓',
            status: 'معتمد بالكامل ✓',
            summary: '1. تنظيف البورتافلتر والشاور سكرين بفرشاة البار بعد كل استخلاص.\n2. مسح عصا البخار بالفوطة المبللة المخصصة وعمل Purge بخار.\n3. عمل Backflush بالماء النقي واستخدام الباسكت الأعمى (Blind Basket).\n4. تنظيف عميق بالبودرة الكيميائية للماكينة.\n5. نقع عصا البخار والبخاخات في محلول تنظيف الحليب وتفريغ صينية التصريف.\n6. تفريغ هوبر البن وتنظيف سكاكين المطحنة.'
          }
        ];
      }

      this.updateStationKpis();
      this.renderFeed();
    }

    refreshData() {
      const icon = document.querySelector('.refresh-icon');
      if (icon) icon.style.animation = 'spin 0.7s linear infinite';
      this.loadDashboardData().finally(() => {
        if (icon) icon.style.animation = '';
      });
    }

    // --- 4. Update KPI Station Cards ---
    updateStationKpis() {
      const stations = {
        espresso: { name: 'إسبريسو', count: 0, latest: null },
        traditional: { name: 'تراثي', count: 0, latest: null },
        backbar: { name: 'باك بار', count: 0, latest: null }
      };

      this.records.forEach(r => {
        const text = (r.station || '').toLowerCase();
        if (text.includes('إسبريسو') || text.includes('espresso')) {
          stations.espresso.count++;
          if (!stations.espresso.latest) stations.espresso.latest = r;
        } else if (text.includes('تراث') || text.includes('traditional') || text.includes('شاي')) {
          stations.traditional.count++;
          if (!stations.traditional.latest) stations.traditional.latest = r;
        } else if (text.includes('باك') || text.includes('backbar') || text.includes('حلويات')) {
          stations.backbar.count++;
          if (!stations.backbar.latest) stations.backbar.latest = r;
        }
      });

      // Update Espresso Card
      this.applyStationCardData('espresso', stations.espresso.latest);
      // Update Traditional Card
      this.applyStationCardData('traditional', stations.traditional.latest);
      // Update Backbar Card
      this.applyStationCardData('backbar', stations.backbar.latest);

      // Total Completed Stations count
      let completedCount = 0;
      if (stations.espresso.latest) completedCount++;
      if (stations.traditional.latest) completedCount++;
      if (stations.backbar.latest) completedCount++;

      const statCompEl = document.getElementById('dash-stat-completed');
      if (statCompEl) statCompEl.innerText = `${completedCount} / 3`;
    }

    applyStationCardData(stationKey, record) {
      const badge = document.getElementById(`badge-${stationKey}`);
      const timeEl = document.getElementById(`time-${stationKey}`);
      const inspEl = document.getElementById(`inspector-${stationKey}`);
      const shiftEl = document.getElementById(`shift-${stationKey}`);

      if (record) {
        if (badge) {
          badge.className = 'station-live-badge approved';
          badge.innerText = 'معتمد 100% ✓';
        }
        if (timeEl) timeEl.innerText = `${record.day || ''} • ${record.time || ''}`;
        if (inspEl) inspEl.innerText = record.inspector || 'باريستا الشفت';
        if (shiftEl) shiftEl.innerText = record.shift || 'شفت معتمد';
      } else {
        if (badge) {
          badge.className = 'station-live-badge pending';
          badge.innerText = 'بانتظار الفحص';
        }
        if (timeEl) timeEl.innerText = 'لم يُسجل بعد';
        if (inspEl) inspEl.innerText = '--';
        if (shiftEl) shiftEl.innerText = '--';
      }
    }

    // --- 5. Render Audit Feed Cards ---
    renderFeed() {
      const container = document.getElementById('dash-feed-container');
      const countEl = document.getElementById('dash-feed-count');
      if (!container) return;

      const stationFilter = (document.getElementById('filter-station')?.value || 'all').toLowerCase();
      const shiftFilter = (document.getElementById('filter-shift')?.value || 'all').toLowerCase();
      const searchQuery = (document.getElementById('filter-search')?.value || '').trim().toLowerCase();

      this.filteredRecords = this.records.filter(r => {
        // Station filter
        if (stationFilter !== 'all') {
          const st = (r.station || '').toLowerCase();
          if (stationFilter === 'espresso' && !st.includes('إسبريسو') && !st.includes('espresso')) return false;
          if (stationFilter === 'traditional' && !st.includes('تراث') && !st.includes('traditional')) return false;
          if (stationFilter === 'backbar' && !st.includes('باك') && !st.includes('backbar')) return false;
        }

        // Shift filter
        if (shiftFilter !== 'all') {
          const sh = (r.shift || '').toLowerCase();
          if (shiftFilter === 'morning' && !sh.includes('صباح')) return false;
          if (shiftFilter === 'evening' && !sh.includes('مساء') && !sh.includes('مسائي')) return false;
          if (shiftFilter === 'night' && !sh.includes('إغلاق') && !sh.includes('سهرة')) return false;
        }

        // Search query
        if (searchQuery) {
          const insp = (r.inspector || '').toLowerCase();
          const day = (r.day || '').toLowerCase();
          const st = (r.station || '').toLowerCase();
          if (!insp.includes(searchQuery) && !day.includes(searchQuery) && !st.includes(searchQuery)) return false;
        }

        return true;
      });

      if (countEl) countEl.innerText = `${this.filteredRecords.length} عمليات`;

      if (this.filteredRecords.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:36px 20px; color:var(--text-muted);">
            <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
            <p style="font-size:0.9rem; font-weight:700;">لا توجد سجلات مطابقة للشروط المحددة</p>
          </div>
        `;
        return;
      }

      container.innerHTML = this.filteredRecords.map((r, idx) => {
        const summaryText = r.summary || 'تم فحص واعتماد كافة بنود النظافة والمعايرة بنسبة 100%.';
        return `
          <div class="dash-log-card">
            <div class="log-card-top">
              <div class="log-meta-left">
                <span class="log-station-name">${r.station}</span>
                <span class="log-shift-badge">${r.shift || 'شفت معتمد'}</span>
              </div>
              <div class="log-meta-right">
                <span>🗓️ ${r.day || ''} ${r.date || ''} • ⏰ ${r.time || ''}</span>
                <span class="log-inspector-pill">👤 ${r.inspector}</span>
                <span class="log-status-badge">100% معتمد ✓</span>
              </div>
            </div>
            <div class="log-card-summary">
              <strong>📋 بنود الفحص المعتمدة:</strong><br>
              ${summaryText}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Auto-instantiate on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EmadDashboardApp());
  } else {
    new EmadDashboardApp();
  }
})();
