// Emad Afandi Specialty Coffee Lab - 3D Architectural Vector Visual System for Traditional & Turkish Coffee
// Tailored to Emad Afandi's Heritage Presentation:
// 1. Turkish Coffee: 3D Royal Porcelain Finjan with Saucer & Thick Tiger Crema (وش القهوة المتماسك)
// 2. French Coffee & Hot Specialties: 3D Matte Black Cup with Cutaway & Frothy Microfoam / Drizzles
// 3. Arabic & Heritage Brews: 3D Golden Saudi Dallah / Traditional Finjan with Saffron & Cardamom
// 4. Karak & Spiced Chai: 3D Traditional Glass with Spiced Evaporated Milk Tea & Whole Cardamom Pods

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
// 2. 3D MATTE BLACK HOT TAKEAWAY CUP (French Coffee & Hot Specialties)
// ========================================================
function render3DHotCup(options) {
  const id = getNextSvgId('hot_cup_black');
  const layers = options.layers || [
    { pct: 40, col: '#3d1d07', colLight: '#592d0e', colDark: '#200d04' },
    { pct: 45, col: '#f5efe6', colLight: '#ffffff', colDark: '#e8dcce' },
    { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
  ];
  const topStyle = options.topStyle || 'foam'; // 'foam', 'cocoa', 'caramel', 'lotus', 'pistachio'

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

      <path d="M 28 ${currentTop} Q 60 ${currentTop + 3.8} 92 ${currentTop} L 92 ${currentBottom} Q 60 ${currentBottom + 3.8} 28 ${currentBottom} Z" fill="url(#${gradId})"/>
      <path d="M 28 ${currentTop} Q 60 ${currentTop + 3.8} 92 ${currentTop}" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>
    `;
    currentBottom = currentTop;
  });

  let decorHtml = '';
  if (topStyle === 'cocoa') {
    decorHtml = `
      <ellipse cx="60" cy="${currentBottom + 2}" rx="26" ry="3.5" fill="#2d1307" opacity="0.85"/>
      <circle cx="50" cy="${currentBottom + 2}" r="1.1" fill="#170903"/>
      <circle cx="63" cy="${currentBottom + 1.6}" r="1.3" fill="#170903"/>
      <circle cx="71" cy="${currentBottom + 2.5}" r="1.0" fill="#170903"/>
      <circle cx="57" cy="${currentBottom + 2.7}" r="0.9" fill="#170903"/>
    `;
  } else if (topStyle === 'caramel') {
    decorHtml = `
      <path d="M 38 ${currentBottom + 2} Q 60 ${currentBottom - 1} 82 ${currentBottom + 2}" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M 44 ${currentBottom + 4} Q 60 ${currentBottom + 1} 76 ${currentBottom + 4}" stroke="#b45309" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M 48 ${currentBottom} L 54 ${currentBottom + 5}" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
      <path d="M 62 ${currentBottom} L 68 ${currentBottom + 5}" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
    `;
  } else if (topStyle === 'lotus') {
    decorHtml = `
      <circle cx="48" cy="${currentBottom + 2}" r="1.5" fill="#c2781b"/>
      <circle cx="60" cy="${currentBottom + 1.6}" r="1.6" fill="#b45309"/>
      <circle cx="70" cy="${currentBottom + 2.4}" r="1.4" fill="#d97706"/>
      <path d="M 40 ${currentBottom + 2} Q 60 ${currentBottom - 1} 80 ${currentBottom + 2}" stroke="#b45309" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    `;
  } else if (topStyle === 'pistachio') {
    decorHtml = `
      <ellipse cx="60" cy="${currentBottom + 2}" rx="26" ry="3.5" fill="#4d7c0f" opacity="0.8"/>
      <circle cx="48" cy="${currentBottom + 2}" r="1.2" fill="#365314"/>
      <circle cx="62" cy="${currentBottom + 1.6}" r="1.4" fill="#365314"/>
      <circle cx="70" cy="${currentBottom + 2.3}" r="1.0" fill="#65a30d"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <linearGradient id="${id}_black_cup" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#111215"/>
          <stop offset="14%" stop-color="#1f2229"/>
          <stop offset="32%" stop-color="#2d323d"/>
          <stop offset="68%" stop-color="#21242c"/>
          <stop offset="86%" stop-color="#18191f"/>
          <stop offset="100%" stop-color="#0c0d10"/>
        </linearGradient>

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

        <linearGradient id="${id}_cyl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.58)"/>
          <stop offset="16%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="30%" stop-color="rgba(255,255,255,0.22)"/>
          <stop offset="68%" stop-color="rgba(0,0,0,0.0)"/>
          <stop offset="88%" stop-color="rgba(0,0,0,0.32)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.65)"/>
        </linearGradient>

        <clipPath id="${id}_cutaway">
          <path d="M 28 37 Q 60 41 92 37 L 83 140 Q 60 144 37 140 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.9)" filter="url(#${id}_blur)"/>

      <!-- 2. Matte Black Body -->
      <path d="M 18 32 L 31 146 Q 32 149 36 149 L 84 149 Q 88 149 89 146 L 102 32 Z" fill="url(#${id}_black_cup)"/>
      <path d="M 30 145 Q 60 149 90 145 L 89 149 Q 60 153 31 149 Z" fill="#e2e8f0"/>

      <!-- 3. Cutaway Window -->
      <g clip-path="url(#${id}_cutaway)">
        <rect x="20" y="32" width="80" height="118" fill="#0d0b09"/>
        ${layersHtml}
        ${decorHtml}
        <rect x="20" y="32" width="80" height="118" fill="url(#${id}_cyl)"/>
      </g>

      <!-- 4. Luxury Gold Border -->
      <path d="M 28 37 Q 60 41 92 37 L 83 140 Q 60 144 37 140 Z" stroke="rgba(212,175,55,0.85)" stroke-width="1.2" fill="none"/>

      <!-- 5. 3D Matte Black Lid -->
      <path d="M 13 28 L 16 33 Q 60 37 104 33 L 107 28 Q 60 32 13 28 Z" fill="url(#${id}_lid_rim)"/>
      <ellipse cx="60" cy="28" rx="47" ry="4.5" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="21" rx="37" ry="3.5" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="60" cy="15" rx="29" ry="3.2" fill="url(#${id}_lid_cap)"/>
      <ellipse cx="38" cy="15" rx="5.4" ry="1.9" fill="#090a0d" stroke="#3d4352" stroke-width="0.8"/>
    </svg>
  `;
}

// ========================================================
// 3. 3D GOLDEN SAUDI DALLAH & FINJAN (Arabic Coffee & Jabana)
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
            <stop offset="70%" stop-color="#7c2d12"/>
            <stop offset="100%" stop-color="#361005"/>
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="148" rx="36" ry="6" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>
        
        <!-- Woven Straw Ring Stand -->
        <ellipse cx="60" cy="140" rx="28" ry="6.5" fill="#ca8a04" stroke="#a16207" stroke-width="1.2"/>

        <!-- Spherical Clay Body -->
        <circle cx="60" cy="106" r="32" fill="url(#${id}_clay)" stroke="rgba(212,175,55,0.7)" stroke-width="1.2"/>
        
        <!-- Long Slender Neck -->
        <path d="M 52 74 L 52 38 L 68 38 L 68 74 Z" fill="url(#${id}_clay)" stroke="rgba(212,175,55,0.7)" stroke-width="1.2"/>
        <ellipse cx="60" cy="38" rx="8" ry="2.5" fill="#7c2d12" stroke="#ea580c" stroke-width="0.8"/>

        <!-- Curled Clay Handle -->
        <path d="M 52 50 C 32 50 32 95 44 105" stroke="#7c2d12" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M 52 50 C 32 50 32 95 44 105" stroke="rgba(212,175,55,0.6)" stroke-width="1" stroke-linecap="round" fill="none"/>

        <!-- Spout -->
        <path d="M 68 56 L 86 44 L 84 40 L 68 48 Z" fill="#7c2d12" stroke="rgba(212,175,55,0.7)" stroke-width="1"/>
      </svg>
    `;
  }

  // Golden Saudi Dallah with Saffron Glow & Finjan
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <linearGradient id="${id}_brass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="25%" stop-color="#d97706"/>
          <stop offset="50%" stop-color="#fef08a"/>
          <stop offset="75%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#451a03"/>
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
// 4. 3D TRADITIONAL CHAI GLASS (Chai Karak, Adani & Masala)
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

  // 4. FRENCH COFFEE (بن فرنساي بالحليب)
  if (id.includes('french') || name.includes('فرنسا')) {
    if (id.includes('caramel') || name.includes('كراميل')) {
      return render3DHotCup({
        layers: [
          { pct: 40, col: '#3d1d07', colLight: '#592d0e', colDark: '#200d04' },
          { pct: 45, col: '#f8f3eb', colLight: '#ffffff', colDark: '#ede5d8' },
          { pct: 15, col: '#d97706', colLight: '#f59e0b', colDark: '#b45309' }
        ],
        topStyle: 'caramel'
      });
    }
    if (id.includes('chocolate') || name.includes('شيكولاتة') || name.includes('شوكولاتة')) {
      return render3DHotCup({
        layers: [
          { pct: 45, col: '#261005', colLight: '#441d0b', colDark: '#170802' },
          { pct: 40, col: '#f5efe6', colLight: '#ffffff', colDark: '#e8dcce' },
          { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
        ],
        topStyle: 'cocoa'
      });
    }
    // Default Classic French Coffee
    return render3DHotCup({
      layers: [
        { pct: 45, col: '#381c0e', colLight: '#542c16', colDark: '#200e06' },
        { pct: 40, col: '#f7f1e7', colLight: '#ffffff', colDark: '#ebe0d1' },
        { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f5ede4' }
      ],
      topStyle: 'foam'
    });
  }

  // 5. HOT SPECIALTIES (Hot Chocolate, Hot Batata, Hot Lotus, Hot Pistachio)
  if (id.includes('hot-batata') || name.includes('بطاطا')) {
    return render3DHotCup({
      layers: [
        { pct: 35, col: '#b45309', colLight: '#d97706', colDark: '#78350f' },
        { pct: 50, col: '#fef3c7', colLight: '#fffbeb', colDark: '#fde68a' },
        { pct: 15, col: '#d97706', colLight: '#f59e0b', colDark: '#92400e' }
      ],
      topStyle: 'caramel'
    });
  }
  if (id.includes('hot-lotus') || name.includes('لوتس')) {
    return render3DHotCup({
      layers: [
        { pct: 35, col: '#92400e', colLight: '#b45309', colDark: '#78350f' },
        { pct: 50, col: '#f5efe6', colLight: '#ffffff', colDark: '#e8dcce' },
        { pct: 15, col: '#b45309', colLight: '#d97706', colDark: '#78350f' }
      ],
      topStyle: 'lotus'
    });
  }
  if (id.includes('hot-pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    return render3DHotCup({
      layers: [
        { pct: 35, col: '#4d7c0f', colLight: '#65a30d', colDark: '#365314' },
        { pct: 50, col: '#f5efe6', colLight: '#ffffff', colDark: '#e8dcce' },
        { pct: 15, col: '#65a30d', colLight: '#84cc16', colDark: '#4d7c0f' }
      ],
      topStyle: 'pistachio'
    });
  }
  if (id.includes('hot-chocolate') || name.includes('شوكليت') || name.includes('شوكولاتة')) {
    return render3DHotCup({
      layers: [
        { pct: 40, col: '#220e06', colLight: '#3d1c0e', colDark: '#140602' },
        { pct: 45, col: '#451f10', colLight: '#612f1a', colDark: '#301308' },
        { pct: 15, col: '#ffffff', colLight: '#ffffff', colDark: '#f4ede4' }
      ],
      topStyle: 'cocoa'
    });
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
    return ['1. بن فرنساي وحليب طازج', '2. تقليب عالرمالة للتماسك', '3. صب الفوم الكريمي'];
  }
  if (id.includes('arabic') || id.includes('عربي')) {
    return ['1. غلي القهوة الشقراء بالدلة', '2. إضافة الهيل والزعفران', '3. ركود دقيقة ثم صب الفنجان'];
  }
  if (id.includes('karak') || id.includes('adani') || id.includes('masala')) {
    return ['1. غلي الشاي والبهارات الصحيحة', '2. إضافة الحليب المبخر', '3. فورة هادئة وصب مصفى'];
  }
  return ['1. تجهيز المعايير والمقادير', '2. الخفق أو التسوية المتقنة', '3. التقديم الساخن المباشر'];
}
