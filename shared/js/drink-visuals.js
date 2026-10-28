// Emad Afandi Specialty Coffee Lab - World-Class Vector Visual System
// High-Craft SVGs: Clear Iced PET Cups (Over-Iced Menu Style), Craft Cutaway Hot Cups,
// 4oz Gibraltar Specialty Glass (Cortado/Piccolo), and Royal Turkish Finjans.

let _svgUidCounter = 0;
function getNextSvgUid(prefix) {
  _svgUidCounter++;
  return `${prefix}_${_svgUidCounter}_${Math.random().toString(36).substring(2, 6)}`;
}

function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  const uid = getNextSvgUid('art_' + id.replace(/[^a-z0-9]/g, '_'));

  // ========================================================
  // 1. BAKERY: BELGIAN WAFFLE & FLUFFY PANCAKES
  // ========================================================
  if (id.includes('waffle') || name.includes('وافل')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
        <ellipse cx="50" cy="88" rx="46" ry="18" fill="#12141a" stroke="#d4af37" stroke-width="1.2"/>
        <ellipse cx="50" cy="87" rx="36" ry="13" fill="#08090c"/>
        <!-- Golden Belgian Waffle Body -->
        <rect x="24" y="54" width="52" height="40" rx="6" transform="rotate(-5 50 74)" fill="#d97706" stroke="#92400e" stroke-width="1.2"/>
        <!-- Deep Grid Pockets -->
        <rect x="30" y="59" width="8" height="8" rx="1.5" transform="rotate(-5 30 59)" fill="#78350f"/>
        <rect x="42" y="58" width="8" height="8" rx="1.5" transform="rotate(-5 42 58)" fill="#78350f"/>
        <rect x="54" y="56" width="8" height="8" rx="1.5" transform="rotate(-5 54 56)" fill="#78350f"/>
        <rect x="66" y="55" width="8" height="8" rx="1.5" transform="rotate(-5 66 55)" fill="#78350f"/>
        <rect x="31" y="72" width="8" height="8" rx="1.5" transform="rotate(-5 31 72)" fill="#78350f"/>
        <rect x="43" y="70" width="8" height="8" rx="1.5" transform="rotate(-5 43 70)" fill="#78350f"/>
        <rect x="55" y="69" width="8" height="8" rx="1.5" transform="rotate(-5 55 69)" fill="#78350f"/>
        <rect x="67" y="67" width="8" height="8" rx="1.5" transform="rotate(-5 67 67)" fill="#78350f"/>
        <!-- Chocolate & Caramel Drizzle -->
        <path d="M 26 64 Q 50 78 76 62" stroke="#261005" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M 30 78 Q 55 90 74 74" stroke="#b45309" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Butter Cube -->
        <rect x="45" y="62" width="11" height="9" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
      </svg>
    `;
  }

  if (id.includes('pancake') || name.includes('بان كيك')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
        <ellipse cx="50" cy="94" rx="46" ry="16" fill="#12141a" stroke="#d4af37" stroke-width="1.2"/>
        <!-- 3 Stacked Golden Pancakes with 3D Depth -->
        <ellipse cx="50" cy="84" rx="34" ry="11" fill="#b45309" stroke="#78350f" stroke-width="1"/>
        <ellipse cx="50" cy="81" rx="33" ry="10" fill="#d97706"/>
        <ellipse cx="50" cy="73" rx="31" ry="10" fill="#b45309" stroke="#78350f" stroke-width="1"/>
        <ellipse cx="50" cy="70" rx="30" ry="9" fill="#f59e0b"/>
        <ellipse cx="50" cy="62" rx="28" ry="9" fill="#b45309" stroke="#78350f" stroke-width="1"/>
        <ellipse cx="50" cy="59" rx="27" ry="8.5" fill="#fbbf24"/>
        <!-- Butter Pat -->
        <rect x="45" y="50" width="11" height="9" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
        <!-- Dripping Maple Syrup -->
        <path d="M 48 58 Q 45 74 44 83" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 54 59 Q 57 71 55 78" stroke="#92400e" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // ========================================================
  // 2. SHORT GIBRALTAR GLASS (Cortado, Piccolo, Espresso)
  // ========================================================
  if (id.includes('cortado') || id.includes('piccolo') || id === 'espresso-single' || id === 'espresso-doppio' || id === 'espresso-ristretto') {
    return renderShortGlass(uid, id, name);
  }

  // ========================================================
  // 3. TRADITIONAL TURKISH & ORIENTAL BREWS (Finjan & Saucer)
  // ========================================================
  if (id.includes('turkish') || name.includes('تركي') || id.includes('french') || name.includes('فرنسا') || 
      id.includes('arabic') || name.includes('عربي') || id.includes('jabana') || name.includes('جبنة')) {
    return renderTurkishFinjan(uid, id, name);
  }

  // ========================================================
  // 4. ICED DRINKS & COLD BAR (Clear PET Cup - "Over Iced Coffee" Menu Style)
  // ========================================================
  const isColdDrink = id.includes('iced') || id.includes('ice') || name.includes('آيس') || name.includes('ايس') ||
                      id.includes('smoothie') || name.includes('سموذي') || name.includes('سموزي') ||
                      id.includes('shake') || name.includes('شيك') ||
                      id.includes('frappe') || name.includes('فرابيه') ||
                      id.includes('boba') || name.includes('بوبا') ||
                      id.includes('mojito') || name.includes('موخيتو') || name.includes('موهيتو');

  if (isColdDrink) {
    return renderIcedCup(uid, id, name);
  }

  // ========================================================
  // 5. HOT CRAFT CUTAWAY CUPS (Latte, Cappuccino, Flat White, Americano, Hot Specials)
  // ========================================================
  return renderHotCup(uid, id, name);
}

// -------------------------------------------------------------
// RENDER ENGINE A: CLEAR ICED CUP (Over-Iced Coffee Style)
// -------------------------------------------------------------
function renderIcedCup(uid, id, name) {
  // Stratified Layers from BOTTOM to TOP (sum = 100)
  let layers = [];
  let drizzleColor = null;
  let hasBoba = false;
  let hasWhippedCream = false;
  let topDusting = null;

  if (id.includes('spanish') || name.includes('سبانيش')) {
    // Condensed milk base + milk + ice + dark espresso float with caramel/coffee drizzles
    layers = [
      { pct: 28, col: '#fff8eb', name: 'حليب مكثف محلى' },
      { pct: 38, col: '#f7eee3', name: 'حليب بارد طازج' },
      { pct: 34, col: '#241005', name: 'دبل إسبريسو طازج' }
    ];
    drizzleColor = '#9a3412';
  }
  else if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    // Rich green pistachio cream at bottom + milk + espresso float
    layers = [
      { pct: 28, col: '#4d7c0f', name: 'صوص بيستاشيو إيطالي' },
      { pct: 40, col: '#f7eee3', name: 'حليب بارد طازج' },
      { pct: 32, col: '#261105', name: 'دبل إسبريسو' }
    ];
    drizzleColor = '#3f6212';
  }
  else if (id.includes('white-mocha') || name.includes('وايت موكا')) {
    // White chocolate base + cold milk + espresso
    layers = [
      { pct: 25, col: '#fefce8', name: 'صوص شيكولاتة بيضاء' },
      { pct: 42, col: '#f5ebe0', name: 'حليب بارد طازج' },
      { pct: 33, col: '#281206', name: 'إسبريسو غني' }
    ];
    drizzleColor = '#ca8a04';
  }
  else if (id.includes('caramel-macchiato') || name.includes('كراميل ماكياتو')) {
    // Vanilla milk + ice + espresso float + caramel criss-cross
    layers = [
      { pct: 48, col: '#fcf8f0', name: 'حليب وسيرب فانيليا' },
      { pct: 40, col: '#291206', name: 'إسبريسو طازج' },
      { pct: 12, col: '#b45309', name: 'كراميل بلجيكي' }
    ];
    drizzleColor = '#b45309';
  }
  else if (id.includes('mocha') || name.includes('موكا')) {
    // Dark Belgian chocolate base + chocolate milk + espresso
    layers = [
      { pct: 28, col: '#220d04', name: 'صوص شيكولاتة داكنة' },
      { pct: 40, col: '#5c351f', name: 'حليب شيكولاتة متجانس' },
      { pct: 32, col: '#231005', name: 'دبل إسبريسو' }
    ];
    drizzleColor = '#1c0902';
  }
  else if (id.includes('americano') || name.includes('أمريكانو')) {
    // Cold water bottom + dark floating espresso
    layers = [
      { pct: 60, col: '#1e293b', name: 'ماء نقي بارد' },
      { pct: 40, col: '#261105', name: 'دبل إسبريسو غني' }
    ];
  }
  else if (id === 'iced-espresso' || name.includes('إسبريسو آيس')) {
    // Shakerato / Iced Espresso
    layers = [
      { pct: 70, col: '#1e0c03', name: 'إسبريسو مكثف مثلج' },
      { pct: 30, col: '#b45309', name: 'فوم قهوة كريمي' }
    ];
  }
  else if (id.includes('latte') || name.includes('لاتيه')) {
    // Classic Iced Latte
    layers = [
      { pct: 60, col: '#f7eee3', name: 'حليب بارد طازج' },
      { pct: 40, col: '#281206', name: 'دبل إسبريسو' }
    ];
  }
  // --- FRAPPES & MILKSHAKES (With Whipped Cream) ---
  else if (id.includes('frappe') || name.includes('فرابيه')) {
    hasWhippedCream = true;
    let baseCol = '#452613';
    drizzleColor = '#1c0902';
    if (id.includes('caramel') || name.includes('كراميل')) { baseCol = '#78350f'; drizzleColor = '#b45309'; }
    if (id.includes('vanilla') || name.includes('فانيليا')) { baseCol = '#e7d8c5'; drizzleColor = '#b45309'; }

    layers = [
      { pct: 75, col: baseCol, name: 'مخفوق مثلج متجانس' },
      { pct: 25, col: '#ffffff', name: 'كريمة خفق ناعمة' }
    ];
  }
  else if (id.includes('shake') || name.includes('شيك')) {
    hasWhippedCream = true;
    let shakeCol = '#5c351f';
    drizzleColor = '#220d04';

    if (id.includes('oreo') || name.includes('أوريو') || name.includes('اوريو')) {
      shakeCol = '#1f1e24';
      topDusting = '#09090b';
    } else if (id.includes('lotus') || name.includes('لوتس')) {
      shakeCol = '#9a3412';
      drizzleColor = '#78350f';
    } else if (id.includes('pistachio') || name.includes('بستاش')) {
      shakeCol = '#3f6212';
      drizzleColor = '#4d7c0f';
    } else if (id.includes('straw') || name.includes('فراول')) {
      shakeCol = '#be123c';
      drizzleColor = '#9f1239';
    } else if (id.includes('mango') || name.includes('مانج')) {
      shakeCol = '#ea580c';
      drizzleColor = '#c2410c';
    }

    layers = [
      { pct: 75, col: shakeCol, name: 'ميلك شيك آيس كريم ثقيل' },
      { pct: 25, col: '#ffffff', name: 'كريمة خفق' }
    ];
  }
  // --- SMOOTHIES (Fresh Vibrant Fruit) ---
  else if (id.includes('smoothie') || name.includes('سموذي') || name.includes('سموزي')) {
    let fruitCol = '#ea580c'; // default mango
    if (id.includes('straw') || name.includes('فراول')) fruitCol = '#be123c';
    else if (id.includes('lemon') || name.includes('ليمون')) fruitCol = '#15803d';
    else if (id.includes('blue') || name.includes('توت') || name.includes('berry')) fruitCol = '#6b21a8';
    else if (id.includes('water') || name.includes('بطيخ')) fruitCol = '#e11d48';
    else if (id.includes('passion') || name.includes('باشن')) fruitCol = '#c2410c';
    else if (id.includes('kiwi') || name.includes('كيوي')) fruitCol = '#4d7c0f';
    else if (id.includes('peach') || name.includes('خوخ')) fruitCol = '#f97316';

    layers = [
      { pct: 75, col: fruitCol, name: 'بيوريه فاكهة مثلجة' },
      { pct: 25, col: '#2c3e50', name: 'ثلج مجروش ناعم' }
    ];
  }
  // --- BOBA FIZZ & MOJITOS ---
  else if (id.includes('boba') || name.includes('بوبا') || id.includes('mojito') || name.includes('موهيتو') || name.includes('موخيتو')) {
    hasBoba = id.includes('boba') || name.includes('بوبا');
    let fizzCol = '#0284c7';
    if (id.includes('straw') || name.includes('فراول')) fizzCol = '#e11d48';
    else if (id.includes('passion') || name.includes('باشن')) fizzCol = '#ea580c';
    else if (id.includes('blue') || name.includes('توت')) fizzCol = '#7c3aed';
    else if (id.includes('classic') || name.includes('كلاسيك') || id.includes('mojito')) fizzCol = '#059669';

    layers = [
      { pct: 70, col: fizzCol, name: 'صودا منعشة وسيرب' },
      { pct: 30, col: '#38bdf8', name: 'ثلج مجروش وانتعاش' }
    ];
  }
  else {
    // Default cold drink fallback
    layers = [
      { pct: 55, col: '#f7eee3', name: 'حليب بارد' },
      { pct: 45, col: '#261105', name: 'قهوة مثلجة' }
    ];
  }

  // Calculate layer heights inside the clear cup
  // Inner Cup bounds: Top y=24, Bottom y=120, height = 96
  const totalH = 96;
  const bottomY = 120;
  let currentY = bottomY;

  let layersSvg = '';
  layers.forEach((l) => {
    const h = (l.pct / 100) * totalH;
    const topY = currentY - h;
    // Curved meniscus path for each layer
    layersSvg += `
      <path d="M 10 ${topY} Q 50 ${topY + 3.5} 90 ${topY} L 90 ${currentY} Q 50 ${currentY + 3.5} 10 ${currentY} Z" fill="${l.col}"/>
    `;
    currentY = topY;
  });

  // Drizzle drips on inner glass wall
  let drizzleSvg = '';
  if (drizzleColor) {
    drizzleSvg = `
      <path d="M 23 38 Q 27 58 24 82" stroke="${drizzleColor}" stroke-width="2.6" stroke-linecap="round" opacity="0.85"/>
      <path d="M 77 34 Q 72 56 75 88" stroke="${drizzleColor}" stroke-width="2.8" stroke-linecap="round" opacity="0.85"/>
      <path d="M 38 42 Q 41 64 39 88" stroke="${drizzleColor}" stroke-width="2" stroke-linecap="round" opacity="0.75"/>
      <path d="M 62 40 Q 59 62 61 80" stroke="${drizzleColor}" stroke-width="2.2" stroke-linecap="round" opacity="0.75"/>
    `;
  }

  // Boba pearls at bottom
  let bobaSvg = '';
  if (hasBoba) {
    bobaSvg = `
      <g opacity="0.95">
        <circle cx="34" cy="116" r="4.2" fill="#09090b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="44" cy="117" r="4.5" fill="#09090b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="55" cy="116" r="4.3" fill="#09090b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="66" cy="115" r="4" fill="#09090b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="39" cy="110" r="4.2" fill="#18181b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="50" cy="110" r="4.5" fill="#09090b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="61" cy="111" r="4.1" fill="#18181b" stroke="#27272a" stroke-width="0.8"/>
        <circle cx="45" cy="104" r="4" fill="#27272a" stroke="#3f3f46" stroke-width="0.6"/>
        <circle cx="56" cy="105" r="3.9" fill="#18181b" stroke="#27272a" stroke-width="0.8"/>
      </g>
    `;
  }

  // Whipped cream swirl or flat lid
  let topLidOrCream = '';
  if (hasWhippedCream) {
    topLidOrCream = `
      <!-- Dome Lid -->
      <path d="M 14 22 C 14 3 86 3 86 22 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
      <!-- Whipped Cream Rosette Swirl -->
      <path d="M 22 22 Q 28 8 50 8 Q 72 8 78 22 Z" fill="#ffffff"/>
      <path d="M 30 20 C 35 12 45 10 50 10 C 55 10 65 12 70 20" stroke="#f1f5f9" stroke-width="3" fill="none"/>
      <path d="M 46 8 C 48 4 52 4 54 8" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      ${drizzleColor ? `<path d="M 28 16 Q 50 12 72 16" stroke="${drizzleColor}" stroke-width="2" stroke-linecap="round"/>` : ''}
      ${drizzleColor ? `<path d="M 34 20 Q 50 16 66 20" stroke="${drizzleColor}" stroke-width="2" stroke-linecap="round"/>` : ''}
      <!-- Straw through dome -->
      <line x1="58" y1="2" x2="63" y2="28" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
    `;
  } else {
    topLidOrCream = `
      <!-- Clear Flat Lid with Sip Rim -->
      <path d="M 13 22 L 16 15 Q 50 13 84 15 L 87 22 Z" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.7)" stroke-width="0.9"/>
      <!-- Gold Straw -->
      <line x1="49" y1="5" x2="53" y2="26" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
    `;
  }

  return `
    <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
      <defs>
        <!-- Clip inner cup shape -->
        <clipPath id="${uid}_clip">
          <path d="M 16 23 L 28 120 Q 29 122 32 122 L 68 122 Q 71 122 72 120 L 84 23 Z"/>
        </clipPath>
        <!-- Transparent Glass Gradient Highlight -->
        <linearGradient id="${uid}_glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.3)"/>
          <stop offset="30%" stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="85%" stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.25)"/>
        </linearGradient>
      </defs>

      <!-- Soft Table Drop Shadow -->
      <ellipse cx="50" cy="126" rx="26" ry="3.5" fill="rgba(0,0,0,0.7)"/>

      <!-- Inner Liquid Strata (Clipped) -->
      <g clip-path="url(#${uid}_clip)">
        ${layersSvg}
        ${drizzleSvg}
        ${bobaSvg}

        <!-- Glistening Translucent Ice Cubes (Over-Iced Look) -->
        <g opacity="0.9">
          <rect x="29" y="30" width="16" height="15" rx="2.5" transform="rotate(-9 37 37)" fill="rgba(255,255,255,0.45)" stroke="rgba(255,255,255,0.85)" stroke-width="0.9"/>
          <rect x="53" y="34" width="16" height="14" rx="2.5" transform="rotate(12 61 41)" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.8)" stroke-width="0.9"/>
          <rect x="36" y="52" width="15" height="14" rx="2.5" transform="rotate(6 43 59)" fill="rgba(255,255,255,0.32)" stroke="rgba(255,255,255,0.75)" stroke-width="0.8"/>
          <rect x="54" y="56" width="14" height="13" rx="2.5" transform="rotate(-7 61 62)" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" stroke-width="0.8"/>
        </g>

        <!-- Vertical Glass Cylindrical Sheen -->
        <rect x="15" y="23" width="70" height="100" fill="url(#${uid}_glass)"/>
      </g>

      <!-- Outer Clear PET Cup Shell -->
      <path d="M 16 23 L 28 120 Q 29 122 32 122 L 68 122 Q 71 122 72 120 L 84 23 Z" fill="none" stroke="#d4af37" stroke-width="1.3"/>

      <!-- Vertical Curved Gloss Reflection Streaks -->
      <path d="M 22 26 L 31 116" stroke="rgba(255,255,255,0.55)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 26 28 L 34 114" stroke="rgba(255,255,255,0.22)" stroke-width="1.2" stroke-linecap="round"/>

      <!-- Clear Rolled Cup Lip -->
      <rect x="13" y="20" width="74" height="4.5" rx="2" fill="rgba(255,255,255,0.6)" stroke="#d4af37" stroke-width="0.9"/>

      <!-- Top Lid and Straw -->
      ${topLidOrCream}
    </svg>
  `;
}

// -------------------------------------------------------------
// RENDER ENGINE B: CRAFT PAPER CUTAWAY CUP (Reference Image 2)
// -------------------------------------------------------------
function renderHotCup(uid, id, name) {
  let layers = [];
  let topStyle = 'foam'; // 'crema', 'foam', 'cocoa', 'caramel', 'flat'

  if (id.includes('americano') || name.includes('أمريكانو')) {
    // 35% Espresso + 65% Hot Water with golden crema rim
    layers = [
      { pct: 35, col: '#220e04', name: 'دبل إسبريسو' },
      { pct: 60, col: '#1e293b', name: 'ماء ساخن 92°C' },
      { pct: 5, col: '#c28434', name: 'كريما خفيفة' }
    ];
    topStyle = 'crema';
  }
  else if (id.includes('cappuccino') || name.includes('كابتشينو')) {
    // 1/3 Espresso + 1/3 Milk + 1/3 Thick Airy Foam with Cocoa Dusting
    layers = [
      { pct: 33, col: '#241005', name: 'إسبريسو غني' },
      { pct: 34, col: '#f7eee3', name: 'حليب مبخر' },
      { pct: 33, col: '#ffffff', name: 'فوم كثيف مخملي' }
    ];
    topStyle = 'cocoa';
  }
  else if (id.includes('flat-white') || name.includes('فلات وايت')) {
    // Double Ristretto + velvety microfoam
    layers = [
      { pct: 45, col: '#230f04', name: 'دبل ريستريتو' },
      { pct: 50, col: '#f7eee3', name: 'حليب ميكروتيكستشر' },
      { pct: 5, col: '#ffffff', name: 'طبقة فلات ناعمة' }
    ];
    topStyle = 'flat';
  }
  else if (id.includes('spanish') || name.includes('سبانيش')) {
    // Condensed milk + espresso + steamed milk
    layers = [
      { pct: 25, col: '#fef3c7', name: 'حليب مكثف محلى' },
      { pct: 35, col: '#241005', name: 'دبل إسبريسو' },
      { pct: 30, col: '#f7eee3', name: 'حليب مبخر ناعم' },
      { pct: 10, col: '#ffffff', name: 'فوم حريري' }
    ];
  }
  else if (id.includes('pistachio') || name.includes('بيستاشيو') || name.includes('بستاش')) {
    // Pistachio base + espresso + steamed milk
    layers = [
      { pct: 25, col: '#4d7c0f', name: 'صوص بيستاشيو' },
      { pct: 35, col: '#241005', name: 'دبل إسبريسو' },
      { pct: 30, col: '#f7eee3', name: 'حليب مبخر' },
      { pct: 10, col: '#ffffff', name: 'فوم وفستق مجروش' }
    ];
  }
  else if (id.includes('white-mocha') || name.includes('وايت موكا')) {
    layers = [
      { pct: 25, col: '#fefce8', name: 'شوكولاتة بيضاء' },
      { pct: 35, col: '#241005', name: 'إسبريسو ساخن' },
      { pct: 30, col: '#f7eee3', name: 'حليب مبخر' },
      { pct: 10, col: '#ffffff', name: 'فوم حليبي' }
    ];
  }
  else if (id.includes('caramel-macchiato') || name.includes('كراميل')) {
    layers = [
      { pct: 50, col: '#f7eee3', name: 'حليب مبخر بالفانيليا' },
      { pct: 35, col: '#241005', name: 'إسبريسو مارك' },
      { pct: 15, col: '#ffffff', name: 'فوم وشبكة كراميل' }
    ];
    topStyle = 'caramel';
  }
  else if (id.includes('mocha') || name.includes('موكا')) {
    layers = [
      { pct: 25, col: '#1c0902', name: 'صوص شوكولاتة بلجيكي' },
      { pct: 35, col: '#241005', name: 'إسبريسو ساخن' },
      { pct: 30, col: '#f7eee3', name: 'حليب مبخر' },
      { pct: 10, col: '#ffffff', name: 'فوم كريمي' }
    ];
  }
  else if (id.includes('v60') || id.includes('chemex') || id.includes('filter') || id.includes('drip')) {
    // Filter coffee
    layers = [
      { pct: 90, col: '#3b1807', name: 'قهوة مقطرة نقية' },
      { pct: 10, col: '#92400e', name: 'سطح القهوة المقطرة' }
    ];
    topStyle = 'crema';
  }
  else if (id.includes('hot-batata') || name.includes('بطاطا')) {
    layers = [
      { pct: 30, col: '#c2410c', name: 'بيوريه بطاطا مشوية' },
      { pct: 50, col: '#f7eee3', name: 'حليب مبخر مكرمل' },
      { pct: 20, col: '#b45309', name: 'كراميل وقرفة' }
    ];
  }
  else if (id.includes('hot-lotus') || name.includes('لوتس')) {
    layers = [
      { pct: 30, col: '#9a3412', name: 'زبدة لوتس أصلية' },
      { pct: 50, col: '#f7eee3', name: 'حليب ساخن' },
      { pct: 20, col: '#78350f', name: 'بسكويت لوتس مطحون' }
    ];
  }
  else if (id.includes('hot-chocolate') || name.includes('شوكليت') || name.includes('شيكولاتة')) {
    layers = [
      { pct: 35, col: '#1f0d04', name: 'شوكولاتة مذابة' },
      { pct: 45, col: '#f7eee3', name: 'حليب ساخن' },
      { pct: 20, col: '#ffffff', name: 'مارشميلو وفوم' }
    ];
  }
  else if (id.includes('karak') || id.includes('adani') || id.includes('masala') || name.includes('كرك') || name.includes('عدني')) {
    layers = [
      { pct: 45, col: '#78350f', name: 'شاي أسود وتوابل' },
      { pct: 55, col: '#fed7aa', name: 'حليب مبخر مكثف' }
    ];
  }
  else {
    // Default Hot Latte
    layers = [
      { pct: 30, col: '#241005', name: 'إسبريسو دبل' },
      { pct: 55, col: '#f7eee3', name: 'حليب مبخر 65°C' },
      { pct: 15, col: '#ffffff', name: 'ميكروفوم حريري' }
    ];
  }

  const totalH = 96;
  const bottomY = 120;
  let currentY = bottomY;

  let layersSvg = '';
  layers.forEach((l) => {
    const h = (l.pct / 100) * totalH;
    const topY = currentY - h;
    // Curved meniscus path
    layersSvg += `
      <path d="M 12 ${topY} Q 50 ${topY + 3.5} 88 ${topY} L 88 ${currentY} Q 50 ${currentY + 3.5} 12 ${currentY} Z" fill="${l.col}"/>
    `;
    currentY = topY;
  });

  // Top surface decoration
  let topDecorSvg = '';
  if (topStyle === 'cocoa') {
    topDecorSvg = `
      <ellipse cx="50" cy="${currentY + 2}" rx="24" ry="4" fill="#3b1d0e" opacity="0.8"/>
      <circle cx="44" cy="${currentY + 2}" r="0.8" fill="#1c0902"/>
      <circle cx="52" cy="${currentY + 1.5}" r="0.9" fill="#1c0902"/>
      <circle cx="58" cy="${currentY + 2.5}" r="0.7" fill="#1c0902"/>
    `;
  } else if (topStyle === 'caramel') {
    topDecorSvg = `
      <path d="M 32 ${currentY + 2} Q 50 ${currentY - 1} 68 ${currentY + 2}" stroke="#b45309" stroke-width="2" stroke-linecap="round"/>
      <path d="M 38 ${currentY + 4} Q 50 ${currentY + 1} 62 ${currentY + 4}" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
    `;
  }

  return `
    <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
      <defs>
        <clipPath id="${uid}_clip">
          <path d="M 19 23 L 28 120 Q 29 123 32 123 L 68 123 Q 71 123 72 120 L 81 23 Z"/>
        </clipPath>
        <!-- 3D Cylindrical Shadow for Cup Body -->
        <linearGradient id="${uid}_cyl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.55)"/>
          <stop offset="25%" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="75%" stop-color="rgba(255,255,255,0.02)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.65)"/>
        </linearGradient>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="50" cy="126" rx="26" ry="3.5" fill="rgba(0,0,0,0.7)"/>

      <!-- Liquid Layers (Clipped) -->
      <g clip-path="url(#${uid}_clip)">
        ${layersSvg}
        ${topDecorSvg}
        <!-- 3D Cylindrical Shading Overlay -->
        <rect x="18" y="23" width="64" height="100" fill="url(#${uid}_cyl)"/>
      </g>

      <!-- Outer Solid Craft Cup Outline -->
      <path d="M 19 23 L 28 120 Q 29 123 32 123 L 68 123 Q 71 123 72 120 L 81 23 Z" fill="none" stroke="#d4af37" stroke-width="1.2"/>

      <!-- Rolled Paper Lip -->
      <rect x="17" y="19" width="66" height="4.5" rx="1.5" fill="#f1ece5" stroke="#d4af37" stroke-width="0.8"/>

      <!-- Sleek Barista Takeaway Lid with Spout -->
      <rect x="14" y="12" width="72" height="8" rx="2.5" fill="#24140b" stroke="#d4af37" stroke-width="1"/>
      <rect x="30" y="7" width="40" height="6.5" rx="2" fill="#170c06" stroke="rgba(212,175,55,0.7)" stroke-width="0.8"/>
      <rect x="20" y="8" width="7" height="2.5" rx="1" fill="#080402"/>
    </svg>
  `;
}

// -------------------------------------------------------------
// RENDER ENGINE C: 4oz GIBRALTAR SPECIALTY GLASS (Cortado/Piccolo)
// -------------------------------------------------------------
function renderShortGlass(uid, id, name) {
  const isEspressoOnly = id.includes('espresso');
  const isDoppio = id.includes('doppio') || (isEspressoOnly && id.includes('double'));

  let layersSvg = '';
  if (isEspressoOnly) {
    const coffeeH = isDoppio ? 44 : 26;
    const cremaH = isDoppio ? 14 : 10;
    const coffeeY = 106 - coffeeH;
    const cremaY = coffeeY - cremaH;

    layersSvg = `
      <path d="M 24 ${coffeeY} Q 50 ${coffeeY + 2} 76 ${coffeeY} L 76 106 Q 50 108 24 106 Z" fill="#200d04"/>
      <path d="M 22 ${cremaY} Q 50 ${cremaY + 2.5} 78 ${cremaY} L 78 ${coffeeY} Q 50 ${coffeeY + 2.5} 22 ${coffeeY} Z" fill="#b45309"/>
      <ellipse cx="50" cy="${cremaY + 1}" rx="26" ry="4" fill="#d97706"/>
    `;
  } else {
    // Cortado: 50% Espresso (Bottom) + 50% Steamed Milk (Top)
    // Glass usable height: y=42 to y=106 (64px total). Each gets 32px
    const midY = 74;
    const topY = 44;

    layersSvg = `
      <!-- 50% Dark Espresso Bottom -->
      <path d="M 26 ${midY} Q 50 ${midY + 2.5} 74 ${midY} L 74 106 Q 50 108 26 106 Z" fill="#240f04"/>
      <!-- Espresso-Milk Boundary Crema Line -->
      <path d="M 26 ${midY} Q 50 ${midY + 2.5} 74 ${midY}" stroke="#b45309" stroke-width="2"/>
      <!-- 50% Warm Steamed Milk Top -->
      <path d="M 21 ${topY} Q 50 ${topY + 3} 79 ${topY} L 79 ${midY} Q 50 ${midY + 3} 21 ${midY} Z" fill="#f7eee3"/>
      <!-- Microfoam Surface Meniscus -->
      <ellipse cx="50" cy="${topY + 1.5}" rx="28" ry="4.5" fill="#ffffff" stroke="#f1f5f9" stroke-width="0.8"/>
    `;
  }

  return `
    <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
      <defs>
        <clipPath id="${uid}_glass_clip">
          <!-- Faceted Gibraltar Glass Contour -->
          <path d="M 20 40 L 28 106 Q 30 118 36 118 L 64 118 Q 70 118 72 106 L 80 40 Z"/>
        </clipPath>
      </defs>

      <!-- Glass Drop Shadow -->
      <ellipse cx="50" cy="122" rx="22" ry="3.5" fill="rgba(0,0,0,0.7)"/>

      <!-- Liquid inside Glass (Clipped) -->
      <g clip-path="url(#${uid}_glass_clip)">
        ${layersSvg}
        <!-- Heavy Solid Glass Base (Bottom 12px) -->
        <rect x="24" y="106" width="52" height="14" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
      </g>

      <!-- Faceted Glass Outer Shell -->
      <path d="M 20 40 L 28 106 Q 30 118 36 118 L 64 118 Q 70 118 72 106 L 80 40 Z" fill="none" stroke="#d4af37" stroke-width="1.3"/>

      <!-- Gibraltar Glass Facets & Vertical Bevel Highlights -->
      <line x1="32" y1="44" x2="36" y2="106" stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
      <line x1="44" y1="44" x2="45" y2="106" stroke="rgba(255,255,255,0.25)" stroke-width="0.9"/>
      <line x1="56" y1="44" x2="55" y2="106" stroke="rgba(255,255,255,0.25)" stroke-width="0.9"/>
      <line x1="68" y1="44" x2="64" y2="106" stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>

      <!-- Polished Glass Rim -->
      <ellipse cx="50" cy="40" rx="30" ry="4.5" fill="none" stroke="#d4af37" stroke-width="1.2"/>
    </svg>
  `;
}

// -------------------------------------------------------------
// RENDER ENGINE D: TURKISH COFFEE FINJAN & SAUCER
// -------------------------------------------------------------
function renderTurkishFinjan(uid, id, name) {
  const isDark = id.includes('dark') || name.includes('غامق');
  const isLight = id.includes('light') || name.includes('فاتح');
  const isFrench = id.includes('french') || name.includes('فرنسا');

  let brewCol = isDark ? '#1a0902' : (isLight ? '#451f08' : '#2b1205');
  let cremaCol = isDark ? '#3b1807' : (isLight ? '#9a3412' : '#78350f');
  if (isFrench) {
    brewCol = '#3f2110';
    cremaCol = '#d4b996';
  }

  return `
    <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
      <!-- Golden Royal Saucer -->
      <ellipse cx="50" cy="108" rx="42" ry="9" fill="#090a0d" stroke="#d4af37" stroke-width="1.5"/>
      <ellipse cx="50" cy="106" rx="34" ry="7" fill="#141720" stroke="rgba(212,175,55,0.6)" stroke-width="0.9"/>

      <!-- Ornate Gold Handle -->
      <path d="M 75 60 C 94 60 94 92 73 96" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Porcelain Finjan Body -->
      <path d="M 23 52 Q 24 102 50 102 Q 76 102 77 52 Z" fill="#0c0d12" stroke="#d4af37" stroke-width="1.4"/>

      <!-- Coffee Body inside Cup -->
      <path d="M 26 56 Q 27 98 50 98 Q 73 98 74 56 Z" fill="${brewCol}"/>

      <!-- Velvet Crema Foam (وش القهوة المظبوط) -->
      <ellipse cx="50" cy="56" rx="24" ry="7" fill="${cremaCol}"/>
      <ellipse cx="50" cy="56" rx="19" ry="5.5" fill="${cremaCol}"/>
      <!-- Roasted Oil Ring & Micro-bubbles -->
      <circle cx="44" cy="55" r="1.5" fill="#d97706" opacity="0.8"/>
      <circle cx="56" cy="57" r="1.2" fill="#d97706" opacity="0.8"/>
      <circle cx="51" cy="54" r="1.6" fill="#b45309" opacity="0.9"/>

      <!-- Polished Gold Rim of Cup -->
      <ellipse cx="50" cy="52" rx="27" ry="6.5" fill="none" stroke="#d4af37" stroke-width="1.3"/>

      <!-- Delicate Steam Wisps -->
      <path d="M 43 44 Q 40 34 46 25" stroke="rgba(212,175,55,0.4)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <path d="M 54 42 Q 58 32 52 22" stroke="rgba(212,175,55,0.3)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    </svg>
  `;
}

// -------------------------------------------------------------
// HELPER: 3-STEP SEQUENTIAL OPERATION TEASERS
// -------------------------------------------------------------
function getDrinkSequence(item) {
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
    return ['1. دبل إسبريسو 50%', '2. حليب دافئ 50%', '3. صب بكاس جبل طارق'];
  }
  if (id.includes('piccolo') || name.includes('بيكلو')) {
    return ['1. ريستريتو 1/3', '2. حليب دافئ 2/3', '3. صب هادئ بكاس 4oz'];
  }
  if (id.includes('americano') || name.includes('أمريكانو')) {
    return ['1. ماء ساخن/بارد أولاً', '2. دبل إسبريسو فوق الماء', '3. تقديم الكريما طازجة'];
  }
  if (id.includes('caramel') || name.includes('كراميل')) {
    return ['1. حليب فانيليا بالكوب', '2. إسبريسو مارك', '3. شبكة كراميل بالقمة'];
  }
  if (id.includes('mocha') || name.includes('موكا')) {
    return ['1. صوص شوكولاتة بالقاع', '2. إسبريسو ساخن ودمج', '3. حليب مبخر أو مثلج'];
  }
  if (id === 'espresso-single' || id === 'espresso-doppio' || id === 'espresso-ristretto') {
    return ['1. وزن البن وطحنه بدقة', '2. كبس متزن 15kg', '3. استخلاص 25-30 ثانية'];
  }
  if (id.includes('turkish') || name.includes('تركي')) {
    return ['1. عيار البن والماء بالكنكة', '2. تسوية هادئة عالرمالة', '3. صب الوش أولاً ثم الصب'];
  }
  if (id.includes('french') || name.includes('فرنسا')) {
    return ['1. بن فرنساي وحليب طازج', '2. تقليب مستمر للتماسك', '3. صب الفوم الكريمي'];
  }
  if (id.includes('arabic') || name.includes('عربي')) {
    return ['1. غلي القهوة الشقراء بالدلة', '2. إضافة الهيل والزعفران', '3. ركود دقيقة ثم صب'];
  }
  if (id.includes('waffle') || name.includes('وافل')) {
    return ['1. تسخين ماكينة 185°C', '2. صب 140g عجين 3.5 دقيقة', '3. تزيين بالصوصات والزبدة'];
  }
  if (id.includes('pancake') || name.includes('بان كيك')) {
    return ['1. تسخين صاج 170°C', '2. تسوية 90 ثانية وقلب', '3. قطعة زبدة وعسل نقي'];
  }
  if (id.includes('smoothie') || name.includes('سموذي')) {
    return ['1. بيوريه الفاكهة بالميزان', '2. إضافة الثلج والسيرب', '3. خلط سرعة 2 ليد أمان'];
  }
  if (id.includes('shake') || name.includes('شيك') || id.includes('frappe') || name.includes('فرابيه')) {
    return ['1. آيس كريم وحليب بالميزان', '2. خلط متجانس 25 ثانية', '3. كريمة خفق وتوبينج صوص'];
  }
  if (id.includes('boba') || name.includes('بوبا') || id.includes('mojito') || name.includes('موهيتو')) {
    return ['1. كرات بوبا وسيرب بالكوب', '2. ثلج وفير وسفن أب', '3. ليمون ونعناع وشاليموه عريض'];
  }

  return ['1. تجهيز المعايير والمقادير', '2. الاستخلاص أو الخفق الفوري', '3. التقديم السريع'];
}
