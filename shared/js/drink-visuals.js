// Emad Afandi Specialty Coffee Lab - 3D Architectural Vector Visual System
// Inspired directly by Specialty Coffee Infographics & Takeaway Studio References
// Pure High-Craft SVG with 3D Cylindrical Shading, Cutaway Stratification & Realistic Physics

let _svgUidCounter = 0;
function getNextSvgId(prefix) {
  _svgUidCounter++;
  return `${prefix}_${_svgUidCounter}_${Math.random().toString(36).substring(2, 7)}`;
}

// ========================================================
// 1. 3D HOT TAKEAWAY PAPER CUP (Reference: "The Different Types of Coffee")
// ========================================================
function render3DHotCup(options) {
  const id = getNextSvgId('hot_cup');
  const layers = options.layers || [
    { pct: 35, col: '#2a1206', colLight: '#46200c', colDark: '#1a0902' },
    { pct: 50, col: '#faf5ee', colLight: '#ffffff', colDark: '#ebe2d5' },
    { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
  ];
  const topStyle = options.topStyle || 'foam'; // 'foam', 'cocoa', 'caramel', 'crema', 'flat', 'pistachio'
  const isAmericano = options.isAmericano || false;

  // Cutaway window coordinates (leaving solid white paper borders on sides)
  const winTop = 38;
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
        <stop offset="25%" stop-color="${l.colLight || l.col}" stop-opacity="1"/>
        <stop offset="70%" stop-color="${l.col || l.colLight}" stop-opacity="0.98"/>
        <stop offset="100%" stop-color="${l.colDark || l.col}" stop-opacity="0.90"/>
      </linearGradient>

      <!-- 3D Liquid Layer with Meniscus Arc -->
      <path d="M 28 ${currentTop} Q 60 ${currentTop + 3.8} 92 ${currentTop} L 92 ${currentBottom} Q 60 ${currentBottom + 3.8} 28 ${currentBottom} Z" fill="url(#${gradId})"/>
      <path d="M 28 ${currentTop} Q 60 ${currentTop + 3.8} 92 ${currentTop}" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>
    `;
    currentBottom = currentTop;
  });

  // Top surface decorations
  let decorHtml = '';
  if (topStyle === 'cocoa') {
    decorHtml = `
      <!-- Roasted Dark Cocoa Powder Dusting -->
      <ellipse cx="60" cy="${currentBottom + 2}" rx="26" ry="3.5" fill="#2d1307" opacity="0.85"/>
      <circle cx="50" cy="${currentBottom + 2}" r="1.1" fill="#170903"/>
      <circle cx="63" cy="${currentBottom + 1.6}" r="1.3" fill="#170903"/>
      <circle cx="71" cy="${currentBottom + 2.5}" r="1.0" fill="#170903"/>
      <circle cx="44" cy="${currentBottom + 2.4}" r="0.8" fill="#170903"/>
      <circle cx="57" cy="${currentBottom + 2.7}" r="0.9" fill="#170903"/>
      <circle cx="67" cy="${currentBottom + 1.8}" r="0.7" fill="#170903"/>
    `;
  } else if (topStyle === 'caramel') {
    decorHtml = `
      <!-- Golden Caramel Grid Lattice -->
      <path d="M 38 ${currentBottom + 2} Q 60 ${currentBottom - 1} 82 ${currentBottom + 2}" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M 44 ${currentBottom + 4} Q 60 ${currentBottom + 1} 76 ${currentBottom + 4}" stroke="#b45309" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M 46 ${currentBottom} L 52 ${currentBottom + 5}" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
      <path d="M 60 ${currentBottom} L 66 ${currentBottom + 5}" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
      <path d="M 72 ${currentBottom} L 76 ${currentBottom + 4.5}" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
    `;
  } else if (topStyle === 'crema') {
    decorHtml = `
      <!-- Thick Golden-Hazelnut Crema Surface -->
      <ellipse cx="60" cy="${currentBottom + 1.5}" rx="28" ry="3.8" fill="#c68428" opacity="0.95"/>
      <ellipse cx="60" cy="${currentBottom + 1.5}" rx="22" ry="2.8" fill="#a16215" opacity="0.7"/>
      <circle cx="52" cy="${currentBottom + 1.5}" r="1.2" fill="#f59e0b"/>
      <circle cx="67" cy="${currentBottom + 2}" r="1.0" fill="#f59e0b"/>
    `;
  } else if (topStyle === 'pistachio') {
    decorHtml = `
      <!-- Crushed Pistachio Nut Sprinkles -->
      <ellipse cx="60" cy="${currentBottom + 2}" rx="26" ry="3.5" fill="#4d7c0f" opacity="0.8"/>
      <circle cx="48" cy="${currentBottom + 2}" r="1.2" fill="#365314"/>
      <circle cx="62" cy="${currentBottom + 1.6}" r="1.4" fill="#365314"/>
      <circle cx="70" cy="${currentBottom + 2.3}" r="1.0" fill="#365314"/>
      <circle cx="56" cy="${currentBottom + 2.5}" r="0.9" fill="#84cc16"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Soft Ground Contact Shadow -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- 3D Cylindrical White Paper Cup Shell Gradient (Studio Lighting) -->
        <linearGradient id="${id}_paper" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b0a79a"/>
          <stop offset="12%" stop-color="#ded8ce"/>
          <stop offset="28%" stop-color="#ffffff"/>
          <stop offset="65%" stop-color="#f0ebe0"/>
          <stop offset="88%" stop-color="#c6beaec"/>
          <stop offset="100%" stop-color="#9a9182"/>
        </linearGradient>

        <!-- 3D Mocha Brown Takeaway Lid Gradients -->
        <linearGradient id="${id}_lid_cap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3d2114"/>
          <stop offset="22%" stop-color="#693e28"/>
          <stop offset="50%" stop-color="#845339"/>
          <stop offset="82%" stop-color="#55301e"/>
          <stop offset="100%" stop-color="#2d150b"/>
        </linearGradient>

        <linearGradient id="${id}_lid_rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2f170d"/>
          <stop offset="25%" stop-color="#5a3320"/>
          <stop offset="50%" stop-color="#764730"/>
          <stop offset="80%" stop-color="#472615"/>
          <stop offset="100%" stop-color="#200e06"/>
        </linearGradient>

        <!-- 3D Cylindrical Volumetric Light & Shadow Overlay for Liquid -->
        <linearGradient id="${id}_cyl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.55)"/>
          <stop offset="16%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="30%" stop-color="rgba(255,255,255,0.22)"/>
          <stop offset="68%" stop-color="rgba(0,0,0,0.0)"/>
          <stop offset="88%" stop-color="rgba(0,0,0,0.30)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.60)"/>
        </linearGradient>

        <!-- Cutaway Window ClipPath (Leaving clear paper margins) -->
        <clipPath id="${id}_cutaway">
          <path d="M 28 37 Q 60 41 92 37 L 83 140 Q 60 144 37 140 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Outer 3D Paper Cup Silhouette -->
      <path d="M 18 32 L 31 146 Q 32 149 36 149 L 84 149 Q 88 149 89 146 L 102 32 Z" fill="url(#${id}_paper)"/>
      
      <!-- Cup Bottom Rolled Rim -->
      <path d="M 30 145 Q 60 149 90 145 L 89 149 Q 60 153 31 149 Z" fill="#8c8476"/>

      <!-- 3. Cutaway Window: Liquids & 3D Shading -->
      <g clip-path="url(#${id}_cutaway)">
        <!-- Dark interior cavity background -->
        <rect x="20" y="32" width="80" height="118" fill="#18110b"/>

        <!-- Colored Liquid Strata -->
        ${layersHtml}
        ${decorHtml}

        <!-- 3D Cylindrical Light & Shadow Overlay -->
        <rect x="20" y="32" width="80" height="118" fill="url(#${id}_cyl)"/>

        <!-- Inner Bevel Shadows framing the cutaway -->
        <path d="M 28 37 L 37 140" stroke="rgba(0,0,0,0.45)" stroke-width="1.8"/>
        <path d="M 92 37 L 83 140" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <path d="M 28 37 Q 60 41 92 37" stroke="rgba(0,0,0,0.5)" stroke-width="2"/>
      </g>

      <!-- 4. Subtle Gold Accent Border framing Cutaway -->
      <path d="M 28 37 Q 60 41 92 37 L 83 140 Q 60 144 37 140 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.1" fill="none"/>

      <!-- 5. 3D Takeaway Lid Drop Shadow onto Paper Cup -->
      <path d="M 16 33 Q 60 38 104 33 L 103 38 Q 60 43 17 38 Z" fill="rgba(0,0,0,0.5)"/>

      <!-- 6. 3D Mocha Takeaway Lid (High-Craft Architecture) -->
      <!-- Bottom Rim Flange that clips on cup -->
      <path d="M 14 28 L 17 33 Q 60 37 103 33 L 106 28 Q 60 32 14 28 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="28" rx="46" ry="4.5" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="27.5" rx="45.5" ry="4" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" fill="none"/>

      <!-- Lid Stepped Middle Neck -->
      <path d="M 24 21 L 26 27 Q 60 30 94 27 L 96 21 Q 60 24 24 21 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="21" rx="36" ry="3.5" fill="url(#${id}_lid_cap)"/>

      <!-- Lid Raised Crown with Spout -->
      <ellipse cx="60" cy="15" rx="28" ry="3.2" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="14.5" rx="27.5" ry="2.8" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>

      <!-- Drinking Notch Spout with Inner Shadow -->
      <ellipse cx="38" cy="15" rx="5.4" ry="1.9" fill="#140a05" stroke="#734a35" stroke-width="0.8"/>
    </svg>
  `;
}

// ========================================================
// 2. 3D CLEAR ICED TAKEAWAY CUP (Reference: "Over Iced Coffee Menu")
// ========================================================
function render3DIcedCup(options) {
  const id = getNextSvgId('iced_cup');
  const layers = options.layers || [
    { pct: 28, col: '#fef3c7', colLight: '#fffbeb', colDark: '#fde68a' }, // Condensed milk / syrup
    { pct: 38, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Cold milk
    { pct: 34, col: '#220e04', colLight: '#431f0b', colDark: '#160802' }  // Espresso float
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
        <stop offset="0%" stop-color="${l.colDark || l.col}" stop-opacity="0.90"/>
        <stop offset="28%" stop-color="${l.colLight || l.col}" stop-opacity="0.98"/>
        <stop offset="72%" stop-color="${l.col || l.colLight}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${l.colDark || l.col}" stop-opacity="0.90"/>
      </linearGradient>

      <!-- Liquid Stratum -->
      <path d="M 23 ${currentTop} Q 60 ${currentTop + 4} 97 ${currentTop} L 97 ${currentBottom} Q 60 ${currentBottom + 4} 23 ${currentBottom} Z" fill="url(#${gradId})"/>
      <path d="M 24 ${currentTop} Q 60 ${currentTop + 4} 96 ${currentTop}" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>
    `;
    currentBottom = currentTop;
  });

  // Wall Drizzles & Organic Swirls
  let drizzleHtml = '';
  if (drizzleCol) {
    drizzleHtml = `
      <!-- Dripping Wall Streams -->
      <path d="M 32 38 Q 36 68 33 98 Q 30 118 33 132" stroke="${drizzleCol}" stroke-width="3.2" stroke-linecap="round" fill="none" opacity="0.92"/>
      <path d="M 88 36 Q 83 65 86 102 Q 88 122 84 136" stroke="${drizzleCol}" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="0.92"/>
      <path d="M 48 44 Q 53 72 50 106 Q 47 125 51 135" stroke="${drizzleCol}" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.82"/>
      <path d="M 72 42 Q 68 70 71 96 Q 74 116 71 130" stroke="${drizzleCol}" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.82"/>
    `;
  }

  // Realistic Faceted 3D Crystal Ice Cubes
  let iceOrGelato = `
    <!-- 3D Glistening Multi-Faceted Crystal Ice Cubes -->
    <g opacity="0.95">
      <!-- Cube 1 (Top Left) -->
      <g transform="translate(32, 35) rotate(-10)">
        <polygon points="0,6 10,0 22,5 12,11" fill="rgba(255,255,255,0.85)"/>
        <polygon points="0,6 12,11 12,23 0,18" fill="rgba(220,242,255,0.55)"/>
        <polygon points="12,11 22,5 22,17 12,23" fill="rgba(186,225,250,0.65)"/>
        <polygon points="0,6 10,0 22,5 12,11" stroke="rgba(255,255,255,0.95)" stroke-width="0.8" fill="none"/>
        <line x1="12" y1="11" x2="12" y2="23" stroke="rgba(255,255,255,0.9)" stroke-width="0.8"/>
      </g>

      <!-- Cube 2 (Top Right) -->
      <g transform="translate(66, 38) rotate(14)">
        <polygon points="0,5 9,0 20,4 11,10" fill="rgba(255,255,255,0.88)"/>
        <polygon points="0,5 11,10 11,21 0,16" fill="rgba(220,242,255,0.50)"/>
        <polygon points="11,10 20,4 20,15 11,21" fill="rgba(186,225,250,0.60)"/>
        <polygon points="0,5 9,0 20,4 11,10" stroke="rgba(255,255,255,0.95)" stroke-width="0.8" fill="none"/>
        <line x1="11" y1="10" x2="11" y2="21" stroke="rgba(255,255,255,0.9)" stroke-width="0.8"/>
      </g>

      <!-- Cube 3 (Middle Floating) -->
      <g transform="translate(45, 62) rotate(6)">
        <polygon points="0,5 8,0 18,4 10,9" fill="rgba(255,255,255,0.75)"/>
        <polygon points="0,5 10,9 10,19 0,15" fill="rgba(220,242,255,0.45)"/>
        <polygon points="10,9 18,4 18,14 10,19" fill="rgba(186,225,250,0.55)"/>
        <polygon points="0,5 8,0 18,4 10,9" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" fill="none"/>
      </g>

      <!-- Cube 4 (Right Floating) -->
      <g transform="translate(68, 68) rotate(-12)">
        <polygon points="0,4 7,0 16,3 9,8" fill="rgba(255,255,255,0.75)"/>
        <polygon points="0,4 9,8 9,17 0,13" fill="rgba(220,242,255,0.40)"/>
        <polygon points="9,8 16,3 16,12 9,17" fill="rgba(186,225,250,0.50)"/>
        <polygon points="0,4 7,0 16,3 9,8" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" fill="none"/>
      </g>
    </g>

    <!-- Marbled Espresso Infiltration Streams -->
    <path d="M 40 45 Q 44 68 38 88 Q 42 108 40 125" stroke="#251006" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85"/>
    <path d="M 75 42 Q 70 70 76 95 Q 73 115 76 130" stroke="#251006" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.85"/>
  `;

  if (isAffogato) {
    iceOrGelato = `
      <!-- Big Scoop of Creamy Vanilla Gelato -->
      <ellipse cx="60" cy="88" rx="22" ry="8" fill="#fff5cc" opacity="0.9"/>
      <circle cx="60" cy="72" r="23" fill="#fffef0" stroke="#f3ecd8" stroke-width="1"/>
      <ellipse cx="52" cy="66" rx="6" ry="4" fill="#ffffff"/>
      <!-- Dark Espresso Cascade pouring over Gelato -->
      <path d="M 50 48 Q 55 64 53 82" stroke="#251006" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M 66 50 Q 64 68 67 85" stroke="#251006" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M 58 52 Q 60 70 58 88" stroke="#1f0d04" stroke-width="2.2" stroke-linecap="round"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- Clear PET Cup Specular Reflections -->
        <linearGradient id="${id}_pet_sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.45)"/>
          <stop offset="12%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.15)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.55)"/>
        </linearGradient>

        <!-- Clear PET Cup Shell ClipPath -->
        <clipPath id="${id}_iced_clip">
          <path d="M 18 30 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 102 30 Z"/>
        </clipPath>
      </defs>

      <!-- Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Cup Contents clipped to Cup Shape -->
      <g clip-path="url(#${id}_iced_clip)">
        <rect x="15" y="28" width="90" height="122" fill="#140a05"/>
        ${layersHtml}
        ${drizzleHtml}
        ${iceOrGelato}

        <!-- PET Glass Cylindrical Gloss Overlay -->
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_pet_sheen)"/>
      </g>

      <!-- Clear PET Cup Outer Rim & Outline -->
      <path d="M 18 30 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 102 30 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.2" fill="none"/>
      
      <!-- Cup Bottom Ridge -->
      <path d="M 32 144 Q 60 147 88 144" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="none"/>

      <!-- Diagonal Takeaway Gold Straw -->
      <line x1="72" y1="8" x2="48" y2="92" stroke="#d4af37" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="72" y1="8" x2="48" y2="92" stroke="#f5d36e" stroke-width="1.2" stroke-linecap="round"/>

      <!-- Clear Flat Lid with Rolled Rim -->
      <path d="M 14 26 L 17 31 Q 60 35 103 31 L 106 26 Q 60 30 14 26 Z" fill="rgba(240,248,255,0.5)" stroke="rgba(255,255,255,0.8)" stroke-width="0.8"/>
      <ellipse cx="60" cy="26" rx="46" ry="4.5" fill="rgba(235,248,255,0.4)" stroke="rgba(255,255,255,0.9)" stroke-width="0.8"/>
      <ellipse cx="60" cy="25.5" rx="24" ry="2.5" fill="rgba(200,230,250,0.5)" stroke="rgba(255,255,255,0.8)" stroke-width="0.6"/>
    </svg>
  `;
}

// ========================================================
// 3. 4oz FACETED GIBRALTAR GLASS (Cortado, Piccolo, Café Bombón)
// ========================================================
function render3DGibraltarGlass(options) {
  const id = getNextSvgId('gibraltar');
  const espressoPct = options.espressoPct || 50;
  const isBombon = options.isBombon || false;

  // Total liquid height inside glass: y=48 (top) to y=124 (above thick solid base)
  const totalH = 124 - 48;
  const coffeeH = (espressoPct / 100) * totalH;
  const splitY = 124 - coffeeH;

  let liquidContent = '';
  if (isBombon) {
    // 50% Sweet Condensed Milk (Bottom) + 50% Espresso (Top)
    liquidContent = `
      <rect x="26" y="${splitY}" width="68" height="${124 - splitY}" fill="#fae8b2"/>
      <path d="M 33 124 Q 60 128 87 124 L 87 ${splitY} Q 60 ${splitY + 3} 33 ${splitY} Z" fill="#fae8b2"/>
      <path d="M 31 ${splitY} Q 60 ${splitY + 3} 89 ${splitY} L 93 48 Q 60 51 27 48 Z" fill="#291206"/>
      <ellipse cx="60" cy="48" rx="33" ry="3.5" fill="#c68428"/>
    `;
  } else {
    // Cortado & Piccolo: Espresso at bottom, textured silky milk on top
    liquidContent = `
      <!-- Espresso Bottom Layer -->
      <path d="M 34 124 Q 60 128 86 124 L 89 ${splitY} Q 60 ${splitY + 3} 31 ${splitY} Z" fill="#2a1206"/>
      
      <!-- Steamed Warm Milk Layer -->
      <path d="M 31 ${splitY} Q 60 ${splitY + 3} 89 ${splitY} L 93 48 Q 60 51 27 48 Z" fill="#fcf8f2"/>
      
      <!-- Top Microfoam with Golden Crema Ring & Latte Art Dot -->
      <ellipse cx="60" cy="48" rx="33" ry="3.5" fill="#fdfbf7"/>
      <ellipse cx="60" cy="48" rx="30" ry="3.0" stroke="#c68428" stroke-width="1.2" fill="none" opacity="0.85"/>
      <circle cx="60" cy="48" r="2.5" fill="#c68428"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <clipPath id="${id}_gib_clip">
          <path d="M 26 46 L 34 124 L 38 144 Q 40 148 48 148 L 72 148 Q 80 148 82 144 L 86 124 L 94 46 Z"/>
        </clipPath>
      </defs>

      <!-- Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="32" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Liquid Inside Glass -->
      <g clip-path="url(#${id}_gib_clip)">
        <rect x="20" y="44" width="80" height="106" fill="#140a05"/>
        ${liquidContent}

        <!-- Heavy Solid Glass Base (y=124 to y=148) -->
        <path d="M 34 124 L 38 144 Q 40 148 48 148 L 72 148 Q 80 148 82 144 L 86 124 Z" fill="rgba(240,248,255,0.35)"/>
        <line x1="34" y1="124" x2="86" y2="124" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>

        <!-- Vertical Faceted Bevel Cuts (Iconic Gibraltar Look) -->
        <line x1="44" y1="50" x2="47" y2="140" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/>
        <line x1="55" y1="50" x2="55" y2="144" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
        <line x1="65" y1="50" x2="65" y2="144" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
        <line x1="76" y1="50" x2="73" y2="140" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/>
      </g>

      <!-- Glass Outline & Rim -->
      <path d="M 26 46 L 34 124 L 38 144 Q 40 148 48 148 L 72 148 Q 80 148 82 144 L 86 124 L 94 46 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.4" fill="none"/>
      <ellipse cx="60" cy="46" rx="34" ry="4" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" fill="none"/>

      <!-- Specular Reflection Highlight -->
      <path d="M 29 55 L 35 120" stroke="rgba(255,255,255,0.6)" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}

// ========================================================
// 4. ESPRESSO CON PANNA (Whipped Cream Peaked Rosette)
// ========================================================
function render3DConPanna() {
  const id = getNextSvgId('con_panna');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
        <clipPath id="${id}_panna_clip">
          <path d="M 28 52 L 36 134 Q 38 142 46 142 L 74 142 Q 82 142 84 134 L 92 52 Z"/>
        </clipPath>
      </defs>

      <ellipse cx="60" cy="152" rx="32" ry="5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Glass Shell with Dark Espresso -->
      <g clip-path="url(#${id}_panna_clip)">
        <rect x="20" y="50" width="80" height="95" fill="#251006"/>
        <ellipse cx="60" cy="52" rx="32" ry="4" fill="#c68428"/>
      </g>

      <!-- Glass Shell Outline -->
      <path d="M 28 52 L 36 134 Q 38 142 46 142 L 74 142 Q 82 142 84 134 L 92 52 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.3" fill="none"/>
      <ellipse cx="60" cy="52" rx="32" ry="4" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" fill="none"/>

      <!-- Tall Peaked Whipped Cream Crown Swirl -->
      <path d="M 32 52 C 32 26 48 16 60 16 C 72 16 88 26 88 52 Z" fill="#ffffff"/>
      <path d="M 40 50 C 44 32 54 22 60 22 C 66 22 76 32 80 50" stroke="#f1ece5" stroke-width="3" fill="none"/>
      <path d="M 58 12 C 59 7 61 7 62 12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      
      <!-- Cocoa Ganache Drizzle over Peaked Swirl -->
      <path d="M 40 40 Q 60 30 80 40" stroke="#261005" stroke-width="2" stroke-linecap="round"/>
      <path d="M 46 47 Q 60 38 74 47" stroke="#261005" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}

// ========================================================
// 5. FILTER COFFEE & MANUAL BREW (Chemex & Hario V60)
// ========================================================
function render3DFilterBrew(type) {
  const id = getNextSvgId('filter');

  if (type === 'chemex') {
    return `
      <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
          <clipPath id="${id}_chemex_clip">
            <path d="M 34 22 L 54 75 L 26 140 Q 28 148 40 148 L 80 148 Q 92 148 94 140 L 66 75 L 86 22 Z"/>
          </clipPath>
        </defs>

        <ellipse cx="60" cy="154" rx="34" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

        <!-- Chemex Body & Brew -->
        <g clip-path="url(#${id}_chemex_clip)">
          <!-- Glowing Clear Amber Filter Coffee in Bottom Flask (y=88 to y=148) -->
          <rect x="20" y="85" width="80" height="65" fill="#4d220b"/>
          <ellipse cx="60" cy="86" rx="32" ry="4" fill="#a1490d"/>
          <ellipse cx="60" cy="86" rx="32" ry="4" stroke="#d97706" stroke-width="1.5" fill="none"/>
        </g>

        <!-- Hourglass Chemex Glass Silhouette -->
        <path d="M 34 22 L 54 75 L 26 140 Q 28 148 40 148 L 80 148 Q 92 148 94 140 L 66 75 L 86 22 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.4" fill="none"/>
        <ellipse cx="60" cy="22" rx="26" ry="3.5" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" fill="none"/>

        <!-- Iconic Wood Collar & Leather Tie around Neck -->
        <rect x="51" y="68" width="18" height="15" rx="2" fill="#854d0e" stroke="#ca8a04" stroke-width="1"/>
        <circle cx="60" cy="75" r="2.5" fill="#ca8a04"/>
        <line x1="60" y1="77" x2="60" y2="88" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>

        <!-- Glass Specular Highlight -->
        <path d="M 32 105 Q 30 135 40 142" stroke="rgba(255,255,255,0.55)" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
  }

  // Hario V60 / Ceramic Dripper + Glass Server
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
        <clipPath id="${id}_v60_clip">
          <path d="M 32 78 L 30 140 Q 32 146 40 146 L 80 146 Q 88 146 90 140 L 88 78 Z"/>
        </clipPath>
      </defs>

      <ellipse cx="60" cy="152" rx="34" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Server Carafe with Amber Coffee -->
      <g clip-path="url(#${id}_v60_clip)">
        <rect x="25" y="90" width="70" height="60" fill="#4a1f07"/>
        <ellipse cx="60" cy="90" rx="28" ry="3.5" fill="#a1490d"/>
        <ellipse cx="60" cy="90" rx="28" ry="3.5" stroke="#d97706" stroke-width="1.5" fill="none"/>
      </g>

      <!-- Glass Carafe Body -->
      <path d="M 32 78 L 30 140 Q 32 146 40 146 L 80 146 Q 88 146 90 140 L 88 78 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.3" fill="none"/>
      <!-- Ergonomic Server Handle -->
      <path d="M 90 85 C 108 85 108 130 89 135" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M 90 85 C 108 85 108 130 89 135" stroke="rgba(212,175,55,0.7)" stroke-width="1.2" stroke-linecap="round" fill="none"/>

      <!-- Hario V60 Ceramic Dripper Cone on Top -->
      <path d="M 28 32 L 48 76 L 72 76 L 92 32 Z" fill="#141720" stroke="rgba(212,175,55,0.8)" stroke-width="1.4"/>
      <ellipse cx="60" cy="32" rx="32" ry="4.5" fill="#0d0f14" stroke="rgba(212,175,55,0.8)" stroke-width="1.2"/>

      <!-- V60 White Spiral Ribs & Filter Paper -->
      <path d="M 32 32 L 52 74" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
      <path d="M 88 32 L 68 74" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
    </svg>
  `;
}

// Sequence generator helper
function getDrinkSequence(item) {
  if (!item) return [];
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  if (id.includes('cortado') || name.includes('كورتادو')) {
    return ['1. دبل إسبريسو 50%', '2. حليب دافئ 50%', '3. صب هادئ'];
  }
  if (id.includes('piccolo') || name.includes('بيكلو')) {
    return ['1. ريستريتو 1/3', '2. حليب دافئ 2/3', '3. كاس مضلع'];
  }
  if (id.includes('bombon') || name.includes('بونبون')) {
    return ['1. حليب مكثف 50% بالقاع', '2. استخلاص هادئ للبن', '3. طبقتين منفصلتين'];
  }
  if (id.includes('affogato') || name.includes('أفوجاتو')) {
    return ['1. بولة جيلاتو فانيليا', '2. استخلاص دبل إسبريسو', '3. صب حار فوق الآيس'];
  }
  if (id.includes('americano') || name.includes('أمريكانو')) {
    return ['1. ماء ساخن/بارد أولاً', '2. دبل إسبريسو فوق الماء', '3. حفظ الكريما'];
  }
  if (id.includes('spanish') || name.includes('سبانيش')) {
    return ['1. حليب مكثف بالقاع', '2. دبل إسبريسو', '3. حليب مبخر أو بارد'];
  }
  if (id.includes('pistachio') || name.includes('بيستاشيو')) {
    return ['1. صوص بيستاشيو بالكوب', '2. دبل إسبريسو', '3. حليب + فستق'];
  }
  if (id.includes('white-mocha') || name.includes('وايت موكا')) {
    return ['1. صوص شوكولاتة بالقاع', '2. إسبريسو ساخن ودمج', '3. حليب مبخر/بارد'];
  }
  if (id.includes('caramel') || name.includes('كراميل')) {
    return ['1. حليب فانيليا بالكوب', '2. إسبريسو مارك', '3. شبكة كراميل بالقمة'];
  }
  if (id.includes('mocha') || name.includes('موكا')) {
    return ['1. صوص شوكولاتة بالقاع', '2. إسبريسو ساخن ودمج', '3. حليب مبخر/بارد'];
  }
  if (id.includes('cappuccino') || name.includes('كابتشينو')) {
    return ['1. إسبريسو سنجل/دبل', '2. حليب مبخر 1/3', '3. فوم كثيف + كاكاو'];
  }
  if (id.includes('flat-white') || name.includes('فلات وايت')) {
    return ['1. دبل ريستريتو', '2. حليب ميكروتيكستشر', '3. صب فلات متجانس'];
  }
  if (id.includes('latte') || name.includes('لاتيه')) {
    return ['1. استخلاص إسبريسو', '2. تبخير حليب 65°C', '3. صب مع فوم ناعم'];
  }
  if (id.includes('chemex') || name.includes('كيمكس')) {
    return ['1. ترطيب الفلتر والبن 45s', '2. صب دائري منتظم', '3. استخلاص نقي'];
  }
  if (id.includes('v60') || name.includes('v60')) {
    return ['1. ترطيب 30s بنسبة 1:2', '2. صبات مركزية هادئة', '3. وقت 2:30-3:00 د'];
  }

  return ['1. تجهيز المعايير والمقادير', '2. الاستخلاص الفوري', '3. التقديم السريع'];
}
