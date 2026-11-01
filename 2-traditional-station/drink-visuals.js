// Emad Afandi Specialty Coffee Lab - 3D Architectural Vector Visual System for Traditional & Turkish Coffee
// Tailored to Emad Afandi's Heritage Presentation:
// 1. Turkish Coffee: 3D Royal Porcelain Finjan with Saucer & Thick Tiger Crema (وش القهوة المتماسك)
// 2. French Coffee: 3D Royal Porcelain French Finjan with Saucer & Velvety Foam / Gourmet Flavors (فنجان فرنساوي فاخر)
// 3. Hot Specialties: 3D Royal Ceramic Mug with Saucer & Decadent Toppings (مارشميلو، لوتس، بستاشيو، كراميل)
// 4. Arabic & Heritage Brews: 3D Golden Saudi Dallah / Sudanese Folkloric Jabana & Finjan
// 5. Karak & Spiced Chai: 3D Traditional Glass with Spiced Milk Tea & Whole Cardamom Pods

let _svgUidCounter = 0;
function getNextSvgId(prefix) {
  _svgUidCounter++;
  return `${prefix}_${_svgUidCounter}_${Math.random().toString(36).substring(2, 7)}`;
}

// ========================================================
// 1. 3D ROYAL PORCELAIN TURKISH FINJAN & SAUCER (Turkish Coffee)
// ========================================================
function render3DTurkishFinjan(options) {
  const id = getNextSvgId('finjan');
  const roast = options.roast || 'medium'; // 'light', 'medium', 'dark'
  const isSpiced = options.isSpiced || false;

  let brewColDark = '#200d04';
  let brewCol = '#3d1d07';
  let brewColLight = '#592d0e';
  let cremaCol = '#a16215';
  let cremaColLight = '#d98e32';
  let cremaColDark = '#78350f';

  if (roast === 'light') {
    brewColDark = '#3d1d07';
    brewCol = '#592d0e';
    brewColLight = '#78350f';
    cremaCol = '#c68428';
    cremaColLight = '#f59e0b';
    cremaColDark = '#92400e';
  } else if (roast === 'dark') {
    brewColDark = '#100602';
    brewCol = '#1f0d04';
    brewColLight = '#2d1407';
    cremaCol = '#78350f';
    cremaColLight = '#92400e';
    cremaColDark = '#451a03';
  }

  let saucerCardamom = '';
  let cremaCardamom = '';
  let plainCremaStreaks = `
    <!-- Inner Tiger Streaks for Plain Unspiced Coffee -->
    <path d="M 42 74 Q 52 71 62 75 Q 70 72 78 74" stroke="${cremaColDark}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <circle cx="48" cy="73" r="1.4" fill="#fef08a"/>
    <circle cx="71" cy="74" r="1.2" fill="#fef08a"/>
  `;

  if (isSpiced) {
    plainCremaStreaks = '';
    saucerCardamom = `
      <!-- Prominent Whole Green Cardamom Pod & Fragrant Seeds on Saucer -->
      <g id="${id}_saucer_cardamom" transform="translate(27, 134) rotate(-22)">
        <!-- Soft Drop Shadow on Porcelain Saucer -->
        <ellipse cx="1" cy="4" rx="12" ry="4" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

        <!-- Cardamom Pod Capsule Body (Multi-Stop Green) -->
        <path d="M -11 0 C -9.5 -5.2 -3 -6.8 3.5 -5.5 C 9 -4.2 12.5 -1.5 14 0 C 12.5 1.5 9 4.2 3.5 5.5 C -3 6.8 -9.5 5.2 -11 0 Z" 
              fill="url(#${id}_cardamom)" stroke="#14532d" stroke-width="0.85"/>

        <!-- 3-Chamber Longitudinal Ridge Lines -->
        <!-- Center Ridge Crest (Golden Lime Sunlight Highlight) -->
        <path d="M -10 0 C -2 -1 4 -1 13 0" stroke="#facc15" stroke-width="0.9" stroke-linecap="round" fill="none"/>
        <path d="M -10 0.6 C -2 -0.2 4 -0.2 13 0.6" stroke="#14532d" stroke-width="0.7" stroke-linecap="round" fill="none"/>
        
        <!-- Top Rib Segment -->
        <path d="M -9 -2.8 C -2 -4.6 3.5 -4 11.5 -1" stroke="#d9f99d" stroke-width="0.75" stroke-linecap="round" fill="none"/>
        <!-- Bottom Rib Segment -->
        <path d="M -9 2.8 C -2 4.6 3.5 4 11.5 1" stroke="#166534" stroke-width="0.85" stroke-linecap="round" fill="none"/>

        <!-- Dried Floral Beak / Calyx Tip at Apex -->
        <path d="M 13.5 -0.6 L 17 -1.2 L 15.2 0.4 L 17.5 0 L 13.5 -0.6" fill="#4d7c0f" stroke="#14532d" stroke-width="0.5"/>
        <!-- Pedicel Stem Base -->
        <circle cx="-11" cy="0" r="1.1" fill="#14532d"/>

        <!-- Aromatic Dark Cardamom Seeds Beside Pod -->
        <ellipse cx="-1" cy="6.5" rx="2" ry="1.3" fill="#1c1917" stroke="#44403c" stroke-width="0.5"/>
        <circle cx="-0.8" cy="6.2" r="0.4" fill="#a8a29e"/>
        <ellipse cx="5" cy="7" rx="1.6" ry="1.1" fill="#292524" stroke="#57534e" stroke-width="0.4"/>
      </g>
    `;

    cremaCardamom = `
      <!-- Floating Green Cardamom Pod & Ground Spice Specks on Crema Foam -->
      <g id="${id}_crema_cardamom" transform="translate(60, 73) rotate(-14)">
        <!-- Cast Shadow on Crema -->
        <ellipse cx="0" cy="2.8" rx="12" ry="4" fill="rgba(15,7,3,0.75)" filter="url(#${id}_blur)"/>
        
        <!-- Pod Capsule Shell -->
        <path d="M -11 0 C -9.5 -4.8 -3 -6.2 3 -5 C 8.5 -3.8 11.5 -1.5 13 0 C 11.5 1.5 8.5 3.8 3 5 C -3 6.2 -9.5 4.8 -11 0 Z" 
              fill="url(#${id}_cardamom)" stroke="#14532d" stroke-width="0.8"/>

        <!-- 3 Characteristic Longitudinal Ribs -->
        <path d="M -10 0 C -2 -1 3.5 -1 12 0" stroke="#fef08a" stroke-width="0.95" stroke-linecap="round" fill="none"/>
        <path d="M -10 0.6 C -2 -0.2 3.5 -0.2 12 0.6" stroke="#14532d" stroke-width="0.65" stroke-linecap="round" fill="none"/>
        <path d="M -9 -2.5 C -2 -4 3 -3.5 11 -0.8" stroke="#d9f99d" stroke-width="0.75" stroke-linecap="round" fill="none"/>
        <path d="M -9 2.5 C -2 4 3 3.5 11 0.8" stroke="#1e3a1f" stroke-width="0.8" stroke-linecap="round" fill="none"/>

        <!-- Floral Calyx Crown -->
        <path d="M 12.5 0 L 15.5 -0.9 L 14 0.4 L 16 0 L 12.5 0" fill="#3f6212" stroke="#14532d" stroke-width="0.4"/>
        <circle cx="-11" cy="0" r="1.0" fill="#14532d"/>

        <!-- Aromatic Fresh Ground Cardamom Specks on Crema -->
        <circle cx="-6" cy="-5" r="0.9" fill="#84cc16"/>
        <circle cx="7" cy="5.2" r="1.0" fill="#4d7c0f"/>
        <circle cx="-8" cy="4.5" r="0.7" fill="#166534"/>
        <circle cx="2" cy="-5.5" r="0.7" fill="#facc15"/>
        <circle cx="9" cy="-3.5" r="0.8" fill="#3f6212"/>
      </g>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- Royal Porcelain Finjan Gradients -->
        <linearGradient id="${id}_porcelain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#14161c"/>
          <stop offset="25%" stop-color="#2a2e39"/>
          <stop offset="50%" stop-color="#3d4352"/>
          <stop offset="78%" stop-color="#22252e"/>
          <stop offset="100%" stop-color="#111317"/>
        </linearGradient>

        <linearGradient id="${id}_gold_rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="35%" stop-color="#fde047"/>
          <stop offset="65%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>

        <linearGradient id="${id}_brew" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${brewColDark}"/>
          <stop offset="30%" stop-color="${brewColLight}"/>
          <stop offset="70%" stop-color="${brewCol}"/>
          <stop offset="100%" stop-color="${brewColDark}"/>
        </linearGradient>

        <linearGradient id="${id}_crema" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${cremaColDark}"/>
          <stop offset="30%" stop-color="${cremaColLight}"/>
          <stop offset="70%" stop-color="${cremaCol}"/>
          <stop offset="100%" stop-color="${cremaColDark}"/>
        </linearGradient>

        <!-- Fresh Green Cardamom Multi-Stop Realistic Gradient -->
        <linearGradient id="${id}_cardamom" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#bef264"/>
          <stop offset="25%" stop-color="#84cc16"/>
          <stop offset="60%" stop-color="#4d7c0f"/>
          <stop offset="100%" stop-color="#1e3a1f"/>
        </linearGradient>

        <clipPath id="${id}_cup_clip">
          <path d="M 30 72 C 30 120 40 134 60 134 C 80 134 90 120 90 72 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Ground Drop Shadow -->
      <ellipse cx="60" cy="146" rx="46" ry="7" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Porcelain Saucer with Gold Edge -->
      <ellipse cx="60" cy="138" rx="48" ry="11" fill="url(#${id}_porcelain)" stroke="url(#${id}_gold_rim)" stroke-width="1.3"/>
      <ellipse cx="60" cy="136" rx="38" ry="7.5" fill="#0c0d10" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>

      <!-- 3. Cup Handle (Curved Ergonomic Brass Handle) -->
      <path d="M 88 82 C 104 82 104 116 86 118" stroke="url(#${id}_gold_rim)" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      <path d="M 88 84 C 101 84 101 114 86 116" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round" fill="none"/>

      <!-- 4. Porcelain Finjan Body -->
      <path d="M 28 72 C 28 122 38 136 60 136 C 82 136 92 122 92 72 Z" fill="url(#${id}_porcelain)" stroke="rgba(212,175,55,0.8)" stroke-width="1.2"/>

      <!-- 5. Liquid Fill with Cutaway Depth -->
      <g clip-path="url(#${id}_cup_clip)">
        <!-- Rich Turkish Brew Base -->
        <rect x="25" y="70" width="70" height="70" fill="url(#${id}_brew)"/>
        <!-- Settled Coffee Grounds Layer at Bottom -->
        <path d="M 38 126 C 45 130 75 130 82 126 L 82 136 L 38 136 Z" fill="#140602"/>
      </g>

      <!-- 6. Golden Royal Arabesque Pattern on Cup Front -->
      <path d="M 44 95 Q 60 105 76 95" stroke="rgba(212,175,55,0.75)" stroke-width="1.2" fill="none"/>
      <circle cx="60" cy="100" r="2.2" fill="#d4af37"/>
      <circle cx="50" cy="98" r="1.3" fill="#d4af37"/>
      <circle cx="70" cy="98" r="1.3" fill="#d4af37"/>
      <path d="M 48 110 Q 60 118 72 110" stroke="rgba(212,175,55,0.5)" stroke-width="1" fill="none"/>

      <!-- Saucer Cardamom Pod & Fragrant Seeds (if spiced) -->
      ${saucerCardamom}

      <!-- 7. Thick Tiger Crema Surface (وش القهوة السميك المتماسك) -->
      <ellipse cx="60" cy="74" rx="30" ry="8" fill="url(#${id}_crema)" stroke="url(#${id}_gold_rim)" stroke-width="1.2"/>
      <!-- Inner Tiger Streaks -->
      <ellipse cx="60" cy="74" rx="24" ry="5.5" fill="${cremaColLight}" opacity="0.8"/>
      
      <!-- Crema Streaks for Plain -->
      ${plainCremaStreaks}

      <!-- Floating Cardamom Pod & Ground Cardamom Flecks (if spiced) -->
      ${cremaCardamom}

      <!-- Cup Rim Specular Highlight -->
      <ellipse cx="60" cy="72" rx="31" ry="8" stroke="rgba(255,255,255,0.5)" stroke-width="0.8" fill="none"/>
    </svg>
  `;
}


// ========================================================
// 2. 3D ROYAL PORCELAIN FRENCH COFFEE FINJAN & SAUCER (French Coffee)
// ========================================================
function render3DFrenchFinjan(options) {
  const id = getNextSvgId('french_finjan');
  const flavor = options.flavor || 'classic'; // 'classic', 'caramel', 'hazelnut', 'chocolate', 'vanilla'

  let foamCol = '#fffbf2';
  let foamRimCol = '#c29b72';
  let toppingsSvg = '';

  if (flavor === 'caramel') {
    toppingsSvg = `
      <!-- Golden Caramel Drizzle Lattice & Droplets -->
      <g>
        <path d="M 40 68 Q 60 63 80 68" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <path d="M 43 72 Q 60 67 77 72" stroke="#b45309" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        <path d="M 47 64 L 53 73" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 60 63 L 66 73" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
        <path d="M 72 65 L 75 72" stroke="#b45309" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="56" cy="69" r="1.3" fill="#fef08a"/>
        <circle cx="68" cy="67" r="1.1" fill="#fde047"/>
      </g>
    `;
  } else if (flavor === 'chocolate') {
    toppingsSvg = `
      <!-- Dark Ganache Drizzle & Fine Cocoa Dust -->
      <g>
        <path d="M 42 69 Q 54 64 66 70 Q 74 65 78 69" stroke="#220e06" stroke-width="2.4" stroke-linecap="round" fill="none"/>
        <path d="M 45 66 Q 60 63 75 66" stroke="#3b1d0e" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        <circle cx="49" cy="67" r="1.2" fill="#140602"/>
        <circle cx="61" cy="65" r="1.4" fill="#140602"/>
        <circle cx="70" cy="68" r="1.0" fill="#140602"/>
        <circle cx="55" cy="71" r="0.9" fill="#140602"/>
        <circle cx="64" cy="71" r="1.1" fill="#140602"/>
      </g>
    `;
  } else if (flavor === 'hazelnut') {
    toppingsSvg = `
      <!-- Roasted Praline Drizzle & Crushed Hazelnut Flecks -->
      <g>
        <path d="M 41 68 Q 60 63 79 68" stroke="#92400e" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="47" cy="67" r="1.5" fill="#78350f"/>
        <circle cx="53" cy="71" r="1.2" fill="#b45309"/>
        <circle cx="62" cy="65" r="1.6" fill="#78350f"/>
        <circle cx="69" cy="69" r="1.3" fill="#92400e"/>
        <circle cx="74" cy="66" r="1.1" fill="#b45309"/>
        <circle cx="58" cy="68" r="0.9" fill="#fde68a"/>
      </g>
    `;
  } else if (flavor === 'vanilla') {
    toppingsSvg = `
      <!-- Silky Vanilla Cream Foam with Vanilla Bean Specks -->
      <g>
        <ellipse cx="60" cy="68" rx="22" ry="5" fill="#fef9ee" opacity="0.95"/>
        <circle cx="48" cy="67" r="0.8" fill="#1c1917"/>
        <circle cx="54" cy="70" r="0.9" fill="#292524"/>
        <circle cx="62" cy="66" r="0.7" fill="#1c1917"/>
        <circle cx="68" cy="69" r="0.9" fill="#292524"/>
        <circle cx="72" cy="67" r="0.7" fill="#1c1917"/>
      </g>
    `;
  } else {
    // Classic French Coffee
    toppingsSvg = `
      <!-- Velvety Milk Foam with Delicate Espresso Crema Ring & Heart Swirl -->
      <g>
        <ellipse cx="60" cy="68" rx="24" ry="5.5" fill="#fffdfa" opacity="0.9"/>
        <path d="M 52 68 Q 60 64 68 68 Q 60 72 52 68 Z" fill="#b45309" opacity="0.75"/>
        <path d="M 54 68 Q 60 65 66 68" stroke="#fef08a" stroke-width="1" stroke-linecap="round" fill="none"/>
      </g>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>

        <!-- Royal Porcelain Gradients -->
        <linearGradient id="${id}_porcelain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#12141a"/>
          <stop offset="25%" stop-color="#262a34"/>
          <stop offset="50%" stop-color="#3b4150"/>
          <stop offset="78%" stop-color="#20232c"/>
          <stop offset="100%" stop-color="#0f1115"/>
        </linearGradient>

        <linearGradient id="${id}_gold_rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="35%" stop-color="#fde047"/>
          <stop offset="65%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>

        <linearGradient id="${id}_coffee_milk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e8d5be"/>
          <stop offset="35%" stop-color="#9a6943"/>
          <stop offset="70%" stop-color="#5a2f16"/>
          <stop offset="100%" stop-color="#2a1408"/>
        </linearGradient>

        <clipPath id="${id}_finjan_clip">
          <path d="M 24 66 C 24 118 36 136 60 136 C 84 136 96 118 96 66 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Ground Drop Shadow -->
      <ellipse cx="60" cy="148" rx="48" ry="7.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Wide Porcelain Saucer with Polished Gold Trim -->
      <ellipse cx="60" cy="140" rx="52" ry="11.5" fill="url(#${id}_porcelain)" stroke="url(#${id}_gold_rim)" stroke-width="1.4"/>
      <ellipse cx="60" cy="138" rx="42" ry="7.5" fill="#090a0d" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>

      <!-- 3. Ergonomic Curved Brass/Gold Handle -->
      <path d="M 94 76 C 114 76 114 116 90 120" stroke="url(#${id}_gold_rim)" stroke-width="3.6" stroke-linecap="round" fill="none"/>
      <path d="M 94 78 C 110 78 110 114 90 118" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" stroke-linecap="round" fill="none"/>

      <!-- 4. Porcelain French Finjan Body -->
      <path d="M 22 66 C 22 120 34 138 60 138 C 86 138 98 120 98 66 Z" fill="url(#${id}_porcelain)" stroke="url(#${id}_gold_rim)" stroke-width="1.3"/>

      <!-- 5. Volumetric Coffee & Milk Blend Cutaway -->
      <g clip-path="url(#${id}_finjan_clip)">
        <rect x="20" y="64" width="80" height="76" fill="url(#${id}_coffee_milk)"/>
        <!-- Soft Milk Froth Blending Ribbons -->
        <path d="M 26 86 Q 60 78 94 86 L 94 96 Q 60 88 26 96 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M 32 108 Q 60 102 88 108 L 88 116 Q 60 110 32 116 Z" fill="rgba(255,255,255,0.08)"/>
      </g>

      <!-- 6. French Finjan Front Royal Arabesque Badge -->
      <path d="M 42 96 Q 60 106 78 96" stroke="rgba(212,175,55,0.7)" stroke-width="1.2" fill="none"/>
      <circle cx="60" cy="101" r="2.2" fill="#d4af37"/>
      <circle cx="50" cy="99" r="1.3" fill="#d4af37"/>
      <circle cx="70" cy="99" r="1.3" fill="#d4af37"/>
      <path d="M 46 112 Q 60 120 74 112" stroke="rgba(212,175,55,0.45)" stroke-width="0.9" fill="none"/>

      <!-- 7. Thick Velvety Milk Microfoam Surface -->
      <ellipse cx="60" cy="68" rx="37" ry="9.5" fill="${foamCol}" stroke="url(#${id}_gold_rim)" stroke-width="1.3"/>
      <!-- Crema Perimeter Ring -->
      <ellipse cx="60" cy="68" rx="34" ry="8" fill="none" stroke="${foamRimCol}" stroke-width="1.5" opacity="0.6"/>

      <!-- Flavor Toppings -->
      ${toppingsSvg}

      <!-- Finjan Rim Specular Highlight -->
      <ellipse cx="60" cy="66" rx="38" ry="9.5" stroke="rgba(255,255,255,0.6)" stroke-width="0.9" fill="none"/>
    </svg>
  `;
}

// ========================================================
// 3. 3D ROYAL CERAMIC HOT MUG & SAUCER (Hot Specialties)
// ========================================================
function render3DHotCeramicMug(options) {
  const id = getNextSvgId('hot_mug');
  const type = options.type || 'chocolate'; // 'chocolate', 'batata', 'lotus', 'pistachio'

  let liquidGrad = '';
  let toppingsSvg = '';

  if (type === 'chocolate') {
    liquidGrad = `
      <linearGradient id="${id}_liq" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4a2211"/>
        <stop offset="50%" stop-color="#2a1207"/>
        <stop offset="100%" stop-color="#140602"/>
      </linearGradient>
    `;
    toppingsSvg = `
      <!-- Fluffy White Marshmallow Cubes floating on Chocolate -->
      <g>
        <rect x="44" y="58" width="9" height="7" rx="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
        <path d="M 45 61 L 52 61" stroke="#3b1d0e" stroke-width="0.8"/>
        <rect x="56" y="56" width="10" height="8" rx="2" fill="#f8fafc" stroke="#e2e8f0" stroke-width="0.6" transform="rotate(-8 61 60)"/>
        <path d="M 57 59 L 65 59" stroke="#3b1d0e" stroke-width="0.9" transform="rotate(-8 61 60)"/>
        <rect x="68" y="59" width="9" height="7" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6" transform="rotate(12 72 62)"/>
        <path d="M 40 65 Q 60 59 80 65" stroke="#140602" stroke-width="2" stroke-linecap="round" fill="none"/>
      </g>
    `;
  } else if (type === 'batata') {
    liquidGrad = `
      <linearGradient id="${id}_liq" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="40%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#78350f"/>
      </linearGradient>
    `;
    toppingsSvg = `
      <!-- Golden Sweet Potato Cream Swirl + Cinnamon & Caramel -->
      <g>
        <ellipse cx="60" cy="62" rx="26" ry="6.5" fill="#fef3c7" opacity="0.95"/>
        <path d="M 42 62 Q 60 57 78 62" stroke="#b45309" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <circle cx="48" cy="61" r="1.1" fill="#78350f"/>
        <circle cx="55" cy="64" r="1.2" fill="#78350f"/>
        <circle cx="66" cy="60" r="1.0" fill="#78350f"/>
        <circle cx="72" cy="63" r="1.1" fill="#78350f"/>
      </g>
    `;
  } else if (type === 'lotus') {
    liquidGrad = `
      <linearGradient id="${id}_liq" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#d97706"/>
        <stop offset="40%" stop-color="#b45309"/>
        <stop offset="100%" stop-color="#78350f"/>
      </linearGradient>
    `;
    toppingsSvg = `
      <!-- Lotus Biscoff Sauce & Crumbled Speculoos Biscuit -->
      <g>
        <ellipse cx="60" cy="62" rx="26" ry="6.5" fill="#fef08a" opacity="0.85"/>
        <path d="M 40 62 Q 60 58 80 62" stroke="#b45309" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <circle cx="46" cy="61" r="1.6" fill="#c2781b"/>
        <circle cx="54" cy="63" r="1.4" fill="#92400e"/>
        <circle cx="62" cy="60" r="1.8" fill="#c2781b"/>
        <circle cx="70" cy="63" r="1.5" fill="#92400e"/>
        <circle cx="76" cy="61" r="1.2" fill="#c2781b"/>
      </g>
    `;
  } else if (type === 'pistachio') {
    liquidGrad = `
      <linearGradient id="${id}_liq" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#65a30d"/>
        <stop offset="40%" stop-color="#4d7c0f"/>
        <stop offset="100%" stop-color="#365314"/>
      </linearGradient>
    `;
    toppingsSvg = `
      <!-- Emerald Pistachio Cream & Crushed Iranian Pistachio Bits -->
      <g>
        <ellipse cx="60" cy="62" rx="26" ry="6.5" fill="#d9f99d" opacity="0.9"/>
        <path d="M 41 62 Q 60 58 79 62" stroke="#4d7c0f" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="46" cy="61" r="1.5" fill="#365314"/>
        <circle cx="53" cy="64" r="1.3" fill="#65a30d"/>
        <circle cx="61" cy="60" r="1.6" fill="#365314"/>
        <circle cx="68" cy="63" r="1.4" fill="#4d7c0f"/>
        <circle cx="74" cy="61" r="1.2" fill="#365314"/>
      </g>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>

        <linearGradient id="${id}_ceramic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#141720"/>
          <stop offset="25%" stop-color="#282d3b"/>
          <stop offset="50%" stop-color="#3e4558"/>
          <stop offset="78%" stop-color="#232733"/>
          <stop offset="100%" stop-color="#101218"/>
        </linearGradient>

        <linearGradient id="${id}_gold_rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="35%" stop-color="#fde047"/>
          <stop offset="65%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>

        ${liquidGrad}

        <clipPath id="${id}_mug_clip">
          <path d="M 26 60 C 26 122 36 138 60 138 C 84 138 94 122 94 60 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Drop Shadow -->
      <ellipse cx="60" cy="148" rx="46" ry="7.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Ceramic Saucer with Gold Accent -->
      <ellipse cx="60" cy="142" rx="48" ry="11" fill="url(#${id}_ceramic)" stroke="url(#${id}_gold_rim)" stroke-width="1.3"/>
      <ellipse cx="60" cy="140" rx="38" ry="7" fill="#0b0c10" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>

      <!-- 3. Heavy Ceramic Mug Handle -->
      <path d="M 92 70 C 114 70 114 116 88 120" stroke="url(#${id}_gold_rim)" stroke-width="3.8" stroke-linecap="round" fill="none"/>
      <path d="M 92 72 C 110 72 110 114 88 118" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linecap="round" fill="none"/>

      <!-- 4. Ceramic Mug Body -->
      <path d="M 24 60 C 24 124 34 140 60 140 C 86 140 96 124 96 60 Z" fill="url(#${id}_ceramic)" stroke="url(#${id}_gold_rim)" stroke-width="1.3"/>

      <!-- 5. Liquid Fill Cutaway -->
      <g clip-path="url(#${id}_mug_clip)">
        <rect x="22" y="58" width="76" height="84" fill="url(#${id}_liq)"/>
        <!-- Soft Milk / Cream Swirl Depth -->
        <path d="M 28 82 Q 60 74 92 82 L 92 90 Q 60 82 28 90 Z" fill="rgba(255,255,255,0.15)"/>
        <path d="M 34 104 Q 60 98 86 104 L 86 112 Q 60 106 34 112 Z" fill="rgba(255,255,255,0.08)"/>
      </g>

      <!-- 6. Front Royal Medallion -->
      <circle cx="60" cy="98" r="8" fill="rgba(212,175,55,0.15)" stroke="url(#${id}_gold_rim)" stroke-width="1"/>
      <path d="M 56 98 L 60 94 L 64 98 L 60 102 Z" fill="#f5d36e"/>

      <!-- 7. Drink Top Surface -->
      <ellipse cx="60" cy="62" rx="35" ry="9" fill="url(#${id}_liq)" stroke="url(#${id}_gold_rim)" stroke-width="1.2"/>

      <!-- Decadent Toppings -->
      ${toppingsSvg}

      <!-- Rim Specular Reflection -->
      <ellipse cx="60" cy="60" rx="36" ry="9" stroke="rgba(255,255,255,0.55)" stroke-width="0.9" fill="none"/>
    </svg>
  `;
}

// ========================================================
// 4. 3D GOLDEN SAUDI DALLAH & FINJAN (Arabic Coffee & Jabana)
// ========================================================
function render3DArabicDallah(options) {
  if (options && options.isJabana) {
    return render3DSudaneseJabana();
  }
  const id = getNextSvgId('dallah');

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Ground Shadow Blur -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- Polished Royal Brass Gradient (High-end metallic reflection) -->
        <linearGradient id="${id}_brass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="18%" stop-color="#ca8a04"/>
          <stop offset="38%" stop-color="#fef08a"/>
          <stop offset="65%" stop-color="#eab308"/>
          <stop offset="85%" stop-color="#a16207"/>
          <stop offset="100%" stop-color="#582404"/>
        </linearGradient>

        <!-- Brass Highlight -->
        <linearGradient id="${id}_spec" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ca8a04"/>
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#eab308"/>
        </linearGradient>

        <!-- Golden Saffron Gahwa Gradient -->
        <linearGradient id="${id}_gahwa_gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="30%" stop-color="#b45309"/>
          <stop offset="70%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#ca8a04"/>
        </linearGradient>

        <!-- Finjan Porcelain -->
        <linearGradient id="${id}_porcelain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="35%" stop-color="#ffffff"/>
          <stop offset="75%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>

      <!-- 1. Soft Floor Shadow -->
      <ellipse cx="56" cy="153" rx="42" ry="5.5" fill="rgba(0,0,0,0.92)" filter="url(#${id}_blur)"/>

      <!-- 2. Authentic Saudi Dallah Body -->
      <!-- Flared Stepped Circular Pedestal Base -->
      <path d="M 33 148 L 38 135 L 68 135 L 73 148 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="0.8"/>
      <ellipse cx="53" cy="148" rx="20" ry="3" fill="#582404" stroke="#ca8a04" stroke-width="0.8"/>
      <ellipse cx="53" cy="135" rx="15" ry="2.2" fill="#854d0e" stroke="#fef08a" stroke-width="0.6"/>

      <!-- Bell-shaped Lower Belly -->
      <path d="M 38 135 C 32 120 34 104 46 96 L 60 96 C 72 104 74 120 68 135 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="0.8"/>

      <!-- Slender Pinched Waist & Flared Neck -->
      <path d="M 46 96 C 47 80 44 65 43 50 L 63 50 C 62 65 59 80 60 96 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="0.8"/>

      <!-- Neck Collar Rings (Decorative Engraved Rings) -->
      <ellipse cx="53" cy="96" rx="7.2" ry="1.6" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8"/>
      <ellipse cx="53" cy="74" rx="6.5" ry="1.5" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8"/>
      <ellipse cx="53" cy="50" rx="10" ry="2.2" fill="#b45309" stroke="#fef08a" stroke-width="0.9"/>

      <!-- 3. Majestic Stepped Lid & Tall Finial Spire -->
      <!-- Lower Stepped Lid Dome -->
      <path d="M 43 50 C 44 42 62 42 63 50 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="0.8"/>
      <ellipse cx="53" cy="45" rx="7.5" ry="1.8" fill="#ca8a04" stroke="#fef08a" stroke-width="0.7"/>

      <!-- Upper Stepped Cone -->
      <path d="M 46 45 L 50 30 L 56 30 L 60 45 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="0.8"/>
      <ellipse cx="53" cy="30" rx="3.5" ry="1.2" fill="#fef08a"/>

      <!-- Tall Sharp Brass Finial Spire (تاج الدلة التراثي) -->
      <path d="M 52 30 L 53 10 L 54 30 Z" fill="url(#${id}_spec)" stroke="#b45309" stroke-width="0.6"/>
      <circle cx="53" cy="9" r="1.8" fill="#fef08a" stroke="#ca8a04" stroke-width="0.6"/>

      <!-- 4. The Authentic Gracefully Arched Spout (منقار الدلة المقوس للأعلى) -->
      <path d="M 37 114 C 20 108 14 78 20 52 C 22 44 26 38 31 32 C 29 40 26 48 24 56 C 21 76 27 96 41 106 Z" 
            fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="0.9"/>
      <!-- Beak Pouring Mouth Flap -->
      <ellipse cx="30" cy="33" rx="2.4" ry="4.5" transform="rotate(-30 30 33)" fill="#78350f" stroke="#fef08a" stroke-width="0.8"/>
      <path d="M 28 30 Q 32 26 34 32" stroke="#fef08a" stroke-width="0.8" fill="none"/>

      <!-- 5. Sweeping Arched Brass Handle with Rivets -->
      <path d="M 62 54 C 84 52 86 112 66 126" stroke="#451a03" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M 62 54 C 84 52 86 112 66 126" stroke="url(#${id}_brass)" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 62 54 C 84 52 86 112 66 126" stroke="rgba(255,255,255,0.7)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
      <circle cx="62" cy="55" r="1.8" fill="#78350f" stroke="#fef08a" stroke-width="0.6"/>
      <circle cx="66" cy="125" r="1.8" fill="#78350f" stroke="#fef08a" stroke-width="0.6"/>

      <!-- 6. Metallic Specular Light Reflections down Dallah Body -->
      <path d="M 50 51 C 49 65 48 80 49 95" stroke="rgba(255,255,255,0.65)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M 45 98 C 39 108 38 122 43 133" stroke="rgba(255,255,255,0.6)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
      <path d="M 23 58 C 21 75 25 90 35 102" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" fill="none"/>

      <!-- 7. Authentic Saudi Arabian Finjan (فنجان بيالة أبيض وزخارف ذهبية) -->
      <g transform="translate(68, 116)">
        <ellipse cx="20" cy="35" rx="14" ry="3.5" fill="rgba(0,0,0,0.6)" filter="url(#${id}_blur)"/>

        <!-- Porcelain Body -->
        <path d="M 8 14 C 8 28 12 34 20 34 C 28 34 32 28 32 14 Z" fill="url(#${id}_porcelain)" stroke="#ca8a04" stroke-width="0.9"/>
        <!-- Gold Rim -->
        <ellipse cx="20" cy="14" rx="12" ry="3" fill="#f8fafc" stroke="#eab308" stroke-width="1.2"/>
        
        <!-- Golden Gahwa inside Finjan -->
        <ellipse cx="20" cy="15" rx="10.5" ry="2.4" fill="url(#${id}_gahwa_gold)"/>
        <ellipse cx="20" cy="15" rx="7" ry="1.4" fill="#fef08a" opacity="0.6"/>
        <line x1="18" y1="15" x2="22" y2="14.8" stroke="#dc2626" stroke-width="0.8"/>
        <line x1="19" y1="15.5" x2="21" y2="16" stroke="#ea580c" stroke-width="0.7"/>

        <!-- Traditional Gold Filigree Band -->
        <path d="M 9 22 Q 20 25 31 22" stroke="#d97706" stroke-width="1.2" fill="none"/>
        <circle cx="20" cy="23.5" r="1.1" fill="#ca8a04"/>
        <circle cx="15" cy="23" r="0.8" fill="#ca8a04"/>
        <circle cx="25" cy="23" r="0.8" fill="#ca8a04"/>
      </g>
    </svg>
  `;
}

function render3DSudaneseJabana() {
  const id = getNextSvgId('jabana');

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Ground Shadow Blur -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2"/>
        </filter>

        <!-- Handcrafted Earthen Terracotta Clay Gradient -->
        <linearGradient id="${id}_clay" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2d0d04"/>
          <stop offset="22%" stop-color="#5a1e0a"/>
          <stop offset="50%" stop-color="#9a3412"/>
          <stop offset="78%" stop-color="#c2410c"/>
          <stop offset="92%" stop-color="#7c2d12"/>
          <stop offset="100%" stop-color="#220a03"/>
        </linearGradient>

        <!-- Burnished Clay Surface Highlight -->
        <linearGradient id="${id}_clay_spec" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#9a3412"/>
          <stop offset="50%" stop-color="#fdba74" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#c2410c"/>
        </linearGradient>

        <!-- Traditional Woven Palm Stand (الوقاية) Gradient -->
        <linearGradient id="${id}_stand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#451a03"/>
          <stop offset="25%" stop-color="#b45309"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="75%" stop-color="#92400e"/>
          <stop offset="100%" stop-color="#3b1502"/>
        </linearGradient>

        <!-- Palm Fiber Filter (الـلـيـفـة) -->
        <linearGradient id="${id}_fiber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef3c7"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>

      <!-- 1. Soft Floor Shadow -->
      <ellipse cx="56" cy="153" rx="42" ry="5.5" fill="rgba(0,0,0,0.92)" filter="url(#${id}_blur)"/>

      <!-- 2. Traditional Coiled Palm Fiber Stand (الوقاية - قاعدة الجبنة المضفورة) -->
      <ellipse cx="54" cy="146" rx="26" ry="7" fill="url(#${id}_stand)" stroke="#78350f" stroke-width="1"/>
      <ellipse cx="54" cy="146" rx="22" ry="5.5" stroke="#fde68a" stroke-width="1.2" stroke-dasharray="3.5 2.5" fill="none"/>
      <ellipse cx="54" cy="143" rx="18" ry="4.5" fill="#451a03" stroke="#b45309" stroke-width="0.8"/>

      <!-- 3. Authentic Round Spherical Terracotta Clay Belly (بطن الجبنة الكروية) -->
      <circle cx="54" cy="112" r="26" fill="url(#${id}_clay)" stroke="#451a03" stroke-width="1"/>

      <!-- Authentic Folkloric Engraved Tribal Markings (نقوش فلكلورية بيضاء محفورة) -->
      <path d="M 33 112 Q 54 116 75 112" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-dasharray="4 2" fill="none"/>
      <path d="M 36 104 Q 54 108 72 104" stroke="rgba(255,255,255,0.55)" stroke-width="1" stroke-dasharray="3 3" fill="none"/>
      <path d="M 36 120 Q 54 124 72 120" stroke="rgba(255,255,255,0.55)" stroke-width="1" stroke-dasharray="3 3" fill="none"/>
      
      <!-- Tribal Triangular Chevrons on Clay -->
      <path d="M 46 112 L 49 107 L 52 112 L 55 107 L 58 112 L 61 107 L 64 112" stroke="rgba(255,255,255,0.8)" stroke-width="1.1" fill="none"/>

      <!-- 4. Slender Cylindrical Clay Neck -->
      <path d="M 48 88 L 47 48 L 61 48 L 60 88 Z" fill="url(#${id}_clay)" stroke="#451a03" stroke-width="0.8"/>

      <!-- Flared Clay Mouth (فوهة الجبنة الواسعة) -->
      <ellipse cx="54" cy="48" rx="9" ry="3" fill="#3b1407" stroke="#ea580c" stroke-width="0.9"/>
      <ellipse cx="54" cy="47.5" rx="8" ry="2.2" fill="#1c0702"/>

      <!-- Natural Palm Fiber Strainer Peeking from Mouth (ليفة التصفية النخلية) -->
      <ellipse cx="54" cy="46" rx="6" ry="3.2" fill="url(#${id}_fiber)" stroke="#b45309" stroke-width="0.8"/>
      <path d="M 51 46 C 50 42 53 38 54 36" stroke="#d97706" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 54 46 C 55 41 57 37 58 35" stroke="#fde68a" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M 52 46 C 53 43 55 40 56 37" stroke="#b45309" stroke-width="1" stroke-linecap="round"/>

      <!-- 5. Gracefully Curved Clay Handle (مقبض الجبنة الفخاري) -->
      <path d="M 60 56 C 82 58 84 104 68 114" stroke="#260b03" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 60 56 C 82 58 84 104 68 114" stroke="url(#${id}_clay)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M 60 56 C 82 58 84 104 68 114" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" stroke-linecap="round" fill="none"/>

      <!-- Slender Arched Clay Spout (مصب الجبنة النحيل) -->
      <path d="M 47 98 C 34 94 30 72 38 60 C 37 66 38 78 48 88 Z" fill="url(#${id}_clay)" stroke="#451a03" stroke-width="0.9"/>
      <ellipse cx="38" cy="60" rx="1.8" ry="2.8" transform="rotate(-25 38 60)" fill="#1c0802" stroke="#ea580c" stroke-width="0.6"/>

      <!-- 6. 3D Burnished Surface Highlights on Earthenware -->
      <path d="M 46 95 C 38 104 38 120 46 128" stroke="rgba(255,255,255,0.45)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M 51 52 L 50 84" stroke="rgba(255,255,255,0.5)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <ellipse cx="50" cy="110" rx="4" ry="7" fill="rgba(255,255,255,0.18)" transform="rotate(-15 50 110)"/>

      <!-- 7. Matching Artisanal Earthen Finjan (فنجان طيني سوداني أصيل) -->
      <g transform="translate(70, 118)">
        <ellipse cx="18" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.6)" filter="url(#${id}_blur)"/>

        <!-- Terracotta Cup -->
        <path d="M 7 14 C 7 27 10 32 18 32 C 26 32 29 27 29 14 Z" fill="url(#${id}_clay)" stroke="#451a03" stroke-width="0.9"/>
        <ellipse cx="18" cy="14" rx="11" ry="3" fill="#3b1407" stroke="#ea580c" stroke-width="0.9"/>
        
        <!-- Deep Spiced Sudanese Coffee with Cardamom Crema -->
        <ellipse cx="18" cy="14.8" rx="9.5" ry="2.2" fill="#180702"/>
        <ellipse cx="18" cy="14.8" rx="6" ry="1.2" fill="#78350f" opacity="0.7"/>

        <!-- Tribal Chevron Carving on Finjan -->
        <path d="M 9 20 Q 18 23 27 20" stroke="rgba(255,255,255,0.7)" stroke-width="0.9" fill="none"/>
        <circle cx="18" cy="21.5" r="0.9" fill="#fdba74"/>
      </g>
    </svg>
  `;
}

function render3DHeritageChaiGlass(options) {
  const id = getNextSvgId('chai');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>

        <linearGradient id="${id}_karak_amber" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="25%" stop-color="#b45309"/>
          <stop offset="60%" stop-color="#d97706"/>
          <stop offset="85%" stop-color="#92400e"/>
          <stop offset="100%" stop-color="#451a03"/>
        </linearGradient>

        <clipPath id="${id}_glass_clip">
          <path d="M 32 38 L 38 126 C 39 138 46 142 60 142 C 74 142 81 138 82 126 L 88 38 Z"/>
        </clipPath>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="60" cy="148" rx="34" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Liquid fill inside glass -->
      <g clip-path="url(#${id}_glass_clip)">
        <rect x="25" y="36" width="70" height="110" fill="url(#${id}_karak_amber)"/>
        
        <!-- Creamy Steamed Cardamom Milk Cap -->
        <ellipse cx="60" cy="42" rx="28" ry="5.5" fill="#fef3c7" opacity="0.95"/>
        <ellipse cx="60" cy="42" rx="22" ry="3.5" fill="#fde68a" opacity="0.8"/>
        
        <!-- Whole Cardamom Pods & Cinnamon Stick -->
        <line x1="52" y1="20" x2="68" y2="70" stroke="#451a03" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="52" y1="20" x2="68" y2="70" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
        <circle cx="48" cy="42" r="1.6" fill="#365314"/>
        <circle cx="72" cy="43" r="1.4" fill="#365314"/>

        <!-- Glass Vertical Reflection Ribs -->
        <line x1="42" y1="42" x2="44" y2="135" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/>
        <line x1="78" y1="42" x2="76" y2="135" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/>
      </g>

      <!-- Glass Shell with Gold Rim -->
      <path d="M 32 38 L 38 126 C 39 138 46 142 60 142 C 74 142 81 138 82 126 L 88 38 Z" stroke="rgba(212,175,55,0.85)" stroke-width="1.3" fill="none"/>
      <ellipse cx="60" cy="38" rx="28" ry="4.5" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" fill="none"/>
    </svg>
  `;
}

// ========================================================
// MAIN DISPATCHER: getDrinkSvg(item)
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

function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  // 1. TURKISH COFFEE (Single & Double, Plain / Spiced, Light / Med / Dark, Specialty)
  if (id.includes('turkish') || name.includes('تركي')) {
    const isDark = id.includes('dark') || name.includes('غامق');
    const isLight = id.includes('light') || name.includes('فاتح');
    const isSpiced = id.includes('spiced') || name.includes('محوج');

    let roast = 'medium';
    if (isLight) roast = 'light';
    else if (isDark) roast = 'dark';

    return render3DTurkishFinjan({ roast, isSpiced });
  }

  // 2. HERITAGE BREWS (Arabic Coffee, Sudanese Jabana)
  if (id.includes('arabic') || name.includes('عربي')) {
    return render3DArabicDallah({ isJabana: false });
  }
  if (id.includes('jabana') || name.includes('جبنة') || name.includes('جبّنة')) {
    return render3DSudaneseJabana();
  }

  // 3. FRENCH COFFEE (All variants served in Royal French Finjans & Saucers)
  if (id.includes('french') || name.includes('فرنسا')) {
    if (id.includes('caramel') || name.includes('كراميل')) {
      return render3DFrenchFinjan({ flavor: 'caramel' });
    }
    if (id.includes('chocolate') || name.includes('شيكولاتة') || name.includes('شوكولاتة')) {
      return render3DFrenchFinjan({ flavor: 'chocolate' });
    }
    if (id.includes('hazelnut') || name.includes('بندق')) {
      return render3DFrenchFinjan({ flavor: 'hazelnut' });
    }
    if (id.includes('vanilla') || name.includes('فانيليا')) {
      return render3DFrenchFinjan({ flavor: 'vanilla' });
    }
    return render3DFrenchFinjan({ flavor: 'classic' });
  }

  // 4. HOT DRINKS (Matching Station 1 Sleek Black-Lid To-Go Cups with Layers & Toppings)
  // [A] Hot Chocolate
  if (id.includes('hot-chocolate') || name.includes('شوكليت') || name.includes('شوكولاتة')) {
    return render3DHotCup({
      layers: [
        { pct: 40, col: '#220f06', colLight: '#3a1b0b', colDark: '#120702' },
        { pct: 45, col: '#4a2410', colLight: '#603017', colDark: '#36180a' },
        { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f5ece1' }
      ],
      topStyle: 'cocoa'
    });
  }

  // [B] Hot Sweet Potato Caramel (هوت بطاطا دافئ بالكراميل)
  if (id.includes('hot-batata') || name.includes('بطاطا')) {
    return render3DHotCup({
      layers: [
        { pct: 35, col: '#b45309', colLight: '#d97706', colDark: '#853a05' },
        { pct: 50, col: '#fffbeb', colLight: '#ffffff', colDark: '#fef3c7' },
        { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
      ],
      topStyle: 'caramel'
    });
  }

  // [C] Royal Hot Lotus (هوت لوتس ملكي)
  if (id.includes('hot-lotus') || name.includes('لوتس')) {
    return render3DHotCup({
      layers: [
        { pct: 35, col: '#92400e', colLight: '#b45309', colDark: '#78350f' },
        { pct: 50, col: '#faf5ee', colLight: '#ffffff', colDark: '#ede2d3' },
        { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
      ],
      topStyle: 'caramel'
    });
  }

  // [D] Royal Hot Pistachio (هوت بيستاشيو فاخر)
  if (id.includes('hot-pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    return render3DHotCup({
      layers: [
        { pct: 32, col: '#3f6212', colLight: '#65a30d', colDark: '#2e490d' },
        { pct: 53, col: '#f7fee7', colLight: '#ffffff', colDark: '#ecfccb' },
        { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
      ],
      topStyle: 'pistachio'
    });
  }

  // [E] Authentic Karak Chai (شاي كرك أصيل)
  if (id.includes('karak') || name.includes('كرك')) {
    return render3DHotCup({
      layers: [
        { pct: 75, col: '#9a3412', colLight: '#b45309', colDark: '#7c2d12' },
        { pct: 15, col: '#fef3c7', colLight: '#ffffff', colDark: '#fde68a' },
        { pct: 10, col: '#fffbeb', colLight: '#ffffff', colDark: '#fef08a' }
      ],
      topStyle: 'crema'
    });
  }

  // [F] Adeni Spiced Tea (شاي عدني يمني فاخر)
  if (id.includes('adani') || id.includes('adeni') || name.includes('عدني')) {
    return render3DHotCup({
      layers: [
        { pct: 75, col: '#7c2d12', colLight: '#9a3412', colDark: '#541c09' },
        { pct: 15, col: '#fef3c7', colLight: '#ffffff', colDark: '#fde68a' },
        { pct: 10, col: '#fffbeb', colLight: '#ffffff', colDark: '#fef3c7' }
      ],
      topStyle: 'cocoa'
    });
  }

  // [G] Indian Masala Chai (شاي ماسالا هندي حار)
  if (id.includes('masala') || name.includes('ماسالا')) {
    return render3DHotCup({
      layers: [
        { pct: 75, col: '#78350f', colLight: '#92400e', colDark: '#451a03' },
        { pct: 15, col: '#fde68a', colLight: '#fef3c7', colDark: '#fcd34d' },
        { pct: 10, col: '#fffbeb', colLight: '#ffffff', colDark: '#fef3c7' }
      ],
      topStyle: 'crema'
    });
  }

  // Fallback default hot cup
  return render3DHotCup({
    layers: [
      { pct: 40, col: '#2a1206', colLight: '#46200c', colDark: '#1a0902' },
      { pct: 45, col: '#faf5ee', colLight: '#ffffff', colDark: '#ebe2d5' },
      { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
    ],
    topStyle: 'foam'
  });
}

function getDrinkSequence(item) {
  const id = (item.id || '').toLowerCase();
  if (id.includes('turkish') || id.includes('تركي')) {
    return ['1. معيار البن والماء بالكنكة', '2. تسوية هادئة عالرمالة', '3. صب الوش أولاً بالفنجان'];
  }
  if (id.includes('french') || id.includes('فرنسا')) {
    return ['1. بن فرنساي وحليب طازج', '2. تقليب عالرمالة للتماسك', '3. صب فوم الفنجان الكريمي'];
  }
  if (id.includes('arabic') || id.includes('عربي')) {
    return ['1. غلي القهوة الشقراء بالدلة', '2. إضافة الهيل والزعفران', '3. ركود دقيقة ثم صب الفنجان'];
  }
  if (id.includes('karak') || id.includes('adani') || id.includes('masala')) {
    return ['1. غلي الشاي والبهارات الصحيحة', '2. إضافة الحليب المبخر', '3. فورة هادئة وصب مصفى'];
  }
  return ['1. تجهيز المعايير والمقادير', '2. الخفق أو التسوية المتقنة', '3. التقديم الساخن المباشر بالفنجان'];
}
