// Emad Afandi Specialty Coffee Lab - Menu-Style Visual SOP Engine
const SvgIcons = {
  search: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  crown: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5d36e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><circle cx="12" cy="4" r="1.2" fill="#f5d36e"/><circle cx="2" cy="4" r="1.2" fill="#f5d36e"/><circle cx="22" cy="4" r="1.2" fill="#f5d36e"/></svg>`,
  siren: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M20 12h4M19.07 4.93l-2.83 2.83M12 6a6 6 0 0 0-6 6v5h12v-5a6 6 0 0 0-6-6zM4 21h16"/></svg>`,
  alert: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  bulb: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M15 9a3 3 0 0 0-6 0c0 1.3.5 2 1.5 2.5v1.5h4V11.5c1-.5 1.5-1.2 1.5-2.5z"/></svg>`,
  clipboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  timer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
};

const I18N = {
  ar: {
    brandTitle: "عماد أفندي كافيه",
    toggleBtn: "English",
    searchPlaceholder: "ابحث في مشروبات المحطة...",
    sopBtn: "عرض التشغيل",
    sopArrow: "",
    checklistBtn: "نظافة المحطة",
    sectionItems: "صنف",
    noResultsTitle: "لم يتم العثور على أي صنف",
    noResultsDesc: "تأكد من كتابة الاسم بشكل صحيح أو اختر قسماً آخر من الأعلى",
    secMetrics: "المقادير والمعايير المعيارية",
    secSteps: "خطوات التحضير والتشغيل المعيارية",
    secTip: "نصيحة التشغيل الذهبية",
    secRescue: "خطة الطوارئ والإنقاذ بدون هدر",
    rescueCommonProb: "الخطأ الشائع:",
    rescueAction: "إجراء الإنقاذ السريع (بدون رمي الأوردر):",
    single: "سنجل (Single)",
    double: "دبل (Double)",
    checklistTitle: "بروتوكول نظافة ومعايرة المحطة",
    checklistDesc: "الالتزام بهذه المعايير يضمن حماية المعدات وثبات النكهة بنسبة 100%.",
    checklistReset: "إعادة تعيين اليوم",
    checklistConfirm: "اعتماد الفحص",
    checklistFreqLabel: "الموعد المعتمد:",
    loading: "جاري تحميل بيانات المحطة...",
    metrics: {
      coffeeGram: "وزن البن",
      coffee: "وزن البن",
      blend: "التوليفة",
      roast: "درجة التحميص",
      spices: "البهارات والتحويجة",
      extractionMl: "الاستخلاص",
      milk: "الحليب",
      water: "الماء",
      condensedMilk: "حليب مكثف",
      cream: "كريمة خفق",
      iceCream: "آيس كريم",
      sauce: "الصوص",
      sauceBatata: "صوص بطاطا",
      sauceCaramel: "صوص كراميل",
      syrup: "السيرب",
      powder: "البودر",
      puree: "بيوريه الفاكهة",
      freshJuice: "عصير فريش",
      fresh: "فواكه فريش",
      freshIngredients: "المكونات الطازجة",
      commonIngredients: "مكونات مشتركة",
      soda: "صودا غازية",
      blueCuracao: "بلو كوراساو",
      ice: "مكعبات الثلج",
      crush: "ثلج مجروش",
      chips: "شوكليت شيبس",
      toppings: "توبينج وإضافات",
      garnish: "التزيين والجارنيش",
      biscuitGarnish: "بسكويت التزيين",
      specialAdd: "إضافات مميزة",
      starch: "نشا",
      flour: "دقيق",
      eggs: "بيض",
      sugar: "سكر",
      butter: "زبدة",
      oil: "زيت",
      tang: "بودرة تانج",
      bakingPowder: "بيكنج بودر",
      vanilla: "فانيليا",
      temp: "درجة الحرارة",
      time: "وقت التحضير",
      timer: "المؤقت",
      steepTime: "وقت النقع",
      ratio: "الريشيو",
      cup: "الكوب المعتمد",
      yieldCount: "الإنتاج المتوقع",
      batterDose: "صب العجين",
      miniPortion: "حجم الحصة"
    }
  },
  en: {
    brandTitle: "Emad Afandi Cafe",
    toggleBtn: "عربي",
    searchPlaceholder: "Search station drinks & SOP...",
    sopBtn: "View SOP",
    sopArrow: "",
    checklistBtn: "Checklist",
    sectionItems: "Items",
    noResultsTitle: "No Drinks Found",
    noResultsDesc: "Check your search keywords or select another category above",
    secMetrics: "Standard Recipe & Dosing",
    secSteps: "Standard Operating Steps (SOP)",
    secTip: "Golden Barista Rule",
    secRescue: "Zero-Waste Rescue Protocol",
    rescueCommonProb: "Common Issue:",
    rescueAction: "Instant Zero-Waste Rescue Action:",
    single: "Single",
    double: "Double",
    checklistTitle: "Station Calibration & Hygiene Protocol",
    checklistDesc: "Compliance with these standards ensures machine protection and 100% consistent flavor.",
    checklistReset: "Reset Daily Checks",
    checklistConfirm: "Confirm Checks",
    checklistFreqLabel: "Scheduled Interval:",
    loading: "Loading station data...",
    metrics: {
      coffeeGram: "Coffee Dose",
      coffee: "Coffee Dose",
      blend: "Coffee Blend",
      roast: "Roast Level",
      spices: "Spices & Cardamom",
      extractionMl: "Yield",
      milk: "Milk",
      water: "Water",
      condensedMilk: "Condensed Milk",
      cream: "Whipping Cream",
      iceCream: "Ice Cream",
      sauce: "Sauce",
      sauceBatata: "Sweet Potato Sauce",
      sauceCaramel: "Caramel Sauce",
      syrup: "Syrup",
      powder: "Powder",
      puree: "Fruit Puree",
      freshJuice: "Fresh Juice",
      fresh: "Fresh Fruit",
      freshIngredients: "Fresh Ingredients",
      commonIngredients: "Common Ingredients",
      soda: "Soda",
      blueCuracao: "Blue Curacao",
      ice: "Ice Cubes",
      crush: "Crushed Ice",
      chips: "Chocolate Chips",
      toppings: "Toppings",
      garnish: "Garnish",
      biscuitGarnish: "Biscuit Garnish",
      specialAdd: "Special Additions",
      starch: "Starch",
      flour: "Flour",
      eggs: "Eggs",
      sugar: "Sugar",
      butter: "Butter",
      oil: "Oil",
      tang: "Tang Powder",
      bakingPowder: "Baking Powder",
      vanilla: "Vanilla",
      temp: "Temperature",
      time: "Brew Time",
      timer: "Timer",
      steepTime: "Steep Time",
      ratio: "Brew Ratio",
      cup: "Approved Cup",
      yieldCount: "Expected Yield",
      batterDose: "Batter Pour",
      miniPortion: "Portion Size"
    }
  }
};

