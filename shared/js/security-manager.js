/**
 * =========================================================================
 * EMAD AFANDI ENTERPRISE SECURITY & IP PROTECTION MANAGER
 * 1. Station-Specific Passwords (PIN Code)
 * 2. GPS Geofencing (Café Branch Restriction)
 * 3. QR-Only Access & Anti-Link-Sharing
 * 4. Anti-Screenshot & Forensic Dynamic Watermarking
 * 5. Google Sheets Inspection Sync & Audit Trail
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
      lat: 31.10927, // إحداثيات فرع عماد أفندي المعتمد
      lng: 30.94269,
      radiusMeters: 250 // نطاق 250 متر حول الفرع
    },
    qrRequired: true,
    inactivityMinutes: 5,
    sheetsWebhook: 'https://script.google.com/macros/s/AKfycbz4dgFH2gq687-E69yI3wqDOlfrKFVtx939qmW0S9XCfz14h_qF9zuEqEIcVl4NOYs-cA/exec'
  };

  class EmadSecurityManager {
    constructor() {
      this.stationId = this.detectStationId();
      this.config = this.loadConfig();
      this.currentPinInput = '';
      this.inactivityTimer = null;
      this.deviceId = this.getOrCreateDeviceId();
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
          // If stored GPS was 0 or uncalibrated, auto-upgrade to official branch coordinates
          if (!merged.gps || merged.gps.lat === 0 || merged.gps.lat === undefined) {
            merged.gps = Object.assign({}, DEFAULT_CONFIG.gps, merged.gps || {});
            merged.gps.lat = DEFAULT_CONFIG.gps.lat;
            merged.gps.lng = DEFAULT_CONFIG.gps.lng;
          }
          // Ensure official Google Sheets webhook is active
          if (!merged.sheetsWebhook || merged.sheetsWebhook === '') {
            merged.sheetsWebhook = DEFAULT_CONFIG.sheetsWebhook;
          }
          return merged;
        }
      } catch (e) {
        console.warn('Failed to parse security config, using defaults');
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
      // 1. Inject DOM Security Elements (Curtain, Watermark, Overlays)
      this.injectSecurityDom();

      // 2. Setup Anti-Copy & Anti-Leak event listeners
      this.setupAntiLeakProtection();

      // 3. Start Security Verification Pipeline
      this.runVerificationPipeline();

      // 4. Setup Inactivity Watchdog
      this.setupInactivityWatcher();

      // 5. Expose Global Security API
      window.EmadSecurity = this;
    }

    // --- DOM Injection ---
    injectSecurityDom() {
      // Anti-Capture Curtain
      if (!document.getElementById('anti-capture-curtain')) {
        const curtain = document.createElement('div');
        curtain.id = 'anti-capture-curtain';
        curtain.innerHTML = `
          <img src="assets/emad-logo.png" alt="عماد أفندي" class="curtain-logo" onerror="this.style.display='none'">
          <div class="curtain-msg">🔒 محتوى محمي • كافيه ومحمصة عماد أفندي</div>
        `;
        document.body.appendChild(curtain);
      }

      // Dynamic Forensic Watermark
      if (!document.getElementById('forensic-watermark-overlay')) {
        const watermark = document.createElement('div');
        watermark.id = 'forensic-watermark-overlay';
        watermark.className = 'forensic-watermark-overlay';
        document.body.appendChild(watermark);
        this.updateWatermarkStamps();
        setInterval(() => this.updateWatermarkStamps(), 60000);
      }

      // Security Fullscreen Overlays Container
      if (!document.getElementById('security-overlays-container')) {
        const container = document.createElement('div');
        container.id = 'security-overlays-container';
        container.innerHTML = `
          <!-- 1. QR LOCK OVERLAY -->
          <div id="qr-lock-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <div class="security-badge-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M10 3v4"/><path d="M14 10h4"/><path d="M3 10h4"/><path d="M10 14v4"/><path d="M10 10h4"/></svg>
              </div>
              <h3 class="security-card-title">الدخول مقيد برمز QR المحطة</h3>
              <p class="security-card-desc">
                للحفاظ على سرية الريسيبي ومعايير التشغيل، يُسمح بالوصول فقط عبر مسح رمز الـ QR المطبوع على بار المحطة داخل الفرع.
              </p>
              <button class="btn-security-action" onclick="window.EmadSecurity.scanQrCameraPrompt()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span>مسح كود QR المحطة</span>
              </button>
              <button class="btn-security-action" style="margin-top:10px; background:transparent; border:1px solid rgba(212,175,55,0.4); color:var(--gold-bright); font-size:0.78rem;" onclick="window.EmadSecurity.showOverlay('pin-lock-overlay')">
                <span>🔑 دخول الإدارة برمز الماستر (Master PIN)</span>
              </button>
            </div>
          </div>

          <!-- 2. GPS GEOFENCE OVERLAY -->
          <div id="gps-lock-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <div class="security-badge-icon alert">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 class="security-card-title">خارج النطاق الجغرافي للفرع</h3>
              <p class="security-card-desc" id="gps-error-desc">
                هذا النظام مشفر ومقيد جغرافياً ليعمل حصرياً داخل نطاق فرع عماد أفندي. يرجى تفعيل الموقع (GPS) والتواجد داخل الفرع للمتابعة.
              </p>
              <button class="btn-security-action" onclick="window.EmadSecurity.retryGpsCheck()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span>إعادة فحص الموقع الجغرافي</span>
              </button>
              <button class="btn-security-action" style="margin-top:10px; background:transparent; border:1px solid rgba(212,175,55,0.4); color:var(--gold-bright); font-size:0.78rem;" onclick="window.EmadSecurity.showOverlay('pin-lock-overlay')">
                <span>🔑 دخول الإدارة برمز الماستر (Master PIN)</span>
              </button>
            </div>
          </div>

          <!-- 3. STATION PIN LOCK OVERLAY -->
          <div id="pin-lock-overlay" class="security-fullscreen-overlay">
            <div class="security-card-box">
              <img src="assets/emad-logo.png" alt="عماد أفندي" class="security-brand-logo" onerror="this.style.display='none'">
              <h3 class="security-card-title" id="pin-station-title">${this.getStationTitle()}</h3>
              <p class="security-card-desc">أدخل رمز الدخول السري المعتمد للمحطة</p>
              
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

          <!-- 4. MANAGER SECURITY SETTINGS MODAL -->
          <div id="manager-settings-modal" class="modal-overlay" onclick="if(event.target===this) window.EmadSecurity.closeManagerModal()">
            <div class="modal-content" style="max-width:440px;">
              <div class="modal-header">
                <h3 class="modal-title">⚙️ لوحة حماية وأمان عماد أفندي</h3>
                <button class="modal-close" onclick="window.EmadSecurity.closeManagerModal()">&times;</button>
              </div>
              <div style="font-size:0.84rem; color:#cbd5e1; display:flex; flex-direction:column; gap:14px; margin-top:10px;">
                
                <!-- GPS Branch Calibration -->
                <div style="background:#0c0f17; border:1px solid var(--border-gold); border-radius:12px; padding:12px;">
                  <strong style="color:var(--gold-bright); display:block; margin-bottom:6px;">📍 إحداثيات الفرع (Geofence):</strong>
                  <div style="font-size:0.78rem; margin-bottom:10px; color:#94a3b8;" id="manager-gps-coords-display">
                    جاري القراءة...
                  </div>
                  <button class="btn-security-action" style="font-size:0.8rem; padding:8px 14px;" onclick="window.EmadSecurity.calibrateCurrentGpsAsBranch()">
                    🎯 تعيين موقعي الحالي كموقع الفرع المعتمد
                  </button>
                </div>

                <!-- Station Passwords -->
                <div style="background:#0c0f17; border:1px solid var(--border-gold); border-radius:12px; padding:12px;">
                  <strong style="color:var(--gold-bright); display:block; margin-bottom:8px;">🔑 تعديل باسووردات المحطات:</strong>
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

                <!-- Google Sheets Webhook -->
                <div style="background:#0c0f17; border:1px solid var(--border-gold); border-radius:12px; padding:12px;">
                  <strong style="color:var(--gold-bright); display:block; margin-bottom:6px;">📊 رابط Google Sheets Webhook:</strong>
                  <input id="mgr-sheets-url" type="text" class="checklist-inspector-input" style="margin-bottom:4px; font-family:monospace; font-size:0.75rem;" placeholder="https://script.google.com/macros/s/.../exec" value="${this.config.sheetsWebhook || ''}">
                  <span style="font-size:0.72rem; color:#94a3b8;">الصق رابط تطبيق الويب بعد نشر كود Google Apps Script.</span>
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
      // A. Block Context Menu Everywhere
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      }, { capture: true });

      // B. Block Copy, Cut, Select, Drag
      ['copy', 'cut', 'selectstart', 'dragstart'].forEach(evt => {
        document.addEventListener(evt, (e) => {
          // Allow inside text input fields only
          if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
            return true;
          }
          e.preventDefault();
          return false;
        }, { capture: true });
      });

      // C. Block Harmful Key Combinations (Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U, F12, PrintScreen)
      document.addEventListener('keydown', (e) => {
        const isCtrl = e.ctrlKey || e.metaKey;
        const key = e.key.toLowerCase();

        if (
          (isCtrl && ['c', 'x', 's', 'p', 'u', 'a'].includes(key)) ||
          key === 'f12' ||
          key === 'printscreen'
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.triggerCurtainFlash();
          return false;
        }
      }, { capture: true });

      // D. Privacy Curtain on Tab Switch / App Minimize / Notification Tray
      const curtain = document.getElementById('anti-capture-curtain');
      const showCurtain = () => {
        if (curtain) curtain.classList.add('active');
      };
      const hideCurtain = () => {
        if (curtain) curtain.classList.remove('active');
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          showCurtain();
        } else {
          hideCurtain();
        }
      });

      window.addEventListener('blur', () => {
        showCurtain();
      });

      window.addEventListener('focus', () => {
        hideCurtain();
      });

      window.addEventListener('pageshow', () => {
        hideCurtain();
      });
    }

    triggerCurtainFlash() {
      const curtain = document.getElementById('anti-capture-curtain');
      if (curtain) {
        curtain.classList.add('active');
        setTimeout(() => curtain.classList.remove('active'), 800);
      }
    }

    updateWatermarkStamps() {
      const overlay = document.getElementById('forensic-watermark-overlay');
      if (!overlay) return;

      const now = new Date();
      const timeStr = now.toLocaleDateString('ar-EG') + ' ' + now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
      const stampText = `عماد أفندي • ${this.getStationTitle()} • ${this.deviceId} • ${timeStr}`;

      let html = '';
      for (let i = 0; i < 14; i++) {
        html += `<div class="watermark-stamp">${stampText}</div>`;
      }
      overlay.innerHTML = html;
    }

    // --- 3. Verification Pipeline: QR -> GPS -> PIN ---
    runVerificationPipeline() {
      // 0. If Master access granted for this session, bypass QR & GPS
      if (sessionStorage.getItem('emad_master_authorized') === 'true') {
        this.hideAllOverlays();
        return;
      }

      // 1. Check QR Access
      if (this.config.qrRequired && !this.checkQrSession()) {
        this.showOverlay('qr-lock-overlay');
        return;
      }

      // 2. Check GPS Geofence
      if (this.config.gps.enabled && this.config.gps.lat !== 0) {
        this.checkGpsGeofence((passed) => {
          if (!passed) {
            this.showOverlay('gps-lock-overlay');
          } else {
            this.checkPinSession();
          }
        });
      } else {
        // GPS disabled or not yet calibrated
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
      alert('يرجى استخدام كاميرا هاتفك لمسح رمز الـ QR المطبوع على محطة العمل لفتح الريسيبي مباشرة.');
    }

    // --- GPS Geofencing Logic ---
    checkGpsGeofence(callback) {
      if (!navigator.geolocation) {
        this.updateGpsError('متصفحك لا يدعم تحديد الموقع الجغرافي (GPS). يرجى فتح الموقع من متصفح حديث داخل الكافيه.');
        callback(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          const dist = this.calculateDistance(userLat, userLng, this.config.gps.lat, this.config.gps.lng);

          if (dist <= this.config.gps.radiusMeters) {
            callback(true);
          } else {
            const distKm = (dist / 1000).toFixed(1);
            this.updateGpsError(`أنت على بعد ${distKm} كم من فرع عماد أفندي المعتمد. يسمح بالفتح فقط داخل الفرع (نطاق ${this.config.gps.radiusMeters} متر).`);
            callback(false);
          }
        },
        (err) => {
          this.updateGpsError('تعذر التحقق من موقعك. يرجى تفعيل إذن الموقع الجغرافي (Location Permission) في المتصفح والتواجد داخل الفرع.');
          callback(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
      this.hideAllOverlays();
      this.runVerificationPipeline();
    }

    updateGpsError(msg) {
      const el = document.getElementById('gps-error-desc');
      if (el) el.innerText = msg;
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

      // Check PIN when reaching 4 or 6 digits
      const targetPin = this.config.pins[this.stationId] || '1010';
      const masterPin = this.config.pins.master || '9999';

      if (this.currentPinInput === targetPin || this.currentPinInput === masterPin) {
        // Success
        this.onPinSuccess(this.currentPinInput === masterPin);
      } else if (this.currentPinInput.length >= 4 && !masterPin.startsWith(this.currentPinInput) && !targetPin.startsWith(this.currentPinInput)) {
        // Wrong PIN
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
      if (isMaster) {
        sessionStorage.setItem('emad_master_authorized', 'true');
        sessionStorage.setItem('emad_qr_authorized', 'true');
      }
      this.hideAllOverlays();
      this.currentPinInput = '';
      this.updatePinDots();

      if (isMaster) {
        this.showToast('تم تسجيل الدخول بصلاحية المدير العام (Master) ✓');
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

    // --- Inactivity Auto-Lock Watchdog ---
    setupInactivityWatcher() {
      const resetInactivity = () => {
        clearTimeout(this.inactivityTimer);
        const timeoutMs = (this.config.inactivityMinutes || 5) * 60 * 1000;
        this.inactivityTimer = setTimeout(() => {
          // Lock station
          sessionStorage.removeItem(`emad_pin_auth_${this.stationId}`);
          this.checkPinSession();
        }, timeoutMs);
      };

      ['touchstart', 'click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
        window.addEventListener(evt, resetInactivity, { passive: true });
      });

      resetInactivity();
    }

    // --- Overlay Helpers ---
    showOverlay(id) {
      this.hideAllOverlays();
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }

    hideAllOverlays() {
      document.querySelectorAll('.security-fullscreen-overlay').forEach(el => {
        el.classList.remove('active');
      });
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

    // --- Manager Settings Controls ---
    openManagerModal() {
      const modal = document.getElementById('manager-settings-modal');
      const coordsDisplay = document.getElementById('manager-gps-coords-display');
      if (coordsDisplay) {
        if (this.config.gps.lat === 0) {
          coordsDisplay.innerText = 'لم يتم تحديد موقع الفرع بعد (غير مقيد)';
        } else {
          coordsDisplay.innerText = `خط العرض: ${this.config.gps.lat.toFixed(5)} • خط الطول: ${this.config.gps.lng.toFixed(5)}`;
        }
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

    // --- Google Sheets Sync for Station Hygiene Inspection ---
    async submitChecklistToGoogleSheets(detailsPayload) {
      const webhookUrl = this.config.sheetsWebhook;

      // Always save locally in history
      const logHistory = JSON.parse(localStorage.getItem('emad_inspection_logs') || '[]');
      logHistory.unshift(detailsPayload);
      if (logHistory.length > 50) logHistory.pop();
      localStorage.setItem('emad_inspection_logs', JSON.stringify(logHistory));

      if (!webhookUrl) {
        this.showToast('✓ تم اعتماد الفحص محلياً (يمكنك ربط Google Sheets من الإعدادات)');
        return { success: true, localOnly: true };
      }

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailsPayload)
        });
        this.showToast('✓ تم اعتماد الفحص وإرسال السجل إلى Google Sheet بنجاح!');
        return { success: true };
      } catch (err) {
        console.error('Google Sheets Sync failed:', err);
        this.showToast('✓ تم اعتماد الفحص محلياً، وجاري إعادة المحاولة للمزامنة.');
        return { success: false, error: err };
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
