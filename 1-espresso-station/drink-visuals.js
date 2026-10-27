// Emad Afandi Specialty Coffee Lab - Unified Luxury Finjan System
// 100% Unified Cup Silhouette for all Coffee & Specialty Drinks
// Authentic, Professional, Mobile-First Visual SOP

function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  // UNIQUE ID PREFIX to prevent SVG gradient clashes across cards
  const uid = 'svg_' + id.replace(/[^a-z0-9]/g, '_');

  // -------------------------------------------------------------
  // NON-COFFEE BAKERY & COLD DRINKS (Back Bar)
  // -------------------------------------------------------------

  // 1. WAFFLE (Crisp Belgian Golden Grid Plate)
  if (id.includes('waffle') || id.includes('وافل')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 160 130" fill="none">
        <defs>
          <linearGradient id="${uid}_plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2a2d36"/>
            <stop offset="100%" stop-color="#12141a"/>
          </linearGradient>
          <linearGradient id="${uid}_waffle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="40%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <!-- Luxury Slate Plate -->
        <ellipse cx="80" cy="98" rx="64" ry="24" fill="url(#${uid}_plate)" stroke="#d4af37" stroke-width="1.8"/>
        <ellipse cx="80" cy="97" rx="52" ry="18" fill="#181a20" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
        
        <!-- Crispy Belgian Waffle Body -->
        <rect x="44" y="52" width="72" height="52" rx="8" transform="rotate(-5 80 78)" fill="url(#${uid}_waffle)" stroke="#92400e" stroke-width="1.8"/>
        
        <!-- Deep Grid Pockets -->
        <rect x="52" y="58" width="11" height="11" rx="2.5" transform="rotate(-5 52 58)" fill="#78350f"/>
        <rect x="67" y="56" width="11" height="11" rx="2.5" transform="rotate(-5 67 56)" fill="#78350f"/>
        <rect x="82" y="54" width="11" height="11" rx="2.5" transform="rotate(-5 82 54)" fill="#78350f"/>
        <rect x="97" y="52" width="11" height="11" rx="2.5" transform="rotate(-5 97 52)" fill="#78350f"/>
        
        <rect x="54" y="74" width="11" height="11" rx="2.5" transform="rotate(-5 54 74)" fill="#78350f"/>
        <rect x="69" y="72" width="11" height="11" rx="2.5" transform="rotate(-5 69 72)" fill="#78350f"/>
        <rect x="84" y="70" width="11" height="11" rx="2.5" transform="rotate(-5 84 70)" fill="#78350f"/>
        <rect x="99" y="68" width="11" height="11" rx="2.5" transform="rotate(-5 99 68)" fill="#78350f"/>
        
        <!-- Melted Belgian Chocolate Drizzle -->
        <path d="M 46 64 Q 72 76 114 62" stroke="#2a1208" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M 52 80 Q 82 92 108 78" stroke="#2a1208" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Butter Cube -->
        <rect x="74" y="64" width="12" height="10" rx="2" transform="rotate(8 74 64)" fill="#fef08a" stroke="#eab308" stroke-width="1.2"/>
      </svg>
    `;
  }

  // 2. PANCAKE (Stack of 3 Fluffy Golden Cakes with Melting Butter)
  if (id.includes('pancake') || id.includes('بان كيك')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 160 130" fill="none">
        <defs>
          <linearGradient id="${uid}_plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2a2d36"/>
            <stop offset="100%" stop-color="#12141a"/>
          </linearGradient>
        </defs>
        <!-- Plate -->
        <ellipse cx="80" cy="106" rx="64" ry="20" fill="url(#${uid}_plate)" stroke="#d4af37" stroke-width="1.8"/>
        <!-- Bottom Cake -->
        <ellipse cx="80" cy="94" rx="46" ry="13" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
        <ellipse cx="80" cy="91" rx="44" ry="12" fill="#f59e0b"/>
        <!-- Middle Cake -->
        <ellipse cx="80" cy="80" rx="42" ry="12" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
        <ellipse cx="80" cy="77" rx="40" ry="11" fill="#fbbf24"/>
        <!-- Top Cake -->
        <ellipse cx="80" cy="66" rx="38" ry="11" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
        <ellipse cx="80" cy="63" rx="36" ry="10" fill="#fde047"/>
        <!-- Melting Butter -->
        <rect x="73" y="52" width="14" height="11" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
        <!-- Honey Drips -->
        <path d="M 76 64 Q 74 82 72 90" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
        <path d="M 87 64 Q 90 80 93 94" stroke="#d97706" stroke-width="2.8" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 3. SMOOTHIES (Slush Cups with Dome Lid)
  if (id.includes('smoothie') || id.includes('سموذي') || id.includes('سموزي')) {
    let color = '#f59e0b';
    if (id.includes('straw') || id.includes('فراول')) color = '#e11d48';
    else if (id.includes('lemon') || id.includes('ليمون')) color = '#10b981';
    else if (id.includes('blue') || id.includes('berry') || id.includes('توت')) color = '#7c3aed';
    else if (id.includes('water') || id.includes('بطيخ')) color = '#f43f5e';
    else if (id.includes('passion') || id.includes('باشن')) color = '#ea580c';
    else if (id.includes('kiwi') || id.includes('كيوي')) color = '#65a30d';

    return `
      <svg class="drink-art-svg" viewBox="0 0 160 130" fill="none">
        <path d="M 86 12 L 92 42" stroke="#d4af37" stroke-width="5" stroke-linecap="round"/>
        <!-- Dome Lid -->
        <path d="M 52 42 C 52 24 108 24 108 42 Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
        <line x1="48" y1="42" x2="112" y2="42" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Slush Cup -->
        <path d="M 54 44 L 62 114 C 63 118 97 118 98 114 L 106 44 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <path d="M 56 47 L 63 112 C 64 116 96 116 97 112 L 104 47 Z" fill="${color}"/>
        <circle cx="72" cy="68" r="3.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="88" cy="85" r="4.5" fill="rgba(255,255,255,0.25)"/>
        <path d="M 59 50 L 65 106" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 4. MILKSHAKES & FRAPPES (Sundae Glass with Whipped Tower)
  if (id.includes('shake') || id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه')) {
    let shakeColor = '#dfcaa7';
    let toppingColor = '#d4af37';
    if (id.includes('oreo') || id.includes('اوريو')) { shakeColor = '#2b2929'; toppingColor = '#ffffff'; }
    else if (id.includes('choc') || id.includes('شيكول')) { shakeColor = '#3e2114'; toppingColor = '#220e06'; }
    else if (id.includes('lotus') || id.includes('لوتس')) { shakeColor = '#b87932'; toppingColor = '#d97706'; }
    else if (id.includes('pistachio') || id.includes('بستاش')) { shakeColor = '#60914c'; toppingColor = '#3a6629'; }
    else if (id.includes('straw') || id.includes('فراول')) { shakeColor = '#e11d48'; toppingColor = '#be123c'; }

    return `
      <svg class="drink-art-svg" viewBox="0 0 160 130" fill="none">
        <path d="M 94 14 L 86 52" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Whipped Cream Tower -->
        <path d="M 54 50 C 52 30 66 26 80 24 C 94 26 108 30 106 50 Z" fill="#fffdfa" stroke="rgba(0,0,0,0.1)"/>
        <path d="M 64 42 Q 80 34 96 42" stroke="${toppingColor}" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Heavy Glass Body -->
        <path d="M 56 50 Q 62 82 64 108 C 65 114 95 114 96 108 Q 98 82 104 50 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <path d="M 58 52 Q 63 82 65 106 C 66 112 94 112 95 106 Q 97 82 102 52 Z" fill="${shakeColor}"/>
        <!-- Base / Foot -->
        <ellipse cx="80" cy="116" rx="22" ry="5" fill="#181a1f" stroke="#d4af37" stroke-width="1.5"/>
      </svg>
    `;
  }

  // 5. BOBA FIZZ & MOCKTAILS (Popping Pearls at Bottom)
  if (id.includes('boba') || id.includes('بوبا') || id.includes('mojito') || id.includes('موخيتو') || id.includes('mocktail')) {
    const isBlue = id.includes('blue') || id.includes('بلو');
    const sodaColor = isBlue ? '#0284c7' : '#059669';
    const bobaColor = isBlue ? '#38bdf8' : '#34d399';

    return `
      <svg class="drink-art-svg" viewBox="0 0 160 130" fill="none">
        <path d="M 86 14 L 82 46" stroke="#d4af37" stroke-width="6" stroke-linecap="round"/>
        <path d="M 54 44 L 62 114 C 63 118 97 118 98 114 L 106 44 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <path d="M 56 48 L 63 112 C 64 116 96 116 97 112 L 104 48 Z" fill="${sodaColor}" opacity="0.85"/>
        <!-- Lemon Wheel -->
        <circle cx="98" cy="44" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
        <circle cx="98" cy="44" r="6" fill="#fef08a"/>
        <!-- Boba Pearls -->
        <circle cx="68" cy="108" r="4.5" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="78" cy="109" r="5" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="88" cy="108" r="4.8" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="73" cy="102" r="4.5" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="83" cy="101" r="4.7" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `;
  }

  // -------------------------------------------------------------
  // MASTER UNIFIED FINJAN ENGINE FOR ALL COFFEE & SPECIALTY BREWS
  // -------------------------------------------------------------
  // Every single drink below shares the EXACT SAME luxury finjan cup geometry,
  // saucer, handle, and perspective! Only the layers, ingredients, and art change!

  let isIced = id.includes('iced') || id.includes('ايس') || id.includes('cold');
  let hasSteam = !isIced;

  // Recipe Layers inside the Unified Finjan (Y coords: Base = 108, Full = 50)
  // Total fill height is 58px.
  let layersHtml = '';
  let topArtHtml = '';

  // 1. ESPRESSO SINGLE
  if (id === 'espresso-single' || id === 'espresso-ristretto') {
    // 30ml single shot: 35% height
    layersHtml = `
      <!-- Single Espresso Liquid -->
      <path d="M 52 86 L 57 106 Q 80 110 103 106 L 108 86 Z" fill="url(#${uid}_espresso)"/>
      <!-- Thick Crema Layer -->
      <path d="M 50 78 L 52 86 L 108 86 L 110 78 Z" fill="url(#${uid}_crema)"/>
    `;
    topArtHtml = `
      <!-- Top Crema Surface with Tiger Flecks -->
      <ellipse cx="80" cy="78" rx="30" ry="6.5" fill="url(#${uid}_crema)"/>
      <ellipse cx="76" cy="78" rx="18" ry="3.5" fill="#6d3910" opacity="0.65"/>
      <ellipse cx="84" cy="77" rx="10" ry="2" fill="#f5d36e" opacity="0.8"/>
      <circle cx="72" cy="79" r="1.8" fill="#452005"/>
    `;
  }
  // 2. ESPRESSO DOUBLE / DOPPIO
  else if (id === 'espresso-doppio' || id.includes('doppio') || (id.includes('espresso') && id.includes('double'))) {
    // 60ml double shot: 60% height
    layersHtml = `
      <!-- Double Espresso Liquid -->
      <path d="M 48 70 L 57 106 Q 80 110 103 106 L 112 70 Z" fill="url(#${uid}_espresso)"/>
      <!-- Crema Layer -->
      <path d="M 47 62 L 48 70 L 112 70 L 113 62 Z" fill="url(#${uid}_crema)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="62" rx="33" ry="7" fill="url(#${uid}_crema)"/>
      <ellipse cx="76" cy="62" rx="20" ry="3.8" fill="#6d3910" opacity="0.7"/>
      <ellipse cx="85" cy="61" rx="12" ry="2.2" fill="#f5d36e" opacity="0.85"/>
    `;
  }
  // 3. ESPRESSO CON PANNA
  else if (id.includes('con-panna')) {
    layersHtml = `
      <path d="M 50 82 L 57 106 Q 80 110 103 106 L 110 82 Z" fill="url(#${uid}_espresso)"/>
      <path d="M 49 76 L 50 82 L 110 82 L 111 76 Z" fill="url(#${uid}_crema)"/>
    `;
    topArtHtml = `
      <!-- Whipped Cream Peak rising above rim -->
      <path d="M 60 76 C 60 52 70 42 80 34 C 90 42 100 52 100 76 Z" fill="#fffdf8" stroke="rgba(0,0,0,0.08)"/>
      <path d="M 78 34 C 82 28 86 30 84 25" stroke="#fffdf8" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Cocoa Powder Dusting -->
      <circle cx="76" cy="46" r="1.5" fill="#78350f"/>
      <circle cx="82" cy="42" r="1.2" fill="#78350f"/>
      <circle cx="86" cy="48" r="1.5" fill="#78350f"/>
    `;
  }
  // 4. ESPRESSO MACCHIATO
  else if (id === 'espresso-macchiato') {
    layersHtml = `
      <path d="M 50 80 L 57 106 Q 80 110 103 106 L 110 80 Z" fill="url(#${uid}_espresso)"/>
      <path d="M 49 74 L 50 80 L 110 80 L 111 74 Z" fill="url(#${uid}_crema)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="74" rx="31" ry="6.8" fill="url(#${uid}_crema)"/>
      <!-- Dollop of White Microfoam in Center -->
      <ellipse cx="80" cy="74" rx="14" ry="4.5" fill="#ffffff" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
      <circle cx="80" cy="74" r="2" fill="#dfa85b"/>
    `;
  }
  // 5. CORTADO (50% Espresso / 50% Milk)
  else if (id.includes('cortado')) {
    layersHtml = `
      <!-- Bottom 50% Espresso -->
      <path d="M 50 80 L 57 106 Q 80 110 103 106 L 110 80 Z" fill="url(#${uid}_espresso)"/>
      <!-- Top 50% Steamed Warm Milk -->
      <path d="M 46 54 L 50 80 L 110 80 L 114 54 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="54" rx="34" ry="7.5" fill="#fffaf0"/>
      <!-- Cortado Rosette / Dot -->
      <ellipse cx="80" cy="54" rx="18" ry="4" fill="#dfbe98"/>
      <circle cx="80" cy="54" r="5" fill="#ffffff"/>
      <circle cx="80" cy="54" r="2" fill="#a16207"/>
    `;
  }
  // 6. PICCOLO LATTE
  else if (id.includes('piccolo')) {
    layersHtml = `
      <path d="M 52 86 L 57 106 Q 80 110 103 106 L 108 86 Z" fill="url(#${uid}_espresso)"/>
      <path d="M 46 52 L 52 86 L 108 86 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#fffaf0"/>
      <ellipse cx="80" cy="52" rx="16" ry="3.8" fill="#ffffff"/>
      <circle cx="80" cy="52" r="2.5" fill="#ca8a04"/>
    `;
  }
  // 7. FLAT WHITE (Microfoam Velvet with Flat White Tulip Art)
  else if (id.includes('flat-white')) {
    layersHtml = `
      <!-- Double Espresso Base -->
      <path d="M 49 78 L 57 106 Q 80 110 103 106 L 111 78 Z" fill="url(#${uid}_espresso)"/>
      <!-- Velvety Microfoam Milk -->
      <path d="M 46 52 L 49 78 L 111 78 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <!-- Glossy Microfoam Surface -->
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#f8fafc"/>
      <!-- Delicate Flat White Tulip Leaf Art -->
      <ellipse cx="80" cy="52" rx="24" ry="5.5" fill="#d49e6a"/>
      <path d="M 80 47 C 72 50 72 54 80 57 C 88 54 88 50 80 47 Z" fill="#ffffff"/>
      <circle cx="80" cy="52" r="3.5" fill="#ffffff"/>
      <circle cx="80" cy="48" r="2" fill="#ffffff"/>
    `;
  }
  // 8. CAPPUCCINO (1/3 Espresso, 1/3 Milk, 1/3 Thick Airy Foam with Cocoa)
  else if (id.includes('cappuccino')) {
    layersHtml = `
      <!-- 1/3 Espresso -->
      <path d="M 52 86 L 57 106 Q 80 110 103 106 L 108 86 Z" fill="url(#${uid}_espresso)"/>
      <!-- 1/3 Steamed Milk -->
      <path d="M 48 68 L 52 86 L 108 86 L 112 68 Z" fill="url(#${uid}_milk)"/>
      <!-- 1/3 Thick Microfoam Crown -->
      <path d="M 46 50 L 48 68 L 112 68 L 114 50 Z" fill="#ffffff"/>
    `;
    topArtHtml = `
      <!-- Domed Airy Velvet Foam -->
      <ellipse cx="80" cy="49" rx="34" ry="7.5" fill="#ffffff"/>
      <ellipse cx="80" cy="49" rx="26" ry="5.8" fill="#fdfbf7"/>
      <!-- Cocoa Powder Dusting -->
      <circle cx="74" cy="48" r="1.5" fill="#582910"/>
      <circle cx="80" cy="47" r="1.8" fill="#582910"/>
      <circle cx="86" cy="49" r="1.4" fill="#582910"/>
      <circle cx="77" cy="51" r="1.2" fill="#582910"/>
      <circle cx="83" cy="51" r="1.5" fill="#582910"/>
    `;
  }
  // 9. CAFFE LATTE (Steamed Milk & Classic Latte Art Heart)
  else if (id === 'latte' || (id.includes('latte') && !id.includes('spanish') && !id.includes('pistachio') && !id.includes('piccolo'))) {
    layersHtml = `
      <!-- Espresso Shot at Bottom -->
      <path d="M 51 86 L 57 106 Q 80 110 103 106 L 109 86 Z" fill="url(#${uid}_espresso)"/>
      <!-- Plentiful Steamed Milk -->
      <path d="M 46 52 L 51 86 L 109 86 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#fbf8f2"/>
      <!-- Golden Crema Perimeter -->
      <ellipse cx="80" cy="52" rx="28" ry="6" fill="#cfa579"/>
      <!-- White Latte Art Heart -->
      <path d="M 80 56 C 73 50 68 51 72 47 C 76 44 80 48 80 48 C 80 48 84 44 88 47 C 92 51 87 50 80 56 Z" fill="#ffffff"/>
      <circle cx="80" cy="48" r="2.2" fill="#ffffff"/>
    `;
  }
  // 10. SPANISH LATTE (Condensed Milk + Espresso + Milk)
  else if (id.includes('spanish')) {
    layersHtml = `
      <!-- Layer 1: Golden Sweet Condensed Milk -->
      <path d="M 54 94 L 57 106 Q 80 110 103 106 L 106 94 Z" fill="url(#${uid}_condensed)"/>
      <!-- Layer 2: Espresso -->
      <path d="M 49 74 L 54 94 L 106 94 L 111 74 Z" fill="url(#${uid}_espresso)"/>
      <!-- Layer 3: Steamed Milk -->
      <path d="M 46 52 L 49 74 L 111 74 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#fbf8f2"/>
      <ellipse cx="80" cy="52" rx="26" ry="5.5" fill="#e0c29f"/>
      <circle cx="80" cy="52" r="6" fill="#ffffff"/>
      <!-- Cinnamon Dusting -->
      <circle cx="75" cy="51" r="1.2" fill="#92400e"/>
      <circle cx="85" cy="53" r="1.2" fill="#92400e"/>
    `;
  }
  // 11. PISTACHIO LATTE (Rich Green Pistachio Cream + Espresso + Milk)
  else if (id.includes('pistachio') || id.includes('بيستاشيو') || id.includes('بستاش')) {
    layersHtml = `
      <!-- Layer 1: Vibrant Italian Pistachio Cream -->
      <path d="M 54 92 L 57 106 Q 80 110 103 106 L 106 92 Z" fill="url(#${uid}_pistachio)"/>
      <!-- Layer 2: Espresso -->
      <path d="M 49 74 L 54 92 L 106 92 L 111 74 Z" fill="url(#${uid}_espresso)"/>
      <!-- Layer 3: Steamed Milk -->
      <path d="M 46 52 L 49 74 L 111 74 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#fbf8f2"/>
      <!-- Crushed Emerald Pistachio Nuts on Foam -->
      <circle cx="74" cy="51" r="2" fill="#4d8c27"/>
      <circle cx="81" cy="50" r="2.5" fill="#65a30d"/>
      <circle cx="87" cy="53" r="1.8" fill="#3f721d"/>
      <circle cx="78" cy="54" r="1.5" fill="#65a30d"/>
    `;
  }
  // 12. CARAMEL MACCHIATO (Vanilla Milk + Espresso + Caramel Lattice)
  else if (id.includes('caramel') || id.includes('كراميل')) {
    layersHtml = `
      <!-- Steamed Milk & Vanilla Syrup -->
      <path d="M 51 72 L 57 106 Q 80 110 103 106 L 109 72 Z" fill="url(#${uid}_milk)"/>
      <!-- Espresso Mark Layer -->
      <path d="M 47 58 L 51 72 L 109 72 L 113 58 Z" fill="url(#${uid}_espresso)"/>
      <!-- Foam Cap -->
      <path d="M 46 52 L 47 58 L 113 58 L 114 52 Z" fill="#ffffff"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#ffffff"/>
      <!-- Amber Caramel Crosshatch Grid Drizzle -->
      <path d="M 64 50 Q 80 55 96 50" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 66 54 Q 80 48 94 54" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 72 48 L 88 56" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 88 48 L 72 56" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
    `;
  }
  // 13. WHITE MOCHA
  else if (id.includes('white-mocha')) {
    layersHtml = `
      <!-- White Chocolate Velvet -->
      <path d="M 54 92 L 57 106 Q 80 110 103 106 L 106 92 Z" fill="#fdfcf7"/>
      <!-- Espresso -->
      <path d="M 49 74 L 54 92 L 106 92 L 111 74 Z" fill="url(#${uid}_espresso)"/>
      <!-- Steamed Milk -->
      <path d="M 46 52 L 49 74 L 111 74 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#ffffff"/>
      <circle cx="80" cy="52" r="14" fill="#fef9ee"/>
      <!-- White Chocolate Shavings -->
      <path d="M 74 50 Q 80 52 86 50" stroke="#fef08a" stroke-width="2"/>
    `;
  }
  // 14. HOT MOCHA
  else if (id.includes('mocha') || id.includes('موكا')) {
    layersHtml = `
      <!-- Dark Chocolate Sauce -->
      <path d="M 54 92 L 57 106 Q 80 110 103 106 L 106 92 Z" fill="#291208"/>
      <!-- Espresso -->
      <path d="M 49 74 L 54 92 L 106 92 L 111 74 Z" fill="url(#${uid}_espresso)"/>
      <!-- Steamed Milk -->
      <path d="M 46 52 L 49 74 L 111 74 L 114 52 Z" fill="url(#${uid}_milk)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#fbf8f2"/>
      <!-- Chocolate Swirl Spiral -->
      <path d="M 68 52 Q 80 46 88 52 Q 80 58 74 52" stroke="#3e1c0c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    `;
  }
  // 15. AMERICANO / FILTER COFFEE (V60, Chemex, Cold Brew)
  else if (id.includes('americano') || id.includes('v60') || id.includes('chemex') || id.includes('cold-brew')) {
    layersHtml = `
      <!-- Deep Amber Aromatic Filter Coffee Fill -->
      <path d="M 46 52 L 57 106 Q 80 110 103 106 L 114 52 Z" fill="url(#${uid}_espresso)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#2d1506"/>
      <ellipse cx="80" cy="52" rx="28" ry="5.5" fill="#78350f" opacity="0.8"/>
      <circle cx="82" cy="51" r="2" fill="#f59e0b" opacity="0.6"/>
    `;
  }
  // 16. AFFOGATO (Gelato Scoop inside Finjan + Espresso Pour)
  else if (id.includes('affogato')) {
    layersHtml = `
      <path d="M 50 80 L 57 106 Q 80 110 103 106 L 110 80 Z" fill="url(#${uid}_espresso)"/>
    `;
    topArtHtml = `
      <!-- Rich Vanilla Gelato Scoop Resting in Cup -->
      <ellipse cx="80" cy="72" rx="22" ry="18" fill="#fffef5" stroke="#fef08a" stroke-width="1"/>
      <ellipse cx="78" cy="68" rx="16" ry="12" fill="#ffffff"/>
      <!-- Espresso Drizzling down scoop -->
      <path d="M 72 60 Q 75 74 74 84" stroke="#451e06" stroke-width="3" stroke-linecap="round"/>
      <path d="M 86 62 Q 84 72 87 82" stroke="#451e06" stroke-width="2.5" stroke-linecap="round"/>
    `;
  }
  // 17. CAFE BOMBON
  else if (id.includes('bombon')) {
    layersHtml = `
      <!-- 50% Condensed Milk -->
      <path d="M 50 80 L 57 106 Q 80 110 103 106 L 110 80 Z" fill="url(#${uid}_condensed)"/>
      <!-- 50% Espresso -->
      <path d="M 46 52 L 50 80 L 110 80 L 114 52 Z" fill="url(#${uid}_espresso)"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="url(#${uid}_crema)"/>
    `;
  }
  // 18. TURKISH COFFEE (Light, Medium, Dark, Spiced)
  else if (id.includes('turkish') || id.includes('تركي')) {
    const isDark = id.includes('dark') || id.includes('غامق');
    const isSpiced = id.includes('spiced') || id.includes('محوج');
    const foamColor = isDark ? '#3b1c0b' : '#783d15';
    const cremaCenter = isDark ? '#6b3614' : '#b87538';

    layersHtml = `
      <!-- Traditional Brew Liquid -->
      <path d="M 46 54 L 57 106 Q 80 110 103 106 L 114 54 Z" fill="url(#${uid}_espresso)"/>
      <!-- Thick Velvet Crema Head (وش القهوة) -->
      <path d="M 45 49 L 46 54 L 114 54 L 115 49 Z" fill="${foamColor}"/>
    `;
    topArtHtml = `
      <!-- Deep Turkish Crema (وش فخم مع فقاعات ذهبية) -->
      <ellipse cx="80" cy="49" rx="34" ry="7.5" fill="${foamColor}"/>
      <ellipse cx="80" cy="49" rx="22" ry="4.5" fill="${cremaCenter}"/>
      <circle cx="72" cy="48" r="2.2" fill="#291104"/>
      <circle cx="86" cy="49" r="1.8" fill="#291104"/>
      <circle cx="78" cy="50" r="1.5" fill="#f5d36e" opacity="0.8"/>
      ${isSpiced ? `
        <!-- Cardamom Specks (حبهان ناعم) -->
        <circle cx="75" cy="47" r="1" fill="#4d7c0f"/>
        <circle cx="83" cy="48" r="1" fill="#4d7c0f"/>
        <circle cx="80" cy="51" r="0.9" fill="#4d7c0f"/>
      ` : ''}
    `;
  }
  // 19. FRENCH COFFEE (With Milk & Flavors)
  else if (id.includes('french') || id.includes('فرنسا')) {
    layersHtml = `
      <!-- Café au Lait Blend -->
      <path d="M 46 52 L 57 106 Q 80 110 103 106 L 114 52 Z" fill="#583115"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#a46d3e"/>
      <ellipse cx="80" cy="52" rx="24" ry="5.2" fill="#d4a373"/>
      <circle cx="80" cy="52" r="6" fill="#f8eedb"/>
    `;
  }
  // 20. ARABIC COFFEE (Dallah Golden Saffron & Cardamom Brew)
  else if (id.includes('arabic') || id.includes('عربي')) {
    layersHtml = `
      <!-- Golden Saffron Liquid -->
      <path d="M 46 52 L 57 106 Q 80 110 103 106 L 114 52 Z" fill="#d97706"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#f59e0b"/>
      <ellipse cx="80" cy="52" rx="26" ry="5.5" fill="#fbbf24"/>
      <!-- Saffron Strands -->
      <path d="M 74 50 Q 78 48 82 52" stroke="#dc2626" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 78 54 Q 82 56 86 51" stroke="#dc2626" stroke-width="1.2" stroke-linecap="round"/>
    `;
  }
  // 21. SUDANESE JABANA & SINGLE ORIGIN
  else if (id.includes('jabana') || id.includes('جبنة') || id.includes('origin')) {
    layersHtml = `
      <path d="M 46 52 L 57 106 Q 80 110 103 106 L 114 52 Z" fill="#240f04"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="#693310"/>
      <ellipse cx="80" cy="52" rx="22" ry="4.5" fill="#b06a2e"/>
      <!-- Ginger & Clove Flecks -->
      <circle cx="76" cy="51" r="1.2" fill="#fde68a"/>
      <circle cx="84" cy="52" r="1.2" fill="#fde68a"/>
    `;
  }
  // 22. HOT SPECIALTIES (Hot Chocolate, Hot Batata, Hot Lotus, Teas)
  else {
    let drinkColor = '#522b14';
    if (id.includes('batata')) drinkColor = '#ea580c';
    else if (id.includes('lotus')) drinkColor = '#b45309';
    else if (id.includes('karak') || id.includes('adani') || id.includes('masala')) drinkColor = '#c28549';

    layersHtml = `
      <path d="M 46 52 L 57 106 Q 80 110 103 106 L 114 52 Z" fill="${drinkColor}"/>
    `;
    topArtHtml = `
      <ellipse cx="80" cy="52" rx="34" ry="7.5" fill="${drinkColor}"/>
      <ellipse cx="80" cy="52" rx="22" ry="4.5" fill="#ffffff" opacity="0.7"/>
    `;
  }

  // Floating Ice Cubes for Cold / Iced Drinks in Unified Finjan
  let iceCubesHtml = '';
  if (isIced) {
    iceCubesHtml = `
      <!-- Faceted Crystal Ice Cubes Floating in Finjan -->
      <rect x="65" y="58" width="16" height="16" rx="3" transform="rotate(15 65 58)" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.95)" stroke-width="1.2"/>
      <rect x="83" y="66" width="15" height="15" rx="3" transform="rotate(-18 83 66)" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.95)" stroke-width="1.2"/>
      <!-- Frost Droplets -->
      <circle cx="58" cy="88" r="1.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="102" cy="85" r="1.5" fill="rgba(255,255,255,0.7)"/>
    `;
  }

  // Rising Steam Wisps for Hot Drinks
  let steamHtml = '';
  if (hasSteam) {
    steamHtml = `
      <!-- Rising Aromatic Steam -->
      <path d="M 70 38 Q 67 26 73 16" stroke="rgba(245,211,110,0.5)" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 80 36 Q 85 24 81 12" stroke="rgba(245,211,110,0.6)" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 90 38 Q 87 26 93 16" stroke="rgba(245,211,110,0.4)" stroke-width="1.8" stroke-linecap="round"/>
    `;
  }

  // RETURN MASTER UNIFIED FINJAN SVG
  return `
    <svg class="drink-art-svg" viewBox="0 0 160 130" fill="none">
      <defs>
        <!-- Luxury Royal Porcelain Gradient (Clean White with Soft Reflections) -->
        <linearGradient id="${uid}_porcelain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="25%" stop-color="#f8fafc"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="75%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>

        <!-- Handle Shading -->
        <linearGradient id="${uid}_handle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="60%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>

        <!-- Saucer Rim -->
        <linearGradient id="${uid}_saucer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#94a3b8"/>
          <stop offset="30%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>

        <!-- Espresso Liquid -->
        <linearGradient id="${uid}_espresso" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3d1d07"/>
          <stop offset="100%" stop-color="#140902"/>
        </linearGradient>

        <!-- Thick Golden Crema -->
        <linearGradient id="${uid}_crema" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b46e27"/>
          <stop offset="50%" stop-color="#e0a353"/>
          <stop offset="100%" stop-color="#8c4e13"/>
        </linearGradient>

        <!-- Steamed Microfoam Milk -->
        <linearGradient id="${uid}_milk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f3e8d9"/>
        </linearGradient>

        <!-- Condensed Milk -->
        <linearGradient id="${uid}_condensed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff8e7"/>
          <stop offset="100%" stop-color="#f3dc9f"/>
        </linearGradient>

        <!-- Pistachio Cream -->
        <linearGradient id="${uid}_pistachio" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#68ab38"/>
          <stop offset="100%" stop-color="#3b691d"/>
        </linearGradient>

        <!-- Internal Cavity Clip -->
        <clipPath id="${uid}_clip">
          <path d="M 45 50 Q 47 84 57 106 Q 80 110 103 106 Q 113 84 115 50 Z"/>
        </clipPath>
      </defs>

      <!-- 1. Saucer Drop Shadow -->
      <ellipse cx="80" cy="122" rx="56" ry="5.5" fill="rgba(0,0,0,0.65)"/>

      <!-- 2. Porcelain Saucer with Gold Trim -->
      <ellipse cx="80" cy="116" rx="55" ry="9" fill="url(#${uid}_saucer)" stroke="#d4af37" stroke-width="1.3"/>
      <ellipse cx="80" cy="115" rx="38" ry="5.8" fill="#e2e8f0" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>
      <ellipse cx="80" cy="115" rx="25" ry="3.5" fill="#cbd5e1" opacity="0.6"/>

      <!-- 3. Ergonomic Cup Handle on Right Side -->
      <path d="M 112 58 C 137 58 139 88 110 93" fill="none" stroke="url(#${uid}_handle)" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M 112 58 C 137 58 139 88 110 93" fill="none" stroke="#d4af37" stroke-width="1" stroke-linecap="round"/>

      <!-- 4. Unified Porcelain Cup Shell with Gold Trim -->
      <path d="M 43 50 Q 45 84 56 108 Q 80 112 104 108 Q 115 84 117 50 Z" fill="url(#${uid}_porcelain)" stroke="#d4af37" stroke-width="1.3"/>

      <!-- 5. Liquid Layers Inside Unified Finjan (Clipped) -->
      <g clip-path="url(#${uid}_clip)">
        ${layersHtml}
        ${iceCubesHtml}
      </g>

      <!-- 6. Cup Top Rim (Ellipse) -->
      <ellipse cx="80" cy="50" rx="37" ry="8.5" fill="none" stroke="#d4af37" stroke-width="1.4"/>
      <ellipse cx="80" cy="50" rx="35.5" ry="7.5" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="0.8"/>

      <!-- 7. Top Surface of Drink (Crema, Microfoam, Art) -->
      ${topArtHtml}

      <!-- 8. Rising Steam for Hot Drinks -->
      ${steamHtml}

      <!-- 9. Porcelain Glaze Specular Highlight -->
      <path d="M 48 56 Q 49 84 58 104" stroke="rgba(255,255,255,0.6)" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `;
}
