// Emad Afandi Specialty Coffee Lab - 3D Architectural Vector Visual System
// Tailored to Emad Afandi's EXACT Cafe Packaging:
// 1. Hot Drinks: Matte Deep-Black Takeaway Paper Cup with Matte Black Lid (Matching Image 1)
// 2. Iced Drinks: Clear Contoured PET Cup with Asymmetrical Raised Sipping Lid (Matching Image 2)

let _svgUidCounter = 0;
function getNextSvgId(prefix) {
  _svgUidCounter++;
  return `${prefix}_${_svgUidCounter}_${Math.random().toString(36).substring(2, 7)}`;
}

// ========================================================
// 1. 3D MATTE BLACK HOT TAKEAWAY CUP (Matching Emad Afandi Image 1)
// ========================================================
function render3DHotCup(options) {
  const id = getNextSvgId('hot_cup_black');
  const layers = options.layers || [
    { pct: 35, col: '#2a1206', colLight: '#46200c', colDark: '#1a0902' },
    { pct: 50, col: '#faf5ee', colLight: '#ffffff', colDark: '#ebe2d5' },
    { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
  ];
  const topStyle = options.topStyle || 'foam'; // 'foam', 'cocoa', 'caramel', 'crema', 'flat', 'pistachio'
  const isAmericano = options.isAmericano || false;

  // Cutaway window coordinates (leaving deep black paper borders on sides)
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

        <!-- 3D Matte Deep-Black Paper Cup Shell Gradient (Matching Emad Afandi Cup) -->
        <linearGradient id="${id}_black_cup" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#111215"/>
          <stop offset="14%" stop-color="#1f2229"/>
          <stop offset="32%" stop-color="#2d323d"/>
          <stop offset="68%" stop-color="#21242c"/>
          <stop offset="86%" stop-color="#18191f"/>
          <stop offset="100%" stop-color="#0c0d10"/>
        </linearGradient>

        <!-- 3D Matte Black Takeaway Lid Gradients -->
        <linearGradient id="${id}_lid_cap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#17181c"/>
          <stop offset="22%" stop-color="#2c303a"/>
          <stop offset="50%" stop-color="#3a404d"/>
          <stop offset="80%" stop-color="#242730"/>
          <stop offset="100%" stop-color="#121316"/>
        </linearGradient>

        <linearGradient id="${id}_lid_rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#131417"/>
          <stop offset="25%" stop-color="#262932"/>
          <stop offset="50%" stop-color="#343945"/>
          <stop offset="80%" stop-color="#20222a"/>
          <stop offset="100%" stop-color="#0e0f12"/>
        </linearGradient>

        <!-- 3D Cylindrical Volumetric Light & Shadow Overlay for Liquid -->
        <linearGradient id="${id}_cyl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.58)"/>
          <stop offset="16%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="30%" stop-color="rgba(255,255,255,0.22)"/>
          <stop offset="68%" stop-color="rgba(0,0,0,0.0)"/>
          <stop offset="88%" stop-color="rgba(0,0,0,0.32)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.65)"/>
        </linearGradient>

        <!-- Cutaway Window ClipPath (Leaving crisp black paper margins) -->
        <clipPath id="${id}_cutaway">
          <path d="M 28 37 Q 60 41 92 37 L 83 140 Q 60 144 37 140 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.9)" filter="url(#${id}_blur)"/>

      <!-- 2. Outer 3D Matte Black Paper Cup Body -->
      <path d="M 18 32 L 31 146 Q 32 149 36 149 L 84 149 Q 88 149 89 146 L 102 32 Z" fill="url(#${id}_black_cup)"/>
      
      <!-- White Rolled Paper Base Rim (As shown in Image 1) -->
      <path d="M 30 145 Q 60 149 90 145 L 89 149 Q 60 153 31 149 Z" fill="#e2e8f0"/>
      <path d="M 31 146 Q 60 150 89 146" stroke="#94a3b8" stroke-width="0.8" fill="none"/>

      <!-- 3. Cutaway Window: Liquids & 3D Shading -->
      <g clip-path="url(#${id}_cutaway)">
        <!-- Deep dark cavity background -->
        <rect x="20" y="32" width="80" height="118" fill="#0d0b09"/>

        <!-- Colored Liquid Strata -->
        ${layersHtml}
        ${decorHtml}

        <!-- 3D Cylindrical Light & Shadow Overlay -->
        <rect x="20" y="32" width="80" height="118" fill="url(#${id}_cyl)"/>

        <!-- Inner Bevel Shadows framing the cutaway -->
        <path d="M 28 37 L 37 140" stroke="rgba(0,0,0,0.55)" stroke-width="2"/>
        <path d="M 92 37 L 83 140" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <path d="M 28 37 Q 60 41 92 37" stroke="rgba(0,0,0,0.6)" stroke-width="2.2"/>
      </g>

      <!-- 4. Emad Afandi Luxury Gold Accent Border framing Cutaway -->
      <path d="M 28 37 Q 60 41 92 37 L 83 140 Q 60 144 37 140 Z" stroke="rgba(212,175,55,0.85)" stroke-width="1.2" fill="none"/>

      <!-- 5. 3D Takeaway Lid Drop Shadow onto Black Cup Body -->
      <path d="M 16 33 Q 60 38 104 33 L 103 39 Q 60 44 17 39 Z" fill="rgba(0,0,0,0.7)"/>

      <!-- 6. 3D Matte Black Takeaway Lid (Exact Geometry of Image 1) -->
      <!-- Bottom Rim Flange that clips on cup -->
      <path d="M 13 28 L 16 33 Q 60 37 104 33 L 107 28 Q 60 32 13 28 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="28" rx="47" ry="4.5" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="27.5" rx="46.5" ry="4" stroke="rgba(255,255,255,0.25)" stroke-width="0.8" fill="none"/>

      <!-- Lid Stepped Middle Neck -->
      <path d="M 23 21 L 25 27 Q 60 30 95 27 L 97 21 Q 60 24 23 21 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="21" rx="37" ry="3.5" fill="url(#${id}_lid_cap)"/>

      <!-- Lid Raised Crown with Spout & Wedge -->
      <ellipse cx="60" cy="15" rx="29" ry="3.2" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="14.5" rx="28.5" ry="2.8" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" fill="none"/>

      <!-- Rear Raised Wedge (Image 1 feature) -->
      <path d="M 46 14.5 L 74 14.5 L 72 12 L 48 12 Z" fill="#2d323e" opacity="0.8"/>

      <!-- Oval Drinking Spout Hole with Recessed Lip -->
      <ellipse cx="38" cy="15" rx="5.4" ry="1.9" fill="#090a0d" stroke="#3d4352" stroke-width="0.8"/>
    </svg>
  `;
}

// ========================================================
// 2. 3D CLEAR CONTOURED ICED CUP WITH ASYMMETRICAL SIP LID (Matching Image 2)
// ========================================================
function render3DIcedCup(options) {
  const id = getNextSvgId('iced_cup_contoured');
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
        <polygon points="0,6 10,0 22,5 12,11" fill="rgba(255,255,255,0.88)"/>
        <polygon points="0,6 12,11 12,23 0,18" fill="rgba(220,242,255,0.55)"/>
        <polygon points="12,11 22,5 22,17 12,23" fill="rgba(186,225,250,0.65)"/>
        <polygon points="0,6 10,0 22,5 12,11" stroke="rgba(255,255,255,0.95)" stroke-width="0.8" fill="none"/>
        <line x1="12" y1="11" x2="12" y2="23" stroke="rgba(255,255,255,0.9)" stroke-width="0.8"/>
      </g>

      <!-- Cube 2 (Top Right) -->
      <g transform="translate(66, 38) rotate(14)">
        <polygon points="0,5 9,0 20,4 11,10" fill="rgba(255,255,255,0.90)"/>
        <polygon points="0,5 11,10 11,21 0,16" fill="rgba(220,242,255,0.50)"/>
        <polygon points="11,10 20,4 20,15 11,21" fill="rgba(186,225,250,0.60)"/>
        <polygon points="0,5 9,0 20,4 11,10" stroke="rgba(255,255,255,0.95)" stroke-width="0.8" fill="none"/>
        <line x1="11" y1="10" x2="11" y2="21" stroke="rgba(255,255,255,0.9)" stroke-width="0.8"/>
      </g>

      <!-- Cube 3 (Middle Floating) -->
      <g transform="translate(45, 62) rotate(6)">
        <polygon points="0,5 8,0 18,4 10,9" fill="rgba(255,255,255,0.78)"/>
        <polygon points="0,5 10,9 10,19 0,15" fill="rgba(220,242,255,0.45)"/>
        <polygon points="10,9 18,4 18,14 10,19" fill="rgba(186,225,250,0.55)"/>
        <polygon points="0,5 8,0 18,4 10,9" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" fill="none"/>
      </g>

      <!-- Cube 4 (Right Floating) -->
      <g transform="translate(68, 68) rotate(-12)">
        <polygon points="0,4 7,0 16,3 9,8" fill="rgba(255,255,255,0.78)"/>
        <polygon points="0,4 9,8 9,17 0,13" fill="rgba(220,242,255,0.40)"/>
        <polygon points="9,8 16,3 16,12 9,17" fill="rgba(186,225,250,0.50)"/>
        <polygon points="0,4 7,0 16,3 9,8" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" fill="none"/>
      </g>
    </g>

    <!-- Marbled Espresso Infiltration Streams -->
    <path d="M 40 45 Q 44 68 38 88 Q 42 108 40 125" stroke="#251006" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.85"/>
    <path d="M 75 42 Q 70 70 76 95 Q 73 115 76 130" stroke="#251006" stroke-width="2.3" stroke-linecap="round" fill="none" opacity="0.85"/>
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

        <!-- Clear PET Cup Specular Glass Sheen -->
        <linearGradient id="${id}_pet_sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.48)"/>
          <stop offset="12%" stop-color="rgba(255,255,255,0.14)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.58)"/>
        </linearGradient>

        <!-- Clear PET Cup Contoured Shell ClipPath (Matching Image 2) -->
        <clipPath id="${id}_iced_clip">
          <!-- Outer contour with slight horizontal ridge step at y=46 -->
          <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z"/>
        </clipPath>
      </defs>

      <!-- Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Cup Contents clipped to Contoured Cup Shape -->
      <g clip-path="url(#${id}_iced_clip)">
        <rect x="15" y="28" width="90" height="122" fill="#140a05"/>
        ${layersHtml}
        ${drizzleHtml}
        ${iceOrGelato}

        <!-- PET Glass Cylindrical Gloss Overlay -->
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_pet_sheen)"/>
      </g>

      <!-- Clear PET Cup Outer Rim & Contoured Outline -->
      <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.2" fill="none"/>
      
      <!-- Horizontal Measurement Fill Marks (Exact feature from Image 2) -->
      <line x1="23" y1="64" x2="36" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="84" y1="64" x2="97" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      
      <line x1="25" y1="92" x2="34" y2="92" stroke="rgba(255,255,255,0.5)" stroke-width="1.1" stroke-linecap="round"/>
      <line x1="86" y1="92" x2="95" y2="92" stroke="rgba(255,255,255,0.5)" stroke-width="1.1" stroke-linecap="round"/>

      <line x1="27" y1="120" x2="33" y2="120" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" stroke-linecap="round"/>
      <line x1="87" y1="120" x2="93" y2="120" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" stroke-linecap="round"/>

      <!-- Cup Bottom Ridge -->
      <path d="M 32 144 Q 60 147 88 144" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="none"/>

      <!-- ======================================================== -->
      <!-- ICONIC ASYMMETRICAL RAISED SIPPER LID (Exact Image 2 Lid) -->
      <!-- ======================================================== -->
      <!-- Locking Rim that clicks over rolled cup rim -->
      <path d="M 14 28 L 17 33 Q 60 37 103 33 L 106 28 Q 60 31 14 28 Z" fill="rgba(235,246,255,0.45)" stroke="rgba(255,255,255,0.85)" stroke-width="0.8"/>
      
      <!-- Asymmetrical Ergonomic Raised Dome Curve (Higher on Right with Sipping Spout) -->
      <path d="M 15 28 C 15 22 26 18 46 20 C 65 22 75 10 93 10 C 103 10 106 18 106 28 Z" fill="rgba(230,245,255,0.38)"/>
      <path d="M 15 28 C 15 22 26 18 46 20 C 65 22 75 10 93 10 C 103 10 106 18 106 28" stroke="rgba(255,255,255,0.95)" stroke-width="1.3" fill="none"/>

      <!-- Contoured Sipping Spout Opening (Raised on the Right Peak) -->
      <ellipse cx="91" cy="14" rx="4.8" ry="2.2" fill="rgba(195,225,245,0.6)" stroke="#ffffff" stroke-width="0.8"/>

      <!-- Gloss Reflection Line on the Asymmetrical Curve -->
      <path d="M 32 23 Q 55 24 72 17" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
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
function render3DChemex() {
  const id = getNextSvgId('chemex');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Floor Shadow Filter -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>

        <!-- Glass Refraction Gradient -->
        <linearGradient id="${id}_glass_refract" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
          <stop offset="15%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.02)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.1)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.3)"/>
        </linearGradient>

        <!-- Amber Specialty Coffee Gradient -->
        <linearGradient id="${id}_coffee_liquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#240c03" stop-opacity="0.95"/>
          <stop offset="25%" stop-color="#4a1a06" stop-opacity="0.98"/>
          <stop offset="55%" stop-color="#853a08" stop-opacity="0.92"/>
          <stop offset="85%" stop-color="#542007" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#220b02" stop-opacity="0.98"/>
        </linearGradient>

        <!-- Natural Wood Collar Gradient -->
        <linearGradient id="${id}_wood_collar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="25%" stop-color="#b45309"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="75%" stop-color="#92400e"/>
          <stop offset="100%" stop-color="#5c2406"/>
        </linearGradient>

        <!-- White Paper Filter Cone Gradient -->
        <linearGradient id="${id}_filter_paper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>

        <!-- Wet Blooming Coffee Bed -->
        <linearGradient id="${id}_coffee_bed" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1c0b03"/>
          <stop offset="50%" stop-color="#3d1808"/>
          <stop offset="100%" stop-color="#170802"/>
        </linearGradient>

        <!-- Clip Path for Lower Chemex Flask Liquid -->
        <clipPath id="${id}_lower_flask_clip">
          <path d="M 52 75 L 26 138 C 24 144 28 150 36 150 L 84 150 C 92 150 96 144 94 138 L 68 75 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.92)" filter="url(#${id}_blur)"/>

      <!-- 2. Lower Flask Glass Backfill -->
      <path d="M 52 75 L 26 138 C 24 144 28 150 36 150 L 84 150 C 92 150 96 144 94 138 L 68 75 Z" fill="#0c0d12"/>

      <!-- 3. Amber Brewed Specialty Coffee in Lower Carafe -->
      <g clip-path="url(#${id}_lower_flask_clip)">
        <!-- Liquid Body from y=96 to 150 -->
        <path d="M 22 96 L 22 152 L 98 152 L 98 96 Z" fill="url(#${id}_coffee_liquid)"/>
        
        <!-- Liquid Surface Meniscus -->
        <ellipse cx="60" cy="96" rx="27" ry="3.8" fill="#a1490d"/>
        <ellipse cx="60" cy="96" rx="27" ry="3.8" stroke="#d97706" stroke-width="1.2" fill="none"/>
        <ellipse cx="60" cy="96" rx="21" ry="2.6" fill="#ca8a04" opacity="0.6"/>

        <!-- Depth Refraction in Liquid -->
        <path d="M 32 104 C 30 135 34 146 44 148" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M 88 104 C 90 135 86 146 76 148" stroke="rgba(0,0,0,0.5)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </g>

      <!-- 4. Fresh Dripping Coffee Stream from Filter Tip -->
      <line x1="60" y1="74" x2="60" y2="92" stroke="#d97706" stroke-width="1.6" stroke-dasharray="3 2" stroke-linecap="round"/>
      <ellipse cx="60" cy="94" rx="1.8" ry="2.2" fill="#d97706"/>

      <!-- 5. Iconic Chemex Glass Silhouette Outline -->
      <path d="M 33 16 L 53 74 L 26 138 C 24 144 28 150 36 150 L 84 150 C 92 150 96 144 94 138 L 67 74 L 87 16" 
            stroke="rgba(212,175,55,0.85)" stroke-width="1.5" stroke-linecap="round" fill="url(#${id}_glass_refract)"/>

      <!-- Top Glass Flared Rim with Spout Channel -->
      <ellipse cx="60" cy="16" rx="27" ry="4" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" fill="rgba(255,255,255,0.06)"/>
      <path d="M 31 16 Q 28 14 30 18" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" fill="none"/>

      <!-- 6. White Chemex Conical Paper Filter inside Upper Funnel -->
      <path d="M 38 18 L 60 74 L 82 18 Z" fill="url(#${id}_filter_paper)" stroke="rgba(203,213,225,0.9)" stroke-width="1.1"/>
      <path d="M 45 18 L 60 73" stroke="rgba(148,163,184,0.4)" stroke-width="0.9"/>
      <path d="M 75 18 L 60 73" stroke="rgba(148,163,184,0.4)" stroke-width="0.9"/>

      <!-- Wet Coffee Grounds Blooming in Filter -->
      <ellipse cx="60" cy="30" rx="19" ry="3.8" fill="url(#${id}_coffee_bed)"/>
      <ellipse cx="60" cy="30" rx="14" ry="2.5" fill="#451a03"/>
      <circle cx="56" cy="30" r="1.3" fill="#d97706"/>
      <circle cx="64" cy="29.5" r="1.1" fill="#b45309"/>

      <!-- 7. Iconic Wood Collar & Tie around Waist -->
      <rect x="49" y="66" width="22" height="15" rx="3" fill="url(#${id}_wood_collar)" stroke="#451a03" stroke-width="1"/>
      <line x1="60" y1="66" x2="60" y2="81" stroke="#451a03" stroke-width="0.8"/>

      <path d="M 50 68 Q 60 67 70 68" stroke="rgba(255,255,255,0.35)" stroke-width="1" fill="none"/>
      <path d="M 50 80 Q 60 79 70 80" stroke="rgba(0,0,0,0.5)" stroke-width="1" fill="none"/>

      <!-- Leather Cord Wrapped in Collar Groove -->
      <path d="M 49 73.5 Q 60 75 71 73.5" stroke="#78350f" stroke-width="2.6" fill="none"/>
      <path d="M 49 73.5 Q 60 75 71 73.5" stroke="#ca8a04" stroke-width="1.2" fill="none"/>

      <!-- Wooden Bead on Cord -->
      <circle cx="60" cy="74" r="3.2" fill="#d97706" stroke="#451a03" stroke-width="0.8"/>
      <circle cx="59.2" cy="73.2" r="1.1" fill="rgba(255,255,255,0.7)"/>

      <!-- Hanging Leather Laces -->
      <path d="M 59 77 C 58 84 56 89 55 94" stroke="#ca8a04" stroke-width="1.6" stroke-linecap="round" fill="none"/>
      <path d="M 61 77 C 62 83 63 88 64 92" stroke="#b45309" stroke-width="1.4" stroke-linecap="round" fill="none"/>

      <!-- 8. Embossed Glass Belly Button (Chemex Measurement Mark) -->
      <circle cx="60" cy="120" r="2.2" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>

      <!-- 9. Specular Curving Glass Gloss Highlights -->
      <path d="M 31 100 C 28 126 34 142 42 147" stroke="rgba(255,255,255,0.65)" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M 37 24 L 51 68" stroke="rgba(255,255,255,0.4)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M 83 24 L 69 68" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    </svg>
  `;
}

function render3DV60() {
  const id = getNextSvgId('v60');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Floor Shadow Filter -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>

        <!-- Glass Refraction Gradient -->
        <linearGradient id="${id}_glass_refract" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.3)"/>
          <stop offset="20%" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.02)"/>
          <stop offset="80%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.25)"/>
        </linearGradient>

        <!-- Rich Amber Filter Coffee Gradient -->
        <linearGradient id="${id}_coffee_liquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#240c03" stop-opacity="0.95"/>
          <stop offset="22%" stop-color="#4a1a06" stop-opacity="0.98"/>
          <stop offset="55%" stop-color="#853a08" stop-opacity="0.92"/>
          <stop offset="82%" stop-color="#542007" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#1e0a02" stop-opacity="0.98"/>
        </linearGradient>

        <!-- Hario V60 Ceramic Dripper Shell Gradient -->
        <linearGradient id="${id}_ceramic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="20%" stop-color="#f8fafc"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="80%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>

        <!-- Paper Cone Gradient -->
        <linearGradient id="${id}_paper" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e2e8f0"/>
          <stop offset="35%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>

        <!-- Coffee Bed Blooming -->
        <linearGradient id="${id}_bloom" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1c0b03"/>
          <stop offset="50%" stop-color="#3d1808"/>
          <stop offset="100%" stop-color="#170802"/>
        </linearGradient>

        <!-- Server Carafe Clip Path -->
        <clipPath id="${id}_server_clip">
          <path d="M 38 74 C 36 74 34 76 34 80 L 32 94 C 28 98 28 106 32 110 L 30 126 C 26 132 28 148 38 148 L 78 148 C 88 148 90 132 86 126 L 84 110 C 88 106 88 98 84 94 L 82 80 C 82 76 80 74 78 74 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Ground Drop Shadow -->
      <ellipse cx="58" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.92)" filter="url(#${id}_blur)"/>

      <!-- 2. Hario Server Carafe Body Backfill -->
      <path d="M 38 74 C 36 74 34 76 34 80 L 32 94 C 28 98 28 106 32 110 L 30 126 C 26 132 28 148 38 148 L 78 148 C 88 148 90 132 86 126 L 84 110 C 88 106 88 98 84 94 L 82 80 C 82 76 80 74 78 74 Z" fill="#0d0e14"/>

      <!-- 3. Brewed Amber Coffee in Server -->
      <g clip-path="url(#${id}_server_clip)">
        <rect x="20" y="98" width="80" height="55" fill="url(#${id}_coffee_liquid)"/>
        
        <!-- Surface Meniscus -->
        <ellipse cx="58" cy="98" rx="27" ry="3.6" fill="#a1490d"/>
        <ellipse cx="58" cy="98" rx="27" ry="3.6" stroke="#d97706" stroke-width="1.2" fill="none"/>
        <ellipse cx="58" cy="98" rx="20" ry="2.4" fill="#ca8a04" opacity="0.6"/>

        <!-- Light refractions inside coffee -->
        <path d="M 33 104 C 31 126 34 142 42 146" stroke="rgba(255,255,255,0.22)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        <path d="M 83 104 C 85 126 82 142 74 146" stroke="rgba(0,0,0,0.5)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      </g>

      <!-- 4. Fresh Dripping Extraction Stream -->
      <line x1="58" y1="68" x2="58" y2="94" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3 2" stroke-linecap="round"/>
      <ellipse cx="58" cy="96" rx="1.8" ry="2.2" fill="#d97706"/>

      <!-- 5. Glass Server Outer Silhouette with Beehive Flutes -->
      <path d="M 38 74 C 36 74 34 76 34 80 L 32 94 C 28 98 28 106 32 110 L 30 126 C 26 132 28 148 38 148 L 78 148 C 88 148 90 132 86 126 L 84 110 C 88 106 88 98 84 94 L 82 80 C 82 76 80 74 78 74 Z" 
            stroke="rgba(212,175,55,0.85)" stroke-width="1.4" fill="url(#${id}_glass_refract)"/>

      <!-- Server Mouth Rim -->
      <ellipse cx="58" cy="74" rx="21" ry="3" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" fill="none"/>

      <!-- Measurement Tick Marks on Server Glass (01, 02 Cup marks) -->
      <line x1="33" y1="112" x2="38" y2="112" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
      <circle cx="41" cy="112" r="0.8" fill="rgba(255,255,255,0.6)"/>
      <line x1="32" y1="128" x2="37" y2="128" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
      <circle cx="40" cy="128" r="0.8" fill="rgba(255,255,255,0.6)"/>

      <!-- Ergonomic Curved Glass Server Handle -->
      <path d="M 85 84 C 104 84 104 132 85 136" stroke="rgba(0,0,0,0.6)" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 85 84 C 104 84 104 132 85 136" stroke="url(#${id}_ceramic)" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 85 84 C 104 84 104 132 85 136" stroke="rgba(212,175,55,0.8)" stroke-width="1" stroke-linecap="round" fill="none"/>

      <!-- 6. HARIO V60 CERAMIC DRIPPER ON TOP (Exact 60° Cone Geometry) -->
      <!-- Dripper Collar Ring resting on Server -->
      <ellipse cx="58" cy="72" rx="28" ry="3.8" fill="#e2e8f0" stroke="rgba(212,175,55,0.85)" stroke-width="1.2"/>

      <!-- 60° Ceramic Cone Body -->
      <path d="M 26 22 L 50 69 Q 58 72 66 69 L 90 22 Z" fill="url(#${id}_ceramic)" stroke="rgba(212,175,55,0.85)" stroke-width="1.3"/>
      <ellipse cx="58" cy="22" rx="32" ry="4.5" fill="#f8fafc" stroke="rgba(212,175,55,0.85)" stroke-width="1.2"/>

      <!-- Dripper Side Loop Handle -->
      <path d="M 89 26 C 98 26 98 44 81 48" stroke="url(#${id}_ceramic)" stroke-width="2.6" fill="none"/>
      <path d="M 89 26 C 98 26 98 44 81 48" stroke="rgba(212,175,55,0.8)" stroke-width="0.8" fill="none"/>

      <!-- 7. White Fluted V60 Paper Filter inside Dripper -->
      <path d="M 32 23 L 53 66 Q 58 68 63 66 L 84 23 Z" fill="url(#${id}_paper)" stroke="rgba(203,213,225,0.8)" stroke-width="1"/>

      <!-- Hario Patented Curved Spiral Ribs inside V60 -->
      <path d="M 36 24 C 42 36 48 52 56 65" stroke="rgba(148,163,184,0.5)" stroke-width="1.1" fill="none"/>
      <path d="M 47 24 C 51 36 54 50 58 65" stroke="rgba(148,163,184,0.4)" stroke-width="1.0" fill="none"/>
      <path d="M 69 24 C 65 36 62 50 58 65" stroke="rgba(148,163,184,0.4)" stroke-width="1.0" fill="none"/>
      <path d="M 80 24 C 74 36 68 52 60 65" stroke="rgba(148,163,184,0.5)" stroke-width="1.1" fill="none"/>

      <!-- Blooming Coffee Grounds Bed -->
      <ellipse cx="58" cy="34" rx="18" ry="3.5" fill="url(#${id}_bloom)"/>
      <ellipse cx="58" cy="34" rx="13" ry="2.2" fill="#451a03"/>
      <circle cx="54" cy="34" r="1.2" fill="#d97706"/>
      <circle cx="62" cy="33.5" r="1.1" fill="#b45309"/>
      <circle cx="58" cy="34.8" r="0.9" fill="#ca8a04"/>

      <!-- 8. Glass Specular Highlights -->
      <path d="M 32 82 C 30 96 30 115 32 128" stroke="rgba(255,255,255,0.6)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M 33 130 C 31 138 34 144 42 147" stroke="rgba(255,255,255,0.6)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <!-- Dripper Ceramic Gloss -->
      <path d="M 31 26 L 46 62" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    </svg>
  `;
}

function render3DFilterBrew(type) {
  if (type === 'chemex') {
    return render3DChemex();
  }
  return render3DV60();
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

  // 6. ICED DRINKS (Clear Contoured PET Cup with Asymmetrical Sipper Lid - Matching Image 2)
  if (id.includes('iced') || id.includes('ice') || name.includes('آيس') || name.includes('ايس')) {
    if (id.includes('spanish') || name.includes('سبانيش')) {
      return render3DIcedCup({
        layers: [
          { pct: 28, col: '#fef3c7', colLight: '#fffbeb', colDark: '#fde68a' }, // Condensed milk
          { pct: 40, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Cold milk
          { pct: 32, col: '#241005', colLight: '#421f0b', colDark: '#170802' }  // Espresso float
        ],
        drizzleCol: '#b45309'
      });
    }
    if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
      return render3DIcedCup({
        layers: [
          { pct: 28, col: '#4d7c0f', colLight: '#65a30d', colDark: '#3f6212' }, // Pistachio cream
          { pct: 40, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Cold milk
          { pct: 32, col: '#261105', colLight: '#441f0b', colDark: '#180802' }  // Espresso
        ],
        drizzleCol: '#3f6212'
      });
    }
    if (id.includes('white-mocha') || name.includes('وايت موكا')) {
      return render3DIcedCup({
        layers: [
          { pct: 26, col: '#fefce8', colLight: '#ffffff', colDark: '#fef08a' }, // White chocolate
          { pct: 42, col: '#f5ebe0', colLight: '#ffffff', colDark: '#ede1d2' }, // Cold milk
          { pct: 32, col: '#281206', colLight: '#46200c', colDark: '#1a0a03' }  // Espresso
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

  // 7. HOT COFFEE DRINKS (Matte Black Takeaway Cup with Black Lid - Matching Image 1)
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
        { pct: 35, col: '#0d0b09', colLight: '#1f1c19', colDark: '#080706' }  // Empty upper cup
      ],
      topStyle: 'crema'
    });
  }

  if (id.includes('americano') || name.includes('أمريكانو')) {
    return render3DHotCup({
      layers: [
        { pct: 30, col: '#240f04', colLight: '#3d1b09', colDark: '#180802' }, // Espresso base
        { pct: 70, col: '#76b7db', colLight: '#a1d4ee', colDark: '#5aa3cb' }  // Alpine Sky Blue Water
      ],
      topStyle: 'crema',
      isAmericano: true
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
        { pct: 25, col: '#fae8b2', colLight: '#fff5d6', colDark: '#f5d98e' }, // Sweet condensed milk
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Microfoam
      ],
      topStyle: 'foam'
    });
  }

  if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    return render3DHotCup({
      layers: [
        { pct: 25, col: '#4d7c0f', colLight: '#65a30d', colDark: '#3f6212' }, // Pistachio cream
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Microfoam
      ],
      topStyle: 'pistachio'
    });
  }

  if (id.includes('white-mocha') || name.includes('وايت موكا')) {
    return render3DHotCup({
      layers: [
        { pct: 25, col: '#fefce8', colLight: '#ffffff', colDark: '#fef08a' }, // White chocolate ganache
        { pct: 35, col: '#2b1307', colLight: '#48220e', colDark: '#1d0b03' }, // Espresso
        { pct: 30, col: '#f7eee3', colLight: '#ffffff', colDark: '#ede2d3' }, // Steamed milk
        { pct: 10, col: '#ffffff', colLight: '#ffffff', colDark: '#f5eee5' }  // Microfoam
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
