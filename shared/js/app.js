// Emad Afandi SOP & Recipe Engine
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
        container.innerHTML = `<div style="text-align:center; padding:40px; color:#f87171;">حدث خطأ أثناء تحميل بيانات الوصفات: ${err.message}</div>`;
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
    if (badgeEl) badgeEl.textContent = station.englishName;
    if (metaEl && station.targetStandard) {
      metaEl.textContent = station.targetStandard;
      metaEl.style.display = 'inline-block';
    }
  }

  renderCategories() {
    const filterContainer = document.getElementById('filter-tabs');
    if (!filterContainer) return;

    let html = `<button class="filter-btn active" data-cat="all">⭐ الكل (${this.getTotalItems()})</button>`;

    this.data.categories.forEach(cat => {
      const count = cat.items ? cat.items.length : 0;
      html += `<button class="filter-btn" data-cat="${cat.id}">${cat.name} (${count})</button>`;
    });

    filterContainer.innerHTML = html;
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
              <span>☕</span> ${cat.name}
            </h2>
            <span class="badge-num" style="font-size:0.8rem; color:var(--gold-soft);">${filteredItems.length} صنف</span>
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
          <div style="font-size:2.5rem; margin-bottom:10px;">🔍</div>
          <div style="font-size:1.1rem; font-weight:700; color:var(--gold-bright);">لم يتم العثور على مشروب بهذا الاسم</div>
          <p style="font-size:0.85rem; margin-top:6px;">جرب البحث بكلمة أخرى أو تصفح الأقسام الكاملة بالأعلى</p>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  renderRecipeCard(item) {
    // Check if item has multiple sizes
    const hasSizes = !!item.sizes;
    const hasSingleDouble = !!(item.single && item.double);
    const hasVariants = !!(item.variants && item.variants.length > 0);

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

    // Steps
    let stepsHtml = '';
    if (item.steps && item.steps.length > 0) {
      stepsHtml = `
        <div class="recipe-steps">
          <div class="steps-title"><span>⏱️</span> خطوات التشغيل (SOP):</div>
          <ol class="steps-list">
            ${item.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Zero-Waste Rescue
    let rescueHtml = '';
    if (item.rescue) {
      rescueHtml = `
        <div class="rescue-box">
          <div class="rescue-header">
            <span>🚨</span>
            <span>عيادة إنقاذ الأوردر (Zero Waste):</span>
          </div>
          <div class="rescue-problem">⚠️ <strong>المشكلة:</strong> ${item.rescue.problem}</div>
          <div class="rescue-solution">💡 <strong>الحل الفوري:</strong> ${item.rescue.solution}</div>
        </div>
      `;
    }

    // Pro Tip
    let tipHtml = '';
    if (item.proTip) {
      tipHtml = `
        <div class="recipe-pro-tip">
          <span>👑</span>
          <div><strong>سر عماد أفندي:</strong> ${item.proTip}</div>
        </div>
      `;
    }

    // Cup badge
    const cupText = item.cup || (item.sizes && item.sizes.small ? item.sizes.small.cup : (item.single ? item.single.cup : ''));

    return `
      <div class="recipe-card" id="card-${item.id}">
        <div class="card-top">
          <h3 class="recipe-name">${item.name}</h3>
          ${cupText ? `<span class="recipe-cup" id="cup-${item.id}">${cupText}</span>` : ''}
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
      { key: 'coffeeGram', label: 'بن' },
      { key: 'coffee', label: 'بن' },
      { key: 'extractionMl', label: 'استخلاص' },
      { key: 'milk', label: 'حليب' },
      { key: 'water', label: 'مياه' },
      { key: 'condensedMilk', label: 'مكثف' },
      { key: 'sauce', label: 'صوص' },
      { key: 'syrup', label: 'سيرب' },
      { key: 'powder', label: 'بودر' },
      { key: 'ice', label: 'ثلج' },
      { key: 'iceCream', label: 'آيس كريم' },
      { key: 'cream', label: 'كريمة' },
      { key: 'puree', label: 'بيوريه' },
      { key: 'crush', label: 'كراش' },
      { key: 'sugar', label: 'سكر' },
      { key: 'chips', label: 'شيبس' },
      { key: 'starch', label: 'نشا' },
      { key: 'temp', label: 'حرارة' },
      { key: 'time', label: 'وقت' },
      { key: 'timer', label: 'مؤقت' },
      { key: 'ratio', label: 'ريشيو' }
    ];

    let itemsHtml = '';
    fields.forEach(f => {
      const val = obj[f.key];
      if (val && val !== '-') {
        itemsHtml += `
          <div class="metric-item">
            <div class="metric-label">${f.label}</div>
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
      cupBadge.textContent = sizeData.cup;
    }

    // Update active pill
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
      cupBadge.textContent = dataObj.cup;
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
    // Search input
    const searchInput = document.getElementById('search-box');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderContent();
      });
    }

    // Category filter clicks
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

    // Rush hour button
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
        rushBtn.innerHTML = '⚡ وضع الضغط نشط';
      }
    } else {
      document.body.classList.remove('rush-mode');
      if (rushBtn) {
        rushBtn.classList.remove('active');
        rushBtn.innerHTML = '⚡ وضع الضغط';
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
            <div class="checklist-freq">📌 الموعد: ${item.frequency}</div>
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
