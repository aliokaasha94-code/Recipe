// Emad Afandi Specialty Coffee Lab - Menu-Style Visual SOP Engine
class StationApp {
  constructor(stationDataUrl) {
    this.stationDataUrl = stationDataUrl;
    this.data = null;
    this.activeCategory = null;
    this.searchQuery = '';
    this.activeDetailItem = null;
    this.activeDetailSizeKey = null;

    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.stationDataUrl);
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

  renderHeader() {
    const station = this.data.station;
    const titleEl = document.getElementById('station-title');
    const descEl = document.getElementById('station-desc');
    const badgeEl = document.getElementById('station-badge');

    if (titleEl) titleEl.textContent = station.name;
    if (descEl) descEl.textContent = station.tagline;
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="lab-led pulse-gold"></span> ${station.englishName}`;
    }
  }

  renderCategories() {
    const filterContainer = document.getElementById('filter-tabs');
    if (!filterContainer || !this.data.categories) return;

    // Strict Rule: NO "الكل" (ALL) TAB! Every category has its own distinct pill
    let html = '';
    this.data.categories.forEach((cat, idx) => {
      const isActive = cat.id === this.activeCategory ? 'active' : '';
      const count = cat.items ? cat.items.length : 0;
      html += `
        <button class="menu-cat-pill ${isActive}" data-cat="${cat.id}">
          <span>${cat.name}</span>
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
    let targetCategories = [];

    if (query) {
      // If searching, search across all categories
      targetCategories = this.data.categories;
    } else {
      // Otherwise only show the single selected category
      targetCategories = this.data.categories.filter(c => c.id === this.activeCategory);
    }

    let html = '';
    let matchesFound = 0;

    targetCategories.forEach(cat => {
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
        <section class="menu-section" id="cat-${cat.id}">
          <div class="menu-section-header">
            <h2 class="menu-section-title">
              <span>${cat.name}</span>
            </h2>
            <span class="section-items-badge">${filteredItems.length} صنف</span>
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
          <div style="font-size:2.2rem; margin-bottom:10px; color:var(--gold-primary);">🔍</div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--gold-bright);">لم يتم العثور على أي صنف</div>
          <p style="font-size:0.85rem; margin-top:6px; color:var(--text-muted);">تأكد من كتابة الاسم بشكل صحيح أو اختر قسماً آخر من الأعلى</p>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  renderDrinkCard(item) {
    // Generate colored vector illustration for this drink
    const svgIllustration = typeof getDrinkSvg === 'function' ? getDrinkSvg(item) : '';
    
    // Clean Arabic Name and English Specialty Name
    let nameAr = item.name;
    let nameEn = item.name_en || '';
    const parenMatch = item.name.match(/\((.*?)\)/);
    if (parenMatch) {
      nameAr = item.name.replace(/\s*\(.*?\)\s*/g, '').trim();
      if (!nameEn) {
        nameEn = parenMatch[1].trim();
      }
    }
    if (!nameEn) {
      nameEn = item.id.replace(/-/g, ' ').toUpperCase();
    }

    // Clean concise size badge (never wraps awkwardly)
    let sizeBadge = '';
    if (item.sizes) {
      sizeBadge = `<span class="card-size-tag">8 / 12 / 16 oz</span>`;
    } else if (item.single && item.double) {
      sizeBadge = `<span class="card-size-tag">Single / Double</span>`;
    } else if (item.cup) {
      let shortCup = item.cup.split('/')[0].split('(')[0].trim();
      sizeBadge = `<span class="card-size-tag">${shortCup}</span>`;
    }

    return `
      <div class="drink-visual-card" onclick="window.app.openRecipeDetail('${item.id}')">
        <div class="drink-card-art-holder">
          ${svgIllustration}
          ${sizeBadge}
        </div>
        <div class="drink-card-body">
          <h3 class="drink-card-name">${nameAr}</h3>
          <div class="drink-card-en">${nameEn}</div>
        </div>
        <div class="drink-card-action">
          <span>الريسيبي وطريقة التشغيل</span>
          <span class="card-arrow">←</span>
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

    // Default size
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
            سنجل (Single)
          </button>
          <button class="detail-size-btn ${activeKey === 'double' ? 'active' : ''}" 
                  onclick="window.app.switchDetailSize('double')">
            دبل (Double)
          </button>
        </div>
      `;
    }

    // Recipe Metrics Grid
    const metricsHtml = this.renderMetricsFromObject(currentData);

    // SOP Steps
    let stepsHtml = '';
    if (item.steps && item.steps.length > 0) {
      stepsHtml = `
        <div class="detail-block">
          <h4 class="detail-block-title">
            <span>⏱️</span>
            <span>طريقة التشغيل خطوة بخطوة (SOP):</span>
          </h4>
          <ol class="detail-steps-list">
            ${item.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Pro Tip / Warning
    let tipHtml = '';
    if (item.proTip) {
      tipHtml = `
        <div class="detail-tip-box">
          <div class="tip-icon-gold">👑</div>
          <div class="tip-text">
            <strong>نصيحة التشغيل الذهبية:</strong>
            <p>${item.proTip}</p>
          </div>
        </div>
      `;
    }

    // Dedicated Zero-Waste Error Button
    let rescueHtml = '';
    if (item.rescue) {
      rescueHtml = `
        <div class="detail-rescue-section">
          <button class="btn-toggle-rescue" onclick="window.app.toggleRescuePanel()">
            <span>🚨</span>
            <span>الأخطاء المحتملة وكيفية علاجها فوراً (اضغط هنا)</span>
            <span class="rescue-arrow" id="rescue-arrow-icon">▼</span>
          </button>
          <div class="rescue-collapse-box" id="rescue-collapse-box" style="display:none;">
            <div class="rescue-card-problem">
              ⚠️ <strong>الخطأ الشائع:</strong> ${item.rescue.problem}
            </div>
            <div class="rescue-card-solution">
              💡 <strong>إجراء الإنقاذ السريع (بدون رمي الأوردر):</strong>
              <p>${item.rescue.solution}</p>
            </div>
          </div>
        </div>
      `;
    }

    // Clean title in modal
    let nameAr = item.name;
    let nameEn = item.name_en || '';
    const parenMatch = item.name.match(/\((.*?)\)/);
    if (parenMatch) {
      nameAr = item.name.replace(/\s*\(.*?\)\s*/g, '').trim();
      if (!nameEn) nameEn = parenMatch[1].trim();
    }

    content.innerHTML = `
      <div class="detail-sheet-header">
        <button class="detail-close-btn" onclick="window.app.closeRecipeDetail()">✕ إغلاق</button>
        <div class="detail-top-hero">
          <div class="detail-art-wrap">
            ${svgIllustration}
          </div>
          <h2 class="detail-drink-name">${nameAr}</h2>
          <div class="detail-drink-sub">${nameEn ? nameEn + (item.notes ? ' • ' + item.notes : '') : (item.notes || '')}</div>
        </div>
      </div>

      <div class="detail-sheet-body">
        ${sizeSwitchHtml}

        <div class="detail-block">
          <h4 class="detail-block-title">
            <span>📋</span>
            <span>المقادير والجرامات المعيارية:</span>
          </h4>
          <div class="detail-metrics-grid">
            ${metricsHtml}
          </div>
        </div>

        ${stepsHtml}
        ${tipHtml}
        ${rescueHtml}
      </div>
    `;
  }

  switchDetailSize(sizeKey) {
    this.activeDetailSizeKey = sizeKey;
    this.renderDetailModalContent();
  }

  toggleRescuePanel() {
    const box = document.getElementById('rescue-collapse-box');
    const arrow = document.getElementById('rescue-arrow-icon');
    if (!box) return;

    if (box.style.display === 'none') {
      box.style.display = 'block';
      if (arrow) arrow.textContent = '▲';
    } else {
      box.style.display = 'none';
      if (arrow) arrow.textContent = '▼';
    }
  }

  closeRecipeDetail() {
    const modal = document.getElementById('recipe-detail-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderMetricsFromObject(obj) {
    const fields = [
      { key: 'flour', label: 'دقيق' },
      { key: 'eggs', label: 'بيض' },
      { key: 'vanilla', label: 'فانيليا' },
      { key: 'sugar', label: 'سكر' },
      { key: 'butter', label: 'زبدة' },
      { key: 'oil', label: 'زيت' },
      { key: 'tang', label: 'تانج' },
      { key: 'bakingPowder', label: 'بيكنج بودر' },
      { key: 'yieldCount', label: 'الإنتاج' },
      { key: 'batterDose', label: 'صب العجين' },
      { key: 'miniPortion', label: 'الكمية' },
      { key: 'coffeeGram', label: 'وزن البن' },
      { key: 'coffee', label: 'وزن البن' },
      { key: 'extractionMl', label: 'الاستخلاص' },
      { key: 'milk', label: 'الحليب' },
      { key: 'water', label: 'الماء' },
      { key: 'condensedMilk', label: 'حليب مكثف' },
      { key: 'sauce', label: 'الصوص' },
      { key: 'sauceBatata', label: 'صوص بطاطا' },
      { key: 'sauceCaramel', label: 'صوص كراميل' },
      { key: 'syrup', label: 'السيرب' },
      { key: 'powder', label: 'البودر' },
      { key: 'ice', label: 'الثلج' },
      { key: 'iceCream', label: 'آيس كريم' },
      { key: 'cream', label: 'كريمة خفق' },
      { key: 'puree', label: 'بيوريه' },
      { key: 'crush', label: 'كراش' },
      { key: 'chips', label: 'شوكليت شيبس' },
      { key: 'starch', label: 'نشا' },
      { key: 'temp', label: 'الحرارة' },
      { key: 'time', label: 'الوقت' },
      { key: 'timer', label: 'المؤقت' },
      { key: 'ratio', label: 'الريشيو' },
      { key: 'cup', label: 'الكوب' }
    ];

    let itemsHtml = '';
    fields.forEach(f => {
      const val = obj[f.key];
      if (val && val !== '-') {
        itemsHtml += `
          <div class="recipe-metric-tile">
            <span class="metric-tile-label">${f.label}</span>
            <strong class="metric-tile-val">${val}</strong>
          </div>
        `;
      }
    });

    return itemsHtml;
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
            <div class="checklist-freq">الموعد المعتمد: ${item.frequency}</div>
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
