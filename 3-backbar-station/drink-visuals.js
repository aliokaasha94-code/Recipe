// Emad Afandi Specialty Coffee Lab - 3D Architectural Vector Visual System for Backbar & Desserts
// Tailored to Emad Afandi's EXACT Packaging & Station 3 Standards:
// 1. Smoothies & Cold Drinks: Contoured Clear PET Cup + Flat Safety Lid + Realistic Fruits & Ice
// 2. Frappes & Milkshakes: Contoured Clear PET Cup + Clear Dome Lid (ليد بومبيه) + Whipped Cream Peak & Gourmet Sauces/Crumbs
// 3. Boba & Sparkling Mocktails: Contoured Cup + Glossy Tapioca Boba Pearls + Bubbles + Citrus Wheels + Mint
// 4. Bakery & Desserts: Luxury Slate Platter + Golden Belgian Waffle with Gridded Wells, Butter & Chocolate Drizzle / Fluffy Pancakes

let _svgUidCounter = 0;
function getNextSvgId(prefix) {
  _svgUidCounter++;
  return `${prefix}_${_svgUidCounter}_${Math.random().toString(36).substring(2, 7)}`;
}

// ========================================================
// 1. 3D CONTOURED CLEAR PET CUP WITH FLAT SAFETY LID (Smoothies & Iced Juices)
// ========================================================
function render3DContouredColdCup(options) {
  const id = getNextSvgId('smoothie_cup');
  const baseCol = options.baseCol || '#f59e0b';
  const baseColLight = options.baseColLight || '#fbbf24';
  const baseColDark = options.baseColDark || '#d97706';
  const fruitType = options.fruitType || 'mango'; // 'mango', 'lemon-mint', 'guava', 'green-apple', 'strawberry', 'watermelon', 'blueberry', 'mixed-berry', 'kiwi', 'peach', 'passion', 'coconut', 'karkadeh', 'pineapple'

  // Specialized garnish & interior features
  let fruitGarnish = '';
  
  if (fruitType === 'lemon-mint') {
    fruitGarnish = `
      <!-- Fresh Emerald Mint Specks in Smoothie -->
      <g opacity="0.85">
        <circle cx="36" cy="65" r="1.4" fill="#047857"/>
        <circle cx="54" cy="78" r="1.2" fill="#065f46"/>
        <circle cx="72" cy="62" r="1.5" fill="#047857"/>
        <circle cx="82" cy="85" r="1.3" fill="#065f46"/>
        <circle cx="44" cy="102" r="1.5" fill="#047857"/>
        <circle cx="68" cy="115" r="1.3" fill="#065f46"/>
        <circle cx="38" cy="128" r="1.2" fill="#047857"/>
        <circle cx="78" cy="132" r="1.4" fill="#065f46"/>
      </g>
      <!-- Submerged Vibrant Lemon Wheel (Right Side) -->
      <g transform="translate(76, 52) rotate(15)">
        <circle cx="0" cy="0" r="14" fill="#facc15" stroke="#eab308" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="2.5" fill="#ca8a04"/>
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#ca8a04" stroke-width="0.8"/>
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#ca8a04" stroke-width="0.8"/>
        <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#ca8a04" stroke-width="0.8"/>
        <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#ca8a04" stroke-width="0.8"/>
      </g>
      <!-- Fresh Mint Sprig Peeking at Rim -->
      <path d="M 42 38 C 36 28 46 22 52 30 C 58 22 68 28 62 38 Z" fill="#10b981" stroke="#047857" stroke-width="0.8"/>
      <path d="M 52 30 L 52 38" stroke="#065f46" stroke-width="1" fill="none"/>
    `;
  } else if (fruitType === 'strawberry') {
    fruitGarnish = `
      <!-- Natural Strawberry Puree Seeds -->
      <g opacity="0.9">
        <circle cx="38" cy="58" r="1.1" fill="#fde047"/>
        <circle cx="56" cy="68" r="1.0" fill="#fef08a"/>
        <circle cx="74" cy="56" r="1.1" fill="#fde047"/>
        <circle cx="48" cy="88" r="1.0" fill="#fde047"/>
        <circle cx="68" cy="94" r="1.1" fill="#fef08a"/>
        <circle cx="36" cy="116" r="1.0" fill="#fde047"/>
        <circle cx="78" cy="120" r="1.1" fill="#fde047"/>
      </g>
      <!-- Floating Ruby Strawberry Slice -->
      <g transform="translate(68, 56) rotate(-12)">
        <path d="M 0 0 C -12 6 -10 20 0 24 C 10 20 12 6 0 0 Z" fill="#e11d48" stroke="#be123c" stroke-width="1"/>
        <path d="M 0 4 C -6 8 -5 16 0 19 C 5 16 6 8 0 4 Z" fill="#fb7185"/>
        <circle cx="-3" cy="10" r="0.8" fill="#fef08a"/>
        <circle cx="3" cy="12" r="0.8" fill="#fef08a"/>
        <circle cx="0" cy="16" r="0.8" fill="#fef08a"/>
      </g>
    `;
  } else if (fruitType === 'kiwi') {
    fruitGarnish = `
      <!-- Floating Kiwi Wheel with Black Seeds -->
      <g transform="translate(62, 70) rotate(8)">
        <circle cx="0" cy="0" r="16" fill="#84cc16" stroke="#4d7c0f" stroke-width="1.2"/>
        <ellipse cx="0" cy="0" rx="6" ry="7" fill="#f7fee7"/>
        <!-- Ring of tiny black kiwi seeds -->
        <circle cx="0" cy="-9" r="0.9" fill="#141a05"/>
        <circle cx="6" cy="-7" r="0.9" fill="#141a05"/>
        <circle cx="9" cy="0" r="0.9" fill="#141a05"/>
        <circle cx="6" cy="7" r="0.9" fill="#141a05"/>
        <circle cx="0" cy="9" r="0.9" fill="#141a05"/>
        <circle cx="-6" cy="7" r="0.9" fill="#141a05"/>
        <circle cx="-9" cy="0" r="0.9" fill="#141a05"/>
        <circle cx="-6" cy="-7" r="0.9" fill="#141a05"/>
      </g>
    `;
  } else if (fruitType === 'watermelon') {
    fruitGarnish = `
      <!-- Natural Dark Watermelon Seed Dots -->
      <g opacity="0.85">
        <ellipse cx="44" cy="70" rx="1.5" ry="2.2" transform="rotate(-15 44 70)" fill="#1c0a0d"/>
        <ellipse cx="72" cy="85" rx="1.5" ry="2.2" transform="rotate(20 72 85)" fill="#1c0a0d"/>
        <ellipse cx="50" cy="105" rx="1.5" ry="2.2" transform="rotate(-5 50 105)" fill="#1c0a0d"/>
        <ellipse cx="68" cy="125" rx="1.5" ry="2.2" transform="rotate(25 68 125)" fill="#1c0a0d"/>
      </g>
    `;
  } else if (fruitType === 'passion') {
    fruitGarnish = `
      <!-- Floating Golden Passion Fruit Seeds with Translucent Sacs -->
      <g opacity="0.9">
        <ellipse cx="42" cy="62" rx="3.5" ry="2.5" fill="rgba(254,240,138,0.7)"/>
        <circle cx="42" cy="62" r="1.4" fill="#1c0b03"/>
        <ellipse cx="74" cy="75" rx="3.5" ry="2.5" fill="rgba(254,240,138,0.7)"/>
        <circle cx="74" cy="75" r="1.4" fill="#1c0b03"/>
        <ellipse cx="52" cy="96" rx="3.5" ry="2.5" fill="rgba(254,240,138,0.7)"/>
        <circle cx="52" cy="96" r="1.4" fill="#1c0b03"/>
        <ellipse cx="66" cy="118" rx="3.5" ry="2.5" fill="rgba(254,240,138,0.7)"/>
        <circle cx="66" cy="118" r="1.4" fill="#1c0b03"/>
      </g>
    `;
  } else if (fruitType === 'green-apple') {
    fruitGarnish = `
      <!-- Fresh Green Apple Half-Moon Slice -->
      <g transform="translate(68, 54) rotate(-20)">
        <path d="M 0 0 C 14 6 16 22 2 28 C -4 18 -6 8 0 0 Z" fill="#ecfccb" stroke="#65a30d" stroke-width="1.2"/>
        <path d="M 0 0 C 14 6 16 22 2 28" stroke="#4d7c0f" stroke-width="2.2" fill="none"/>
      </g>
    `;
  } else if (fruitType === 'mango') {
    fruitGarnish = `
      <!-- Golden Tropical Mango Chunks Floating -->
      <rect x="36" y="52" width="10" height="9" rx="2" transform="rotate(12 41 56)" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
      <rect x="68" y="60" width="11" height="10" rx="2" transform="rotate(-15 73 65)" fill="#fde047" stroke="#d97706" stroke-width="1"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Soft Ground Contact Shadow -->
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- Smoothie Fruit Body Liquid Gradient -->
        <linearGradient id="${id}_fruit_body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${baseColDark}" stop-opacity="0.95"/>
          <stop offset="25%" stop-color="${baseColLight}" stop-opacity="1"/>
          <stop offset="70%" stop-color="${baseCol}" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="${baseColDark}" stop-opacity="0.92"/>
        </linearGradient>

        <!-- Vertical Sunlight / Depth Lighting Gradient -->
        <linearGradient id="${id}_vert_light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
          <stop offset="40%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.35)"/>
        </linearGradient>

        <!-- Clear PET Specular Sheen & Glass Highlights -->
        <linearGradient id="${id}_pet_sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.48)"/>
          <stop offset="14%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.52)"/>
        </linearGradient>

        <!-- Clear PET Contoured Cup ClipPath -->
        <clipPath id="${id}_cup_clip">
          <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Ground Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Cup Contents clipped to Contoured Cup Shape -->
      <g clip-path="url(#${id}_cup_clip)">
        <!-- Rich Velvety Fruit Base (Fills entire cup cavity) -->
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_fruit_body)"/>
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_vert_light)"/>

        <!-- Fruit Garnish & Characteristic Seed Texture -->
        ${fruitGarnish}

        <!-- 3D Glistening Crystal Ice Cubes in Smoothie Top -->
        <g opacity="0.92">
          <!-- Ice Cube 1 (Top Left) -->
          <g transform="translate(32, 34) rotate(-8)">
            <polygon points="0,5 9,0 19,4 10,9" fill="rgba(255,255,255,0.88)"/>
            <polygon points="0,5 10,9 10,20 0,15" fill="rgba(235,248,255,0.55)"/>
            <polygon points="10,9 19,4 19,15 10,20" fill="rgba(205,235,255,0.65)"/>
            <polygon points="0,5 9,0 19,4 10,9" stroke="rgba(255,255,255,0.95)" stroke-width="0.7" fill="none"/>
            <line x1="10" y1="9" x2="10" y2="20" stroke="rgba(255,255,255,0.85)" stroke-width="0.7"/>
          </g>

          <!-- Ice Cube 2 (Top Right) -->
          <g transform="translate(68, 36) rotate(12)">
            <polygon points="0,5 9,0 18,4 10,9" fill="rgba(255,255,255,0.90)"/>
            <polygon points="0,5 10,9 10,19 0,14" fill="rgba(235,248,255,0.50)"/>
            <polygon points="10,9 18,4 18,14 10,19" fill="rgba(205,235,255,0.60)"/>
            <polygon points="0,5 9,0 18,4 10,9" stroke="rgba(255,255,255,0.95)" stroke-width="0.7" fill="none"/>
            <line x1="10" y1="9" x2="10" y2="19" stroke="rgba(255,255,255,0.85)" stroke-width="0.7"/>
          </g>

          <!-- Ice Cube 3 (Center Slush Cube) -->
          <g transform="translate(50, 48) rotate(4)">
            <polygon points="0,4 8,0 16,3 9,7" fill="rgba(255,255,255,0.78)"/>
            <polygon points="0,4 9,7 9,16 0,12" fill="rgba(235,248,255,0.45)"/>
            <polygon points="9,7 16,3 16,12 9,16" fill="rgba(205,235,255,0.55)"/>
            <polygon points="0,4 8,0 16,3 9,7" stroke="rgba(255,255,255,0.9)" stroke-width="0.7" fill="none"/>
          </g>
        </g>

        <!-- Glossy PET Sheen -->
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_pet_sheen)"/>
      </g>

      <!-- 3. Contoured PET Cup Gold Border -->
      <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.2" fill="none"/>

      <!-- Measurement Fill Marks (Real Barista PET Feature) -->
      <line x1="23" y1="64" x2="35" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="85" y1="64" x2="97" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="25" y1="94" x2="33" y2="94" stroke="rgba(255,255,255,0.5)" stroke-width="1.1" stroke-linecap="round"/>
      <line x1="87" y1="94" x2="95" y2="94" stroke="rgba(255,255,255,0.5)" stroke-width="1.1" stroke-linecap="round"/>
      <line x1="27" y1="122" x2="33" y2="122" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" stroke-linecap="round"/>
      <line x1="87" y1="122" x2="93" y2="122" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" stroke-linecap="round"/>

      <!-- 4. FLAT SAFETY LID (ليد سيفتي مسطح مع فتحة الشاليموه) -->
      <!-- Locking Rim Flange that clicks on cup -->
      <path d="M 14 28 L 17 33 Q 60 37 103 33 L 106 28 Q 60 31 14 28 Z" fill="rgba(235,246,255,0.45)" stroke="rgba(255,255,255,0.85)" stroke-width="0.8"/>
      
      <!-- Flat Recessed Safety Lid Top Surface -->
      <ellipse cx="60" cy="28" rx="46" ry="3.8" fill="rgba(240,249,255,0.35)" stroke="rgba(255,255,255,0.9)" stroke-width="1"/>
      <ellipse cx="60" cy="27.5" rx="30" ry="2.2" fill="rgba(210,235,250,0.25)" stroke="rgba(255,255,255,0.5)" stroke-width="0.7"/>

      <!-- Central Straw Cross-Slit Slot -->
      <circle cx="60" cy="27.5" r="3.2" fill="rgba(190,225,245,0.6)" stroke="#ffffff" stroke-width="0.8"/>
      <line x1="58" y1="27.5" x2="62" y2="27.5" stroke="#ffffff" stroke-width="1.2"/>
      <line x1="60" y1="26.2" x2="60" y2="28.8" stroke="#ffffff" stroke-width="1.2"/>
    </svg>
  `;
}

// ========================================================
// 2. 3D CONTOURED CUP WITH DOME LID & WHIPPED CREAM (Frappes & Milkshakes)
// ========================================================
function render3DDomeLidCup(options) {
  const id = getNextSvgId('dome_shake');
  const baseCol = options.baseCol || '#381c0e';
  const baseColLight = options.baseColLight || '#5c341b';
  const baseColDark = options.baseColDark || '#220e06';
  const drizzleCol = options.drizzleCol || null;
  const topping = options.topping || 'chocolate'; // 'oreo', 'lotus', 'pistachio', 'chocolate', 'caramel', 'vanilla', 'berries', 'coconut'

  // Decadent Wall Drizzle Streams
  let drizzleHtml = '';
  if (drizzleCol) {
    drizzleHtml = `
      <path d="M 32 38 Q 36 68 33 98 Q 30 118 33 132" stroke="${drizzleCol}" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="0.95"/>
      <path d="M 88 36 Q 83 65 86 102 Q 88 122 84 136" stroke="${drizzleCol}" stroke-width="3.6" stroke-linecap="round" fill="none" opacity="0.95"/>
      <path d="M 48 44 Q 53 72 50 106 Q 47 125 51 135" stroke="${drizzleCol}" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.85"/>
      <path d="M 72 42 Q 68 70 71 96 Q 74 116 71 130" stroke="${drizzleCol}" stroke-width="2.8" stroke-linecap="round" fill="none" opacity="0.85"/>
    `;
  }

  // Topping Crumbs on Cream Peak
  let toppingHtml = '';
  if (topping === 'oreo') {
    toppingHtml = `
      <!-- Dark Oreo Biscuit Crumbles -->
      <circle cx="50" cy="18" r="1.5" fill="#141211"/>
      <circle cx="62" cy="14" r="1.8" fill="#141211"/>
      <circle cx="70" cy="20" r="1.4" fill="#141211"/>
      <circle cx="56" cy="24" r="1.6" fill="#141211"/>
      <circle cx="44" cy="22" r="1.3" fill="#141211"/>
      <!-- Chocolate Drizzle Lattice on Cream -->
      <path d="M 42 22 Q 60 14 78 22" stroke="#231006" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    `;
  } else if (topping === 'lotus') {
    toppingHtml = `
      <!-- Golden Lotus Speculoos Crumbs -->
      <circle cx="50" cy="18" r="1.6" fill="#c2781b"/>
      <circle cx="62" cy="14" r="1.8" fill="#b45309"/>
      <circle cx="70" cy="20" r="1.5" fill="#c2781b"/>
      <circle cx="56" cy="24" r="1.7" fill="#d97706"/>
      <circle cx="44" cy="22" r="1.4" fill="#92400e"/>
      <!-- Spiced Caramel Lotus Drizzle -->
      <path d="M 40 22 Q 60 13 80 22" stroke="#b45309" stroke-width="2.0" stroke-linecap="round" fill="none"/>
    `;
  } else if (topping === 'pistachio') {
    toppingHtml = `
      <!-- Crushed Emerald Pistachio Granules -->
      <circle cx="48" cy="18" r="1.5" fill="#4d7c0f"/>
      <circle cx="62" cy="14" r="1.8" fill="#365314"/>
      <circle cx="72" cy="20" r="1.4" fill="#65a30d"/>
      <circle cx="56" cy="23" r="1.6" fill="#4d7c0f"/>
      <circle cx="43" cy="22" r="1.3" fill="#365314"/>
      <!-- Pistachio Cream Drizzle -->
      <path d="M 40 22 Q 60 14 80 22" stroke="#4d7c0f" stroke-width="2" stroke-linecap="round" fill="none"/>
    `;
  } else if (topping === 'chocolate') {
    toppingHtml = `
      <!-- Belgian Dark Chocolate Ganache Drizzle -->
      <path d="M 38 24 Q 60 12 82 24" stroke="#251006" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M 46 16 Q 60 10 74 16" stroke="#1d0a03" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <circle cx="60" cy="12" r="1.6" fill="#1a0802"/>
    `;
  } else if (topping === 'caramel') {
    toppingHtml = `
      <!-- Golden Caramel Drizzle -->
      <path d="M 38 24 Q 60 12 82 24" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M 44 17 Q 60 9 76 17" stroke="#b45309" stroke-width="1.9" stroke-linecap="round" fill="none"/>
    `;
  } else if (topping === 'coconut') {
    toppingHtml = `
      <!-- Toasted Shredded Coconut Flakes -->
      <line x1="48" y1="18" x2="54" y2="16" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="64" y1="14" x2="70" y2="16" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="55" y1="22" x2="62" y2="21" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- Milkshake / Frappe Base Liquid Gradient -->
        <linearGradient id="${id}_shake_body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${baseColDark}" stop-opacity="0.95"/>
          <stop offset="28%" stop-color="${baseColLight}" stop-opacity="1"/>
          <stop offset="72%" stop-color="${baseCol}" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="${baseColDark}" stop-opacity="0.92"/>
        </linearGradient>

        <linearGradient id="${id}_pet_sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.48)"/>
          <stop offset="14%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.52)"/>
        </linearGradient>

        <clipPath id="${id}_shake_clip">
          <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Cup Contents clipped to Contoured Cup Shape -->
      <g clip-path="url(#${id}_shake_clip)">
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_shake_body)"/>
        ${drizzleHtml}
        <!-- Glass Sheen -->
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_pet_sheen)"/>
      </g>

      <!-- 3. Cup Gold Outline & Measure Lines -->
      <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.2" fill="none"/>
      
      <line x1="23" y1="64" x2="35" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="85" y1="64" x2="97" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="25" y1="94" x2="33" y2="94" stroke="rgba(255,255,255,0.5)" stroke-width="1.1" stroke-linecap="round"/>
      <line x1="87" y1="94" x2="95" y2="94" stroke="rgba(255,255,255,0.5)" stroke-width="1.1" stroke-linecap="round"/>

      <!-- 4. VOLUMETRIC WHIPPED CREAM SWIRL INSIDE DOME (كريمة خفق بومبيه) -->
      <g id="${id}_whipped_cream">
        <!-- Mountainous Rosette Swirl -->
        <path d="M 28 32 C 28 14 42 8 60 8 C 78 8 92 14 92 32 Z" fill="#ffffff"/>
        <path d="M 34 30 C 38 18 48 12 60 12 C 72 12 82 18 86 30" stroke="#f6f0e6" stroke-width="3" fill="none"/>
        <path d="M 44 24 C 48 14 54 9 60 9 C 66 9 72 14 76 24" stroke="#fffdfa" stroke-width="2.5" fill="none"/>
        <path d="M 58 7 C 59 4 61 4 62 7" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Gourmet Toppings & Drizzles on Cream -->
        ${toppingHtml}
      </g>

      <!-- 5. ICONIC CRYSTAL CLEAR DOME LID (ليد بومبيه كامل التغطية) -->
      <!-- Locking Base Rim -->
      <path d="M 14 28 L 17 33 Q 60 37 103 33 L 106 28 Q 60 31 14 28 Z" fill="rgba(235,246,255,0.45)" stroke="rgba(255,255,255,0.85)" stroke-width="0.8"/>
      
      <!-- Crystal Hemispherical Dome Lid Shell -->
      <path d="M 15 28 C 15 12 30 6 60 6 C 90 6 105 12 105 28 Z" fill="rgba(235,248,255,0.22)"/>
      <path d="M 15 28 C 15 12 30 6 60 6 C 90 6 105 12 105 28" stroke="rgba(255,255,255,0.95)" stroke-width="1.3" fill="none"/>

      <!-- Top Dome Spout Opening -->
      <ellipse cx="60" cy="7.5" rx="9" ry="3.2" fill="rgba(205,235,255,0.35)" stroke="#ffffff" stroke-width="0.9"/>

      <!-- Specular Curvature Sheen on Dome Arc -->
      <path d="M 24 22 C 30 14 44 9 54 8" stroke="rgba(255,255,255,0.85)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    </svg>
  `;
}

// ========================================================
// 3. 3D SPARKLING MOCKTAIL & BOBA FIZZ (Boba Pearls, Bubbles, Mint & Citrus)
// ========================================================
function render3DMocktailBoba(options) {
  const id = getNextSvgId('mocktail_boba');
  const drinkType = options.drinkType || 'mojito'; // 'boba', 'mojito', 'blueberry-mojito', 'blue-passion', 'cherry-cola', 'iced-tea'
  const isBlue = drinkType === 'blue-passion';
  const isBoba = drinkType === 'boba';
  const isMojito = drinkType === 'mojito' || drinkType === 'blueberry-mojito';
  const isCherry = drinkType === 'cherry-cola';
  const isTea = drinkType === 'iced-tea';

  let baseColDark = '#065f46';
  let baseCol = '#059669';
  let baseColLight = '#34d399';

  if (isBlue) {
    baseColDark = '#0369a1';
    baseCol = '#0284c7';
    baseColLight = '#38bdf8';
  } else if (drinkType === 'blueberry-mojito') {
    baseColDark = '#312e81';
    baseCol = '#4f46e5';
    baseColLight = '#818cf8';
  } else if (isCherry) {
    baseColDark = '#450a0a';
    baseCol = '#7f1d1d';
    baseColLight = '#b91c1c';
  } else if (isTea) {
    baseColDark = '#78350f';
    baseCol = '#b45309';
    baseColLight = '#d97706';
  } else if (isBoba) {
    baseColDark = '#b45309';
    baseCol = '#d97706';
    baseColLight = '#fde047';
  }

  // Boba Pearls or Citrus & Ice
  let interiorGarnish = '';

  if (isBoba) {
    interiorGarnish = `
      <!-- Glossy Black 3D Tapioca Boba Pearls in Base -->
      <g id="${id}_boba_pearls">
        <!-- Row 1 (Bottom cluster) -->
        <circle cx="34" cy="140" r="5" fill="#0d0d10" stroke="#26262b" stroke-width="0.8"/>
        <ellipse cx="32" cy="138" rx="1.5" ry="1" fill="#71717a"/>
        <circle cx="44" cy="142" r="5.2" fill="#0d0d10" stroke="#26262b" stroke-width="0.8"/>
        <ellipse cx="42" cy="140" rx="1.5" ry="1" fill="#71717a"/>
        <circle cx="56" cy="143" r="5.5" fill="#0d0d10" stroke="#26262b" stroke-width="0.8"/>
        <ellipse cx="54" cy="141" rx="1.6" ry="1.1" fill="#71717a"/>
        <circle cx="68" cy="142" r="5.2" fill="#0d0d10" stroke="#26262b" stroke-width="0.8"/>
        <ellipse cx="66" cy="140" rx="1.5" ry="1" fill="#71717a"/>
        <circle cx="78" cy="139" r="5" fill="#0d0d10" stroke="#26262b" stroke-width="0.8"/>
        <ellipse cx="76" cy="137" rx="1.5" ry="1" fill="#71717a"/>

        <!-- Row 2 (Middle layer) -->
        <circle cx="38" cy="132" r="5" fill="#121216" stroke="#2b2b32" stroke-width="0.8"/>
        <ellipse cx="36" cy="130" rx="1.5" ry="1" fill="#71717a"/>
        <circle cx="50" cy="134" r="5.2" fill="#121216" stroke="#2b2b32" stroke-width="0.8"/>
        <ellipse cx="48" cy="132" rx="1.5" ry="1" fill="#71717a"/>
        <circle cx="62" cy="133" r="5.4" fill="#121216" stroke="#2b2b32" stroke-width="0.8"/>
        <ellipse cx="60" cy="131" rx="1.6" ry="1" fill="#71717a"/>
        <circle cx="74" cy="131" r="5" fill="#121216" stroke="#2b2b32" stroke-width="0.8"/>
        <ellipse cx="72" cy="129" rx="1.5" ry="1" fill="#71717a"/>

        <!-- Row 3 (Top floating boba) -->
        <circle cx="45" cy="124" r="4.8" fill="#18181f" stroke="#33333d" stroke-width="0.8"/>
        <ellipse cx="43" cy="122" rx="1.4" ry="1" fill="#a1a1aa"/>
        <circle cx="58" cy="125" r="5" fill="#18181f" stroke="#33333d" stroke-width="0.8"/>
        <ellipse cx="56" cy="123" rx="1.5" ry="1" fill="#a1a1aa"/>
      </g>

      <!-- Wide Boba Fat Straw -->
      <rect x="55" y="6" width="10" height="135" rx="3" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.85)" stroke-width="0.8"/>
    `;
  } else {
    // Citrus Wheels & Mint Leaves
    interiorGarnish = `
      <!-- Submerged Lemon Wheel (Right Side) -->
      <g transform="translate(74, 65) rotate(22)">
        <circle cx="0" cy="0" r="14" fill="#facc15" stroke="#eab308" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="2.5" fill="#ca8a04"/>
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#ca8a04" stroke-width="0.8"/>
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#ca8a04" stroke-width="0.8"/>
        <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#ca8a04" stroke-width="0.8"/>
        <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#ca8a04" stroke-width="0.8"/>
      </g>

      <!-- Fresh Emerald Mint Sprig -->
      <path d="M 38 42 C 32 30 44 24 50 32 C 56 24 68 30 60 42 Z" fill="#10b981" stroke="#047857" stroke-width="0.9"/>
      <path d="M 50 32 L 50 42" stroke="#065f46" stroke-width="1.2" fill="none"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>

        <!-- Translucent Sparkling Base Gradient -->
        <linearGradient id="${id}_sparkle_body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${baseColDark}" stop-opacity="0.90"/>
          <stop offset="30%" stop-color="${baseColLight}" stop-opacity="0.95"/>
          <stop offset="70%" stop-color="${baseCol}" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="${baseColDark}" stop-opacity="0.88"/>
        </linearGradient>

        <linearGradient id="${id}_pet_sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.48)"/>
          <stop offset="14%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.0)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.52)"/>
        </linearGradient>

        <clipPath id="${id}_boba_clip">
          <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Floor Drop Shadow -->
      <ellipse cx="60" cy="154" rx="36" ry="5.5" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Cup Contents clipped to Contoured Cup Shape -->
      <g clip-path="url(#${id}_boba_clip)">
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_sparkle_body)"/>
        
        <!-- Effervescent Rising Bubbles -->
        <g opacity="0.75">
          <circle cx="34" cy="115" r="1.5" fill="#ffffff"/>
          <circle cx="48" cy="100" r="1.8" fill="#ffffff"/>
          <circle cx="70" cy="112" r="1.4" fill="#ffffff"/>
          <circle cx="62" cy="88" r="2.0" fill="#ffffff"/>
          <circle cx="40" cy="74" r="1.6" fill="#ffffff"/>
          <circle cx="56" cy="62" r="1.5" fill="#ffffff"/>
          <circle cx="76" cy="52" r="1.8" fill="#ffffff"/>
        </g>

        <!-- Interior Garnish (Boba or Citrus/Mint) -->
        ${interiorGarnish}

        <!-- 3D Glistening Crystal Ice Cubes -->
        <g opacity="0.92">
          <!-- Ice Cube 1 -->
          <g transform="translate(32, 34) rotate(-8)">
            <polygon points="0,5 9,0 19,4 10,9" fill="rgba(255,255,255,0.88)"/>
            <polygon points="0,5 10,9 10,20 0,15" fill="rgba(235,248,255,0.55)"/>
            <polygon points="10,9 19,4 19,15 10,20" fill="rgba(205,235,255,0.65)"/>
            <polygon points="0,5 9,0 19,4 10,9" stroke="rgba(255,255,255,0.95)" stroke-width="0.7" fill="none"/>
            <line x1="10" y1="9" x2="10" y2="20" stroke="rgba(255,255,255,0.85)" stroke-width="0.7"/>
          </g>

          <!-- Ice Cube 2 -->
          <g transform="translate(68, 36) rotate(12)">
            <polygon points="0,5 9,0 18,4 10,9" fill="rgba(255,255,255,0.90)"/>
            <polygon points="0,5 10,9 10,19 0,14" fill="rgba(235,248,255,0.50)"/>
            <polygon points="10,9 18,4 18,14 10,19" fill="rgba(205,235,255,0.60)"/>
            <polygon points="0,5 9,0 18,4 10,9" stroke="rgba(255,255,255,0.95)" stroke-width="0.7" fill="none"/>
            <line x1="10" y1="9" x2="10" y2="19" stroke="rgba(255,255,255,0.85)" stroke-width="0.7"/>
          </g>
        </g>

        <!-- Glass Sheen -->
        <rect x="15" y="28" width="90" height="122" fill="url(#${id}_pet_sheen)"/>
      </g>

      <!-- 3. Cup Gold Outline & Measure Lines -->
      <path d="M 18 30 L 20 46 L 22 48 L 30 144 Q 31 147 35 147 L 85 147 Q 89 147 90 144 L 98 48 L 100 46 L 102 30 Z" stroke="rgba(212,175,55,0.75)" stroke-width="1.2" fill="none"/>
      <line x1="23" y1="64" x2="35" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="85" y1="64" x2="97" y2="64" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>

      <!-- 4. Flat Safety Lid -->
      <path d="M 14 28 L 17 33 Q 60 37 103 33 L 106 28 Q 60 31 14 28 Z" fill="rgba(235,246,255,0.45)" stroke="rgba(255,255,255,0.85)" stroke-width="0.8"/>
      <ellipse cx="60" cy="28" rx="46" ry="3.8" fill="rgba(240,249,255,0.35)" stroke="rgba(255,255,255,0.9)" stroke-width="1"/>
      <ellipse cx="60" cy="27.5" rx="30" ry="2.2" fill="rgba(210,235,250,0.25)" stroke="rgba(255,255,255,0.5)" stroke-width="0.7"/>
      <circle cx="60" cy="27.5" r="3.2" fill="rgba(190,225,245,0.6)" stroke="#ffffff" stroke-width="0.8"/>
    </svg>
  `;
}

// ========================================================
// 4. 3D CRISPY BELGIAN WAFFLE ON SLATE PLATTER (Bakery)
// ========================================================
function render3DWaffleGourmetPlate() {
  const id = getNextSvgId('waffle_plate');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <linearGradient id="${id}_slate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e222b"/>
          <stop offset="50%" stop-color="#14161c"/>
          <stop offset="100%" stop-color="#0a0b0e"/>
        </linearGradient>
        <linearGradient id="${id}_waffle_gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e08a1e"/>
          <stop offset="45%" stop-color="#c97716"/>
          <stop offset="100%" stop-color="#874705"/>
        </linearGradient>
      </defs>

      <!-- 1. Slate Plate Drop Shadow -->
      <ellipse cx="60" cy="118" rx="50" ry="20" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- 2. Dark Slate Ceramic Serving Platter with Gold Rim -->
      <ellipse cx="60" cy="112" rx="52" ry="22" fill="url(#${id}_slate)" stroke="rgba(212,175,55,0.85)" stroke-width="1.3"/>
      <ellipse cx="60" cy="110" rx="43" ry="17" fill="#0d0e12" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>

      <!-- 3. Crispy Belgian Waffle Body (Perspective Angle) -->
      <g transform="rotate(-6 60 90)">
        <!-- Base waffle loaf -->
        <rect x="25" y="62" width="68" height="52" rx="8" fill="url(#${id}_waffle_gold)" stroke="#663403" stroke-width="1.4"/>
        
        <!-- 4x3 Grid of Deep Pocketed Wells -->
        <!-- Row 1 -->
        <rect x="31" y="68" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="47" y="68" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="63" y="68" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="79" y="68" width="9" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>

        <!-- Row 2 -->
        <rect x="31" y="83" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="47" y="83" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="63" y="83" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="79" y="83" width="9" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>

        <!-- Row 3 -->
        <rect x="31" y="98" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="47" y="98" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="63" y="98" width="10" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>
        <rect x="79" y="98" width="9" height="9" rx="2" fill="#5c2d04" stroke="#874705" stroke-width="0.8"/>

        <!-- Molten Belgian Dark Chocolate Drizzle -->
        <path d="M 28 72 Q 54 86 88 74" stroke="#251006" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 32 92 Q 58 106 86 90" stroke="#251006" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- Golden Lotus Speculoos Drizzle -->
        <path d="M 34 80 Q 60 92 84 82" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" fill="none"/>

        <!-- Melting Pat of Farm Butter -->
        <rect x="52" y="78" width="14" height="11" rx="2.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
        <ellipse cx="58" cy="88" rx="10" ry="3.5" fill="rgba(254,240,138,0.4)"/>
      </g>

      <!-- Fresh Strawberry Slice Garnish on Plate Margin -->
      <g transform="translate(86, 114) rotate(15)">
        <path d="M 0 0 C -8 4 -6 14 0 16 C 6 14 8 4 0 0 Z" fill="#e11d48" stroke="#be123c" stroke-width="0.9"/>
        <circle cx="-2" cy="7" r="0.7" fill="#fef08a"/>
        <circle cx="2" cy="8" r="0.7" fill="#fef08a"/>
      </g>
    </svg>
  `;
}

// ========================================================
// 5. 3D FLUFFY PANCAKE STACK ON SLATE PLATTER (Bakery)
// ========================================================
function render3DPancakeGourmetPlate() {
  const id = getNextSvgId('pancake_stack');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <linearGradient id="${id}_slate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e222b"/>
          <stop offset="50%" stop-color="#14161c"/>
          <stop offset="100%" stop-color="#0a0b0e"/>
        </linearGradient>
      </defs>

      <!-- Plate Drop Shadow -->
      <ellipse cx="60" cy="124" rx="50" ry="18" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Slate Platter with Gold Rim -->
      <ellipse cx="60" cy="118" rx="52" ry="20" fill="url(#${id}_slate)" stroke="rgba(212,175,55,0.85)" stroke-width="1.3"/>
      <ellipse cx="60" cy="116" rx="42" ry="15" fill="#0d0e12"/>

      <!-- Pancake 1 (Bottom) -->
      <ellipse cx="60" cy="106" rx="38" ry="12" fill="#c97716" stroke="#874705" stroke-width="1.2"/>
      <ellipse cx="60" cy="103" rx="36" ry="11" fill="#e08a1e"/>

      <!-- Pancake 2 (Middle) -->
      <ellipse cx="60" cy="94" rx="34" ry="11" fill="#c97716" stroke="#874705" stroke-width="1.2"/>
      <ellipse cx="60" cy="91" rx="32" ry="10" fill="#f0a535"/>

      <!-- Pancake 3 (Top Fluffy Soufflé) -->
      <ellipse cx="60" cy="80" rx="30" ry="10" fill="#c97716" stroke="#874705" stroke-width="1.2"/>
      <ellipse cx="60" cy="77" rx="28" ry="9" fill="#f5b942"/>

      <!-- Dripping Pure Maple Syrup Streams -->
      <path d="M 52 78 Q 48 94 46 104" stroke="#b45309" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <path d="M 68 80 Q 72 96 70 108" stroke="#b45309" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <path d="M 40 82 Q 38 95 39 104" stroke="#d97706" stroke-width="2.0" stroke-linecap="round" fill="none"/>

      <!-- Butter Cube on Top -->
      <rect x="53" y="66" width="14" height="11" rx="2.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
      <ellipse cx="60" cy="77" rx="10" ry="3" fill="rgba(254,240,138,0.5)"/>

      <!-- Fresh Blueberries on Plate -->
      <circle cx="34" cy="116" r="4.2" fill="#312e81" stroke="#4338ca" stroke-width="0.8"/>
      <circle cx="84" cy="115" r="4" fill="#312e81" stroke="#4338ca" stroke-width="0.8"/>
      <circle cx="89" cy="118" r="3.6" fill="#1e1b4b" stroke="#3730a3" stroke-width="0.8"/>
    </svg>
  `;
}

// ========================================================
// 6. 3D WAFFLE MASTER BATTER CHEF BOWL (Bakery Master SOP)
// ========================================================
function render3DWaffleBatterMaster() {
  const id = getNextSvgId('batter_bowl');
  return `
    <svg viewBox="0 0 120 160" fill="none" class="drink-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}_blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <linearGradient id="${id}_steel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="25%" stop-color="#94a3b8"/>
          <stop offset="60%" stop-color="#cbd5e1"/>
          <stop offset="85%" stop-color="#64748b"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
      </defs>

      <!-- Floor Drop Shadow -->
      <ellipse cx="60" cy="136" rx="42" ry="12" fill="rgba(0,0,0,0.85)" filter="url(#${id}_blur)"/>

      <!-- Stainless Steel Mixing Bowl Body -->
      <path d="M 22 62 C 22 120 38 132 60 132 C 82 132 98 120 98 62 Z" fill="url(#${id}_steel)" stroke="rgba(212,175,55,0.8)" stroke-width="1.3"/>
      
      <!-- Smooth Golden Batter Fill -->
      <ellipse cx="60" cy="66" rx="36" ry="12" fill="#fde047" stroke="#ca8a04" stroke-width="1.2"/>
      <ellipse cx="60" cy="65" rx="30" ry="9" fill="#fef08a"/>

      <!-- Stainless Whisk dipping into batter -->
      <line x1="68" y1="32" x2="56" y2="72" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
      <path d="M 52 66 C 48 54 62 52 58 68" stroke="#94a3b8" stroke-width="1.8" fill="none"/>
      <path d="M 58 68 C 64 54 50 52 54 66" stroke="#94a3b8" stroke-width="1.8" fill="none"/>

      <!-- Bowl Rim Flange -->
      <ellipse cx="60" cy="62" rx="38" ry="10" stroke="#f1f5f9" stroke-width="1.5" fill="none"/>
    </svg>
  `;
}

// ========================================================
// MAIN DISPATCHER: getDrinkSvg(item)
// ========================================================
function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  // 1. BAKERY & DESSERTS (Waffles, Pancakes, Master Batter)
  if (id.includes('batter') || name.includes('عجينة') || id.includes('master')) {
    return render3DWaffleBatterMaster();
  }
  if (id.includes('waffle') || name.includes('وافل')) {
    return render3DWaffleGourmetPlate();
  }
  if (id.includes('pancake') || name.includes('بان كيك')) {
    return render3DPancakeGourmetPlate();
  }

  // 2. FRAPPES (Clear Cup + DOME LID + Whipped Cream + Sauces)
  if (id.includes('frappe') || name.includes('فرابيه')) {
    if (id.includes('chocolate') || name.includes('شيكولاتة') || name.includes('شوكولاتة')) {
      return render3DDomeLidCup({
        baseCol: '#381c0e',
        baseColLight: '#5c341b',
        baseColDark: '#200e05',
        drizzleCol: '#1d0a03',
        topping: 'chocolate'
      });
    }
    if (id.includes('vanilla') || name.includes('فانيليا')) {
      return render3DDomeLidCup({
        baseCol: '#fefce8',
        baseColLight: '#ffffff',
        baseColDark: '#fef08a',
        drizzleCol: '#d97706',
        topping: 'caramel'
      });
    }
    if (id.includes('mocha') || name.includes('موكا')) {
      return render3DDomeLidCup({
        baseCol: '#2d160a',
        baseColLight: '#4a2612',
        baseColDark: '#1a0b04',
        drizzleCol: '#170802',
        topping: 'chocolate'
      });
    }
    if (id.includes('toffee') || name.includes('توفي')) {
      return render3DDomeLidCup({
        baseCol: '#b45309',
        baseColLight: '#d97706',
        baseColDark: '#78350f',
        drizzleCol: '#92400e',
        topping: 'lotus'
      });
    }
    // Default Classic Coffee Frappe
    return render3DDomeLidCup({
      baseCol: '#452310',
      baseColLight: '#69381c',
      baseColDark: '#291307',
      drizzleCol: '#b45309',
      topping: 'caramel'
    });
  }

  // 3. MILKSHAKES (Clear Cup + DOME LID + Whipped Cream + Speculoos/Oreo/Pistachio/Chocolate)
  if (id.includes('shake') || name.includes('شيك') || name.includes('ميلك')) {
    if (id.includes('oreo') || name.includes('أوريو') || name.includes('اوريو')) {
      return render3DDomeLidCup({
        baseCol: '#2d2b29',
        baseColLight: '#44403c',
        baseColDark: '#1c1917',
        drizzleCol: '#120f0e',
        topping: 'oreo'
      });
    }
    if (id.includes('lotus') || name.includes('لوتس')) {
      return render3DDomeLidCup({
        baseCol: '#b45309',
        baseColLight: '#d97706',
        baseColDark: '#78350f',
        drizzleCol: '#92400e',
        topping: 'lotus'
      });
    }
    if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
      return render3DDomeLidCup({
        baseCol: '#4d7c0f',
        baseColLight: '#65a30d',
        baseColDark: '#365314',
        drizzleCol: '#365314',
        topping: 'pistachio'
      });
    }
    if (id.includes('nutella') || name.includes('نوتيلا') || id.includes('ferrero') || name.includes('فيريرو')) {
      return render3DDomeLidCup({
        baseCol: '#381c0e',
        baseColLight: '#5a2e16',
        baseColDark: '#220e06',
        drizzleCol: '#170802',
        topping: 'chocolate'
      });
    }
    if (id.includes('kinder') || name.includes('كيندر')) {
      return render3DDomeLidCup({
        baseCol: '#c08552',
        baseColLight: '#d4a373',
        baseColDark: '#8c5828',
        drizzleCol: '#5a2e16',
        topping: 'chocolate'
      });
    }
    if (id.includes('raffaello') || name.includes('رافايلو')) {
      return render3DDomeLidCup({
        baseCol: '#fefce8',
        baseColLight: '#ffffff',
        baseColDark: '#fef08a',
        drizzleCol: '#ca8a04',
        topping: 'coconut'
      });
    }
    if (id.includes('caramel') || name.includes('كراميل')) {
      return render3DDomeLidCup({
        baseCol: '#d97706',
        baseColLight: '#f59e0b',
        baseColDark: '#92400e',
        drizzleCol: '#78350f',
        topping: 'caramel'
      });
    }
    if (id.includes('digestive') || id.includes('berry') || name.includes('بيري') || name.includes('دايجستف')) {
      return render3DDomeLidCup({
        baseCol: '#7c3aed',
        baseColLight: '#9333ea',
        baseColDark: '#581c87',
        drizzleCol: '#4c1d95',
        topping: 'lotus'
      });
    }
    if (id.includes('fruit') || name.includes('فواكه') || name.includes('فراول')) {
      return render3DDomeLidCup({
        baseCol: '#e11d48',
        baseColLight: '#f43f5e',
        baseColDark: '#be123c',
        drizzleCol: '#9f1239',
        topping: 'vanilla'
      });
    }
    if (id.includes('chocolate') || name.includes('شيكولاتة') || name.includes('شوكولاتة')) {
      return render3DDomeLidCup({
        baseCol: '#33170b',
        baseColLight: '#542813',
        baseColDark: '#1d0b04',
        drizzleCol: '#150601',
        topping: 'chocolate'
      });
    }
    // Default Vanilla Milkshake
    return render3DDomeLidCup({
      baseCol: '#fefce8',
      baseColLight: '#ffffff',
      baseColDark: '#fef08a',
      drizzleCol: '#d97706',
      topping: 'caramel'
    });
  }

  // 4. BOBA & SPARKLING MOCKTAILS (Tapioca Pearls, Bubbles, Lime, Mint)
  if (id.includes('boba') || name.includes('بوبا')) {
    return render3DMocktailBoba({ drinkType: 'boba' });
  }
  if (id.includes('blue') || name.includes('بلو')) {
    return render3DMocktailBoba({ drinkType: 'blue-passion' });
  }
  if (id.includes('mojito') || name.includes('موخيتو')) {
    if (id.includes('blue') || id.includes('berry') || name.includes('بلوبيري')) {
      return render3DMocktailBoba({ drinkType: 'blueberry-mojito' });
    }
    return render3DMocktailBoba({ drinkType: 'mojito' });
  }
  if (id.includes('cherry') || name.includes('شيري') || name.includes('كولا')) {
    return render3DMocktailBoba({ drinkType: 'cherry-cola' });
  }
  if (id.includes('tea') || name.includes('تي')) {
    return render3DMocktailBoba({ drinkType: 'iced-tea' });
  }

  // 5. SMOOTHIES (Clear PET Cup + FLAT SAFETY LID + Natural Vibrant Fruit Gradients & Ice)
  if (id.includes('lemon') || name.includes('ليمون') || name.includes('نعناع')) {
    return render3DContouredColdCup({
      baseCol: '#10b981',
      baseColLight: '#34d399',
      baseColDark: '#059669',
      fruitType: 'lemon-mint'
    });
  }
  if (id.includes('guava') || name.includes('جوافة')) {
    return render3DContouredColdCup({
      baseCol: '#fff1f2',
      baseColLight: '#ffffff',
      baseColDark: '#fde8e8',
      fruitType: 'guava'
    });
  }
  if (id.includes('green-apple') || name.includes('تفاح') || id.includes('apple')) {
    return render3DContouredColdCup({
      baseCol: '#84cc16',
      baseColLight: '#a3e635',
      baseColDark: '#4d7c0f',
      fruitType: 'green-apple'
    });
  }
  if (id.includes('straw') || name.includes('فراول')) {
    return render3DContouredColdCup({
      baseCol: '#e11d48',
      baseColLight: '#f43f5e',
      baseColDark: '#be123c',
      fruitType: 'strawberry'
    });
  }
  if (id.includes('water') || name.includes('بطيخ')) {
    return render3DContouredColdCup({
      baseCol: '#fb7185',
      baseColLight: '#fda4af',
      baseColDark: '#e11d48',
      fruitType: 'watermelon'
    });
  }
  if (id.includes('blueberry') || name.includes('بلوبيري')) {
    return render3DContouredColdCup({
      baseCol: '#4338ca',
      baseColLight: '#6366f1',
      baseColDark: '#312e81',
      fruitType: 'blueberry'
    });
  }
  if (id.includes('mixed-berry') || (name.includes('ميكس') && name.includes('بيري'))) {
    return render3DContouredColdCup({
      baseCol: '#7c3aed',
      baseColLight: '#9333ea',
      baseColDark: '#581c87',
      fruitType: 'mixed-berry'
    });
  }
  if (id.includes('tropical') || name.includes('استوائي')) {
    return render3DContouredColdCup({
      baseCol: '#f97316',
      baseColLight: '#fbbf24',
      baseColDark: '#ea580c',
      fruitType: 'passion'
    });
  }
  if (id.includes('kiwi') || name.includes('كيوي')) {
    return render3DContouredColdCup({
      baseCol: '#65a30d',
      baseColLight: '#84cc16',
      baseColDark: '#3f6212',
      fruitType: 'kiwi'
    });
  }
  if (id.includes('peach') || name.includes('خوخ')) {
    return render3DContouredColdCup({
      baseCol: '#fb923c',
      baseColLight: '#fdba74',
      baseColDark: '#ea580c',
      fruitType: 'peach'
    });
  }
  if (id.includes('cherry') || name.includes('كرز') || name.includes('شيري')) {
    return render3DContouredColdCup({
      baseCol: '#881337',
      baseColLight: '#9f1239',
      baseColDark: '#4c0519',
      fruitType: 'cherry'
    });
  }
  if (id.includes('coconut') || name.includes('جوز هند')) {
    return render3DContouredColdCup({
      baseCol: '#f8fafc',
      baseColLight: '#ffffff',
      baseColDark: '#e2e8f0',
      fruitType: 'coconut'
    });
  }
  if (id.includes('lychee') || name.includes('ليتشي')) {
    return render3DContouredColdCup({
      baseCol: '#fdf2f8',
      baseColLight: '#ffffff',
      baseColDark: '#fce7f3',
      fruitType: 'lychee'
    });
  }
  if (id.includes('karkadeh') || name.includes('كركديه')) {
    return render3DContouredColdCup({
      baseCol: '#991b1b',
      baseColLight: '#b91c1c',
      baseColDark: '#7f1d1d',
      fruitType: 'karkadeh'
    });
  }
  if (id.includes('passion') || name.includes('باشن')) {
    return render3DContouredColdCup({
      baseCol: '#f59e0b',
      baseColLight: '#fbbf24',
      baseColDark: '#ea580c',
      fruitType: 'passion'
    });
  }
  if (id.includes('pineapple') || name.includes('أناناس') || name.includes('اناناس')) {
    return render3DContouredColdCup({
      baseCol: '#facc15',
      baseColLight: '#fde047',
      baseColDark: '#eab308',
      fruitType: 'pineapple'
    });
  }

  // Default Tropical Mango Smoothie
  return render3DContouredColdCup({
    baseCol: '#f59e0b',
    baseColLight: '#fbbf24',
    baseColDark: '#d97706',
    fruitType: 'mango'
  });
}

// 3-Step Barista Operation Teaser
function getDrinkSequence(item) {
  const id = (item.id || '').toLowerCase();
  if (id.includes('waffle') || id.includes('وافل')) {
    return ['1. تسخين ماكينة 185°C', '2. صب 140g عجين 3.5 دقيقة', '3. تزيين بالصوصات'];
  }
  if (id.includes('pancake') || id.includes('بان كيك')) {
    return ['1. تسخين صاج 170°C', '2. تسوية 90 ثانية وقلب', '3. زبدة وعسل نقي'];
  }
  if (id.includes('smoothie') || id.includes('سموذي')) {
    return ['1. بيوريه الفاكهة بالميزان', '2. إضافة الثلج والمياه', '3. خلط سرعة 2 ليد أمان'];
  }
  if (id.includes('shake') || id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه')) {
    return ['1. آيس كريم وحليب بالميزان', '2. خلط متجانس 25 ثانية', '3. كريمة خفق وتوبينج'];
  }
  if (id.includes('boba') || id.includes('بوبا') || id.includes('mojito') || id.includes('موخيتو')) {
    return ['1. كرات بوبا وسيرب بالكوب', '2. خفق المكونات بالشيكر', '3. صب فوق الثلج والصودا'];
  }
  return ['1. تجهيز المعايير والمقادير', '2. الاستخلاص أو الخفق الفوري', '3. التقديم السريع'];
}