class StationApp {
  constructor(stationDataUrl) {
    this.stationDataUrl = stationDataUrl;
    this.data = null;
    this.activeCategory = null;
    this.searchQuery = '';
    this.activeDetailItem = null;
    this.activeDetailSizeKey = null;
    this.currentLang = localStorage.getItem('emad_lang') || 'ar';

    this.init();
  }

  async init() {
    this.applyLanguage();

    try {
      const response = await fetch(this.stationDataUrl, { cache: 'no-store' });
      this.data = await response.json();

      // Default active category is the FIRST category (NO "ALL" TAB)
      if (this.data.categories && this.data.categories.length > 0) {
        this.activeCategory = this.data.categories[0].id;
      }

      this.renderHeader();
      this.renderCategories();
      this.renderContent();
      this.initEvents();
      this.initChecklist();
    } catch (err) {
      console.error('Failed to load station data:', err);
      const container = document.getElementById('content-area');
      if (container) {
        container.innerHTML = `
          <div style="text-align:center; padding:40px; color:#f87171; background:rgba(239,68,68,0.1); border-radius:12px; border:1px solid #ef4444;">
            <div style="margin-top:10px; font-weight:700;">خطأ في تحميل بيانات المعمل: ${err.message}</div>
          </div>
        `;
      }
    }
  }

