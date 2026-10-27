// Emad Afandi Specialty Coffee Lab - Vector Icon System (Zero Emojis)
const ICONS = {
  search: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  
  espresso: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
  
  flame: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  
  snowflake: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line><path d="m20 16-4-4 4-4"></path><path d="m4 8 4 4-4 4"></path><path d="m16 4-4 4-4-4"></path><path d="m8 20 4-4 4 4"></path></svg>`,
  
  flask: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31L4.1 19.46A2 2 0 0 0 5.8 22h12.4a2 2 0 0 0 1.7-2.54L14 9.31V2"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line><line x1="7.5" y1="15" x2="16.5" y2="15"></line></svg>`,
  
  scale: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>`,
  
  droplet: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>`,
  
  timer: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  
  thermometer: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>`,
  
  zap: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  
  alertTriangle: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  
  wrench: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
  
  sparkles: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
  
  cup: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path></svg>`,
  
  check: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  
  cleanBrush: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6"></path><path d="M21.5 8 16 2.5l-9.5 9.5a3.5 3.5 0 0 0-1 2.5V19h4.5a3.5 3.5 0 0 0 2.5-1l9-9.5z"></path><path d="M2 22h20"></path></svg>`,
  
  qr: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  
  home: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  
  close: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  
  gauge: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>`,
  
  layers: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,

  lightbulb: `<svg class="lab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`
};

function getIcon(name, extraClass = '') {
  const svg = ICONS[name] || '';
  if (!extraClass) return svg;
  return svg.replace('class="lab-icon"', `class="lab-icon ${extraClass}"`);
}


