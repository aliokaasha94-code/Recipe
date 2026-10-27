// Emad Afandi Specialty Coffee Lab - Takeaway Cutaway Cup System
// Visual Infographic SOP with Vivid Labeled Stacked Layers

function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  const uid = 'tk_' + id.replace(/[^a-z0-9]/g, '_');

  // -------------------------------------------------------------
  // 1. BAKERY: WAFFLE & PANCAKE (Vector Plates)
  // -------------------------------------------------------------
  if (id.includes('waffle') || id.includes('وافل')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 170" fill="none">
        <defs>
          <linearGradient id="${uid}_plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#242830"/>
            <stop offset="100%" stop-color="#0f1115"/>
          </linearGradient>
          <linearGradient id="${uid}_waffle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="50%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <ellipse cx="70" cy="115" rx="58" ry="22" fill="url(#${uid}_plate)" stroke="#d4af37" stroke-width="1.8"/>
        <ellipse cx="70" cy="114" rx="46" ry="16" fill="#15171c" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
        
        <!-- Crispy Belgian Waffle -->
        <rect x="36" y="70" width="68" height="50" rx="8" transform="rotate(-6 70 95)" fill="url(#${uid}_waffle)" stroke="#92400e" stroke-width="1.8"/>
        <!-- Pockets -->
        <rect x="44" y="76" width="10" height="10" rx="2" transform="rotate(-6 44 76)" fill="#78350f"/>
        <rect x="58" y="74" width="10" height="10" rx="2" transform="rotate(-6 58 74)" fill="#78350f"/>
        <rect x="72" y="72" width="10" height="10" rx="2" transform="rotate(-6 72 72)" fill="#78350f"/>
        <rect x="86" y="70" width="10" height="10" rx="2" transform="rotate(-6 86 70)" fill="#78350f"/>
        <rect x="46" y="92" width="10" height="10" rx="2" transform="rotate(-6 46 92)" fill="#78350f"/>
        <rect x="60" y="90" width="10" height="10" rx="2" transform="rotate(-6 60 90)" fill="#78350f"/>
        <rect x="74" y="88" width="10" height="10" rx="2" transform="rotate(-6 74 88)" fill="#78350f"/>
        <rect x="88" y="86" width="10" height="10" rx="2" transform="rotate(-6 88 86)" fill="#78350f"/>
        
        <!-- Chocolate Drizzle -->
        <path d="M 38 82 Q 65 96 104 80" stroke="#251006" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M 44 98 Q 75 110 100 96" stroke="#251006" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Melting Butter Cube -->
        <rect x="64" y="82" width="12" height="10" rx="2" transform="rotate(6 64 82)" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
        <!-- Badge -->
        <rect x="35" y="146" width="70" height="18" rx="4" fill="#000000" stroke="#d4af37" stroke-width="1"/>
        <text x="70" y="159" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="10" font-weight="900" fill="#f5d36e">وافل مقرمش</text>
      </svg>
    `;
  }

  if (id.includes('pancake') || id.includes('بان كيك')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 170" fill="none">
        <defs>
          <linearGradient id="${uid}_plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#242830"/>
            <stop offset="100%" stop-color="#0f1115"/>
          </linearGradient>
        </defs>
        <ellipse cx="70" cy="120" rx="58" ry="18" fill="url(#${uid}_plate)" stroke="#d4af37" stroke-width="1.8"/>
        <!-- 3 Fluffy Cakes -->
        <ellipse cx="70" cy="108" rx="42" ry="12" fill="#d97706" stroke="#b45309" stroke-width="1.4"/>
        <ellipse cx="70" cy="105" rx="40" ry="11" fill="#f59e0b"/>
        <ellipse cx="70" cy="94" rx="38" ry="11" fill="#d97706" stroke="#b45309" stroke-width="1.4"/>
        <ellipse cx="70" cy="91" rx="36" ry="10" fill="#fbbf24"/>
        <ellipse cx="70" cy="80" rx="34" ry="10" fill="#d97706" stroke="#b45309" stroke-width="1.4"/>
        <ellipse cx="70" cy="77" rx="32" ry="9" fill="#fde047"/>
        <!-- Butter -->
        <rect x="64" y="66" width="12" height="10" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
        <!-- Honey Drip -->
        <path d="M 66 78 Q 64 96 62 104" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
        <path d="M 76 78 Q 79 94 82 108" stroke="#d97706" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Badge -->
        <rect x="35" y="146" width="70" height="18" rx="4" fill="#000000" stroke="#d4af37" stroke-width="1"/>
        <text x="70" y="159" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="10" font-weight="900" fill="#f5d36e">بان كيك</text>
      </svg>
    `;
  }

  // -------------------------------------------------------------
  // 2. RECIPE LAYER CONFIGURATIONS FOR TAKEAWAY CUPS
  // -------------------------------------------------------------
  // Layers are defined from BOTTOM to TOP. Sum of percent = 100.
  // Each layer has: percent, color, nameAr, nameEn, textColor

  let layers = [];
  let isCold = id.includes('iced') || id.includes('ايس') || id.includes('cold') || 
              id.includes('smoothie') || id.includes('سموذي') || id.includes('shake') || 
              id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه') || 
              id.includes('boba') || id.includes('بوبا') || id.includes('mojito');

  // --- ESPRESSO STATION DRINKS ---
  if (id === 'espresso-single' || id === 'espresso-ristretto') {
    layers = [
      { percent: 35, color: '#2a1205', nameAr: 'إسبريسو سنجل', nameEn: 'Single 30ml', textColor: '#ffffff' },
      { percent: 18, color: '#d48a37', nameAr: 'كريما تايجر', nameEn: 'Tiger Crema', textColor: '#ffffff' },
      { percent: 47, color: 'rgba(255,255,255,0.06)', nameAr: 'فارغ', nameEn: 'Empty', textColor: 'rgba(255,255,255,0.3)' }
    ];
  }
  else if (id === 'espresso-doppio' || (id.includes('espresso') && id.includes('double'))) {
    layers = [
      { percent: 55, color: '#260f04', nameAr: 'إسبريسو دبل', nameEn: 'Doppio 60ml', textColor: '#ffffff' },
      { percent: 20, color: '#c97e2c', nameAr: 'كريما كثيفة', nameEn: 'Deep Crema', textColor: '#ffffff' },
      { percent: 25, color: 'rgba(255,255,255,0.06)', nameAr: 'فارغ', nameEn: 'Empty', textColor: 'rgba(255,255,255,0.3)' }
    ];
  }
  else if (id.includes('americano')) {
    if (isCold) {
      layers = [
        { percent: 30, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 35, color: '#38bdf8', nameAr: 'ماء نقي بارد', nameEn: 'Cold Water', textColor: '#0f172a' },
        { percent: 35, color: '#7dd3fc', nameAr: 'مكعبات ثلج', nameEn: 'Ice Cubes', textColor: '#0f172a' }
      ];
    } else {
      layers = [
        { percent: 30, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 70, color: '#0284c7', nameAr: 'ماء ساخن 92°C', nameEn: 'Hot Water', textColor: '#ffffff' }
      ];
    }
  }
  else if (id.includes('latte') && !id.includes('spanish') && !id.includes('pistachio') && !id.includes('piccolo')) {
    if (isCold) {
      layers = [
        { percent: 30, color: '#260f04', nameAr: 'إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 35, color: '#fffbf5', nameAr: 'حليب بارد', nameEn: 'Cold Milk', textColor: '#1e293b' },
        { percent: 35, color: '#7dd3fc', nameAr: 'مكعبات ثلج', nameEn: 'Ice Cubes', textColor: '#0f172a' }
      ];
    } else {
      layers = [
        { percent: 25, color: '#260f04', nameAr: 'إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 60, color: '#fffbf5', nameAr: 'حليب مبخر 65°C', nameEn: 'Steamed Milk', textColor: '#1e293b' },
        { percent: 15, color: '#ffffff', nameAr: 'فوم ناعم', nameEn: 'Microfoam', textColor: '#0f172a' }
      ];
    }
  }
  else if (id.includes('cappuccino')) {
    layers = [
      { percent: 33, color: '#260f04', nameAr: 'إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 33, color: '#fffbf5', nameAr: 'حليب مبخر', nameEn: 'Steamed Milk', textColor: '#1e293b' },
      { percent: 34, color: '#ffffff', nameAr: 'فوم كثيف + كاكاو', nameEn: 'Dense Foam', textColor: '#1e293b' }
    ];
  }
  else if (id.includes('flat-white')) {
    layers = [
      { percent: 45, color: '#240f03', nameAr: 'دبل ريستريتو', nameEn: 'Ristretto', textColor: '#ffffff' },
      { percent: 55, color: '#fff9ed', nameAr: 'حليب ناعم مخملي', nameEn: 'Velvet Milk', textColor: '#1e293b' }
    ];
  }
  else if (id.includes('cortado')) {
    layers = [
      { percent: 50, color: '#260f04', nameAr: 'إسبريسو (50%)', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 50, color: '#fff8ea', nameAr: 'حليب دافئ (50%)', nameEn: 'Warm Milk', textColor: '#1e293b' }
    ];
  }
  else if (id.includes('piccolo')) {
    layers = [
      { percent: 40, color: '#260f04', nameAr: 'ريستريتو', nameEn: 'Ristretto', textColor: '#ffffff' },
      { percent: 60, color: '#fff8ea', nameAr: 'حليب مبخر', nameEn: 'Steamed Milk', textColor: '#1e293b' }
    ];
  }
  else if (id.includes('spanish')) {
    if (isCold) {
      layers = [
        { percent: 22, color: '#facc15', nameAr: 'حليب مكثف محلى', nameEn: 'Condensed Milk', textColor: '#713f12' },
        { percent: 28, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 25, color: '#fffbf5', nameAr: 'حليب بارد', nameEn: 'Cold Milk', textColor: '#1e293b' },
        { percent: 25, color: '#7dd3fc', nameAr: 'مكعبات ثلج', nameEn: 'Ice', textColor: '#0f172a' }
      ];
    } else {
      layers = [
        { percent: 22, color: '#facc15', nameAr: 'حليب مكثف محلى', nameEn: 'Condensed Milk', textColor: '#713f12' },
        { percent: 28, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 50, color: '#fffbf5', nameAr: 'حليب مبخر ناعم', nameEn: 'Steamed Milk', textColor: '#1e293b' }
      ];
    }
  }
  else if (id.includes('pistachio') || id.includes('بيستاشيو') || id.includes('بستاش')) {
    if (isCold) {
      layers = [
        { percent: 25, color: '#65a30d', nameAr: 'صوص فستق إيطالي', nameEn: 'Pistachio Sauce', textColor: '#ffffff' },
        { percent: 25, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 25, color: '#fffbf5', nameAr: 'حليب بارد', nameEn: 'Cold Milk', textColor: '#1e293b' },
        { percent: 25, color: '#7dd3fc', nameAr: 'مكعبات ثلج', nameEn: 'Ice', textColor: '#0f172a' }
      ];
    } else {
      layers = [
        { percent: 25, color: '#65a30d', nameAr: 'صوص فستق إيطالي', nameEn: 'Pistachio Sauce', textColor: '#ffffff' },
        { percent: 25, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
        { percent: 40, color: '#fffbf5', nameAr: 'حليب مبخر', nameEn: 'Steamed Milk', textColor: '#1e293b' },
        { percent: 10, color: '#4d7c0f', nameAr: 'فستق مجروش', nameEn: 'Pistachio Dust', textColor: '#ffffff' }
      ];
    }
  }
  else if (id.includes('white-mocha')) {
    layers = [
      { percent: 25, color: '#fef3c7', nameAr: 'صوص موكا بيضاء', nameEn: 'White Choc', textColor: '#78350f' },
      { percent: 25, color: '#260f04', nameAr: 'إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 50, color: '#fffbf5', nameAr: 'حليب مبخر', nameEn: 'Steamed Milk', textColor: '#1e293b' }
    ];
  }
  else if (id.includes('caramel') || id.includes('كراميل')) {
    layers = [
      { percent: 20, color: '#d97706', nameAr: 'صوص كراميل', nameEn: 'Caramel Sauce', textColor: '#ffffff' },
      { percent: 50, color: '#fffbf5', nameAr: 'حليب فانيليا مبخر', nameEn: 'Vanilla Milk', textColor: '#1e293b' },
      { percent: 20, color: '#260f04', nameAr: 'إسبريسو (Mark)', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 10, color: '#b45309', nameAr: 'كراميل شبكي', nameEn: 'Caramel Grid', textColor: '#ffffff' }
    ];
  }
  else if (id.includes('mocha') || id.includes('موكا')) {
    layers = [
      { percent: 25, color: '#3d1d11', nameAr: 'شوكولاتة بلجيكي', nameEn: 'Dark Chocolate', textColor: '#ffffff' },
      { percent: 25, color: '#260f04', nameAr: 'إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 50, color: '#fffbf5', nameAr: 'حليب مبخر', nameEn: 'Steamed Milk', textColor: '#1e293b' }
    ];
  }
  else if (id.includes('con-panna')) {
    layers = [
      { percent: 45, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 55, color: '#fffaf0', nameAr: 'كريمة خفق طازجة', nameEn: 'Whipped Cream', textColor: '#78350f' }
    ];
  }
  else if (id.includes('affogato')) {
    layers = [
      { percent: 45, color: '#260f04', nameAr: 'إسبريسو ساخن', nameEn: 'Hot Espresso', textColor: '#ffffff' },
      { percent: 55, color: '#fefce8', nameAr: 'بولة آيس كريم فانيليا', nameEn: 'Vanilla Gelato', textColor: '#713f12' }
    ];
  }
  else if (id.includes('bombon')) {
    layers = [
      { percent: 50, color: '#facc15', nameAr: 'حليب مكثف محلى', nameEn: 'Condensed Milk', textColor: '#713f12' },
      { percent: 50, color: '#260f04', nameAr: 'إسبريسو خالص', nameEn: 'Black Espresso', textColor: '#ffffff' }
    ];
  }
  else if (id.includes('macchiato')) {
    layers = [
      { percent: 75, color: '#260f04', nameAr: 'دبل إسبريسو', nameEn: 'Espresso', textColor: '#ffffff' },
      { percent: 25, color: '#ffffff', nameAr: 'فوم حليب دافئ', nameEn: 'Milk Foam', textColor: '#0f172a' }
    ];
  }
  else if (id.includes('v60') || id.includes('chemex') || id.includes('cold-brew') || id.includes('filter')) {
    layers = [
      { percent: 80, color: '#3d1c06', nameAr: 'قهوة مقطرة مصفاة', nameEn: 'Specialty Drip', textColor: '#ffffff' },
      { percent: 20, color: '#c97e2c', nameAr: 'إيحاءات ونكهة نقية', nameEn: 'Clean Notes', textColor: '#ffffff' }
    ];
  }

  // --- TRADITIONAL STATION DRINKS ---
  else if (id.includes('turkish') || id.includes('تركي')) {
    const isDark = id.includes('dark') || id.includes('غامق');
    const isLight = id.includes('light') || id.includes('فاتح');
    const isSpiced = id.includes('spiced') || id.includes('محوج');

    let brewColor = isDark ? '#220e04' : (isLight ? '#66320f' : '#45200a');
    let cremaColor = isDark ? '#4d240d' : (isLight ? '#c48139' : '#8c4819');
    let roastLabel = isDark ? 'تركي غامق' : (isLight ? 'تركي فاتح' : 'تركي وسط');

    layers = [
      { percent: 65, color: brewColor, nameAr: `${roastLabel} + ماء`, nameEn: 'Turkish Brew', textColor: '#ffffff' },
      { percent: 35, color: cremaColor, nameAr: isSpiced ? 'وش القهوة + حبهان' : 'وش القهوة (Crema)', nameEn: 'Thick Velvet Head', textColor: '#ffffff' }
    ];
  }
  else if (id.includes('french') || id.includes('فرنسا')) {
    layers = [
      { percent: 50, color: '#4a2610', nameAr: 'قهوة فرنساوي باللبن', nameEn: 'French Blend', textColor: '#ffffff' },
      { percent: 50, color: '#dfcaa7', nameAr: 'حليب طازج ونكهة', nameEn: 'Fresh Milk Froth', textColor: '#3f1f0a' }
    ];
  }
  else if (id.includes('arabic') || id.includes('عربي')) {
    layers = [
      { percent: 70, color: '#ca8a04', nameAr: 'قهوة شقراء بالهيل', nameEn: 'Blonde Roast', textColor: '#ffffff' },
      { percent: 30, color: '#eab308', nameAr: 'مستخلص الزعفران', nameEn: 'Saffron Golden Infusion', textColor: '#713f12' }
    ];
  }
  else if (id.includes('jabana') || id.includes('جبنة') || id.includes('origin')) {
    layers = [
      { percent: 75, color: '#1f0d04', nameAr: 'قهوة جَبَنَة سوداني', nameEn: 'Jabana Brew', textColor: '#ffffff' },
      { percent: 25, color: '#92400e', nameAr: 'زنجبيل وقرنفل ناعم', nameEn: 'Ginger & Spices', textColor: '#ffffff' }
    ];
  }
  else if (id.includes('karak') || id.includes('adani') || id.includes('masala')) {
    layers = [
      { percent: 50, color: '#9a3412', nameAr: 'مغلي الشاي الأصيل', nameEn: 'Strong Brewed Tea', textColor: '#ffffff' },
      { percent: 50, color: '#fed7aa', nameAr: 'حليب مبخر وبهارات', nameEn: 'Evaporated Spiced Milk', textColor: '#7c2d12' }
    ];
  }
  else if (id.includes('hot-batata')) {
    layers = [
      { percent: 30, color: '#ea580c', nameAr: 'صوص بطاطا مكرملة', nameEn: 'Sweet Potato Puree', textColor: '#ffffff' },
      { percent: 50, color: '#fffbf5', nameAr: 'حليب دافئ', nameEn: 'Steamed Milk', textColor: '#1e293b' },
      { percent: 20, color: '#f59e0b', nameAr: 'كراميل وقرفة', nameEn: 'Caramel & Cinnamon', textColor: '#78350f' }
    ];
  }
  else if (id.includes('hot-lotus')) {
    layers = [
      { percent: 30, color: '#b45309', nameAr: 'زبدة لوتس أصلية', nameEn: 'Biscoff Lotus', textColor: '#ffffff' },
      { percent: 50, color: '#fffbf5', nameAr: 'حليب ساخن', nameEn: 'Steamed Milk', textColor: '#1e293b' },
      { percent: 20, color: '#d97706', nameAr: 'بسكوت لوتس مجروش', nameEn: 'Lotus Crumbs', textColor: '#ffffff' }
    ];
  }
  else if (id.includes('hot-chocolate') || (id.includes('hot') && id.includes('chocolate'))) {
    layers = [
      { percent: 35, color: '#2a1205', nameAr: 'شوكولاتة بلجيكي مذابة', nameEn: 'Belgian Chocolate', textColor: '#ffffff' },
      { percent: 45, color: '#fffbf5', nameAr: 'حليب ساخن كثيف', nameEn: 'Rich Milk', textColor: '#1e293b' },
      { percent: 20, color: '#fff9ed', nameAr: 'مارشملو أو فوم', nameEn: 'Marshmallow Foam', textColor: '#78350f' }
    ];
  }

  // --- BACK BAR: SMOOTHIES, SHAKES, FRAPPES, BOBA ---
  else if (id.includes('smoothie') || id.includes('سموذي') || id.includes('سموزي')) {
    let fruitColor = '#f59e0b';
    let fruitName = 'مانجو فريش';
    if (id.includes('straw') || id.includes('فراول')) { fruitColor = '#e11d48'; fruitName = 'فراولة فريش'; }
    else if (id.includes('lemon') || id.includes('ليمون')) { fruitColor = '#10b981'; fruitName = 'ليمون ونعناع فريش'; }
    else if (id.includes('blue') || id.includes('berry') || id.includes('توت')) { fruitColor = '#7c3aed'; fruitName = 'بلوبيري فاخر'; }
    else if (id.includes('water') || id.includes('بطيخ')) { fruitColor = '#f43f5e'; fruitName = 'بطيخ مثلج'; }
    else if (id.includes('passion') || id.includes('باشن')) { fruitColor = '#ea580c'; fruitName = 'باشن فروت'; }
    else if (id.includes('kiwi') || id.includes('كيوي')) { fruitColor = '#65a30d'; fruitName = 'كيوي مثلج'; }

    layers = [
      { percent: 50, color: fruitColor, nameAr: fruitName, nameEn: 'Pure Fruit Puree', textColor: '#ffffff' },
      { percent: 30, color: '#38bdf8', nameAr: 'ثلج مجروش معملي', nameEn: 'Crushed Slush Ice', textColor: '#0f172a' },
      { percent: 20, color: '#ffffff', nameAr: 'سيرب تحلية متزن', nameEn: 'Balanced Syrup', textColor: '#0f172a' }
    ];
  }
  else if (id.includes('shake') || id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه')) {
    let baseColor = '#dfcaa7';
    let flavorName = 'آيس كريم فانيليا';
    if (id.includes('oreo') || id.includes('اوريو')) { baseColor = '#242120'; flavorName = 'أوريو مطحون'; }
    else if (id.includes('lotus') || id.includes('لوتس')) { baseColor = '#b45309'; flavorName = 'زبدة وبسكوت لوتس'; }
    else if (id.includes('choc') || id.includes('شيكول')) { baseColor = '#3b1c0e'; flavorName = 'شوكولاتة فاخرة'; }
    else if (id.includes('pistachio') || id.includes('بستاش')) { baseColor = '#558b2f'; flavorName = 'بيستاشيو أصلي'; }

    layers = [
      { percent: 55, color: baseColor, nameAr: flavorName, nameEn: 'Base Shake Mix', textColor: '#ffffff' },
      { percent: 25, color: '#fffbf5', nameAr: 'حليب كامل الدسم', nameEn: 'Whole Milk', textColor: '#1e293b' },
      { percent: 20, color: '#ffffff', nameAr: 'كريمة خفق وليد بومبيه', nameEn: 'Whipped Cream', textColor: '#0f172a' }
    ];
  }
  else if (id.includes('boba') || id.includes('بوبا') || id.includes('mojito') || id.includes('موخيتو')) {
    const isBlue = id.includes('blue') || id.includes('بلو');
    layers = [
      { percent: 25, color: isBlue ? '#0284c7' : '#059669', nameAr: 'بوبا بيرلز فوارة', nameEn: 'Popping Pearls', textColor: '#ffffff' },
      { percent: 50, color: isBlue ? '#38bdf8' : '#34d399', nameAr: 'سفن أب وسيرب منعش', nameEn: 'Soda & Syrup', textColor: '#0f172a' },
      { percent: 25, color: '#7dd3fc', nameAr: 'ثلج وشريحة ليمون', nameEn: 'Ice & Lemon', textColor: '#0f172a' }
    ];
  }
  else {
    // Default fallback layers
    layers = [
      { percent: 40, color: '#260f04', nameAr: 'إسبريسو / قهوة', nameEn: 'Coffee Base', textColor: '#ffffff' },
      { percent: 40, color: '#fffbf5', nameAr: 'حليب طازج', nameEn: 'Fresh Milk', textColor: '#1e293b' },
      { percent: 20, color: '#ffffff', nameAr: 'فوم ناعم', nameEn: 'Foam Head', textColor: '#0f172a' }
    ];
  }

  // -------------------------------------------------------------
  // 3. RENDER MASTER TAKEAWAY CUTAWAY CUP SVG
  // -------------------------------------------------------------
  // Total cup liquid cavity height is from Y=33 down to Y=162 (129px)
  let layersSvg = '';
  let currentY = 162; // start from bottom

  layers.forEach((l, index) => {
    const layerH = (l.percent / 100) * 129;
    const yTop = currentY - layerH;
    const yMid = yTop + (layerH / 2);

    // Layer background rect (clipped by cup shape)
    layersSvg += `
      <rect x="25" y="${yTop - 0.5}" width="90" height="${layerH + 1}" fill="${l.color}"/>
    `;

    // Layer divider line (if not the bottom-most layer)
    if (index > 0) {
      layersSvg += `
        <line x1="30" y1="${currentY}" x2="110" y2="${currentY}" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
      `;
    }

    // Layer typography (Arabic bold, English subtitle if space permits)
    if (layerH >= 15) {
      const fontSize = layerH >= 32 ? '9.5' : (layerH >= 22 ? '8.5' : '7.5');
      const textY = layerH >= 30 ? (yMid - 1.5) : (yMid + 3);

      layersSvg += `
        <text x="70" y="${textY}" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="${fontSize}" font-weight="900" fill="${l.textColor}">
          ${l.nameAr}
        </text>
      `;

      if (layerH >= 30) {
        layersSvg += `
          <text x="70" y="${yMid + 9.5}" text-anchor="middle" font-family="'Segoe UI', Roboto, sans-serif" font-size="7" font-weight="700" fill="${l.textColor}" opacity="0.85">
            ${l.nameEn}
          </text>
        `;
      }
    }

    currentY = yTop;
  });

  return `
    <svg class="drink-art-svg" viewBox="0 0 140 170" fill="none">
      <defs>
        <!-- Takeaway Mocha Lid Gradient -->
        <linearGradient id="${uid}_lid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#241208"/>
          <stop offset="30%" stop-color="#4a2612"/>
          <stop offset="70%" stop-color="#3b1d0d"/>
          <stop offset="100%" stop-color="#180b03"/>
        </linearGradient>

        <!-- Paper Cup Body Clip Path (Tapered Shape) -->
        <clipPath id="${uid}_clip">
          <path d="M 30 33 L 40 160 Q 41 162 45 162 L 95 162 Q 99 162 100 160 L 110 33 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Ambient Drop Shadow Under Cup -->
      <ellipse cx="70" cy="166" rx="34" ry="4" fill="rgba(0,0,0,0.75)"/>

      <!-- 2. Transparent Cutaway Cup Body with Stacked Layers -->
      <g clip-path="url(#${uid}_clip)">
        ${layersSvg}
      </g>

      <!-- 3. Cup Contour & Specular Highlights -->
      <!-- Left Edge Light Highlight -->
      <path d="M 32 35 L 42 158" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Right Edge Shading -->
      <path d="M 108 35 L 98 158" stroke="rgba(0,0,0,0.3)" stroke-width="2.5" stroke-linecap="round"/>
      
      <!-- Gold Precision Outline of Cup -->
      <path d="M 30 33 L 40 160 Q 41 162 45 162 L 95 162 Q 99 162 100 160 L 110 33 Z" fill="none" stroke="#d4af37" stroke-width="1.2"/>

      <!-- 4. Paper Cup Top Collar -->
      <rect x="27" y="27" width="86" height="6.5" rx="2" fill="#ede8de" stroke="#d4af37" stroke-width="1"/>

      <!-- 5. Commercial Takeaway Lid (Plastic Top with Sip Hole) -->
      <!-- Main Lid Rim -->
      <rect x="23" y="16" width="94" height="12" rx="4" fill="url(#${uid}_lid)" stroke="#d4af37" stroke-width="1.2"/>
      <!-- Upper Crown -->
      <rect x="42" y="8" width="56" height="9" rx="3" fill="url(#${uid}_lid)" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>
      <!-- Sip Opening Indentation -->
      <rect x="58" y="7" width="24" height="3" rx="1.5" fill="#0f0703"/>
      <!-- Lid Glaze Highlight -->
      <path d="M 28 20 L 112 20" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    </svg>
  `;
}