  applyLanguage() {
    const isAr = this.currentLang === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLang;

    // Toggle button text
    const langBtnText = document.getElementById('langToggleText');
    if (langBtnText) {
      langBtnText.textContent = I18N[this.currentLang].toggleBtn;
    }

    // Search placeholder
    const searchInput = document.getElementById('search-box');
    if (searchInput) {
      searchInput.placeholder = I18N[this.currentLang].searchPlaceholder;
    }

    // Floating checklist button text
    const chkBtnSpan = document.querySelector('.btn-checklist-toggle span');
    if (chkBtnSpan) {
      chkBtnSpan.textContent = I18N[this.currentLang].checklistBtn;
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('emad_lang', this.currentLang);
    this.applyLanguage();

    if (this.data) {
      this.renderHeader();
      this.renderCategories();
      this.renderContent();
      this.initChecklist();
      if (this.activeDetailItem) {
        this.renderDetailModalContent();
      }
    }
  }

  renderHeader() {
    if (!this.data || !this.data.station) return;
    const station = this.data.station;
    const isAr = this.currentLang === 'ar';

    const titleEl = document.getElementById('brandHeaderTitle');
    const subtitleEl = document.getElementById('brandHeaderSubtitle');

    if (titleEl) {
      titleEl.textContent = isAr ? I18N.ar.brandTitle : I18N.en.brandTitle;
    }
    if (subtitleEl) {
      subtitleEl.textContent = isAr ? (station.name || 'محطة الإسبريسو والفلتر') : (station.englishName || 'Espresso & Filter Station');
    }
  }

  renderCategories() {
    const filterContainer = document.getElementById('filter-tabs');
    if (!filterContainer || !this.data.categories) return;
    const isAr = this.currentLang === 'ar';

    // Strict Rule: NO "الكل" (ALL) TAB! Every category has its own distinct pill
    let html = '';
    this.data.categories.forEach(cat => {
      const isActive = cat.id === this.activeCategory ? 'active' : '';
      const count = cat.items ? cat.items.length : 0;
      const catName = isAr ? cat.name : (cat.name_en || cat.name);
      html += `
        <button class="menu-cat-pill ${isActive}" data-cat="${cat.id}">
          <span>${catName}</span>
          <span class="cat-count-badge">${count}</span>
        </button>
      `;
    });

    filterContainer.innerHTML = html;
  }

  renderContent() {
    const container = document.getElementById('content-area');
    if (!container) return;

    const query = this.searchQuery.trim().toLowerCase();
    const isAr = this.currentLang === 'ar';
    const t = I18N[this.currentLang];
    let targetCategories = [];

    if (query) {
      targetCategories = this.data.categories;
    } else {
      targetCategories = this.data.categories.filter(c => c.id === this.activeCategory);
    }

    let html = '';
    let matchesFound = 0;

    targetCategories.forEach(cat => {
      const filteredItems = (cat.items || []).filter(item => {
        if (!query) return true;
        const nameMatch = item.name.toLowerCase().includes(query);
        const nameEnMatch = item.name_en ? item.name_en.toLowerCase().includes(query) : false;
        const notesMatch = item.notes ? item.notes.toLowerCase().includes(query) : false;
        const idMatch = item.id.toLowerCase().includes(query);
        return nameMatch || nameEnMatch || notesMatch || idMatch;
      });

      if (filteredItems.length === 0) return;
      matchesFound += filteredItems.length;

      const catTitle = isAr ? cat.name : (cat.name_en || cat.name);

      html += `
        <section class="menu-section" id="cat-${cat.id}">
          <div class="menu-section-header">
            <h2 class="menu-section-title">
              <span>${catTitle}</span>
            </h2>
            <span class="section-items-badge">${filteredItems.length} ${t.sectionItems}</span>
          </div>
          <div class="visual-cards-grid">
            ${filteredItems.map(item => this.renderDrinkCard(item)).join('')}
          </div>
        </section>
      `;
    });

    if (matchesFound === 0) {
      html = `
        <div style="text-align:center; padding: 60px 20px; color: var(--text-secondary);">
          <div style="margin-bottom:12px; display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:rgba(212,175,55,0.1); border:1px solid var(--border-gold);">${SvgIcons.search}</div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--gold-bright);">${t.noResultsTitle}</div>
          <p style="font-size:0.85rem; margin-top:6px; color:var(--text-muted);">${t.noResultsDesc}</p>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  renderDrinkCard(item) {
    const isAr = this.currentLang === 'ar';
    const t = I18N[this.currentLang];
    const svgIllustration = typeof getDrinkSvg === 'function' ? getDrinkSvg(item) : '';

    // Clean Arabic and English Name Parsing
    let nameAr = item.name;
    let nameEn = item.name_en || '';
    const parenMatch = item.name.match(/\((.*?)\)/);
    if (parenMatch) {
      nameAr = item.name.replace(/\s*\(.*?\)\s*/g, '').trim();
      if (!nameEn) nameEn = parenMatch[1].trim();
    }
    if (!nameEn) {
      nameEn = item.id.replace(/-/g, ' ').toUpperCase();
    }

    const primaryName = isAr ? nameAr : nameEn;
    const secondaryName = isAr ? nameEn : nameAr;

    // Clean concise size badge
    let sizeBadge = '';
    if (item.sizes) {
      sizeBadge = `<span class="card-size-tag">8 / 12 / 16 oz</span>`;
    } else if (item.single && item.double) {
      sizeBadge = `<span class="card-size-tag">${isAr ? 'سنجل / دبل' : 'Single / Double'}</span>`;
    } else if (item.cup) {
      let shortCup = item.cup.split('/')[0].split('(')[0].trim();
      sizeBadge = `<span class="card-size-tag">${shortCup}</span>`;
    }

    return `
      <div class="drink-landscape-card" onclick="window.app.openRecipeDetail('${item.id}')">
        <div class="landscape-art-wrap">
          ${svgIllustration}
        </div>
        <div class="landscape-info-wrap">
          <div class="landscape-top-row">
            <h3 class="landscape-drink-name">${primaryName}</h3>
            ${sizeBadge ? `<span class="landscape-size-badge">${sizeBadge}</span>` : ''}
          </div>
          <div class="landscape-drink-en">${secondaryName}</div>
          <div class="landscape-action-row">
            <div class="btn-card-sop">
              <span>${t.sopBtn}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  openRecipeDetail(itemId) {
    let found = null;
    this.data.categories.forEach(cat => {
      const it = (cat.items || []).find(x => x.id === itemId);
      if (it) found = it;
    });

    if (!found) return;
    this.activeDetailItem = found;

    const modal = document.getElementById('recipe-detail-modal');
    const content = document.getElementById('recipe-detail-content');
    if (!modal || !content) return;

    // Default size key
    if (found.sizes) {
      this.activeDetailSizeKey = Object.keys(found.sizes)[0];
    } else if (found.single && found.double) {
      this.activeDetailSizeKey = 'single';
    } else {
      this.activeDetailSizeKey = null;
    }

    this.renderDetailModalContent();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  renderDetailModalContent() {
    const item = this.activeDetailItem;
    const content = document.getElementById('recipe-detail-content');
    if (!item || !content) return;

    const isAr = this.currentLang === 'ar';
    const t = I18N[this.currentLang];
    const svgIllustration = typeof getDrinkSvg === 'function' ? getDrinkSvg(item) : '';

    // Size Switchers
    let sizeSwitchHtml = '';
    let currentData = item;

    if (item.sizes) {
      const keys = Object.keys(item.sizes);
      const activeKey = this.activeDetailSizeKey || keys[0];
      currentData = item.sizes[activeKey];

      sizeSwitchHtml = `
        <div class="detail-size-switchers">
          ${keys.map(k => `
            <button class="detail-size-btn ${k === activeKey ? 'active' : ''}" 
                    onclick="window.app.switchDetailSize('${k}')">
              ${item.sizes[k].sizeLabel || k}
            </button>
          `).join('')}
        </div>
      `;
    } else if (item.single && item.double) {
      const activeKey = this.activeDetailSizeKey || 'single';
      currentData = item[activeKey];

      sizeSwitchHtml = `
        <div class="detail-size-switchers">
          <button class="detail-size-btn ${activeKey === 'single' ? 'active' : ''}" 
                  onclick="window.app.switchDetailSize('single')">
            ${t.single}
          </button>
          <button class="detail-size-btn ${activeKey === 'double' ? 'active' : ''}" 
                  onclick="window.app.switchDetailSize('double')">
            ${t.double}
          </button>
        </div>
      `;
    }

    // Name parsing
    let nameAr = item.name;
    let nameEn = item.name_en || '';
    const parenMatch = item.name.match(/\((.*?)\)/);
    if (parenMatch) {
      nameAr = item.name.replace(/\s*\(.*?\)\s*/g, '').trim();
      if (!nameEn) nameEn = parenMatch[1].trim();
    }
    if (!nameEn) {
      nameEn = item.id.replace(/-/g, ' ').toUpperCase();
    }
    const modalPrimaryName = isAr ? nameAr : nameEn;
    const modalSecondaryName = isAr ? nameEn : nameAr;

    // 1. SECTION [١]: Standard Recipe & Dosing
    const metricsHtml = this.renderMetricsFromObject(currentData, isAr);

    // 2. SECTION [٢]: Step-by-Step SOP
    let stepsHtml = '';
    const stepsList = isAr ? (item.steps || []) : (item.steps_en || item.steps || []);
    if (stepsList.length > 0) {
      stepsHtml = `
        <div class="sop-section-block">
          <div class="sop-section-header">
            <span class="sop-section-badge">2</span>
            <h4 class="sop-section-title">${t.secSteps}</h4>
          </div>
          <div class="sop-steps-list">
            ${stepsList.map((s, idx) => `
              <div class="sop-step-card">
                <span class="sop-step-badge">${idx + 1}</span>
                <div class="sop-step-text">${s}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 3. SECTION [٣]: Golden Barista Tip
    let tipHtml = '';
    const tipText = isAr ? (item.proTip || '') : (item.proTip_en || item.proTip || '');
    if (tipText) {
      tipHtml = `
        <div class="sop-section-block">
          <div class="sop-section-header">
            <span class="sop-section-badge">3</span>
            <h4 class="sop-section-title">${t.secTip}</h4>
          </div>
          <div class="sop-tip-card">
            <div class="sop-tip-icon">${SvgIcons.crown}</div>
            <div class="sop-tip-text">
              <p>${tipText}</p>
            </div>
          </div>
        </div>
      `;
    }

    // 4. SECTION [٤]: Zero-Waste Rescue Protocol
    let rescueHtml = '';
    if (item.rescue) {
      const probText = isAr ? item.rescue.problem : (item.rescue.problem_en || item.rescue.problem);
      const solText = isAr ? item.rescue.solution : (item.rescue.solution_en || item.rescue.solution);
      rescueHtml = `
        <div class="sop-section-block">
          <div class="sop-section-header">
            <span class="sop-section-badge">4</span>
            <h4 class="sop-section-title">${t.secRescue}</h4>
          </div>
          <div class="sop-rescue-box">
            <div class="rescue-card-problem">
              <span class="rescue-prob-icon">${SvgIcons.alert}</span>
              <div><strong>${t.rescueCommonProb}</strong> ${probText}</div>
            </div>
            <div class="rescue-card-solution">
              <span class="rescue-sol-icon">${SvgIcons.bulb}</span>
              <div>
                <strong>${t.rescueAction}</strong>
                <p>${solText}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    content.innerHTML = `
      <!-- Sleek Circular Luxury Close Button (Requested by User) -->
      <button class="modal-circular-close" onclick="window.app.closeRecipeDetail()" aria-label="Close">✕</button>

      <div class="detail-sheet-header">
        <div class="detail-top-hero">
          <div class="detail-art-wrap">
            ${svgIllustration}
          </div>
          <h2 class="detail-drink-name">${modalPrimaryName}</h2>
          <div class="detail-drink-sub">${modalSecondaryName ? modalSecondaryName + (item.notes ? ' • ' + item.notes : '') : (item.notes || '')}</div>
        </div>
      </div>

      <div class="detail-sheet-body">
        ${sizeSwitchHtml}

        <!-- Section [1]: Standard Recipe & Dosing -->
        <div class="sop-section-block">
          <div class="sop-section-header">
            <span class="sop-section-badge">1</span>
            <h4 class="sop-section-title">${t.secMetrics}</h4>
          </div>
          <div class="sop-metrics-stack">
            ${metricsHtml}
          </div>
        </div>

        <!-- Section [2]: Step-by-Step SOP -->
        ${stepsHtml}

        <!-- Section [3]: Golden Tip -->
        ${tipHtml}

        <!-- Section [4]: Zero-Waste Rescue -->
        ${rescueHtml}
      </div>
    `;
  }

  switchDetailSize(sizeKey) {
    this.activeDetailSizeKey = sizeKey;
    this.renderDetailModalContent();
  }

  closeRecipeDetail() {
    const modal = document.getElementById('recipe-detail-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderMetricsFromObject(obj, isAr) {
    const t = I18N[this.currentLang];
    // Barista sequential preparation workflow order:
    const orderedKeys = [
      // 1. Preparation & Dosing
      'coffeeGram', 'coffee', 'blend', 'roast', 'spices', 'flour', 'eggs', 'sugar', 'butter', 'oil', 'bakingPowder', 'vanilla', 'starch',
      // 2. Extraction & Brewing
      'extractionMl', 'ratio', 'time', 'timer', 'steepTime', 'temp',
      // 3. Dairy, Sauces, Syrups & Additions
      'water', 'milk', 'condensedMilk', 'cream', 'iceCream', 'sauce', 'sauceBatata', 'sauceCaramel',
      'syrup', 'powder', 'puree', 'freshJuice', 'fresh', 'freshIngredients', 'commonIngredients',
      'soda', 'blueCuracao', 'tang', 'ice', 'crush', 'chips',
      // 4. Garnishes & Finishing
      'toppings', 'garnish', 'biscuitGarnish', 'specialAdd',
      // 5. Serving & Cup
      'cup', 'yieldCount', 'batterDose', 'miniPortion'
    ];

    const presentKeys = orderedKeys.filter(key => obj[key] && obj[key] !== '-');

    // Include any extra attributes if present
    const excludedKeys = new Set([
      'id', 'name', 'name_en', 'category', 'category_en', 'notes',
      'steps', 'steps_en', 'proTip', 'proTip_en', 'rescue', 'sizes',
      'single', 'double', 'sizeLabel'
    ]);

    Object.keys(obj).forEach(k => {
      if (!orderedKeys.includes(k) && !excludedKeys.has(k) && obj[k] && obj[k] !== '-' && !presentKeys.includes(k)) {
        presentKeys.push(k);
      }
    });

    if (presentKeys.length === 0) return '';

    return presentKeys.map((key, idx) => {
      const label = t.metrics[key] || key;
      const val = obj[key];
      return `
        <div class="sop-metric-row">
          <div class="sop-metric-info">
            <span class="sop-metric-order-num">${idx + 1}</span>
            <span class="sop-metric-label">${label}</span>
          </div>
          <strong class="sop-metric-val">${val}</strong>
        </div>
      `;
    }).join('');
  }

  initEvents() {
    const searchInput = document.getElementById('search-box');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderContent();
      });
    }

    const filterContainer = document.getElementById('filter-tabs');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.menu-cat-pill');
        if (!btn) return;

        filterContainer.querySelectorAll('.menu-cat-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.activeCategory = btn.getAttribute('data-cat');
        this.renderContent();
      });
    }
  }

  initChecklist() {
    const listContainer = document.getElementById('checklist-items');
    if (!listContainer || !this.data || !this.data.cleaningChecklist) return;

    const isAr = this.currentLang === 'ar';
    const t = I18N[this.currentLang];
    const stationId = this.data.station.id;
    const storageKey = `emad_checklist_${stationId}`;
    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (e) {
      savedState = {};
    }

    let html = '';
    this.data.cleaningChecklist.forEach((item, idx) => {
      const isChecked = !!savedState[idx];
      const taskText = isAr ? item.task : (item.task_en || item.task);
      const freqText = isAr ? item.frequency : (item.frequency_en || item.frequency);
      html += `
        <label class="checklist-item" id="chk-label-${idx}">
          <input type="checkbox" data-idx="${idx}" ${isChecked ? 'checked' : ''} onchange="window.app.toggleCheckItem(${idx})">
          <div style="flex:1;">
            <div class="checklist-text">${taskText}</div>
            <div class="checklist-freq">${t.checklistFreqLabel} ${freqText}</div>
          </div>
        </label>
      `;
    });

    listContainer.innerHTML = html;
  }

  toggleCheckItem(idx) {
    if (!this.data || !this.data.station) return;
    const stationId = this.data.station.id;
    const storageKey = `emad_checklist_${stationId}`;
    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (e) {
      savedState = {};
    }

    const checkbox = document.querySelector(`input[data-idx="${idx}"]`);
    if (checkbox) {
      savedState[idx] = checkbox.checked;
      localStorage.setItem(storageKey, JSON.stringify(savedState));
    }
  }
}

// Modal controls
function openChecklistModal() {
  const modal = document.getElementById('checklist-modal');
  if (modal) modal.classList.add('open');
}

function closeChecklistModal() {
  const modal = document.getElementById('checklist-modal');
  if (modal) modal.classList.remove('open');
}

function resetChecklist() {
  if (!window.app || !window.app.data) return;
  const stationId = window.app.data.station.id;
  localStorage.removeItem(`emad_checklist_${stationId}`);
  window.app.initChecklist();
}
