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

  let spiceSpecks = '';
  if (isSpiced) {
    spiceSpecks = `
      <!-- Green Cardamom Pod & Ground Cardamom Flecks -->
      <g opacity="0.9">
        <circle cx="52" cy="74" r="1.1" fill="#4d7c0f"/>
        <circle cx="68" cy="76" r="1.2" fill="#365314"/>
        <circle cx="58" cy="78" r="0.9" fill="#4d7c0f"/>
        <circle cx="64" cy="73" r="1.0" fill="#365314"/>
        <!-- Whole Cardamom Pod floating on Crema -->
        <ellipse cx="61" cy="75" rx="3.5" ry="1.8" transform="rotate(-15 61 75)" fill="#4d7c0f" stroke="#365314" stroke-width="0.7"/>
        <line x1="58" y1="76" x2="64" y2="74" stroke="#65a30d" stroke-width="0.6"/>
      </g>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
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

      <!-- 7. Thick Tiger Crema Surface (وش القهوة السميك المتماسك) -->
      <ellipse cx="60" cy="74" rx="30" ry="8" fill="url(#${id}_crema)" stroke="url(#${id}_gold_rim)" stroke-width="1.2"/>
      <!-- Inner Tiger Streaks -->
      <ellipse cx="60" cy="74" rx="24" ry="5.5" fill="${cremaColLight}" opacity="0.8"/>
      <path d="M 42 74 Q 52 71 62 75 Q 70 72 78 74" stroke="${cremaColDark}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <circle cx="48" cy="73" r="1.4" fill="#fef08a"/>
      <circle cx="71" cy="74" r="1.2" fill="#fef08a"/>

      <!-- Cardamom Specks / Pod -->
      ${spiceSpecks}

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
  const id = getNextSvgId('dallah');
  const isJabana = options.isJabana || false;

  if (isJabana) {
    // Sudanese Jabana: Terracotta Clay Pot with neck and woven stand
    return `
      <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5"/>
          </filter>
          <linearGradient id="${id}_clay" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#431407"/>
            <stop offset="35%" stop-color="#9a3412"/>
            <stop offset="70%" stop-color="#c2410c"/>
            <stop offset="100%" stop-color="#2d0c04"/>
          </linearGradient>
        </defs>

        <!-- Drop Shadow -->
        <ellipse cx="60" cy="150" rx="40" ry="6" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

        <!-- Woven Ring Stand (عِمامة الجَبَنَة) -->
        <ellipse cx="60" cy="144" rx="28" ry="8" fill="#78350f" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- Spherical Clay Body -->
        <circle cx="60" cy="108" r="28" fill="url(#${id}_clay)" stroke="#ea580c" stroke-width="1"/>

        <!-- Narrow Clay Neck -->
        <path d="M 54 82 L 53 48 L 67 48 L 66 82 Z" fill="url(#${id}_clay)" stroke="#c2410c" stroke-width="0.8"/>

        <!-- Flared Rim & Pouring Lip -->
        <ellipse cx="60" cy="48" rx="10" ry="3.5" fill="#7c2d12" stroke="#ea580c" stroke-width="1"/>

        <!-- Ergonomic Clay Handle -->
        <path d="M 64 54 C 84 56 86 102 68 112" stroke="url(#${id}_clay)" stroke-width="4.5" stroke-linecap="round" fill="none"/>

        <!-- Slender Spout -->
        <path d="M 52 90 C 38 86 36 62 46 54" stroke="url(#${id}_clay)" stroke-width="3" stroke-linecap="round" fill="none"/>

        <!-- Folkloric Earthen Finjan Beside Jabana -->
        <g transform="translate(68, 126)">
          <ellipse cx="20" cy="16" rx="14" ry="4.5" fill="rgba(0,0,0,0.6)"/>
          <path d="M 8 6 C 8 20 12 24 20 24 C 28 24 32 20 32 6 Z" fill="url(#${id}_clay)" stroke="#ea580c" stroke-width="1"/>
          <!-- Coffee Inside Finjan -->
          <ellipse cx="20" cy="6" rx="12" ry="3.5" fill="#1c0c05"/>
        </g>
      </svg>
    `;
  }

  // Classic Saudi Golden Dallah with Saffron Demitasse
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <linearGradient id="${id}_brass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#854d0e"/>
          <stop offset="25%" stop-color="#eab308"/>
          <stop offset="50%" stop-color="#fef08a"/>
          <stop offset="75%" stop-color="#ca8a04"/>
          <stop offset="100%" stop-color="#713f12"/>
        </linearGradient>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="60" cy="150" rx="42" ry="6.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Dallah Flared Base -->
      <path d="M 38 144 L 44 122 L 76 122 L 82 144 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="1"/>
      <ellipse cx="60" cy="144" rx="22" ry="3.5" fill="#78350f"/>

      <!-- Lower Belly Bulb -->
      <path d="M 44 122 C 38 98 82 98 76 122 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="1"/>

      <!-- Slender Waisted Neck -->
      <path d="M 52 98 C 50 68 54 50 50 42 L 70 42 C 66 50 70 68 68 98 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="1"/>

      <!-- Crown & Crescent Finial Peak -->
      <path d="M 46 42 L 60 16 L 74 42 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="1"/>
      <circle cx="60" cy="14" r="2.5" fill="#fef08a" stroke="#b45309" stroke-width="0.8"/>

      <!-- Iconic Long Arched Spout (Beak) -->
      <path d="M 48 94 C 20 84 14 44 32 32 C 28 42 34 76 52 86 Z" fill="url(#${id}_brass)" stroke="#ca8a04" stroke-width="1"/>

      <!-- Sweeping Dallah Handle -->
      <path d="M 68 52 C 94 48 98 114 74 122" stroke="url(#${id}_brass)" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 68 52 C 94 48 98 114 74 122" stroke="#fef08a" stroke-width="1" stroke-linecap="round" fill="none"/>

      <!-- Golden Finjan beside Dallah -->
      <g transform="translate(68, 126)">
        <ellipse cx="20" cy="16" rx="14" ry="4.5" fill="rgba(0,0,0,0.6)"/>
        <path d="M 8 6 C 8 20 12 24 20 24 C 28 24 32 20 32 6 Z" fill="#14161c" stroke="#d4af37" stroke-width="1"/>
        <!-- Golden Saffron Coffee inside Finjan -->
        <ellipse cx="20" cy="6" rx="12" ry="3.5" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8"/>
        <circle cx="18" cy="6" r="0.8" fill="#e11d48"/>
      </g>
    </svg>
  `;
}

