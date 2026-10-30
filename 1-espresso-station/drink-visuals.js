// Emad Afandi Specialty Coffee Lab - 3D Architectural Vector Visual System
// Inspired by Specialty Coffee Infographics & Studio Lighting

let _svgUidCounter = 0;
function getNextSvgId(prefix) {
  _svgUidCounter++;
  return `${prefix}_${_svgUidCounter}_${Math.random().toString(36).substring(2, 7)}`;
}

// ========================================================
// 1. 3D HOT TAKEAWAY CUP (Reference: "The Different Types of Coffee")
// ========================================================
function render3DHotCup(options) {
  const id = getNextSvgId('hot_cup');
  const layers = options.layers || [
    { pct: 35, col: '#2d1407', colLight: '#45200c', colDark: '#1e0c03' },
    { pct: 50, col: '#f7eee3', colLight: '#ffffff', colDark: '#ece1d2' },
    { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
  ];
  const topStyle = options.topStyle || 'foam'; // 'foam', 'cocoa', 'caramel', 'crema', 'flat'

  // Cutaway window coordinates
  const winTop = 36;
  const winBottom = 140;
  const totalH = winBottom - winTop;

  let currentBottom = winBottom;
  let layersHtml = '';

  layers.forEach((l, idx) => {
    const h = (l.pct / 100) * totalH;
    const currentTop = currentBottom - h;
    const gradId = `${id}_lay_${idx}`;

    layersHtml += `
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${l.colDark || l.col}" stop-opacity="0.95"/>
        <stop offset="35%" stop-color="${l.colLight || l.col}" stop-opacity="1"/>
        <stop offset="100%" stop-color="${l.colDark || l.col}" stop-opacity="0.92"/>
      </linearGradient>

      <!-- Liquid Layer with 3D Meniscus Curves -->
      <path d="M 23 ${currentTop} Q 60 ${currentTop + 3.8} 97 ${currentTop} L 97 ${currentBottom} Q 60 ${currentBottom + 3.8} 23 ${currentBottom} Z" fill="url(#${gradId})"/>
      <path d="M 24 ${currentTop} Q 60 ${currentTop + 3.8} 96 ${currentTop}" stroke="rgba(255,255,255,0.38)" stroke-width="0.8" fill="none"/>
    `;
    currentBottom = currentTop;
  });

  // Top surface decorations
  let decorHtml = '';
  if (topStyle === 'cocoa') {
    decorHtml = `
      <!-- Cocoa Powder Dusting -->
      <ellipse cx="60" cy="${currentBottom + 2}" rx="27" ry="4" fill="#3a1b0b" opacity="0.85"/>
      <circle cx="50" cy="${currentBottom + 2}" r="1.1" fill="#1c0902"/>
      <circle cx="63" cy="${currentBottom + 1.6}" r="1.3" fill="#1c0902"/>
      <circle cx="71" cy="${currentBottom + 2.6}" r="1" fill="#1c0902"/>
      <circle cx="43" cy="${currentBottom + 2.5}" r="0.9" fill="#1c0902"/>
      <circle cx="57" cy="${currentBottom + 2.8}" r="0.8" fill="#1c0902"/>
    `;
  } else if (topStyle === 'caramel') {
    decorHtml = `
      <!-- Caramel Criss-Cross Grid -->
      <path d="M 36 ${currentBottom + 2} Q 60 ${currentBottom - 1} 84 ${currentBottom + 2}" stroke="#d97706" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <path d="M 42 ${currentBottom + 4} Q 60 ${currentBottom + 1} 78 ${currentBottom + 4}" stroke="#b45309" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M 46 ${currentBottom} L 52 ${currentBottom + 5}" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
      <path d="M 62 ${currentBottom} L 68 ${currentBottom + 5}" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
      <path d="M 74 ${currentBottom} L 78 ${currentBottom + 4.5}" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
    `;
  } else if (topStyle === 'crema') {
    decorHtml = `
      <!-- Golden-Hazelnut Crema Surface -->
      <ellipse cx="60" cy="${currentBottom + 1.5}" rx="28" ry="4" fill="#d97706" opacity="0.95"/>
      <ellipse cx="60" cy="${currentBottom + 1.5}" rx="22" ry="3" fill="#b45309" opacity="0.7"/>
      <circle cx="52" cy="${currentBottom + 1.5}" r="1.3" fill="#f59e0b"/>
      <circle cx="68" cy="${currentBottom + 2}" r="1.1" fill="#f59e0b"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg">
      <defs>
        <!-- Soft Drop Shadow Filter -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>

        <!-- 3D Paper Cup Shell Gradient (White/Cream Studio Lighting) -->
        <linearGradient id="${id}_paper" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b0a89a"/>
          <stop offset="12%" stop-color="#ded8cc"/>
          <stop offset="28%" stop-color="#ffffff"/>
          <stop offset="68%" stop-color="#ede7db"/>
          <stop offset="88%" stop-color="#c4bcae"/>
          <stop offset="100%" stop-color="#999182"/>
        </linearGradient>

        <!-- 3D Mocha Takeaway Lid Gradients -->
        <linearGradient id="${id}_lid_cap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4a2e20"/>
          <stop offset="28%" stop-color="#734a35"/>
          <stop offset="55%" stop-color="#8e6047"/>
          <stop offset="85%" stop-color="#5a3726"/>
          <stop offset="100%" stop-color="#361f14"/>
        </linearGradient>

        <linearGradient id="${id}_lid_rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#382015"/>
          <stop offset="25%" stop-color="#69422f"/>
          <stop offset="50%" stop-color="#82553e"/>
          <stop offset="80%" stop-color="#4d2c1d"/>
          <stop offset="100%" stop-color="#28140a"/>
        </linearGradient>

        <!-- Cylindrical 3D Specular & Shading Overlay for Internal Liquid Volume -->
        <linearGradient id="${id}_cyl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.52)"/>
          <stop offset="16%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="32%" stop-color="rgba(255,255,255,0.24)"/>
          <stop offset="65%" stop-color="rgba(0,0,0,0.0)"/>
          <stop offset="88%" stop-color="rgba(0,0,0,0.32)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.6)"/>
        </linearGradient>

        <!-- Cutaway Window ClipPath -->
        <clipPath id="${id}_cutaway">
          <path d="M 23 35 Q 60 39 97 35 L 87 142 Q 60 146 33 142 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Floor Drop Shadow -->
      <ellipse cx="60" cy="153" rx="34" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Outer 3D Paper Cup Silhouette -->
      <path d="M 20 32 L 32 145 Q 33 148 37 148 L 83 148 Q 87 148 88 145 L 100 32 Z" fill="url(#${id}_paper)"/>
      
      <!-- Cup Bottom Rim Rolled Edge -->
      <path d="M 31 144 Q 60 148 89 144 L 88 148 Q 60 152 32 148 Z" fill="#8a8274"/>

      <!-- 3. Cutaway Window: Liquids & 3D Shading -->
      <g clip-path="url(#${id}_cutaway)">
        <!-- Dark interior cavity background -->
        <rect x="20" y="32" width="80" height="116" fill="#181310"/>

        <!-- Colored Liquid Strata -->
        ${layersHtml}
        ${decorHtml}

        <!-- 3D Cylindrical Light & Shadow Overlay -->
        <rect x="20" y="32" width="80" height="116" fill="url(#${id}_cyl)"/>

        <!-- Inner Bevel Shadows framing the cutaway -->
        <path d="M 23 35 L 33 142" stroke="rgba(0,0,0,0.45)" stroke-width="2"/>
        <path d="M 97 35 L 87 142" stroke="rgba(255,255,255,0.4)" stroke-width="1.6"/>
        <path d="M 23 35 Q 60 39 97 35" stroke="rgba(0,0,0,0.55)" stroke-width="2.2"/>
      </g>

      <!-- 4. Gold Accent Border around Cutaway -->
      <path d="M 23 35 Q 60 39 97 35 L 87 142 Q 60 146 33 142 Z" stroke="rgba(212,175,55,0.7)" stroke-width="1.1" fill="none"/>

      <!-- 5. 3D Takeaway Lid Drop Shadow onto Cup -->
      <path d="M 19 33 Q 60 38 101 33 L 100 38 Q 60 43 20 38 Z" fill="rgba(0,0,0,0.45)"/>

      <!-- 6. 3D Realistic Mocha Takeaway Lid -->
      <!-- Bottom Rim Flange that clips on cup -->
      <path d="M 16 28 L 19 33 Q 60 37 101 33 L 104 28 Q 60 32 16 28 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="28" rx="44" ry="4.5" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="27.5" rx="43.5" ry="4" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" fill="none"/>

      <!-- Lid Stepped Middle Neck -->
      <path d="M 26 21 L 28 27 Q 60 30 92 27 L 94 21 Q 60 24 26 21 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="21" rx="34" ry="3.5" fill="url(#${id}_lid_cap)"/>

      <!-- Lid Raised Crown with Spout -->
      <ellipse cx="60" cy="15" rx="27" ry="3.2" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="14.5" rx="26.5" ry="2.8" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>

      <!-- Drinking Notch with Inner Shadow -->
      <ellipse cx="40" cy="15" rx="5.2" ry="1.9" fill="#140a05" stroke="#734a35" stroke-width="0.8"/>
    </svg>
  `;
}

// ========================================================
// 2. 3D CLEAR ICED CUP (Reference: "Over Iced Coffee Menu")
// ========================================================
function render3DIcedCup(options) {
  const id = getNextSvgId('iced_cup');
  const layers = options.layers || [
    { pct: 26, col: '#fff8eb', colLight: '#ffffff', colDark: '#fde68a' },
    { pct: 40, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' },
    { pct: 34, col: '#241005', colLight: '#421f0b', colDark: '#170802' }
  ];
  const drizzleCol = options.drizzleCol || null;
  const isAffogato = options.isAffogato || false;

  const winTop = 32;
  const winBottom = 142;
  const totalH = winBottom - winTop;

  let currentBottom = winBottom;
  let layersHtml = '';

  layers.forEach((l, idx) => {
    const h = (l.pct / 100) * totalH;
    const currentTop = currentBottom - h;
    const gradId = `${id}_iced_lay_${idx}`;

    layersHtml += `
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${l.colDark || l.col}" stop-opacity="0.88"/>
        <stop offset="35%" stop-color="${l.colLight || l.col}" stop-opacity="0.98"/>
        <stop offset="100%" stop-color="${l.colDark || l.col}" stop-opacity="0.92"/>
      </linearGradient>

      <path d="M 22 ${currentTop} Q 60 ${currentTop + 4} 98 ${currentTop} L 98 ${currentBottom} Q 60 ${currentBottom + 4} 22 ${currentBottom} Z" fill="url(#${gradId})"/>
      <path d="M 23 ${currentTop} Q 60 ${currentTop + 4} 97 ${currentTop}" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>
    `;
    currentBottom = currentTop;
  });

  // Wall Drizzles
  let drizzleHtml = '';
  if (drizzleCol) {
    drizzleHtml = `
      <path d="M 32 40 Q 36 68 33 98 Q 30 115 32 130" stroke="${drizzleCol}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9"/>
      <path d="M 88 38 Q 82 65 86 102 Q 88 120 85 135" stroke="${drizzleCol}" stroke-width="3.2" stroke-linecap="round" fill="none" opacity="0.9"/>
      <path d="M 48 46 Q 52 74 49 106" stroke="${drizzleCol}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.8"/>
      <path d="M 72 44 Q 68 70 71 96" stroke="${drizzleCol}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
    `;
  }

  // Ice Cubes or Gelato
  let iceOrGelato = `
    <!-- 3D Glistening Crystal Ice Cubes -->
    <g opacity="0.95">
      <rect x="36" y="36" width="18" height="17" rx="3" transform="rotate(-12 45 44)" fill="rgba(235,248,255,0.55)" stroke="rgba(255,255,255,0.95)" stroke-width="1.2"/>
      <rect x="65" y="38" width="19" height="16" rx="3" transform="rotate(15 74 46)" fill="rgba(235,248,255,0.5)" stroke="rgba(255,255,255,0.9)" stroke-width="1.2"/>
      <rect x="46" y="60" width="18" height="16" rx="3" transform="rotate(8 55 68)" fill="rgba(235,248,255,0.4)" stroke="rgba(255,255,255,0.85)" stroke-width="1"/>
      <rect x="68" y="66" width="16" height="15" rx="3" transform="rotate(-10 76 73)" fill="rgba(235,248,255,0.38)" stroke="rgba(255,255,255,0.8)" stroke-width="1"/>
    </g>
  `;

  if (isAffogato) {
    iceOrGelato = `
      <!-- Big Scoop of Vanilla Gelato -->
      <circle cx="60" cy="72" r="24" fill="#fffef0" stroke="#f3ecd8" stroke-width="1"/>
      <ellipse cx="60" cy="88" rx="20" ry="7" fill="#fff5cc"/>
      <!-- Espresso Pour Drizzle over Scoop -->
      <path d="M 52 50 Q 56 65 54 82" stroke="#251006" stroke-width="3" stroke-linecap="round"/>
      <path d="M 66 52 Q 68 68 64 86" stroke="#251006" stroke-width="2.5" stroke-linecap="round"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>

        <!-- Transparent Clear PET Plastic Cylindrical Gradient -->
        <linearGradient id="${id}_glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.45)"/>
          <stop offset="12%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="35%" stop-color="rgba(255,255,255,0.35)"/>
          <stop offset="65%" stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="90%" stop-color="rgba(255,255,255,0.2)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.5)"/>
        </linearGradient>

        <clipPath id="${id}_iced_clip">
          <path d="M 22 28 L 33 144 Q 34 147 38 147 L 82 147 Q 86 147 87 144 L 98 28 Z"/>
        </clipPath>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="60" cy="153" rx="34" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Liquid Contents Clipped -->
      <g clip-path="url(#${id}_iced_clip)">
        <rect x="20" y="26" width="80" height="124" fill="#14110f"/>
        ${layersHtml}
        ${drizzleHtml}
        ${iceOrGelato}
        <rect x="20" y="26" width="80" height="124" fill="url(#${id}_glass)"/>
      </g>

      <!-- Outer Clear PET Cup Shell Outline with Gold Accent -->
      <path d="M 22 28 L 33 144 Q 34 147 38 147 L 82 147 Q 86 147 87 144 L 98 28 Z" fill="none" stroke="#d4af37" stroke-width="1.2"/>

      <!-- Specular Highlights on Curved Cup Wall -->
      <path d="M 27 34 L 36 140" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 31 36 L 39 138" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" stroke-linecap="round"/>

      <!-- Clear Rolled Rim -->
      <rect x="18" y="25" width="84" height="4.5" rx="2" fill="rgba(255,255,255,0.65)" stroke="#d4af37" stroke-width="0.9"/>

      <!-- Clear Flat Lid with Straw Hole -->
      <path d="M 16 26 L 20 18 Q 60 15 100 18 L 104 26 Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="1"/>

      <!-- Barista Gold Straw -->
      <line x1="59" y1="5" x2="64" y2="34" stroke="#d4af37" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="60" y1="5" x2="64.5" y2="34" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  `;
}

// ========================================================
// 3. 4oz GIBRALTAR SPECIALTY GLASS (Cortado, Piccolo, Café Bombón)
// ========================================================
function render3DGibraltarGlass(options) {
  const id = getNextSvgId('gibraltar');
  const espressoPct = options.espressoPct || 50;
  const isBombon = options.isBombon || false;

  // Total usable glass height: y=48 to y=130 (82px)
  const glassTop = 48;
  const glassBottom = 130;
  const totalH = glassBottom - glassTop;
  const espressoH = (espressoPct / 100) * totalH;
  const midY = glassBottom - espressoH;

  const bottomColor = isBombon ? '#fff4cc' : '#291206'; // Condensed milk if Bombón, else Espresso
  const topColor = isBombon ? '#291206' : '#fcf6ec';    // Espresso if Bombón, else Steamed Milk
  const dividerStroke = isBombon ? '#d97706' : '#c2680f';

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
        <clipPath id="${id}_glass_clip">
          <path d="M 24 44 L 34 130 Q 36 142 44 142 L 76 142 Q 84 142 86 130 L 96 44 Z"/>
        </clipPath>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="60" cy="148" rx="28" ry="4.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Clipped Liquids -->
      <g clip-path="url(#${id}_glass_clip)">
        <!-- Bottom Layer (Espresso or Condensed Milk) -->
        <path d="M 30 ${midY} Q 60 ${midY + 4} 90 ${midY} L 86 130 Q 60 134 34 130 Z" fill="${bottomColor}"/>
        <!-- Boundary Crema Line -->
        <path d="M 30 ${midY} Q 60 ${midY + 4} 90 ${midY}" stroke="${dividerStroke}" stroke-width="2.5"/>

        <!-- Top Layer (Steamed Milk or Espresso) -->
        <path d="M 24 48 Q 60 52 96 48 L 90 ${midY} Q 60 ${midY + 4} 30 ${midY} Z" fill="${topColor}"/>
        <!-- Surface Meniscus -->
        <ellipse cx="60" cy="48" rx="36" ry="4.5" fill="${isBombon ? '#45200c' : '#ffffff'}" stroke="#f3ece0" stroke-width="0.8"/>

        <!-- Heavy Solid Glass Base -->
        <rect x="30" y="130" width="60" height="15" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" stroke-width="0.9"/>
      </g>

      <!-- Faceted Outer Glass Silhouette -->
      <path d="M 24 44 L 34 130 Q 36 142 44 142 L 76 142 Q 84 142 86 130 L 96 44 Z" fill="none" stroke="#d4af37" stroke-width="1.3"/>

      <!-- Vertical Bevel Facet Glare Lines -->
      <line x1="38" y1="48" x2="44" y2="130" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
      <line x1="52" y1="48" x2="54" y2="130" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <line x1="68" y1="48" x2="66" y2="130" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <line x1="82" y1="48" x2="76" y2="130" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>

      <!-- Polished Glass Rim -->
      <ellipse cx="60" cy="44" rx="36" ry="4.5" fill="none" stroke="#d4af37" stroke-width="1.2"/>
    </svg>
  `;
}

// ========================================================
// 4. ESPRESSO CON PANNA (3D Whipped Cream Rosette Swirl)
// ========================================================
function render3DConPanna() {
  const id = getNextSvgId('con_panna');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
        <clipPath id="${id}_panna_clip">
          <path d="M 24 50 L 34 134 Q 36 142 44 142 L 76 142 Q 84 142 86 134 L 96 50 Z"/>
        </clipPath>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="60" cy="148" rx="28" ry="4.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Clipped Espresso Cup -->
      <g clip-path="url(#${id}_panna_clip)">
        <!-- Rich Dark Espresso -->
        <rect x="20" y="70" width="80" height="72" fill="#240f04"/>
        <path d="M 28 70 Q 60 74 92 70" stroke="#b45309" stroke-width="2.5"/>
        <rect x="30" y="132" width="60" height="12" fill="rgba(255,255,255,0.18)"/>
      </g>

      <!-- Glass Shell -->
      <path d="M 24 50 L 34 134 Q 36 142 44 142 L 76 142 Q 84 142 86 134 L 96 50 Z" fill="none" stroke="#d4af37" stroke-width="1.3"/>
      <ellipse cx="60" cy="50" rx="36" ry="4.5" fill="none" stroke="#d4af37" stroke-width="1.2"/>

      <!-- Tall Whipped Cream Rosette Swirl (Peak on Top) -->
      <path d="M 32 50 C 32 25 50 16 60 16 C 70 16 88 25 88 50 Z" fill="#ffffff"/>
      <path d="M 40 48 C 44 32 54 22 60 22 C 66 22 76 32 80 48" stroke="#f1ece5" stroke-width="3" fill="none"/>
      <path d="M 58 12 C 59 7 61 7 62 12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <!-- Cocoa Ganache Drizzle -->
      <path d="M 38 40 Q 60 30 82 40" stroke="#261005" stroke-width="2" stroke-linecap="round"/>
      <path d="M 44 46 Q 60 38 76 46" stroke="#261005" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}

// ========================================================
// 5. FILTER COFFEE & MANUAL BREW (Chemex & V60)
// ========================================================
function render3DFilterBrew(type) {
  const id = getNextSvgId('filter');

  if (type === 'chemex') {
    return `
      <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg">
        <defs>
          <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5"/>
          </filter>
          <clipPath id="${id}_chemex_clip">
            <path d="M 34 22 L 54 75 L 26 140 Q 28 148 40 148 L 80 148 Q 92 148 94 140 L 66 75 L 86 22 Z"/>
          </clipPath>
        </defs>

        <ellipse cx="60" cy="152" rx="32" ry="5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

        <!-- Chemex Body & Brew -->
        <g clip-path="url(#${id}_chemex_clip)">
          <!-- Glowing Clear Amber Filter Coffee in Bottom Flask (y=90 to y=148) -->
          <rect x="20" y="85" width="80" height="65" fill="#4d220b"/>
          <path d="M 28 85 Q 60 90 92 85" stroke="#d97706" stroke-width="2"/>
          <ellipse cx="60" cy="85" rx="32" ry="4" fill="#a1490d"/>
        </g>

        <!-- Hourglass Chemex Glass Silhouette -->
        <path d="M 34 22 L 54 75 L 26 140 Q 28 148 40 148 L 80 148 Q 92 148 94 140 L 66 75 L 86 22 Z" fill="none" stroke="#d4af37" stroke-width="1.4"/>
        <ellipse cx="60" cy="22" rx="26" ry="3.5" fill="none" stroke="#d4af37" stroke-width="1.2"/>

        <!-- Iconic Wood Collar & Leather Tie around Neck -->
        <rect x="51" y="68" width="18" height="15" rx="2" fill="#854d0e" stroke="#ca8a04" stroke-width="1"/>
        <circle cx="60" cy="75" r="2.5" fill="#ca8a04"/>
        <line x1="60" y1="77" x2="60" y2="88" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>

        <!-- Glass Highlights -->
        <path d="M 32 105 Q 30 135 40 142" stroke="rgba(255,255,255,0.55)" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
  }

  // Hario V60 / Drip Server
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
        <clipPath id="${id}_v60_clip">
          <path d="M 32 78 L 30 140 Q 32 146 40 146 L 80 146 Q 88 146 90 140 L 88 78 Z"/>
        </clipPath>
      </defs>

      <ellipse cx="60" cy="151" rx="32" ry="5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Server Carafe with Amber Coffee -->
      <g clip-path="url(#${id}_v60_clip)">
        <rect x="25" y="90" width="70" height="60" fill="#4a1f07"/>
        <path d="M 30 90 Q 60 94 90 90" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="60" cy="90" rx="28" ry="3.5" fill="#a1490d"/>
      </g>

      <!-- Glass Carafe Body -->
      <path d="M 32 78 L 30 140 Q 32 146 40 146 L 80 146 Q 88 146 90 140 L 88 78 Z" fill="none" stroke="#d4af37" stroke-width="1.3"/>
      <!-- Black Ergonomic Handle -->
      <path d="M 90 85 C 108 85 108 130 89 135" fill="none" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 90 85 C 108 85 108 130 89 135" fill="none" stroke="#d4af37" stroke-width="1.2" stroke-linecap="round"/>

      <!-- Hario V60 Ceramic Dripper Cone on Top -->
      <path d="M 28 32 L 48 76 L 72 76 L 92 32 Z" fill="#141720" stroke="#d4af37" stroke-width="1.4"/>
      <ellipse cx="60" cy="32" rx="32" ry="4.5" fill="#0d0f14" stroke="#d4af37" stroke-width="1.2"/>

      <!-- V60 White Spiral Ribs & Filter Paper -->
      <path d="M 32 32 L 52 74" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
      <path d="M 88 32 L 68 74" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
    </svg>
  `;
}

// ========================================================
// MASTER ENTRY POINT: GET DRINK SVG FOR ESPRESSO STATION
// ========================================================
function getDrinkSvg(item) {
  if (!item) return '';
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  // 1. CORTADO & PICCOLO (4oz Gibraltar Glass)
  if (id === 'cortado' || name.includes('كورتادو')) {
    return render3DGibraltarGlass({ espressoPct: 50 });
  }
  if (id === 'piccolo' || name.includes('بيكلو')) {
    return render3DGibraltarGlass({ espressoPct: 35 });
  }

  // 2. CAFÉ BOMBÓN (4oz Layered Glass with Condensed Milk Base)
  if (id === 'cafe-bombon' || name.includes('بونبون')) {
    return render3DGibraltarGlass({ espressoPct: 50, isBombon: true });
  }

  // 3. ESPRESSO AFFOGATO (Gelato Scoop + Espresso Float)
  if (id === 'affogato' || name.includes('أفوجاتو') || name.includes('افوجاتو')) {
    return render3DIcedCup({
      layers: [
        { pct: 30, col: '#241005', colLight: '#441f0b', colDark: '#170802' },
        { pct: 70, col: '#fffef0', colLight: '#ffffff', colDark: '#f7f0dc' }
      ],
      isAffogato: true
    });
  }

  // 4. ESPRESSO CON PANNA (Whipped Cream Peak)
  if (id === 'espresso-con-panna' || name.includes('كون بانا')) {
    return render3DConPanna();
  }

  // 5. FILTER & MANUAL BREW (Chemex, V60, Cold Brew)
  if (id === 'chemex' || name.includes('كيمكس')) {
    return render3DFilterBrew('chemex');
  }
  if (id.includes('v60') || name.includes('v60') || id.includes('filter')) {
    return render3DFilterBrew('v60');
  }
  if (id.includes('cold-brew') || name.includes('كولد برو')) {
    return render3DIcedCup({
      layers: [
        { pct: 85, col: '#3b1807', colLight: '#59290f', colDark: '#240e03' },
        { pct: 15, col: '#854212', colLight: '#b45309', colDark: '#5c2b08' }
      ],
      drizzleCol: null
    });
  }

  // 6. ICED DRINKS (Clear PET 3D Cup with Floating Ice & Drizzles)
  if (id.includes('iced') || id.includes('ice') || name.includes('آيس') || name.includes('ايس')) {
    if (id.includes('spanish') || name.includes('سبانيش')) {
      return render3DIcedCup({
        layers: [
          { pct: 26, col: '#fff8eb', colLight: '#ffffff', colDark: '#fde68a' }, // Condensed milk
          { pct: 40, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Cold milk
          { pct: 34, col: '#241005', colLight: '#421f0b', colDark: '#170802' }  // Espresso float
        ],
        drizzleCol: '#b45309'
      });
    }
    if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
      return render3DIcedCup({
        layers: [
          { pct: 28, col: '#4d7c0f', colLight: '#65a30d', colDark: '#3f6212' }, // Pistachio cream
          { pct: 38, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Cold milk
          { pct: 34, col: '#261105', colLight: '#441f0b', colDark: '#180802' }  // Espresso
        ],
        drizzleCol: '#3f6212'
      });
    }
    if (id.includes('white-mocha') || name.includes('وايت موكا')) {
      return render3DIcedCup({
        layers: [
          { pct: 25, col: '#fefce8', colLight: '#ffffff', colDark: '#fef08a' }, // White chocolate
          { pct: 42, col: '#f5ebe0', colLight: '#ffffff', colDark: '#ede1d2' }, // Cold milk
          { pct: 33, col: '#281206', colLight: '#46200c', colDark: '#1a0a03' }  // Espresso
        ],
        drizzleCol: '#ca8a04'
      });
    }
    if (id.includes('caramel') || name.includes('كراميل')) {
      return render3DIcedCup({
        layers: [
          { pct: 46, col: '#fcf8f0', colLight: '#ffffff', colDark: '#f4ece0' }, // Vanilla milk
          { pct: 40, col: '#291206', colLight: '#47220e', colDark: '#1a0902' }, // Espresso
          { pct: 14, col: '#b45309', colLight: '#d97706', colDark: '#92400e' }  // Caramel
        ],
        drizzleCol: '#b45309'
      });
    }
    if (id.includes('mocha') || name.includes('موكا')) {
      return render3DIcedCup({
        layers: [
          { pct: 28, col: '#220d04', colLight: '#3a1708', colDark: '#140601' }, // Dark chocolate
          { pct: 40, col: '#5c351f', colLight: '#78462b', colDark: '#442514' }, // Chocolate milk
          { pct: 32, col: '#231005', colLight: '#411e0a', colDark: '#160902' }  // Espresso
        ],
        drizzleCol: '#1c0902'
      });
    }
    if (id.includes('americano') || name.includes('أمريكانو')) {
      return render3DIcedCup({
        layers: [
          { pct: 60, col: '#1e293b', colLight: '#334155', colDark: '#0f172a' }, // Cold water
          { pct: 40, col: '#261105', colLight: '#441f0b', colDark: '#180802' }  // Espresso float
        ]
      });
    }
    if (id === 'iced-espresso' || name.includes('إسبريسو آيس')) {
      return render3DIcedCup({
        layers: [
          { pct: 70, col: '#1e0c03', colLight: '#361808', colDark: '#140701' },
          { pct: 30, col: '#b45309', colLight: '#d97706', colDark: '#853e06' }
        ]
      });
    }
    // Default Iced Latte
    return render3DIcedCup({
      layers: [
        { pct: 60, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' },
        { pct: 40, col: '#281206', colLight: '#47220e', colDark: '#190a03' }
      ]
    });
  }

  // 7. HOT COFFEE DRINKS (3D Craft Takeaway Cup with Cutaway)
  if (id === 'espresso-single' || id === 'espresso-macchiato' || id.includes('espresso')) {
    if (id.includes('macchiato')) {
      return render3DHotCup({
        layers: [
          { pct: 75, col: '#281206', colLight: '#45200c', colDark: '#1b0a03' },
          { pct: 25, col: '#ffffff', colLight: '#ffffff', colDark: '#f2eae0' }
        ],
        topStyle: 'foam'
      });
    }
    // Single / Double Espresso in Cutaway Cup
    return render3DHotCup({
      layers: [
        { pct: 45, col: '#251206', colLight: '#421f0b', colDark: '#180a03' },
        { pct: 20, col: '#ba782b', colLight: '#d98e32', colDark: '#945b1c' }, // Crema
        { pct: 35, col: '#181310', colLight: '#26201b', colDark: '#100c0a' }  // Empty upper cup
      ],
      topStyle: 'crema'
    });
  }

  if (id.includes('americano') || name.includes('أمريكانو')) {
    return render3DHotCup({
      layers: [
        { pct: 30, col: '#240f04', colLight: '#3d1b09', colDark: '#180802' },
        { pct: 70, col: '#8dc5dd', colLight: '#b4def0', colDark: '#6dafcb' } // Soft cyan alpine water
      ],
      topStyle: 'crema'
    });
  }

  if (id.includes('cappuccino') || name.includes('كابتشينو')) {
    return render3DHotCup({
      layers: [
        { pct: 33, col: '#2d1407', colLight: '#45200c', colDark: '#1e0c03' },
        { pct: 33, col: '#f7eee3', colLight: '#ffffff', colDark: '#ece1d2' },
        { pct: 34, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
      ],
      topStyle: 'cocoa'
    });
  }

  if (id.includes('flat-white') || name.includes('فلات وايت')) {
    return render3DHotCup({
      layers: [
        { pct: 50, col: '#2a1206', colLight: '#421e0b', colDark: '#1c0a03' },
        { pct: 45, col: '#f7eee3', colLight: '#ffffff', colDark: '#ece1d2' },
        { pct: 5, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
      ],
      topStyle: 'flat'
    });
  }

  if (id.includes('spanish') || name.includes('سبانيش')) {
    return render3DHotCup({
      layers: [
        { pct: 25, col: '#fef3c7', colLight: '#fffbeb', colDark: '#fde68a' }, // Condensed milk
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Foam
      ],
      topStyle: 'foam'
    });
  }

  if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    return render3DHotCup({
      layers: [
        { pct: 25, col: '#4d7c0f', colLight: '#65a30d', colDark: '#3f6212' }, // Pistachio
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Foam
      ],
      topStyle: 'foam'
    });
  }

  if (id.includes('white-mocha') || name.includes('وايت موكا')) {
    return render3DHotCup({
      layers: [
        { pct: 25, col: '#fefce8', colLight: '#ffffff', colDark: '#fef08a' }, // White chocolate
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Foam
      ],
      topStyle: 'foam'
    });
  }

  if (id.includes('caramel') || name.includes('كراميل')) {
    return render3DHotCup({
      layers: [
        { pct: 45, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Vanilla steamed milk
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso mark
        { pct: 20, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Foam + caramel grid
      ],
      topStyle: 'caramel'
    });
  }

  if (id.includes('mocha') || name.includes('موكا')) {
    return render3DHotCup({
      layers: [
        { pct: 25, col: '#220d04', colLight: '#3a1708', colDark: '#140601' }, // Dark chocolate
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Foam
      ],
      topStyle: 'foam'
    });
  }

  // Default Caffe Latte
  return render3DHotCup({
    layers: [
      { pct: 35, col: '#2d1407', colLight: '#45200c', colDark: '#1e0c03' },
      { pct: 50, col: '#f7eee3', colLight: '#ffffff', colDark: '#ece1d2' },
      { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
    ],
    topStyle: 'foam'
  });
}

// ========================================================
// 3-STEP OPERATION SEQUENCE TEASER
// ========================================================
function getDrinkSequence(item) {
  if (!item) return [];
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  if (id.includes('latte') && !id.includes('spanish') && !id.includes('pistachio')) {
    return ['1. استخلاص إسبريسو', '2. تبخير حليب 65°C', '3. صب مع فوم ناعم'];
  }
  if (id.includes('spanish') || name.includes('سبانيش')) {
    return ['1. حليب مكثف بالقاع', '2. دبل إسبريسو', '3. حليب مبخر أو بارد'];
  }
  if (id.includes('pistachio') || name.includes('بيستاشيو')) {
    return ['1. صوص بيستاشيو بالكوب', '2. دبل إسبريسو', '3. حليب + فستق'];
  }
  if (id.includes('cappuccino') || name.includes('كابتشينو')) {
    return ['1. إسبريسو سنجل/دبل', '2. حليب مبخر 1/3', '3. فوم كثيف + كاكاو'];
  }
  if (id.includes('flat-white') || name.includes('فلات وايت')) {
    return ['1. دبل ريستريتو', '2. حليب ميكروتيكستشر', '3. صب فلات متجانس'];
  }
  if (id.includes('cortado') || name.includes('كورتادو')) {
    return ['1. دبل إسبريسو 50%', '2. حليب دافئ 50%', '3. كاس جبل طارق'];
  }
  if (id.includes('piccolo') || name.includes('بيكلو')) {
    return ['1. ريستريتو 1/3', '2. حليب دافئ 2/3', '3. كاس 4oz مضلع'];
  }
  if (id.includes('americano') || name.includes('أمريكانو')) {
    return ['1. ماء ساخن/بارد أولاً', '2. دبل إسبريسو فوق الماء', '3. حفظ الكريما'];
  }
  if (id.includes('caramel') || name.includes('كراميل')) {
    return ['1. حليب فانيليا بالكوب', '2. إسبريسو مارك', '3. شبكة كراميل بالقمة'];
  }
  if (id.includes('mocha') || name.includes('موكا')) {
    return ['1. صوص شوكولاتة بالقاع', '2. إسبريسو ساخن ودمج', '3. حليب مبخر/بارد'];
  }
  if (id === 'espresso-single' || id === 'espresso-doppio') {
    return ['1. وزن 18-20g بن', '2. كبس متزن 15kg', '3. استخلاص 25-30 ثانية'];
  }
  if (id === 'affogato' || name.includes('أفوجاتو')) {
    return ['1. بولة جيلاتو فانيليا', '2. استخلاص دبل إسبريسو', '3. صب حار فوق الآيس'];
  }
  if (id === 'cafe-bombon') {
    return ['1. حليب مكثف 50% بالقاع', '2. استخلاص هادئ للبن', '3. طبقتين منفصلتين'];
  }
  if (id.includes('chemex')) {
    return ['1. ترطيب فلتر كيمكس', '2. صب حلزوني 300ml', '3. تصفية ونقاء'];
  }
  if (id.includes('v60')) {
    return ['1. طحنة وسط 18g', '2. ترطيب 45 ثانية', '3. صب ثلاثي هادئ'];
  }
  if (id.includes('cold-brew')) {
    return ['1. نقع 16 ساعة مبرد', '2. تصفية حريرية مزدوجة', '3. تقديم على صخرة ثلج'];
  }

  return ['1. تجهيز المعايير والمقادير', '2. الاستخلاص الفوري', '3. التقديم السريع'];
}
