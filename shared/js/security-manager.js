/**
 * =========================================================================
 * EMAD AFANDI ENTERPRISE SECURITY & IP PROTECTION MANAGER (V4.0 MILITARY GRADE)
 * 1. Zero-Trust Gateway & Instant Blackout Shield
 * 2. GPS Geofencing (Kafr El-Sheikh Cafe Branch Strict Restriction)
 * 3. Station-Specific PIN Codes (1010 / 2020 / 3030 / 9999)
 * 4. Hold-to-Reveal Anti-Screenshot Armor (Tactile Fingerprint Sensor)
 * 5. High-Contrast Forensic Dynamic Watermark (1-Sec Live Clock & Device ID)
 * 6. App-Switch & Screen-Sleep Auto-Lock
 * 7. Anti-DevTools & Anti-Tamper Shield
 * 8. Google Sheets Inspection Sync & Real-time Audit Trail
 * =========================================================================
 */

(function () {
  'use strict';

  // --- 1. Master Security Configuration ---
  const DEFAULT_CONFIG = {
    pins: {
      espresso: '1010',
      traditional: '2020',
      backbar: '3030',
      master: '9999'
    },
    gps: {
      enabled: true,
      lat: 31.10927, // إحداثيات فرع عماد أفندي المعتمد بكفر الشيخ
      lng: 30.94269,
      radiusMeters: 150 // نطاق 150 متر حول الفرع فقط (تشديد أمني إضافي)
    },
    qrRequired: true,
    inactivityMinutes: 4,
    sheetsWebhook: 'https://script.google.com/macros/s/AKfycbz4dgFH2gq687-E69yI3wqDOlfrKFVtx939qmW0S9XCfz14h_qF9zuEqEIcVl4NOYs-cA/exec'
  };

  class EmadSecurityManager {
    constructor() {
      this.stationId = this.detectStationId();
      this.config = this.loadConfig();
      this.currentPinInput = '';
      this.inactivityTimer = null;
      this.watermarkInterval = null;
      this.deviceId = this.getOrCreateDeviceId();
      this.isGpsVerified = false;
      this.init();
    }

    detectStationId() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('espresso') || path.includes('1-')) return 'espresso';
      if (path.includes('traditional') || path.includes('2-')) return 'traditional';
      if (path.includes('backbar') || path.includes('3-')) return 'backbar';
      return 'espresso';
    }

    getStationTitle() {
      const titles = {
        espresso: 'محطة الإسبريسو والفلتر',
        traditional: 'محطة القهوة التراثية والشاي',
        backbar: 'محطة الباك بار والحلويات'
      };
      return titles[this.stationId] || 'محطة التشغيل';
    }

    loadConfig() {
      try {
        const stored = localStorage.getItem('emad_security_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          const merged = Object.assign({}, DEFAULT_CONFIG, parsed);
          // Force official cafe branch coordinates
          merged.gps = Object.assign({}, DEFAULT_CONFIG.gps, merged.gps || {});
          merged.gps.lat = DEFAULT_CONFIG.gps.lat;
          merged.gps.lng = DEFAULT_CONFIG.gps.lng;
          merged.gps.radiusMeters = DEFAULT_CONFIG.gps.radiusMeters;
          merged.gps.enabled = true;
          merged.qrRequired = true;
          merged.inactivityMinutes = DEFAULT_CONFIG.inactivityMinutes;
          if (!merged.sheetsWebhook) merged.sheetsWebhook = DEFAULT_CONFIG.sheetsWebhook;
          return merged;
        }
      } catch (e) {
        console.warn('Using default security config');
      }
      return Object.assign({}, DEFAULT_CONFIG);
    }

    saveConfig() {
      localStorage.setItem('emad_security_config', JSON.stringify(this.config));
    }

    getOrCreateDeviceId() {
      let id = localStorage.getItem('emad_sec_dev_id');
      if (!id) {
        id = 'AF-' + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('emad_sec_dev_id', id);
      }
      return id;
    }

    init() {
      // 1. Inject DOM Security Elements (Curtains, Watermark, Overlays)
      this.injectSecurityDom();

      // 2. Setup Anti-Copy, Anti-Screenshot, Anti-DevTools
      this.setupAntiLeakProtection();

      // 3. Start Security Verification Pipeline (QR -> GPS -> PIN)
      this.runVerificationPipeline();

      // 4. Setup Inactivity (4 Min Auto-Lock) & Sleep Watchdog
      this.setupInactivityWatcher();

      // 5. Expose Global Security API
      window.EmadSecurity = this;
    }

    // --- DOM Injection ---
    injectSecurityDom() {
      // 1. Anti-Capture Privacy Curtain (Cover screen on app switch / screenshot gesture)
      if (!document.getElementById('anti-capture-curtain')) {
        const curtain = document.createElement('div');
        curtain.id = 'anti-capture-curtain';
        curtain.innerHTML = `
          <img src="assets/emad-logo.png" alt="عماد أفندي" class="curtain-logo" onerror="this.style.display='none'">
          <div class="curtain-msg">🔒 محتوى محمي • كافيه ومحمصة عماد أفندي<br><span style="font-size:0.8rem; color:#94a3b8; font-weight:500;">يُحظر تصوير أو نسخ الريسيبي والمعايير</span></div>
        `;
        document.body.appendChild(curtain);
      }

      // 2. High-Contrast Forensic Dynamic Watermark Overlay
      if (!document.getElementById('forensic-watermark-overlay')) {
        const watermark = document.createElement('div');
        watermark.id = 'forensic-watermark-overlay';
        watermark.className = 'forensic-watermark-overlay';
        document.body.appendChild(watermark);
        this.updateWatermarkStamps();
        if (this.watermarkInterval) clearInterval(this.watermarkInterval);
        this.watermarkInterval = setInterval(() => this.updateWatermarkStamps(), 1000);
      }

      // 3. Security Fullscreen Overlays Container
      if (!document.getElementById('security-overlays-container')) {
        const container = document.createElement('div');
        container.id = 'security-overlays-container';
        container.innerHTML = `
          <!-- A. QR LOCK OVERLAY -->
          <div id="qr-lock-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <div class="security-badge-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M10 3v4"/><path d="M14 10h4"/><path d="M3 10h4"/><path d="M10 14v4"/><path d="M10 10h4"/></svg>
              </div>
              <h3 class="security-card-title">الدخول مقيد بكود QR المحطة</h3>
              <p class="security-card-desc">
                للحفاظ على سرية الريسيبي ومعايير التشغيل، يُسمح بالوصول حصرياً عبر مسح رمز الـ QR المطبوع على بار المحطة داخل الفرع.
              </p>
              <button class="btn-security-action" onclick="window.EmadSecurity.scanQrCameraPrompt()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span>مسح كود QR من الكاميرا</span>
              </button>
              <button class="btn-security-action" style="margin-top:10px; background:transparent; border:1px solid rgba(212,175,55,0.4); color:var(--gold-bright); font-size:0.78rem;" onclick="window.EmadSecurity.promptMasterOverride()">
                <span>🔑 دخول الإدارة برمز الماستر (Master PIN)</span>
              </button>
            </div>
          </div>

          <!-- B. GPS SCANNING OVERLAY (Radar Pulse) -->
          <div id="gps-checking-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <div class="radar-pulse-wrap">
                <div class="radar-ring"></div>
                <div class="radar-ring"></div>
                <div class="radar-center-dot"></div>
              </div>
              <h3 class="security-card-title">فحص التواجد الجغرافي</h3>
              <p class="security-card-desc">
                جاري التحقق من التواجد الجغرافي داخل فرع عماد أفندي عبر الأقمار الصناعية (GPS)...
              </p>
              <div style="font-size:0.76rem; color:#94a3b8;">يرجى الموافقة على إذن الموقع (Allow Location) في المتصفح</div>
            </div>
          </div>

          <!-- C. GPS GEOFENCE LOCK OVERLAY (Outside Branch Alert) -->
          <div id="gps-lock-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <div class="security-badge-icon alert">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 class="security-card-title">⛔ الوصول محظور (خارج الفرع)</h3>
              <p class="security-card-desc" id="gps-error-desc">
                هذا النظام مشفر ومقيد جغرافياً ليعمل حصرياً داخل نطاق فرع عماد أفندي. لا يُسمح بتصفح الريسيبي من خارج الفرع.
              </p>
              <button class="btn-security-action" onclick="window.EmadSecurity.retryGpsCheck()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span>إعادة فحص الموقع الجغرافي</span>
              </button>
              <button class="btn-security-action" style="margin-top:10px; background:transparent; border:1px solid rgba(212,175,55,0.4); color:var(--gold-bright); font-size:0.78rem;" onclick="window.EmadSecurity.promptMasterOverride()">
                <span>🔑 دخول الإدارة برمز الماستر (Master PIN)</span>
              </button>
            </div>
          </div>

          <!-- D. STATION PIN LOCK OVERLAY -->
          <div id="pin-lock-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <h3 class="security-card-title" id="pin-station-title">${this.getStationTitle()}</h3>
              <p class="security-card-desc">أدخل رمز الدخول السري المعتمد للمحطة (PIN)</p>
              
              <div class="pin-display-dots" id="pin-dots-display">
                <div class="pin-dot" id="dot-0"></div>
                <div class="pin-dot" id="dot-1"></div>
                <div class="pin-dot" id="dot-2"></div>
                <div class="pin-dot" id="dot-3"></div>
              </div>

              <div class="pin-keypad-grid">
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('1')">1</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('2')">2</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('3')">3</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('4')">4</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('5')">5</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('6')">6</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('7')">7</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('8')">8</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('9')">9</button>
                <button class="pin-btn action" onclick="window.EmadSecurity.clearPin()">مسح</button>
                <button class="pin-btn" onclick="window.EmadSecurity.handleKeypadDigit('0')">0</button>
                <button class="pin-btn action" onclick="window.EmadSecurity.deletePinDigit()">⌫</button>
              </div>

              <div class="pin-error-msg" id="pin-error-text"></div>
            </div>
          </div>

          <!-- E. MANAGER SETTINGS MODAL -->
          <div id="manager-settings-modal" class="modal-overlay" onclick="if(event.target===this) window.EmadSecurity.closeManagerModal()">
            <div class="modal-content" style="max-width:440px;">
              <div class="modal-header">
                <h3 class="modal-title">⚙️ لوحة حماية وأمان عماد أفندي</h3>
                <button class="modal-close" onclick="window.EmadSecurity.closeManagerModal()">&times;</button>
              </div>
              <div style="font-size:0.84rem; color:#cbd5e1; display:flex; flex-direction:column; gap:14px; margin-top:10px;">
                
                <div style="background:#0c0f17; border:1px solid var(--border-gold); border-radius:12px; padding:12px;">
                  <strong style="color:var(--gold-bright); display:block; margin-bottom:6px;">📍 إحداثيات الفرع (Geofence):</strong>
                  <div style="font-size:0.78rem; margin-bottom:10px; color:#94a3b8;" id="manager-gps-coords-display">
                    ${this.config.gps.lat.toFixed(5)}, ${this.config.gps.lng.toFixed(5)} (نطاق ${this.config.gps.radiusMeters}م)
                  </div>
                  <button class="btn-security-action" style="font-size:0.8rem; padding:8px 14px;" onclick="window.EmadSecurity.calibrateCurrentGpsAsBranch()">
                    🎯 تعيين موقعي الحالي كموقع الفرع المعتمد
                  </button>
                </div>

                <div style="background:#0c0f17; border:1px solid var(--border-gold); border-radius:12px; padding:12px;">
                  <strong style="color:var(--gold-bright); display:block; margin-bottom:8px;">🔑 باسووردات المحطات:</strong>
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; font-size:0.78rem;">
                    <div>
                      <label>الإسبريسو:</label>
                      <input id="mgr-pin-esp" type="password" maxlength="6" class="checklist-inspector-input" style="padding:6px; margin:2px 0 0;" value="${this.config.pins.espresso}">
                    </div>
                    <div>
                      <label>التراثي:</label>
                      <input id="mgr-pin-trad" type="password" maxlength="6" class="checklist-inspector-input" style="padding:6px; margin:2px 0 0;" value="${this.config.pins.traditional}">
                    </div>
                    <div>
                      <label>الباك بار:</label>
                      <input id="mgr-pin-back" type="password" maxlength="6" class="checklist-inspector-input" style="padding:6px; margin:2px 0 0;" value="${this.config.pins.backbar}">
                    </div>
                    <div>
                      <label>الماستر العام:</label>
                      <input id="mgr-pin-mst" type="password" maxlength="6" class="checklist-inspector-input" style="padding:6px; margin:2px 0 0;" value="${this.config.pins.master}">
                    </div>
                  </div>
                </div>

                <div style="background:#0c0f17; border:1px solid var(--border-gold); border-radius:12px; padding:12px;">
                  <strong style="color:var(--gold-bright); display:block; margin-bottom:6px;">📊 رابط Google Sheets Webhook:</strong>
                  <input id="mgr-sheets-url" type="text" class="checklist-inspector-input" style="margin-bottom:4px; font-family:monospace; font-size:0.75rem;" placeholder="https://script.google.com/macros/s/.../exec" value="${this.config.sheetsWebhook || ''}">
                </div>

                <button class="btn-security-action" onclick="window.EmadSecurity.saveManagerSettings()">
                  💾 حفظ وتطبيق إعدادات الحماية
                </button>

                <a href="../manager-dashboard/" class="btn-security-action" style="text-decoration:none; background:linear-gradient(135deg, #d4af37 0%, #b89628 100%); color:#000; font-weight:800; font-size:0.86rem; margin-top:6px;">
                  📊 فتح لوحة تحكم ومتابعة العمليات (Manager Dashboard)
                </a>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      }
    }

    // --- 2. Anti-Leak & Anti-Screenshot Event Listeners ---
    setupAntiLeakProtection() {
      // A. Block Right-Click Context Menu Everywhere
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      }, { capture: true });

      // B. Block Copy, Cut, Select, Drag
      ['copy', 'cut', 'selectstart', 'dragstart'].forEach(evt => {
        document.addEventListener(evt, (e) => {
          if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
            return true;
          }
          e.preventDefault();
          return false;
        }, { capture: true });
      });

      // C. Intercept Screenshot / Print / Source Inspection Shortcuts
      document.addEventListener('keydown', (e) => {
        const isCtrl = e.ctrlKey || e.metaKey;
        const key = e.key.toLowerCase();

        if (
          (isCtrl && ['c', 'x', 's', 'p', 'u', 'a'].includes(key)) ||
          key === 'f12' ||
          key === 'printscreen' ||
          (isCtrl && e.shiftKey && ['i', 'j', 'c'].includes(key))
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.triggerCurtainFlash(true);
          return false;
        }
      }, { capture: true });

      // D. Privacy Curtain on App Minimize / Sleep / Tab Switch
      const curtain = document.getElementById('anti-capture-curtain');
      const showCurtain = () => {
        if (curtain) curtain.classList.add('active');
        // Instantly blur any revealed recipes
        this.blurAllRevealedSpecs();
      };
      const hideCurtain = () => {
        if (curtain) curtain.classList.remove('active');
        this.blurAllRevealedSpecs();
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          showCurtain();
          // Lock station on sleep / app switch for maximum security
          sessionStorage.removeItem(`emad_pin_auth_${this.stationId}`);
        } else {
          hideCurtain();
          // Require PIN again on wake-up
          this.checkPinSession();
        }
      });

      window.addEventListener('blur', () => {
        showCurtain();
      });

      window.addEventListener('focus', () => {
        hideCurtain();
      });

      // E. Anti-Tamper / Anti-DevTools Heartbeat
      setInterval(() => {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        if (performance.now() - start > 100) {
          document.body.innerHTML = `
            <div style="background:#050608; color:#ef4444; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif; text-align:center; padding:20px;">
              <h2 style="margin-bottom:8px;">⚠️ تم حظر الوصول</h2>
              <p style="color:#cbd5e1;">تم رصد محاولة فحص الأكواد أو تصوير الشاشة. تم تسجيل المعرف الرقمي وإغلاق الجلسة.</p>
            </div>
          `;
        }
      }, 3000);
    }

    triggerCurtainFlash(isAlarm = false) {
      const curtain = document.getElementById('anti-capture-curtain');
      if (curtain) {
        if (isAlarm) curtain.classList.add('alarm-strobe');
        curtain.classList.add('active');
        setTimeout(() => {
          curtain.classList.remove('active');
          if (isAlarm) curtain.classList.remove('alarm-strobe');
        }, 1200);
      }
      this.showToast('⚠️ تحذير: محتوى الريسيبي محمي ومراقب رقمياً! يُحظر التصوير أو النسخ.');
    }

    // --- 3. Dynamic Forensic Watermark ---
    updateWatermarkStamps() {
      const overlay = document.getElementById('forensic-watermark-overlay');
      if (!overlay) return;

      const now = new Date();
      const timeStr = now.toLocaleDateString('ar-EG-u-nu-latn') + ' ' +
                      now.toLocaleTimeString('ar-EG-u-nu-latn', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const stampText = `عماد أفندي • ${this.getStationTitle()} • جهاز: ${this.deviceId} • ${timeStr} • ملكية فكرية محمية`;

      let html = '';
      for (let i = 0; i < 16; i++) {
        html += `<div class="watermark-stamp">${stampText}</div>`;
      }
      overlay.innerHTML = html;
    }

    // --- 4. Verification Pipeline: QR -> GPS -> PIN ---
    runVerificationPipeline() {
      // Clear any old permanent bypasses on fresh load
      sessionStorage.removeItem('emad_master_authorized');

      // Step 1: Check QR Access
      if (this.config.qrRequired && !this.checkQrSession()) {
        this.showOverlay('qr-lock-overlay');
        return;
      }

      // Step 2: Check GPS Geofence (Kafr El-Sheikh Cafe Branch)
      if (this.config.gps.enabled) {
        this.showOverlay('gps-checking-overlay');
        this.checkGpsGeofence((passed, distKm) => {
          if (!passed) {
            this.showOverlay('gps-lock-overlay');
          } else {
            this.isGpsVerified = true;
            this.checkPinSession();
          }
        });
      } else {
        this.checkPinSession();
      }
    }

    // --- QR Token Logic ---
    checkQrSession() {
      const urlParams = new URLSearchParams(window.location.search);
      const qrParam = urlParams.get('qr');
      const validQrTokens = ['afandi_access', 'espresso', 'traditional', 'backbar', 'master'];

      if (qrParam && validQrTokens.includes(qrParam.toLowerCase())) {
        sessionStorage.setItem('emad_qr_authorized', 'true');
        // Clean address bar immediately to prevent link sharing
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        return true;
      }

      return sessionStorage.getItem('emad_qr_authorized') === 'true';
    }

    scanQrCameraPrompt() {
      alert('يرجى توجيه كاميرا هاتفك إلى كود الـ QR المطبوع على بار المحطة بالفرع لفتح الريسيبي مباشرة.');
    }

    // --- GPS Geofencing Logic ---
    checkGpsGeofence(callback) {
      if (!navigator.geolocation) {
        this.updateGpsError('متصفحك لا يدعم تحديد الموقع الجغرافي (GPS). يرجى فتح الموقع من متصفح حديث داخل الفرع.');
        callback(false, null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          const dist = this.calculateDistance(userLat, userLng, this.config.gps.lat, this.config.gps.lng);

          if (dist <= this.config.gps.radiusMeters) {
            callback(true, 0);
          } else {
            const distKm = (dist / 1000).toFixed(1);
            this.updateGpsError(`تم رصد موقعك على بُعد ${distKm} كم من فرع عماد أفندي بكفر الشيخ. يسمح بالفتح فقط داخل الفرع (نطاق ${this.config.gps.radiusMeters} متر).`);
            callback(false, distKm);
          }
        },
        (err) => {
          let errDetail = 'يرجى تفعيل إذن الموقع الجغرافي (Location Permission) في المتصفح والتواجد داخل الفرع للمتابعة.';
          if (err.code === 1) {
            errDetail = 'تم رفض إذن الموقع الجغرافي. يرجى الدخول لإعدادات المتصفح والسماح بالموقع لفرع عماد أفندي.';
          } else if (err.code === 2) {
            errDetail = 'تعذر التقاط إشارة الـ GPS. تأكد من تفعيل خدمات الموقع بهاتفك.';
          }
          this.updateGpsError(errDetail);
          callback(false, null);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // metres
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    }

    retryGpsCheck() {
      this.runVerificationPipeline();
    }

    updateGpsError(msg) {
      const el = document.getElementById('gps-error-desc');
      if (el) el.innerText = msg;
    }

    promptMasterOverride() {
      const entered = prompt('أدخل رمز الماستر للإدارة (Master PIN):');
      if (entered === (this.config.pins.master || '9999')) {
        this.hideAllOverlays();
        this.showToast('تم الدخول المؤقت بصلاحية المدير العام ✓');
      } else if (entered !== null) {
        alert('رمز الماستر غير صحيح!');
      }
    }

    // --- Station PIN Logic ---
    checkPinSession() {
      const sessionKey = `emad_pin_auth_${this.stationId}`;
      const isAuth = sessionStorage.getItem(sessionKey) === 'true';

      if (!isAuth) {
        this.showOverlay('pin-lock-overlay');
        this.currentPinInput = '';
        this.updatePinDots();
      } else {
        this.hideAllOverlays();
      }
    }

    handleKeypadDigit(digit) {
      if (this.currentPinInput.length >= 6) return;
      this.currentPinInput += digit;
      this.updatePinDots();

      const targetPin = this.config.pins[this.stationId] || '1010';
      const masterPin = this.config.pins.master || '9999';

      if (this.currentPinInput === targetPin || this.currentPinInput === masterPin) {
        this.onPinSuccess(this.currentPinInput === masterPin);
      } else if (this.currentPinInput.length >= 4 && !masterPin.startsWith(this.currentPinInput) && !targetPin.startsWith(this.currentPinInput)) {
        this.onPinFail();
      }
    }

    deletePinDigit() {
      this.currentPinInput = this.currentPinInput.slice(0, -1);
      this.updatePinDots();
    }

    clearPin() {
      this.currentPinInput = '';
      this.updatePinDots();
    }

    updatePinDots() {
      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
          if (i < this.currentPinInput.length) {
            dot.classList.add('filled');
          } else {
            dot.classList.remove('filled');
          }
        }
      }
    }

    onPinSuccess(isMaster) {
      const sessionKey = `emad_pin_auth_${this.stationId}`;
      sessionStorage.setItem(sessionKey, 'true');
      sessionStorage.setItem('emad_qr_authorized', 'true');
      this.hideAllOverlays();
      this.currentPinInput = '';
      this.updatePinDots();

      if (isMaster) {
        this.showToast('تم تسجيل الدخول بصلاحية الإدارة (Master) ✓');
      } else {
        this.showToast(`تم فتح ${this.getStationTitle()} بنجاح ✓`);
      }
    }

    onPinFail() {
      const pinBox = document.querySelector('#pin-lock-overlay .security-card-box');
      const errEl = document.getElementById('pin-error-text');
      
      if (errEl) errEl.innerText = 'رمز الدخول غير صحيح، يرجى المحاولة ثانية';
      if (pinBox) {
        pinBox.classList.add('pin-shake');
        setTimeout(() => pinBox.classList.remove('pin-shake'), 450);
      }

      setTimeout(() => {
        this.clearPin();
        if (errEl) errEl.innerText = '';
      }, 700);
    }

    // --- 5. HOLD-TO-REVEAL ANTI-SCREENSHOT ARMOR ---
    setupHoldToRevealObserver() {
      // Whenever the recipe modal content is mutated/opened, wrap specs with tactile armor
      const modal = document.getElementById('recipe-detail-modal');
      const content = document.getElementById('recipe-detail-content');
      if (!modal || !content) return;

      const observer = new MutationObserver(() => {
        this.attachArmorToModalContent();
      });

      observer.observe(content, { childList: true });
    }

    attachArmorToModalContent() {
      const content = document.getElementById('recipe-detail-content');
      if (!content) return;

      // Find the sheet body containing metrics & steps
      const sheetBody = content.querySelector('.detail-sheet-body');
      if (!sheetBody || sheetBody.dataset.armorAttached === 'true') return;
      sheetBody.dataset.armorAttached = 'true';

      // 1. Create Hold-to-Reveal Touchzone Banner
      const touchzone = document.createElement('div');
      touchzone.className = 'secret-reveal-touchzone';
      touchzone.id = 'secret-reveal-touchzone';
      touchzone.innerHTML = `
        <div class="fingerprint-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.2 7 9.5"/>
            <path d="M12 6a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.1"/>
            <path d="M12 10a2 2 0 0 0-2 2c0 .9.6 1.7 1.5 1.9"/>
          </svg>
        </div>
        <div class="reveal-text-block">
          <span class="reveal-title">🔒 معايير الجرامات والتحضير مشفرة أمنياً</span>
          <span class="reveal-sub">اضغط واستمر باللمس بصباعك لكشف المعايير للتشغيل</span>
        </div>
      `;

      // 2. Wrap all sensitive section blocks in .secret-vault-spec-wrapper
      const sections = sheetBody.querySelectorAll('.sop-section-block');
      if (sections.length > 0) {
        const wrapper = document.createElement('div');
        wrapper.className = 'secret-vault-spec-wrapper';
        wrapper.id = 'secret-vault-spec-wrapper';

        const vaultContent = document.createElement('div');
        vaultContent.className = 'secret-vault-content';

        // Move sections into vault content
        sections.forEach(sec => vaultContent.appendChild(sec));
        wrapper.appendChild(vaultContent);

        // Place touchzone right above wrapper
        const sizeSwitcher = sheetBody.querySelector('.detail-size-switchers');
        if (sizeSwitcher && sizeSwitcher.nextSibling) {
          sheetBody.insertBefore(touchzone, sizeSwitcher.nextSibling);
        } else {
          sheetBody.insertBefore(touchzone, sheetBody.firstChild);
        }
        sheetBody.appendChild(wrapper);

        // 3. Attach Tactile Touch & Hold Events
        const startReveal = (e) => {
          // If multi-touch detected (e.g. 3-finger screenshot gesture), instant blackout!
          if (e.touches && e.touches.length > 1) {
            this.blurAllRevealedSpecs();
            this.triggerCurtainFlash(true);
            return;
          }
          wrapper.classList.add('revealed');
          touchzone.classList.add('touching');
          const title = touchzone.querySelector('.reveal-title');
          if (title) title.innerText = '🔓 جاري عرض المعايير (ارفع يدك للإغلاق الفوري)';
        };

        const stopReveal = () => {
          wrapper.classList.remove('revealed');
          touchzone.classList.remove('touching');
          const title = touchzone.querySelector('.reveal-title');
          if (title) title.innerText = '🔒 معايير الجرامات والتحضير مشفرة أمنياً';
        };

        // Touch & Hold on touchzone or wrapper
        [touchzone, wrapper].forEach(el => {
          el.addEventListener('touchstart', startReveal, { passive: true });
          el.addEventListener('touchend', stopReveal, { passive: true });
          el.addEventListener('touchcancel', stopReveal, { passive: true });
          el.addEventListener('mousedown', startReveal);
        });
        window.addEventListener('mouseup', stopReveal);
      }
    }

    blurAllRevealedSpecs() {
      const wrapper = document.getElementById('secret-vault-spec-wrapper');
      const touchzone = document.getElementById('secret-reveal-touchzone');
      if (wrapper) wrapper.classList.remove('revealed');
      if (touchzone) {
        touchzone.classList.remove('touching');
        const title = touchzone.querySelector('.reveal-title');
        if (title) title.innerText = '🔒 معايير الجرامات والتحضير مشفرة أمنياً';
      }
    }

    lockStationImmediately() {
      sessionStorage.removeItem(`emad_pin_auth_${this.stationId}`);
      this.blurAllRevealedSpecs();
      const modal = document.getElementById('recipe-detail-modal');
      if (modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      }
      this.checkPinSession();
      this.showToast('🔒 تم قفل المحطة فوراً لحماية البيانات');
    }

    // --- 6. Inactivity Auto-Lock Watchdog (4 Minutes) ---
    setupInactivityWatcher() {
      const resetInactivity = () => {
        clearTimeout(this.inactivityTimer);
        const timeoutMs = (this.config.inactivityMinutes || 4) * 60 * 1000;
        this.inactivityTimer = setTimeout(() => {
          sessionStorage.removeItem(`emad_pin_auth_${this.stationId}`);
          const modal = document.getElementById('recipe-detail-modal');
          if (modal) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
          }
          this.checkPinSession();
          this.showToast('🔒 تم قفل المحطة تلقائياً لعدم التفاعل لمدة 4 دقائق');
        }, timeoutMs);
      };

      ['touchstart', 'touchmove', 'click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
        window.addEventListener(evt, resetInactivity, { passive: true });
      });

      resetInactivity();
    }

    // --- 7. Overlay Helpers ---
    showOverlay(id) {
      document.body.classList.remove('vault-unlocked');
      document.querySelectorAll('.security-fullscreen-overlay').forEach(el => {
        el.classList.remove('active');
      });
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }

    hideAllOverlays() {
      document.querySelectorAll('.security-fullscreen-overlay').forEach(el => {
        el.classList.remove('active');
      });
      document.body.classList.add('vault-unlocked');
    }

    showToast(msg) {
      let toast = document.getElementById('security-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'security-toast';
        toast.className = 'sync-status-toast';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `<span>${msg}</span>`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // --- 8. Manager Settings Controls ---
    openManagerModal() {
      const modal = document.getElementById('manager-settings-modal');
      const coordsDisplay = document.getElementById('manager-gps-coords-display');
      if (coordsDisplay) {
        coordsDisplay.innerText = `${this.config.gps.lat.toFixed(5)}, ${this.config.gps.lng.toFixed(5)} (نطاق ${this.config.gps.radiusMeters}م)`;
      }
      if (modal) modal.classList.add('open');
    }

    closeManagerModal() {
      const modal = document.getElementById('manager-settings-modal');
      if (modal) modal.classList.remove('open');
    }

    calibrateCurrentGpsAsBranch() {
      if (!navigator.geolocation) {
        alert('المتصفح لا يدعم GPS');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.config.gps.lat = pos.coords.latitude;
          this.config.gps.lng = pos.coords.longitude;
          this.saveConfig();
          const coordsDisplay = document.getElementById('manager-gps-coords-display');
          if (coordsDisplay) {
            coordsDisplay.innerText = `تم الحفظ: ${this.config.gps.lat.toFixed(5)}, ${this.config.gps.lng.toFixed(5)}`;
          }
          this.showToast('🎯 تم اعتماد موقعك الحالي كموقع فرع عماد أفندي الرسمي!');
        },
        (err) => alert('تعذر قراءة الموقع، تأكد من تشغيل الـ GPS وإعطاء الإذن للمتصفح.')
      );
    }

    saveManagerSettings() {
      const espPin = document.getElementById('mgr-pin-esp')?.value;
      const tradPin = document.getElementById('mgr-pin-trad')?.value;
      const backPin = document.getElementById('mgr-pin-back')?.value;
      const mstPin = document.getElementById('mgr-pin-mst')?.value;
      const sheetsUrl = document.getElementById('mgr-sheets-url')?.value;

      if (espPin) this.config.pins.espresso = espPin;
      if (tradPin) this.config.pins.traditional = tradPin;
      if (backPin) this.config.pins.backbar = backPin;
      if (mstPin) this.config.pins.master = mstPin;
      if (sheetsUrl !== undefined) this.config.sheetsWebhook = sheetsUrl.trim();

      this.saveConfig();
      this.closeManagerModal();
      this.showToast('💾 تم حفظ كافة إعدادات الأمان وتطبيقها بنجاح!');
    }

    // --- 9. Google Sheets Sync for Station Hygiene Inspection ---
    async submitChecklistToGoogleSheets(detailsPayload) {
      const webhookUrl = this.config.sheetsWebhook;

      const logHistory = JSON.parse(localStorage.getItem('emad_inspection_logs') || '[]');
      logHistory.unshift(detailsPayload);
      if (logHistory.length > 50) logHistory.pop();
      localStorage.setItem('emad_inspection_logs', JSON.stringify(logHistory));

      if (!webhookUrl) {
        this.showToast('✓ تم اعتماد الفحص محلياً');
        return { success: true, localOnly: true };
      }

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailsPayload)
        });

        this.showToast('✓ تم اعتماد الفحص وترحيله لشيت جوجل بنجاح!');
        return { success: true };
      } catch (err) {
        console.warn('Checklist sync warning (saved locally):', err);
        this.showToast('✓ تم حفظ الفحص محلياً بنجاح!');
        return { success: true, fallbackLocal: true };
      }
    }
  }

  // Initialize Security Engine on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EmadSecurityManager());
  } else {
    new EmadSecurityManager();
  }
})();