// ========================================================
// 5. 3D TRADITIONAL CHAI GLASS (Chai Karak, Adani & Masala)
// ========================================================
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
function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  // 1. TURKISH COFFEE (Single & Double, Plain / Spiced, Light / Med / Dark)
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
  if (id.includes('jabana') || name.includes('جبنة')) {
    return render3DArabicDallah({ isJabana: true });
  }

  // 3. SPICED CHAI (Karak, Adani, Masala)
  if (id.includes('karak') || id.includes('adani') || id.includes('masala') || name.includes('كرك') || name.includes('عدني') || name.includes('ماسالا')) {
    return render3DHeritageChaiGlass({});
  }

  // 4. FRENCH COFFEE (All variants served in Royal French Finjans & Saucers)
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
    // Default Classic French Finjan
    return render3DFrenchFinjan({ flavor: 'classic' });
  }

  // 5. HOT SPECIALTIES (All served in 3D Royal Ceramic Mugs & Saucers)
  if (id.includes('hot-batata') || name.includes('بطاطا')) {
    return render3DHotCeramicMug({ type: 'batata' });
  }
  if (id.includes('hot-lotus') || name.includes('لوتس')) {
    return render3DHotCeramicMug({ type: 'lotus' });
  }
  if (id.includes('hot-pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    return render3DHotCeramicMug({ type: 'pistachio' });
  }
  if (id.includes('hot-chocolate') || name.includes('شوكليت') || name.includes('شوكولاتة')) {
    return render3DHotCeramicMug({ type: 'chocolate' });
  }

  // Default Traditional Finjan
  return render3DTurkishFinjan({ roast: 'medium', isSpiced: false });
}

// 3-Step Operation Sequence Teaser
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