// Emad Afandi Specialty Coffee Lab - SOP Engine (Zero Emojis, Laboratory Grade)
class StationApp {
  constructor(stationDataUrl) {
    this.stationDataUrl = stationDataUrl;
    this.data = null;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.rushMode = localStorage.getItem('emad_rush_mode') === 'true';

    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.stationDataUrl);
      this.data = await response.json();
      this.renderHeader();
      this.renderCategories();
      this.renderContent();
      this.initEvents();
      this.initChecklist();
      this.applyRushMode(this.rushMode);
    } catch (err) {
      console.error('Failed to load station data:', err);
      const container = document.getElementById('content-area');
      if (container) {
        container.innerHTML = `
          <div style="text-align:center; padding:40px; color:#f87171; background:rgba(239,68,68,0.1); border-radius:12px; border:1px solid #ef4444;">
            ${typeof getIcon === 'function' ? getIcon('alertTriangle', 'icon-lg') : ''}
            <div style="margin-top:10px; font-weight:700;">خطأ في تحميل بيانات المعمل: ${err.message}</div>
          </div>
        `;
      }
    }
  }

  renderHeader() {
    const station = this.data.station;
    const titleEl = document.getElementById('station-title');
    const descEl = document.getElementById('station-desc');
    const badgeEl = document.getElementById('station-badge');
    const metaEl = document.getElementById('station-meta');

    if (titleEl) titleEl.textContent = station.name;
    if (descEl) descEl.textContent = station.tagline;
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="lab-led pulse-gold"></span> ${station.englishName}`;
    }
    if (metaEl && station.targetStandard) {
      metaEl.innerHTML = `${getIcon('gauge', 'icon-gold')} <span>${station.targetStandard}</span>`;
      metaEl.style.display = 'inline-flex';
    }
  }

  renderCategories() {
    const filterContainer = document.getElementById('filter-tabs');
    if (!filterContainer) return;

    let html = `
      <button class="filter-btn active" data-cat="all">
        ${getIcon('layers')}
        <span>الكل (${this.getTotalItems()})</span>
      </button>
    `;

    this.data.categories.forEach(cat => {
      const count = cat.items ? cat.items.length : 0;
      const iconType = this.getCategoryIcon(cat.id);
      html += `
        <button class="filter-btn" data-cat="${cat.id}">
          ${getIcon(iconType)}
          <span>${cat.name} (${count})</span>
        </button>
      `;
    });

    filterContainer.innerHTML = html;
  }

  getCategoryIcon(catId) {
    if (catId.includes('espresso')) return 'espresso';
    if (catId.includes('filter')) return 'flask';
    if (catId.includes('turkish') || catId.includes('heritage')) return 'flame';
    if (catId.includes('cold') || catId.includes('frappes') || catId.includes('iced')) return 'snowflake';
    if (catId.includes('smoothie')) return 'droplet';
    if (catId.includes('boba') || catId.includes('mocktail')) return 'sparkles';
    if (catId.includes('bakery')) return 'flame';
    return 'cup';
  }

  getTotalItems() {
    return this.data.categories.reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0);
  }

  renderContent() {
    const container = document.getElementById('content-area');
    if (!container) return;

    const query = this.searchQuery.trim().toLowerCase();
    let html = '';
    let matchesFound = 0;

    this.data.categories.forEach(cat => {
      if (this.activeCategory !== 'all' && this.activeCategory !== cat.id) return;

      const filteredItems = (cat.items || []).filter(item => {
        if (!query) return true;
        const nameMatch = item.name.toLowerCase().includes(query);
        const notesMatch = item.notes ? item.notes.toLowerCase().includes(query) : false;
        const idMatch = item.id.toLowerCase().includes(query);
        return nameMatch || notesMatch || idMatch;
      });

      if (filteredItems.length === 0) return;
      matchesFound += filteredItems.length;

      html += `
        <section class="category-section" id="cat-${cat.id}">
          <div class="category-header">
            <h2 class="category-title">
              ${getIcon(this.getCategoryIcon(cat.id), 'icon-gold')}
              <span>${cat.name}</span>
            </h2>
            <span class="badge-num" style="font-size:0.78rem; color:var(--gold-soft); font-family:var(--font-mono);">${filteredItems.length} SPEC</span>
          </div>
          <div class="items-grid">
            ${filteredItems.map(item => this.renderRecipeCard(item)).join('')}
          </div>
        </section>
      `;
    });

    if (matchesFound === 0) {
      html = `
        <div style="text-align:center; padding: 60px 20px; color: var(--text-secondary);">
          <div style="margin-bottom:12px; color:var(--gold-primary);">${getIcon('search', 'icon-lg')}</div>
          <div style="font-size:1.1rem; font-weight:700; color:var(--gold-bright);">لم يتم العثور على أي صنف مطابق للبحث</div>
          <p style="font-size:0.85rem; margin-top:6px; color:var(--text-muted);">تحقق من الاسم أو استعرض كافة التصنيفات بالأعلى</p>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  renderRecipeCard(item) {
    const hasSizes = !!item.sizes;
    const hasSingleDouble = !!(item.single && item.double);

    let sizeSwitchHtml = '';
    let metricsHtml = '';

    if (hasSizes) {
      const keys = Object.keys(item.sizes);
      const defaultKey = keys[0];
      const activeData = item.sizes[defaultKey];

      sizeSwitchHtml = `
        <div class="size-switchers" data-recipe-id="${item.id}">
          ${keys.map((k, idx) => `
            <button class="size-pill ${idx === 0 ? 'active' : ''}" 
                    data-size-key="${k}" 
                    onclick="window.app.switchSize('${item.id}', '${k}')">
              ${item.sizes[k].sizeLabel || k}
            </button>
          `).join('')}
        </div>
      `;
      metricsHtml = `<div class="flash-metrics" id="metrics-${item.id}">${this.renderMetricsFromObject(activeData)}</div>`;
    } else if (hasSingleDouble) {
      sizeSwitchHtml = `
        <div class="size-switchers" data-recipe-id="${item.id}">
          <button class="size-pill active" onclick="window.app.switchSingleDouble('${item.id}', 'single')">سنجل (Single)</button>
          <button class="size-pill" onclick="window.app.switchSingleDouble('${item.id}', 'double')">دبل (Double)</button>
        </div>
      `;
      metricsHtml = `<div class="flash-metrics" id="metrics-${item.id}">${this.renderMetricsFromObject(item.single)}</div>`;
    } else {
      metricsHtml = `<div class="flash-metrics">${this.renderMetricsFromObject(item)}</div>`;
    }

    // SOP Steps
    let stepsHtml = '';
    if (item.steps && item.steps.length > 0) {
      stepsHtml = `
        <div class="recipe-steps">
          <div class="steps-title">
            ${getIcon('timer', 'icon-gold')}
            <span>بروتوكول التحضير المعملي (SOP):</span>
          </div>
          <ol class="steps-list">
            ${item.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Zero-Waste Diagnostic Panel
    let rescueHtml = '';
    if (item.rescue) {
      rescueHtml = `
        <div class="rescue-box">
          <div class="rescue-header">
            ${getIcon('wrench')}
            <span>عيادة إنقاذ الأوردر (Zero-Waste Diagnostic):</span>
          </div>
          <div class="rescue-problem"><strong>التشخيص:</strong> ${item.rescue.problem}</div>
          <div class="rescue-solution"><strong>إجراء الإنقاذ الفوري:</strong> ${item.rescue.solution}</div>
        </div>
      `;
    }

    // Pro Tip
    let tipHtml = '';
    if (item.proTip) {
      tipHtml = `
        <div class="recipe-pro-tip">
          ${getIcon('sparkles', 'icon-gold')}
          <div><strong>سر معمل عماد أفندي:</strong> ${item.proTip}</div>
        </div>
      `;
    }

    // Cup badge
    const cupText = item.cup || (item.sizes && item.sizes.small ? item.sizes.small.cup : (item.single ? item.single.cup : ''));

    return `
      <div class="recipe-card" id="card-${item.id}">
        <div class="card-top">
          <h3 class="recipe-name">${item.name}</h3>
          ${cupText ? `<span class="recipe-cup" id="cup-${item.id}">${getIcon('cup')} <span>${cupText}</span></span>` : ''}
        </div>
        ${sizeSwitchHtml}
        ${metricsHtml}
        ${stepsHtml}
        ${rescueHtml}
        ${tipHtml}
      </div>
    `;
  }

  renderMetricsFromObject(obj) {
    const fields = [
      { key: 'flour', label: 'دقيق', icon: 'scale' },
      { key: 'eggs', label: 'بيض', icon: 'cup' },
      { key: 'vanilla', label: 'فانيليا', icon: 'sparkles' },
      { key: 'sugar', label: 'سكر', icon: 'scale' },
      { key: 'butter', label: 'زبدة', icon: 'droplet' },
      { key: 'oil', label: 'زيت', icon: 'droplet' },
      { key: 'tang', label: 'تانج', icon: 'sparkles' },
      { key: 'bakingPowder', label: 'بيكنج بودر', icon: 'scale' },
      { key: 'yieldCount', label: 'الإنتاج', icon: 'cup' },
      { key: 'batterDose', label: 'صب العجين', icon: 'droplet' },
      { key: 'miniPortion', label: 'الكمية', icon: 'cup' },
      { key: 'coffeeGram', label: 'بن', icon: 'scale' },
      { key: 'coffee', label: 'بن', icon: 'scale' },
      { key: 'extractionMl', label: 'استخلاص', icon: 'droplet' },
      { key: 'milk', label: 'حليب', icon: 'droplet' },
      { key: 'water', label: 'مياه', icon: 'droplet' },
      { key: 'condensedMilk', label: 'مكثف', icon: 'droplet' },
      { key: 'sauce', label: 'صوص', icon: 'droplet' },
      { key: 'syrup', label: 'سيرب', icon: 'droplet' },
      { key: 'powder', label: 'بودر', icon: 'scale' },
      { key: 'ice', label: 'ثلج', icon: 'snowflake' },
      { key: 'iceCream', label: 'آيس كريم', icon: 'snowflake' },
      { key: 'cream', label: 'كريمة', icon: 'droplet' },
      { key: 'puree', label: 'بيوريه', icon: 'droplet' },
      { key: 'crush', label: 'كراش', icon: 'droplet' },
      { key: 'chips', label: 'شيبس', icon: 'sparkles' },
      { key: 'starch', label: 'نشا', icon: 'scale' },
      { key: 'temp', label: 'حرارة', icon: 'thermometer' },
      { key: 'time', label: 'وقت', icon: 'timer' },
      { key: 'timer', label: 'مؤقت', icon: 'timer' },
      { key: 'ratio', label: 'ريشيو', icon: 'gauge' }
    ];

    let itemsHtml = '';
    fields.forEach(f => {
      const val = obj[f.key];
      if (val && val !== '-') {
        itemsHtml += `
          <div class="metric-item">
            <div class="metric-label">
              ${getIcon(f.icon)}
              <span>${f.label}</span>
            </div>
            <div class="metric-value">${val}</div>
          </div>
        `;
      }
    });

    return itemsHtml;
  }

  switchSize(itemId, sizeKey) {
    let targetItem = null;
    this.data.categories.forEach(cat => {
      const it = (cat.items || []).find(x => x.id === itemId);
      if (it) targetItem = it;
    });

    if (!targetItem || !targetItem.sizes || !targetItem.sizes[sizeKey]) return;

    const sizeData = targetItem.sizes[sizeKey];
    const metricsContainer = document.getElementById(`metrics-${itemId}`);
    if (metricsContainer) {
      metricsContainer.innerHTML = this.renderMetricsFromObject(sizeData);
    }

    const cupBadge = document.getElementById(`cup-${itemId}`);
    if (cupBadge && sizeData.cup) {
      cupBadge.innerHTML = `${getIcon('cup')} <span>${sizeData.cup}</span>`;
    }

    const card = document.getElementById(`card-${itemId}`);
    if (card) {
      const pills = card.querySelectorAll('.size-pill');
      pills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-size-key') === sizeKey);
      });
    }
  }

  switchSingleDouble(itemId, type) {
    let targetItem = null;
    this.data.categories.forEach(cat => {
      const it = (cat.items || []).find(x => x.id === itemId);
      if (it) targetItem = it;
    });

    if (!targetItem || !targetItem[type]) return;

    const dataObj = targetItem[type];
    const metricsContainer = document.getElementById(`metrics-${itemId}`);
    if (metricsContainer) {
      metricsContainer.innerHTML = this.renderMetricsFromObject(dataObj);
    }

    const cupBadge = document.getElementById(`cup-${itemId}`);
    if (cupBadge && dataObj.cup) {
      cupBadge.innerHTML = `${getIcon('cup')} <span>${dataObj.cup}</span>`;
    }

    const card = document.getElementById(`card-${itemId}`);
    if (card) {
      const pills = card.querySelectorAll('.size-pill');
      pills.forEach((p, idx) => {
        p.classList.toggle('active', (type === 'single' && idx === 0) || (type === 'double' && idx === 1));
      });
    }
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
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.activeCategory = btn.getAttribute('data-cat');
        this.renderContent();
      });
    }

    const rushBtn = document.getElementById('btn-rush-mode');
    if (rushBtn) {
      rushBtn.addEventListener('click', () => {
        this.rushMode = !this.rushMode;
        localStorage.setItem('emad_rush_mode', this.rushMode);
        this.applyRushMode(this.rushMode);
      });
    }
  }

  applyRushMode(enable) {
    const rushBtn = document.getElementById('btn-rush-mode');
    if (enable) {
      document.body.classList.add('rush-mode');
      if (rushBtn) {
        rushBtn.classList.add('active');
        rushBtn.innerHTML = `${getIcon('zap')} <span>وضع الضغط نشط</span>`;
      }
    } else {
      document.body.classList.remove('rush-mode');
      if (rushBtn) {
        rushBtn.classList.remove('active');
        rushBtn.innerHTML = `${getIcon('zap')} <span>وضع الضغط</span>`;
      }
    }
  }

  initChecklist() {
    const listContainer = document.getElementById('checklist-items');
    if (!listContainer || !this.data.cleaningChecklist) return;

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
      html += `
        <label class="checklist-item" id="chk-label-${idx}">
          <input type="checkbox" data-idx="${idx}" ${isChecked ? 'checked' : ''} onchange="window.app.toggleCheckItem(${idx})">
          <div style="flex:1;">
            <div class="checklist-text">${item.task}</div>
            <div class="checklist-freq">${getIcon('timer')} الموعد المعتمد: ${item.frequency}</div>
          </div>
        </label>
      `;
    });

    listContainer.innerHTML = html;
  }

  toggleCheckItem(idx) {
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
