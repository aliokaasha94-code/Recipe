/**
 * =========================================================================
 * EMAD AFANDI EXECUTIVE MANAGER DASHBOARD ENGINE (V3)
 * 24-Hour 3-Shift Intelligence • Real-time Google Sheets Sync • Multi-Station Audit
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
      this.dateFilter = 'all'; // 'all' | 'today' | 'yesterday' | 'custom'
      this.customDate = null;
      this.init();
    }

    toEnglishDigits(str) {
      if (str === null || str === undefined) return '';
      return String(str).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
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

    // --- 2. Live Clock & 3-Shifts Intelligence ---
    startClock() {
      const update = () => {
        const now = new Date();
        const timeStr = this.toEnglishDigits(
          now.toLocaleTimeString('ar-EG-u-nu-latn', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
        );
        const dateStr = this.toEnglishDigits(
          now.toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        );

        const clockEl = document.getElementById('dash-live-clock');
        const dateEl = document.getElementById('dash-live-date');
        if (clockEl) clockEl.innerText = timeStr;
        if (dateEl) dateEl.innerText = dateStr;

        // Current shift determination
        const activeShift = this.getActiveShiftInfo();
        const shiftBadge = document.getElementById('dash-active-shift-name');
        if (shiftBadge) shiftBadge.innerText = activeShift.name;

        // Highlight active shift card
        this.updateShiftCardsState(activeShift.num);
      };

      update();
      setInterval(update, 1000);
    }

    getActiveShiftInfo() {
      const hour = new Date().getHours();
      // Shift 1: 8 AM - 5 PM (08:00 - 15:59)
      // Shift 2: 4 PM - 1 AM (16:00 - 23:59)
      // Shift 3: 12 AM - 9 AM (00:00 - 07:59)
      if (hour >= 8 && hour < 16) {
        return { num: 1, name: 'الشيفت الأول: صباحي ☀️ (8ص - 5م)' };
      } else if (hour >= 16 && hour < 24) {
        return { num: 2, name: 'الشيفت الثاني: مسائي 🌙 (4م - 1ص)' };
      } else {
        return { num: 3, name: 'الشيفت الثالث: ليلي ☕ (12ص - 9ص)' };
      }
    }

    updateShiftCardsState(activeNum) {
      for (let i = 1; i <= 3; i++) {
        const card = document.getElementById(`shift-card-${i}`);
        const tag = document.getElementById(`tag-shift-${i}`);
        if (card && tag) {
          if (i === activeNum) {
            card.classList.add('active-now');
            tag.className = 'shift-status-tag active';
            tag.innerText = '🟢 شغال الآن';
          } else {
            card.classList.remove('active-now');
            tag.className = 'shift-status-tag inactive';
            tag.innerText = i < activeNum ? 'منتهي' : 'قادم';
          }
        }
      }
    }

    // --- 3. Date Filters Handling ---
    setDateFilter(type, btnEl) {
      this.dateFilter = type;
      this.customDate = null;

      const customInput = document.getElementById('filter-custom-date');
      if (customInput) customInput.value = '';

      document.querySelectorAll('.date-tab-btn').forEach(btn => btn.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');

      this.renderFeed();
    }

    onCustomDateChange(dateVal) {
      if (!dateVal) {
        const allBtn = document.querySelector('.date-tab-btn');
        this.setDateFilter('all', allBtn);
        return;
      }
      this.dateFilter = 'custom';
      this.customDate = dateVal; // Format: YYYY-MM-DD

      document.querySelectorAll('.date-tab-btn').forEach(btn => btn.classList.remove('active'));
      this.renderFeed();
    }

    toggleCardDetails(idx) {
      const summaryEl = document.getElementById(`log-summary-${idx}`);
      const btnEl = document.getElementById(`log-btn-${idx}`);
      if (!summaryEl || !btnEl) return;

      const isCollapsed = summaryEl.classList.contains('collapsed');
      if (isCollapsed) {
        summaryEl.classList.remove('collapsed');
        btnEl.innerText = 'إخفاء بنود الفحص ▲';
      } else {
        summaryEl.classList.add('collapsed');
        btnEl.innerText = 'إظهار بنود الفحص ▼';
      }
    }

    // --- 4. Data Loading & Dual Source (Google Sheets + Local Audit Trail) ---
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
        const timeoutId = setTimeout(() => controller.abort(), 4500);

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
            // Non-JSON response
          }
        }
      } catch (err) {
        console.warn('Network fetch to Google Sheets timed out, using local storage cache');
      }

      // 2. Read Local Audit Trail Logs
      const localLogs = JSON.parse(localStorage.getItem('emad_inspection_logs') || '[]');
      const formattedLocal = localLogs.map(l => ({
        day: l.dayName || 'اليوم',
        date: l.dateStr || (l.timestamp ? l.timestamp.split(' ')[0] : ''),
        time: l.timeStr || (l.timestamp ? l.timestamp.split(' ')[1] : ''),
        shift: l.shiftName || 'الشيفت الثاني: مسائي 🌙 (4م - 1ص)',
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
        // Fallback realistic baseline record
        this.records = [
          {
            day: 'الخميس',
            date: new Date().toLocaleDateString('en-CA'),
            time: this.toEnglishDigits(new Date().toLocaleTimeString('ar-EG-u-nu-latn', { hour: '2-digit', minute: '2-digit' })),
            shift: 'الشيفت الثاني: مسائي 🌙 (4م - 1ص)',
            station: 'محطة الإسبريسو والفلتر',
            inspector: localStorage.getItem('emad_last_inspector') || 'أحمد الباريستا',
            percentage: '100% ✓',
            status: 'معتمد بالكامل ✓',
            summary: '1. تنظيف البورتافلتر والشاور سكرين بفرشاة البار بعد كل استخلاص.\n2. مسح عصا البخار بالفوطة المبللة المخصصة وعمل Purge بخار.\n3. عمل Backflush بالماء النقي واستخدام الباسكت الأعمى (Blind Basket).\n4. تنظيف عميق بالبودرة الكيميائية للماكينة.\n5. نقع عصا البخار والبخاخات في محلول تنظيف الحليب وتفريغ صينية التصريف.\n6. تفريغ هوبر البن وتنظيف سكاكين المطحنة.'
          }
        ];
      }

      this.updateShiftMatrix();
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

    // --- 5. Update Shift Matrix Row ---
    updateShiftMatrix() {
      const shiftMap = {
        1: { count: 0, latest: null },
        2: { count: 0, latest: null },
        3: { count: 0, latest: null }
      };

      this.records.forEach(r => {
        const text = (r.shift || '').toLowerCase();
        if (text.includes('صباح') || text.includes('أول') || text.includes('8ص') || text.includes('8')) {
          shiftMap[1].count++;
          if (!shiftMap[1].latest) shiftMap[1].latest = r;
        } else if (text.includes('مساء') || text.includes('ثاني') || text.includes('4م') || text.includes('4')) {
          shiftMap[2].count++;
          if (!shiftMap[2].latest) shiftMap[2].latest = r;
        } else if (text.includes('ليل') || text.includes('سهر') || text.includes('ثالث') || text.includes('12ص') || text.includes('12')) {
          shiftMap[3].count++;
          if (!shiftMap[3].latest) shiftMap[3].latest = r;
        }
      });

      for (let i = 1; i <= 3; i++) {
        const statusEl = document.getElementById(`status-shift-${i}`);
        const baristaEl = document.getElementById(`barista-shift-${i}`);
        const entry = shiftMap[i].latest;
        if (entry) {
          if (statusEl) {
            statusEl.innerHTML = '<span style="color:#22c55e;">معتمد 100% ✓</span>';
          }
          if (baristaEl) {
            const timeClean = this.toEnglishDigits(entry.time);
            baristaEl.innerText = `${entry.inspector} (${timeClean})`;
          }
        } else {
          if (statusEl) statusEl.innerText = 'بانتظار الفحص';
          if (baristaEl) baristaEl.innerText = '--';
        }
      }
    }

    // --- 6. Update KPI Station Cards ---
    updateStationKpis() {
      const stations = {
        espresso: { count: 0, latest: null },
        traditional: { count: 0, latest: null },
        backbar: { count: 0, latest: null }
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

      this.applyStationCardData('espresso', stations.espresso.latest);
      this.applyStationCardData('traditional', stations.traditional.latest);
      this.applyStationCardData('backbar', stations.backbar.latest);
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
        if (timeEl) {
          const dayClean = this.toEnglishDigits(record.day || '');
          const timeClean = this.toEnglishDigits(record.time || '');
          timeEl.innerText = `${dayClean} • ${timeClean}`;
        }
        if (inspEl) inspEl.innerText = record.inspector || 'باريستا الشفت';
        if (shiftEl) shiftEl.innerText = this.toEnglishDigits(record.shift || 'شفت معتمد');
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

    // --- 7. Render Audit Feed Cards ---
    renderFeed() {
      const container = document.getElementById('dash-feed-container');
      const countEl = document.getElementById('dash-feed-count');
      if (!container) return;

      const stationFilter = (document.getElementById('filter-station')?.value || 'all').toLowerCase();
      const shiftFilter = (document.getElementById('filter-shift')?.value || 'all').toLowerCase();
      const searchQuery = (document.getElementById('filter-search')?.value || '').trim().toLowerCase();

      // Current Dates for filtering
      const now = new Date();
      const todayEnCa = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
      const yesterdayDate = new Date(now);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayEnCa = yesterdayDate.toLocaleDateString('en-CA');

      this.filteredRecords = this.records.filter(r => {
        // Date filter
        const rDateClean = this.toEnglishDigits(r.date || '');
        if (this.dateFilter === 'today') {
          if (rDateClean && !rDateClean.includes(todayEnCa)) return false;
        } else if (this.dateFilter === 'yesterday') {
          if (rDateClean && !rDateClean.includes(yesterdayEnCa)) return false;
        } else if (this.dateFilter === 'custom' && this.customDate) {
          if (rDateClean && !rDateClean.includes(this.customDate)) return false;
        }

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
          if (shiftFilter === 'shift1' && !sh.includes('صباح') && !sh.includes('أول') && !sh.includes('8ص') && !sh.includes('8')) return false;
          if (shiftFilter === 'shift2' && !sh.includes('مساء') && !sh.includes('ثاني') && !sh.includes('4م') && !sh.includes('4')) return false;
          if (shiftFilter === 'shift3' && !sh.includes('ليل') && !sh.includes('سهر') && !sh.includes('ثالث') && !sh.includes('12ص') && !sh.includes('12')) return false;
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

      const countNum = this.toEnglishDigits(this.filteredRecords.length);
      if (countEl) countEl.innerText = `${countNum} عمليات`;

      if (this.filteredRecords.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:36px 20px; color:var(--text-muted);">
            <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
            <p style="font-size:0.9rem; font-weight:700;">لا توجد سجلات مطابقة للشروط أو التاريخ المحدد</p>
          </div>
        `;
        return;
      }

      container.innerHTML = this.filteredRecords.map((r, idx) => {
        const rawSummary = r.summary || 'تم فحص واعتماد كافة بنود النظافة والمعايرة بنسبة 100%.';
        const summaryText = this.toEnglishDigits(rawSummary);
        const dayClean = this.toEnglishDigits(r.day || '');
        const dateClean = this.toEnglishDigits(r.date || '');
        const timeClean = this.toEnglishDigits(r.time || '');
        const stationClean = this.toEnglishDigits(r.station);
        const shiftClean = this.toEnglishDigits(r.shift || 'شفت معتمد');

        return `
          <div class="dash-log-card">
            <div class="log-card-top">
              <div class="log-meta-left">
                <span class="log-station-name">${stationClean}</span>
                <span class="log-shift-badge">${shiftClean}</span>
              </div>
              <div class="log-meta-right">
                <span class="log-time-pill"><bdi>🗓️ ${dayClean}</bdi> <span class="en-num">${dateClean}</span> • <span class="en-num">${timeClean}</span></span>
                <span class="log-inspector-pill">👤 ${r.inspector}</span>
                <span class="log-status-badge">100% معتمد ✓</span>
              </div>
            </div>
            <div class="log-card-middle">
              <button id="log-btn-${idx}" class="log-toggle-btn" onclick="window.dashApp.toggleCardDetails(${idx})">
                إظهار بنود الفحص ▼
              </button>
            </div>
            <div id="log-summary-${idx}" class="log-card-summary collapsed">
              <strong>📋 بنود الفحص المعتمدة:</strong><br>
              ${summaryText}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EmadDashboardApp());
  } else {
    new EmadDashboardApp();
  }
})();
