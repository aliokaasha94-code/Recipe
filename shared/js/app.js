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
      { key: 'sugar', label: 'سكر', icon: 'scale' },
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
