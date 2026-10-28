// Emad Afandi Specialty Coffee Lab - Solid Takeaway Cutaway Cup System
// Clean Solid Vectors with Natural Realistic Liquid Layers (Zero Text Inside Cup)

function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const uid = 'cup_' + id.replace(/[^a-z0-9]/g, '_');

  // 1. BAKERY: WAFFLE & PANCAKE (Clean Solid Plate Vectors)
  if (id.includes('waffle') || id.includes('وافل')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
        <!-- Slate Plate -->
        <ellipse cx="50" cy="85" rx="46" ry="18" fill="#15171c" stroke="#d4af37" stroke-width="1.2"/>
        <ellipse cx="50" cy="84" rx="36" ry="13" fill="#0b0c0f"/>
        <!-- Golden Belgian Waffle Body -->
        <rect x="24" y="52" width="52" height="40" rx="6" transform="rotate(-5 50 72)" fill="#c97716" stroke="#874705" stroke-width="1.2"/>
        <!-- Grid Indentations -->
        <rect x="30" y="57" width="8" height="8" rx="1.5" transform="rotate(-5 30 57)" fill="#613003"/>
        <rect x="42" y="56" width="8" height="8" rx="1.5" transform="rotate(-5 42 56)" fill="#613003"/>
        <rect x="54" y="54" width="8" height="8" rx="1.5" transform="rotate(-5 54 54)" fill="#613003"/>
        <rect x="66" y="53" width="8" height="8" rx="1.5" transform="rotate(-5 66 53)" fill="#613003"/>
        <rect x="31" y="70" width="8" height="8" rx="1.5" transform="rotate(-5 31 70)" fill="#613003"/>
        <rect x="43" y="68" width="8" height="8" rx="1.5" transform="rotate(-5 43 68)" fill="#613003"/>
        <rect x="55" y="67" width="8" height="8" rx="1.5" transform="rotate(-5 55 67)" fill="#613003"/>
        <rect x="67" y="65" width="8" height="8" rx="1.5" transform="rotate(-5 67 65)" fill="#613003"/>
        <!-- Chocolate Sauce Drizzle -->
        <path d="M 26 62 Q 50 74 76 60" stroke="#251006" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 30 76 Q 55 86 74 72" stroke="#251006" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Butter Cube -->
        <rect x="45" y="62" width="10" height="8" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
      </svg>
    `;
  }

  if (id.includes('pancake') || id.includes('بان كيك')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
        <ellipse cx="50" cy="90" rx="46" ry="16" fill="#15171c" stroke="#d4af37" stroke-width="1.2"/>
        <ellipse cx="50" cy="80" rx="34" ry="10" fill="#c97716" stroke="#874705" stroke-width="1"/>
        <ellipse cx="50" cy="78" rx="32" ry="9" fill="#e08a1e"/>
        <ellipse cx="50" cy="70" rx="30" ry="9" fill="#c97716" stroke="#874705" stroke-width="1"/>
        <ellipse cx="50" cy="68" rx="28" ry="8" fill="#f0a535"/>
        <ellipse cx="50" cy="60" rx="26" ry="8" fill="#c97716" stroke="#874705" stroke-width="1"/>
        <ellipse cx="50" cy="58" rx="24" ry="7" fill="#f5b942"/>
        <rect x="45" y="49" width="10" height="8" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
        <path d="M 47 58 Q 45 74 44 80" stroke="#ad5d11" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 2. NATURAL LIQUID LAYER CONFIGURATIONS (Solid, Realistic, Zero Noise)
  // Layers from BOTTOM to TOP. Sum of percent = 100
  let layers = [];
  let isCold = id.includes('iced') || id.includes('ايس') || id.includes('cold') || 
              id.includes('smoothie') || id.includes('سموذي') || id.includes('shake') || 
              id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه') || 
              id.includes('boba') || id.includes('بوبا') || id.includes('mojito');

  // --- ESPRESSO & MILK DRINKS ---
  if (id === 'espresso-single' || id === 'espresso-ristretto') {
    layers = [
      { percent: 35, color: '#251206' }, // Dark espresso
      { percent: 20, color: '#ba782b' }, // Hazelnut crema
      { percent: 45, color: '#090a0d' }  // Empty upper cup
    ];
  }
  else if (id === 'espresso-doppio' || (id.includes('espresso') && id.includes('double'))) {
    layers = [
      { percent: 65, color: '#200f04' },
      { percent: 20, color: '#b37025' },
      { percent: 15, color: '#090a0d' }
    ];
  }
  else if (id.includes('americano')) {
    if (isCold) {
      layers = [
        { percent: 30, color: '#251206' }, // Espresso
        { percent: 40, color: '#2c3e50' }, // Cold Water
        { percent: 30, color: '#4a6984' }  // Ice
      ];
    } else {
      layers = [
        { percent: 30, color: '#251206' }, // Espresso
        { percent: 70, color: '#203244' }  // Clean Hot Water
      ];
    }
  }
  else if (id.includes('latte') && !id.includes('spanish') && !id.includes('pistachio') && !id.includes('piccolo')) {
    if (isCold) {
      layers = [
        { percent: 25, color: '#251206' }, // Espresso
        { percent: 45, color: '#f5efe6' }, // Cold Milk
        { percent: 30, color: '#4a6984' }  // Ice Cubes
      ];
    } else {
      layers = [
        { percent: 25, color: '#251206' }, // Espresso
        { percent: 60, color: '#f5efe6' }, // Steamed Milk
        { percent: 15, color: '#ffffff' }  // Microfoam
      ];
    }
  }
  else if (id.includes('cappuccino')) {
    layers = [
      { percent: 33, color: '#251206' }, // Espresso
      { percent: 33, color: '#f5efe6' }, // Steamed Milk
      { percent: 34, color: '#ffffff' }  // Dense Foam Cap
    ];
  }
  else if (id.includes('flat-white')) {
    layers = [
      { percent: 45, color: '#200f04' }, // Double Ristretto
      { percent: 55, color: '#f7f1e7' }  // Micro-textured Milk
    ];
  }
  else if (id.includes('cortado')) {
    layers = [
      { percent: 50, color: '#251206' }, // 50% Espresso
      { percent: 50, color: '#f5efe6' }  // 50% Steamed Milk
    ];
  }
  else if (id.includes('piccolo')) {
    layers = [
      { percent: 40, color: '#200f04' }, // Ristretto
      { percent: 60, color: '#f5efe6' }  // Steamed Milk
    ];
  }
  else if (id.includes('spanish')) {
    if (isCold) {
      layers = [
        { percent: 20, color: '#eed89b' }, // Condensed Milk
        { percent: 28, color: '#251206' }, // Espresso
        { percent: 30, color: '#f5efe6' }, // Cold Milk
        { percent: 22, color: '#4a6984' }  // Ice
      ];
    } else {
      layers = [
        { percent: 20, color: '#eed89b' }, // Condensed Milk
        { percent: 28, color: '#251206' }, // Espresso
        { percent: 52, color: '#f5efe6' }  // Steamed Milk
      ];
    }
  }
  else if (id.includes('pistachio') || id.includes('بيستاشيو') || id.includes('بستاش')) {
    if (isCold) {
      layers = [
        { percent: 25, color: '#4a6828' }, // Natural Pistachio Paste
        { percent: 25, color: '#251206' }, // Espresso
        { percent: 28, color: '#f5efe6' }, // Cold Milk
        { percent: 22, color: '#4a6984' }  // Ice
      ];
    } else {
      layers = [
        { percent: 25, color: '#4a6828' }, // Natural Pistachio Paste
        { percent: 25, color: '#251206' }, // Espresso
        { percent: 45, color: '#f5efe6' }, // Steamed Milk
        { percent: 5, color: '#324719' }   // Crushed Pistachio
      ];
    }
  }
  else if (id.includes('white-mocha')) {
    layers = [
      { percent: 25, color: '#f4eee1' }, // White Chocolate
      { percent: 25, color: '#251206' }, // Espresso
      { percent: 50, color: '#f5efe6' }  // Steamed Milk
    ];
  }
  else if (id.includes('caramel') || id.includes('كراميل')) {
    layers = [
      { percent: 20, color: '#ad5d11' }, // Caramel Syrup
      { percent: 50, color: '#f8f3eb' }, // Vanilla Steamed Milk
      { percent: 20, color: '#251206' }, // Espresso Mark
      { percent: 10, color: '#8f4a0a' }  // Caramel Drizzle
    ];
  }
  else if (id.includes('mocha') || id.includes('موكا')) {
    layers = [
      { percent: 25, color: '#33160a' }, // Dark Cocoa
      { percent: 25, color: '#251206' }, // Espresso
      { percent: 50, color: '#f5efe6' }  // Steamed Milk
    ];
  }
  else if (id.includes('con-panna')) {
    layers = [
      { percent: 45, color: '#251206' }, // Espresso
      { percent: 55, color: '#fffdfa' }  // Whipped Cream
    ];
  }
  else if (id.includes('affogato')) {
    layers = [
      { percent: 40, color: '#251206' }, // Hot Espresso
      { percent: 60, color: '#f9f6e8' }  // Vanilla Gelato
    ];
  }
  else if (id.includes('bombon')) {
    layers = [
      { percent: 50, color: '#eed89b' }, // Condensed Milk
      { percent: 50, color: '#200f04' }  // Black Espresso
    ];
  }
  else if (id.includes('macchiato')) {
    layers = [
      { percent: 75, color: '#251206' },
      { percent: 25, color: '#ffffff' }
    ];
  }
  else if (id.includes('v60') || id.includes('chemex') || id.includes('cold-brew') || id.includes('filter')) {
    layers = [
      { percent: 85, color: '#47230b' },
      { percent: 15, color: '#a66324' }
    ];
  }

  // --- TRADITIONAL COFFEE & TEAS ---
  else if (id.includes('turkish') || id.includes('تركي')) {
    const isDark = id.includes('dark') || id.includes('غامق');
    const isLight = id.includes('light') || id.includes('فاتح');

    let brewCol = isDark ? '#200d03' : (isLight ? '#592d0e' : '#3d1d07');
    let cremaCol = isDark ? '#47220a' : (isLight ? '#a86927' : '#8a4d1d');

    layers = [
      { percent: 65, color: brewCol },
      { percent: 35, color: cremaCol }
    ];
  }
  else if (id.includes('french') || id.includes('فرنسا')) {
    layers = [
      { percent: 50, color: '#452410' },
      { percent: 50, color: '#d6c1a0' }
    ];
  }
  else if (id.includes('arabic') || id.includes('عربي')) {
    layers = [
      { percent: 75, color: '#9e6e18' },
      { percent: 25, color: '#c4891b' }
    ];
  }
  else if (id.includes('jabana') || id.includes('جبنة') || id.includes('origin')) {
    layers = [
      { percent: 75, color: '#200d04' },
      { percent: 25, color: '#70350d' }
    ];
  }
  else if (id.includes('karak') || id.includes('adani') || id.includes('masala')) {
    layers = [
      { percent: 50, color: '#8f4d1e' },
      { percent: 50, color: '#ebcc9e' }
    ];
  }
  else if (id.includes('hot-batata')) {
    layers = [
      { percent: 30, color: '#b84e10' },
      { percent: 50, color: '#f5efe6' },
      { percent: 20, color: '#ad5d11' }
    ];
  }
  else if (id.includes('hot-lotus')) {
    layers = [
      { percent: 30, color: '#99490b' },
      { percent: 50, color: '#f5efe6' },
      { percent: 20, color: '#7a3806' }
    ];
  }
  else if (id.includes('hot-chocolate') || (id.includes('hot') && id.includes('chocolate'))) {
    layers = [
      { percent: 35, color: '#251006' },
      { percent: 45, color: '#f5efe6' },
      { percent: 20, color: '#ffffff' }
    ];
  }

  // --- BACKBAR COLD BAR (Smoothies, Shakes, Frappes, Boba) ---
  else if (id.includes('smoothie') || id.includes('سموذي') || id.includes('سموزي')) {
    let fruitColor = '#d97814';
    if (id.includes('straw') || id.includes('فراول')) fruitColor = '#ad1726';
    else if (id.includes('lemon') || id.includes('ليمون')) fruitColor = '#267341';
    else if (id.includes('blue') || id.includes('berry') || id.includes('توت')) fruitColor = '#5c278a';
    else if (id.includes('water') || id.includes('بطيخ')) fruitColor = '#b82e44';
    else if (id.includes('passion') || id.includes('باشن')) fruitColor = '#c44a0e';
    else if (id.includes('kiwi') || id.includes('كيوي')) fruitColor = '#557a2b';

    layers = [
      { percent: 65, color: fruitColor },
      { percent: 35, color: '#2d4a60' }
    ];
  }
  else if (id.includes('shake') || id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه')) {
    let shakeColor = '#d6c5aa';
    if (id.includes('oreo') || id.includes('اوريو')) shakeColor = '#211f1e';
    else if (id.includes('lotus') || id.includes('لوتس')) shakeColor = '#99490b';
    else if (id.includes('choc') || id.includes('شيكول')) shakeColor = '#33160a';
    else if (id.includes('pistachio') || id.includes('بستاش')) shakeColor = '#4a6828';

    layers = [
      { percent: 60, color: shakeColor },
      { percent: 20, color: '#f5efe6' },
      { percent: 20, color: '#ffffff' }
    ];
  }
  else if (id.includes('boba') || id.includes('بوبا') || id.includes('mojito') || id.includes('موخيتو')) {
    const isBlue = id.includes('blue') || id.includes('بلو');
    layers = [
      { percent: 25, color: isBlue ? '#0369a1' : '#047857' },
      { percent: 50, color: isBlue ? '#0284c7' : '#059669' },
      { percent: 25, color: '#38bdf8' }
    ];
  }
  else {
    layers = [
      { percent: 40, color: '#251206' },
      { percent: 40, color: '#f5efe6' },
      { percent: 20, color: '#ffffff' }
    ];
  }

  // 3. RENDER CLEAN SOLID TAKEAWAY CUTAWAY CUP (NO TEXT INSIDE CUP)
  // Cavity Y: 23 down to 122 (Total 99px)
  let currentY = 122;
  let layersSvg = '';

  layers.forEach((l, index) => {
    const layerH = (l.percent / 100) * 99;
    const yTop = currentY - layerH;

    layersSvg += `
      <rect x="15" y="${yTop - 0.5}" width="70" height="${layerH + 1}" fill="${l.color}"/>
    `;

    if (index > 0) {
      layersSvg += `
        <line x1="18" y1="${currentY}" x2="82" y2="${currentY}" stroke="rgba(255,255,255,0.22)" stroke-width="0.8"/>
      `;
    }

    currentY = yTop;
  });

  return `
    <svg class="drink-art-svg" viewBox="0 0 100 130" fill="none">
      <defs>
        <clipPath id="${uid}_clip">
          <path d="M 20 23 L 28 122 Q 29 124 32 124 L 68 124 Q 71 124 72 122 L 80 23 Z"/>
        </clipPath>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="50" cy="126" rx="26" ry="3" fill="rgba(0,0,0,0.85)"/>

      <!-- Stacked Solid Color Bands (No Text Inside) -->
      <g clip-path="url(#${uid}_clip)">
        ${layersSvg}
      </g>

      <!-- Solid Cup Shell -->
      <path d="M 20 23 L 28 122 Q 29 124 32 124 L 68 124 Q 71 124 72 122 L 80 23 Z" fill="none" stroke="#d4af37" stroke-width="1.2"/>

      <!-- Paper Collar -->
      <rect x="18" y="19" width="64" height="4.5" rx="1.5" fill="#eae4dc" stroke="#d4af37" stroke-width="0.8"/>

      <!-- Takeaway Mocha Lid -->
      <rect x="14" y="11" width="72" height="9" rx="3" fill="#2b1408" stroke="#d4af37" stroke-width="1"/>
      <rect x="32" y="6" width="36" height="6" rx="2" fill="#2b1408" stroke="rgba(212,175,55,0.6)" stroke-width="0.8"/>
      <rect x="42" y="5" width="16" height="2.5" rx="1" fill="#120803"/>
    </svg>
  `;
}

// Helper: Returns chronological 3-step sequence teaser for the landscape card
function getDrinkSequence(item) {
  const id = (item.id || '').toLowerCase();

  if (id.includes('latte') && !id.includes('spanish') && !id.includes('pistachio')) {
    return ['1. استخلاص إسبريسو', '2. تبخير حليب 65°C', '3. صب مع فوم ناعم'];
  }
  if (id.includes('spanish')) {
    return ['1. حليب مكثف بالقاع', '2. دبل إسبريسو', '3. حليب مبخر ناعم'];
  }
  if (id.includes('pistachio')) {
    return ['1. صوص بيستاشيو بالكوب', '2. دبل إسبريسو', '3. حليب مبخر + فستق'];
  }
  if (id.includes('cappuccino')) {
    return ['1. إسبريسو سنجل', '2. حليب مبخر', '3. فوم كثيف + كاكاو'];
  }
  if (id.includes('flat-white')) {
    return ['1. دبل ريستريتو', '2. حليب ميكروتيكستشر', '3. صب فلات متجانس'];
  }
  if (id.includes('cortado')) {
    return ['1. إسبريسو 50%', '2. حليب دافئ 50%', '3. صب هادئ'];
  }
  if (id.includes('americano')) {
    return ['1. ماء ساخن 92°C', '2. دبل إسبريسو فوق الماء', '3. تقفيل الليد'];
  }
  if (id.includes('caramel')) {
    return ['1. حليب فانيليا مبخر', '2. إسبريسو مارك', '3. شبكة كراميل'];
  }
  if (id.includes('mocha')) {
    return ['1. صوص شوكولاتة بالقاع', '2. إسبريسو ساخن ودمج', '3. حليب مبخر'];
  }
  if (id === 'espresso-single' || id === 'espresso-doppio') {
    return ['1. وزن البن وطحنه', '2. كبس متزن 15kg', '3. استخلاص 25-30 ثانية'];
  }
  if (id.includes('turkish') || id.includes('تركي')) {
    return ['1. معيار البن والماء بالكنكة', '2. تسوية هادئة عالرمالة', '3. صب الوش أولاً'];
  }
  if (id.includes('french') || id.includes('فرنسا')) {
    return ['1. بن فرنساي وحليب طازج', '2. تقليب عالرمالة للتماسك', '3. صب الفوم الكريمي'];
  }
  if (id.includes('arabic') || id.includes('عربي')) {
    return ['1. غلي القهوة الشقراء بالدلة', '2. إضافة الهيل والزعفران', '3. ركود دقيقة ثم صب'];
  }
  if (id.includes('waffle') || id.includes('وافل')) {
    return ['1. تسخين ماكينة 185°C', '2. صب 140g عجين 3.5 دقيقة', '3. تزيين بالصوصات'];
  }
  if (id.includes('pancake') || id.includes('بان كيك')) {
    return ['1. تسخين صاج 170°C', '2. تسوية 90 ثانية وقلب', '3. زبدة وعسل نقي'];
  }
  if (id.includes('smoothie') || id.includes('سموذي')) {
    return ['1. بيوريه الفاكهة بالميزان', '2. إضافة الثلج والسيرب', '3. خلط سرعة 2 ليد أمان'];
  }
  if (id.includes('shake') || id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه')) {
    return ['1. آيس كريم وحليب بالميزان', '2. خلط متجانس 25 ثانية', '3. كريمة خفق وتوبينج'];
  }
  if (id.includes('boba') || id.includes('بوبا') || id.includes('mojito') || id.includes('موخيتو')) {
    return ['1. كرات بوبا وسيرب بالكوب', '2. مكعبات ثلج وسفن أب', '3. شريحة ليمون وشاليموه'];
  }

  return ['1. تجهيز المعايير والمقادير', '2. الاستخلاص أو الخفق الفوري', '3. التقديم السريع'];
}
