// Emad Afandi Specialty Coffee Lab - High-Craft Vector Drink Visuals
// Generates colorful, highly recognizable SVG illustrations for all drinks

function getDrinkSvg(item) {
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  // 1. ESPRESSO & SHOTS
  if (id === 'espresso-single' || id === 'espresso-con-panna' || id.includes('ristretto') || id.includes('doppio')) {
    const hasCream = id.includes('con-panna');
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="cremaGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#dfa85b"/>
            <stop offset="50%" stop-color="#b87932"/>
            <stop offset="100%" stop-color="#7a4613"/>
          </radialGradient>
          <linearGradient id="cupGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
            <stop offset="25%" stop-color="rgba(255,255,255,0.08)"/>
            <stop offset="75%" stop-color="rgba(255,255,255,0.05)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.2)"/>
          </linearGradient>
        </defs>
        <!-- Saucer -->
        <ellipse cx="70" cy="116" rx="44" ry="8" fill="#181a1f" stroke="#d4af37" stroke-width="1.5"/>
        <ellipse cx="70" cy="115" rx="36" ry="5" fill="#242830"/>
        <!-- Handle -->
        <path d="M88 64 C104 64 104 90 88 90" stroke="#d4af37" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- Cup Body -->
        <path d="M44 54 L49 104 C50 110 90 110 91 104 L96 54 Z" fill="url(#cupGlass)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Coffee Liquid -->
        <path d="M47 74 L50 102 C51 107 89 107 90 102 L93 74 Z" fill="#1f1105"/>
        <!-- Crema Layer -->
        <ellipse cx="70" cy="74" rx="23" ry="5.5" fill="url(#cremaGrad)"/>
        <!-- Tiger Streaks -->
        <ellipse cx="66" cy="74" rx="14" ry="2.5" fill="#522c07" opacity="0.6"/>
        <ellipse cx="72" cy="73" rx="8" ry="1.5" fill="#e8bb74" opacity="0.8"/>
        ${hasCream ? `
          <!-- Whipped Cream Peak -->
          <path d="M56 72 C56 58 64 54 70 50 C76 54 84 58 84 72 Z" fill="#fff9ee"/>
          <path d="M68 50 C70 45 74 46 72 42" stroke="#fff9ee" stroke-width="3" stroke-linecap="round"/>
        ` : ''}
        <!-- Glass Highlight -->
        <path d="M50 58 L53 98" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 2. AMERICANO & FILTER COFFEE (V60, Chemex, Cold Brew)
  if (id.includes('americano') || id.includes('v60') || id.includes('chemex') || id.includes('cold-brew')) {
    const isCold = id.includes('cold') || id.includes('iced');
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <defs>
          <linearGradient id="amberCoffee" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#783d10"/>
            <stop offset="60%" stop-color="#3d1e06"/>
            <stop offset="100%" stop-color="#1c0c01"/>
          </linearGradient>
        </defs>
        <!-- Saucer / Base -->
        <ellipse cx="70" cy="118" rx="42" ry="7" fill="#181a1f" stroke="#d4af37" stroke-width="1.2"/>
        <!-- Mug / Decanter -->
        <path d="M42 45 L48 108 C50 114 90 114 92 108 L98 45 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Handle -->
        <path d="M92 56 C106 56 106 88 90 88" stroke="#d4af37" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <!-- Liquid -->
        <path d="M44 58 L48 106 C50 112 90 112 92 106 L96 58 Z" fill="url(#amberCoffee)"/>
        <!-- Surface -->
        <ellipse cx="70" cy="58" rx="26" ry="5" fill="#a1581e" opacity="0.8"/>
        ${isCold ? `
          <!-- Ice Cubes -->
          <rect x="58" y="62" width="14" height="14" rx="3" transform="rotate(12 58 62)" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.8)"/>
          <rect x="72" y="70" width="13" height="13" rx="3" transform="rotate(-15 72 70)" fill="rgba(255,255,255,0.45)" stroke="rgba(255,255,255,0.8)"/>
        ` : `
          <!-- Steam Lines -->
          <path d="M62 38 Q60 30 64 22" stroke="rgba(245,211,110,0.5)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M70 36 Q74 26 70 18" stroke="rgba(245,211,110,0.6)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M78 38 Q76 30 80 22" stroke="rgba(245,211,110,0.5)" stroke-width="1.5" stroke-linecap="round"/>
        `}
      </svg>
    `;
  }

  // 3. LAYERED LATTE, SPANISH, PISTACHIO, WHITE MOCHA, CARAMEL MACCHIATO
  if (id.includes('latte') || id.includes('macchiato') || id.includes('mocha') || id.includes('bombon')) {
    const isPistachio = id.includes('pistachio') || id.includes('بيستاشيو');
    const isSpanish = id.includes('spanish') || id.includes('سبانيش');
    const isCaramel = id.includes('caramel') || id.includes('كراميل');
    const isMocha = id.includes('mocha') || id.includes('موكا');
    const isIced = id.includes('iced') || id.includes('ايس');

    // Bottom Syrup Color
    let bottomColor = '#e6bf83'; // default condensed / caramel
    if (isPistachio) bottomColor = '#529646'; // vibrant green pistachio
    else if (isSpanish) bottomColor = '#fff1d6'; // sweet condensed milk
    else if (isMocha) bottomColor = '#3b1d11'; // dark chocolate
    else if (isCaramel) bottomColor = '#cf7a1d'; // rich amber caramel

    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <defs>
          <linearGradient id="milkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fdfbf7"/>
            <stop offset="100%" stop-color="#dfcaa7"/>
          </linearGradient>
          <linearGradient id="coffeeMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3d1d07"/>
            <stop offset="100%" stop-color="#73411b"/>
          </linearGradient>
        </defs>
        <!-- Foot/Saucer -->
        <ellipse cx="70" cy="120" rx="28" ry="6" fill="#181a1f" stroke="#d4af37" stroke-width="1.2"/>
        <path d="M66 114 L74 114 L72 120 L68 120 Z" fill="#242830"/>
        <!-- Tall Glass Contour -->
        <path d="M45 36 L52 112 C53 115 87 115 88 112 L95 36 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Layer 1: Bottom Flavor / Sauce -->
        <path d="M51 98 L52 112 C53 115 87 115 88 112 L89 98 Z" fill="${bottomColor}"/>
        <!-- Layer 2: Coffee Middle -->
        <path d="M49 76 L51 98 L89 98 L91 76 Z" fill="url(#coffeeMid)"/>
        <!-- Layer 3: Steamed Milk -->
        <path d="M47 48 L49 76 L91 76 L93 48 Z" fill="url(#milkGrad)"/>
        <!-- Layer 4: Microfoam Top -->
        <ellipse cx="70" cy="48" rx="23" ry="5" fill="#ffffff"/>
        ${isCaramel ? `
          <!-- Crosshatch Caramel Drizzle -->
          <path d="M55 46 Q70 52 85 46" stroke="#c97116" stroke-width="2"/>
          <path d="M58 50 Q70 44 82 50" stroke="#c97116" stroke-width="2"/>
        ` : ''}
        ${isPistachio ? `
          <!-- Pistachio Crumbs -->
          <circle cx="65" cy="48" r="1.5" fill="#4d8c27"/>
          <circle cx="72" cy="47" r="2" fill="#5ea832"/>
          <circle cx="77" cy="49" r="1.5" fill="#3c6e1e"/>
        ` : ''}
        ${isIced ? `
          <!-- Floating Ice Cubes -->
          <rect x="58" y="52" width="12" height="12" rx="2.5" transform="rotate(10 58 52)" fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.85)"/>
          <rect x="72" y="58" width="12" height="12" rx="2.5" transform="rotate(-12 72 58)" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.85)"/>
        ` : ''}
        <!-- Glass Specular Reflection -->
        <path d="M49 42 L54 106" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 4. CAPPUCCINO & FLAT WHITE & CORTADO (Ceramic cup & Latte Art)
  if (id.includes('cappuccino') || id.includes('flat-white') || id.includes('cortado') || id.includes('piccolo')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Saucer -->
        <ellipse cx="70" cy="116" rx="46" ry="8" fill="#181a1f" stroke="#d4af37" stroke-width="1.5"/>
        <!-- Handle -->
        <path d="M92 68 C108 68 108 96 90 96" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- Porcelain Cup -->
        <path d="M40 58 C40 106 100 106 100 58 Z" fill="#f4f5f7" stroke="#d4af37" stroke-width="1.5"/>
        <!-- Liquid Surface -->
        <ellipse cx="70" cy="60" rx="28" ry="7" fill="#8c5327"/>
        <!-- Microfoam Rim -->
        <ellipse cx="70" cy="60" rx="24" ry="5.5" fill="#fffaf2"/>
        <!-- Latte Art Heart -->
        <path d="M70 64 C64 58 60 60 63 63 C66 65 70 67 70 67 C70 67 74 65 77 63 C80 60 76 58 70 64 Z" fill="#ab6832"/>
        <circle cx="70" cy="58" r="2" fill="#ab6832"/>
      </svg>
    `;
  }

  // 5. TURKISH COFFEE (Traditional Finjan with Thick Foam / وش القهوة)
  if (id.includes('turkish') || id.includes('تركي') || id.includes('french') || id.includes('فرنسا')) {
    const isDark = id.includes('dark') || id.includes('غامق');
    const foamColor = isDark ? '#4d2b12' : '#875127';
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Ornate Oriental Saucer -->
        <ellipse cx="70" cy="116" rx="44" ry="8" fill="#181a1f" stroke="#d4af37" stroke-width="2"/>
        <ellipse cx="70" cy="115" rx="36" ry="5" fill="#0f1115" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
        <!-- Cup Handle -->
        <path d="M88 70 C102 70 102 92 86 92" stroke="#d4af37" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <!-- Finjan Cup -->
        <path d="M46 60 L50 104 C52 110 88 110 90 104 L94 60 Z" fill="#ffffff" stroke="#d4af37" stroke-width="1.5"/>
        <!-- Gold Band on Rim -->
        <ellipse cx="70" cy="60" rx="24" ry="4.5" fill="none" stroke="#d4af37" stroke-width="2"/>
        <!-- Deep Turkish Crema / Foam (الوش) -->
        <ellipse cx="70" cy="61" rx="22" ry="4" fill="${foamColor}"/>
        <!-- Center Foam Ring -->
        <ellipse cx="70" cy="61" rx="14" ry="2.2" fill="#b87b40" opacity="0.9"/>
        <circle cx="68" cy="61" r="1.5" fill="#3b1d09"/>
        <!-- Aromatic Rising Steam -->
        <path d="M64 48 Q61 38 66 28" stroke="rgba(212,175,55,0.6)" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M72 46 Q76 34 71 24" stroke="rgba(212,175,55,0.7)" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 6. ARABIC & SUDANESE JABANA
  if (id.includes('arabic') || id.includes('jabana') || id.includes('عربي')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Golden Dallah Silhouette & Cup -->
        <!-- Finjan -->
        <ellipse cx="80" cy="116" rx="22" ry="5" fill="#181a1f" stroke="#d4af37" stroke-width="1.2"/>
        <path d="M68 84 L72 112 C74 116 86 116 88 112 L92 84 Z" fill="#ffffff" stroke="#d4af37" stroke-width="1.2"/>
        <ellipse cx="80" cy="85" rx="11" ry="2.5" fill="#d99a2b"/>
        <!-- Dallah Spout pouring saffron coffee -->
        <path d="M30 40 Q45 42 55 60 L62 70 Q60 85 45 95 L30 100 Z" fill="#d4af37" stroke="#f5d36e" stroke-width="1.5"/>
        <path d="M40 30 L45 40 L35 40 Z" fill="#f5d36e"/>
        <!-- Flowing Stream of Saffron Gold Coffee -->
        <path d="M58 64 Q68 70 78 85" stroke="#f0aa24" stroke-width="3" stroke-linecap="round"/>
        <!-- Steam -->
        <path d="M80 75 Q82 65 79 55" stroke="rgba(245,211,110,0.6)" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 7. SMOOTHIES (Vibrant Colored Slush Cups with Dome Lid & Straw)
  if (id.includes('smoothie') || id.includes('سموذي') || id.includes('سموزي')) {
    let smoothieColor = '#f59e0b'; // default mango gold
    if (id.includes('strawberry') || id.includes('فراول')) smoothieColor = '#e11d48'; // red
    else if (id.includes('lemon') || id.includes('ليمون')) smoothieColor = '#10b981'; // green
    else if (id.includes('blue') || id.includes('berry') || id.includes('توت') || id.includes('بلوبيري')) smoothieColor = '#7c3aed'; // purple
    else if (id.includes('watermelon') || id.includes('بطيخ')) smoothieColor = '#f43f5e'; // coral red
    else if (id.includes('guava') || id.includes('جواف')) smoothieColor = '#fef08a'; // soft cream yellow
    else if (id.includes('apple') || id.includes('تفاح')) smoothieColor = '#84cc16'; // lime green
    else if (id.includes('kiwi') || id.includes('كيوي')) smoothieColor = '#65a30d'; // kiwi green
    else if (id.includes('passion') || id.includes('باشن')) smoothieColor = '#ea580c'; // passion orange

    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Straw -->
        <path d="M75 14 L82 46" stroke="#d4af37" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Dome Lid -->
        <path d="M45 46 C45 28 95 28 95 46 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <line x1="42" y1="46" x2="98" y2="46" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Cup Body -->
        <path d="M46 48 L53 116 C54 120 86 120 87 116 L94 48 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Frozen Fruit Slush Fill -->
        <path d="M48 52 L54 114 C55 118 85 118 86 114 L92 52 Z" fill="${smoothieColor}"/>
        <!-- Cold Slush Texture -->
        <circle cx="62" cy="70" r="3" fill="rgba(255,255,255,0.25)"/>
        <circle cx="76" cy="85" r="4" fill="rgba(255,255,255,0.2)"/>
        <circle cx="68" cy="100" r="2.5" fill="rgba(255,255,255,0.25)"/>
        <!-- Ice Shimmer Highlight -->
        <path d="M51 54 L56 110" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 8. MILKSHAKES & FRAPPES (Heavy Glass with Whipped Cream & Toppings)
  if (id.includes('shake') || id.includes('شيك') || id.includes('frappe') || id.includes('فرابيه')) {
    let shakeColor = '#dfcaa7'; // vanilla
    let toppingSauce = '#d4af37'; // gold
    if (id.includes('oreo') || id.includes('اوريو')) { shakeColor = '#2b2929'; toppingSauce = '#ffffff'; }
    else if (id.includes('choc') || id.includes('شيكول')) { shakeColor = '#3e2114'; toppingSauce = '#220e06'; }
    else if (id.includes('lotus') || id.includes('لوتس')) { shakeColor = '#b87932'; toppingSauce = '#d97706'; }
    else if (id.includes('pistachio') || id.includes('بستاش')) { shakeColor = '#60914c'; toppingSauce = '#3a6629'; }
    else if (id.includes('straw') || id.includes('فراول')) { shakeColor = '#e11d48'; toppingSauce = '#be123c'; }

    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Straw -->
        <path d="M84 18 L76 56" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Whipped Cream Tower -->
        <path d="M48 54 C46 36 58 32 70 30 C82 32 94 36 92 54 Z" fill="#fffdfa" stroke="rgba(0,0,0,0.1)"/>
        <path d="M56 46 Q70 38 84 46" stroke="${toppingSauce}" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Glass Contour -->
        <path d="M48 54 Q54 84 56 112 C57 118 83 118 84 112 Q86 84 92 54 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Shake Fill -->
        <path d="M50 56 Q55 84 57 110 C58 116 82 116 83 110 Q85 84 90 56 Z" fill="${shakeColor}"/>
        <!-- Base / Foot -->
        <ellipse cx="70" cy="120" rx="18" ry="4" fill="#181a1f" stroke="#d4af37" stroke-width="1.2"/>
        <path d="M68 114 L72 114 L71 120 L69 120 Z" fill="#242830"/>
        <!-- Glass Highlight -->
        <path d="M53 60 Q56 84 58 106" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 9. BOBA FIZZ & MOCKTAILS (Popping Pearls at Bottom)
  if (id.includes('boba') || id.includes('بوبا') || id.includes('mojito') || id.includes('موخيتو') || id.includes('mocktail')) {
    const isBlue = id.includes('blue') || id.includes('بلو');
    const sodaColor = isBlue ? '#0284c7' : '#059669'; // blue curacao or mojito green
    const bobaColor = isBlue ? '#38bdf8' : '#34d399';

    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Wide Boba Straw -->
        <path d="M76 16 L73 50" stroke="#d4af37" stroke-width="6" stroke-linecap="round"/>
        <!-- Cup -->
        <path d="M46 44 L53 116 C54 120 86 120 87 116 L94 44 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Sparkling Liquid -->
        <path d="M48 48 L54 114 C55 118 85 118 86 114 L92 48 Z" fill="${sodaColor}" opacity="0.85"/>
        <!-- Lemon Wheel on Rim -->
        <circle cx="86" cy="44" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
        <circle cx="86" cy="44" r="6" fill="#fef08a"/>
        <!-- Sparkling Effervescence Bubbles -->
        <circle cx="62" cy="70" r="2" fill="#ffffff" opacity="0.7"/>
        <circle cx="78" cy="80" r="2.5" fill="#ffffff" opacity="0.6"/>
        <circle cx="66" cy="92" r="1.8" fill="#ffffff" opacity="0.8"/>
        <!-- Popping Boba Pearls at Bottom -->
        <circle cx="59" cy="110" r="4.5" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="68" cy="111" r="5" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="77" cy="110" r="4.8" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="64" cy="104" r="4.5" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
        <circle cx="73" cy="103" r="4.7" fill="${bobaColor}" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `;
  }

  // 10. WAFFLE (Golden Belgian Grid Plate)
  if (id.includes('waffle') || id.includes('وافل')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Plate -->
        <ellipse cx="70" cy="98" rx="52" ry="24" fill="#181a1f" stroke="#d4af37" stroke-width="1.8"/>
        <!-- Golden Crispy Waffle Body -->
        <rect x="38" y="52" width="64" height="48" rx="8" transform="rotate(-6 70 76)" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <!-- Grid Indentations -->
        <rect x="44" y="58" width="10" height="10" rx="2" transform="rotate(-6 44 58)" fill="#92400e"/>
        <rect x="58" y="56" width="10" height="10" rx="2" transform="rotate(-6 58 56)" fill="#92400e"/>
        <rect x="72" y="54" width="10" height="10" rx="2" transform="rotate(-6 72 54)" fill="#92400e"/>
        <rect x="86" y="52" width="10" height="10" rx="2" transform="rotate(-6 86 52)" fill="#92400e"/>
        <rect x="46" y="72" width="10" height="10" rx="2" transform="rotate(-6 46 72)" fill="#92400e"/>
        <rect x="60" y="70" width="10" height="10" rx="2" transform="rotate(-6 60 70)" fill="#92400e"/>
        <rect x="74" y="68" width="10" height="10" rx="2" transform="rotate(-6 74 68)" fill="#92400e"/>
        <rect x="88" y="66" width="10" height="10" rx="2" transform="rotate(-6 88 66)" fill="#92400e"/>
        <!-- Melted Chocolate / Sauce Drizzle -->
        <path d="M42 62 Q65 72 98 58" stroke="#3e2114" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M48 76 Q75 84 94 72" stroke="#3e2114" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 11. PANCAKE (Stack of 3 Fluffy Golden Cakes with Butter Cube)
  if (id.includes('pancake') || id.includes('بان كيك')) {
    return `
      <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
        <!-- Plate -->
        <ellipse cx="70" cy="106" rx="52" ry="20" fill="#181a1f" stroke="#d4af37" stroke-width="1.8"/>
        <!-- Pancake 1 (Bottom) -->
        <ellipse cx="70" cy="94" rx="38" ry="12" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
        <!-- Pancake 2 (Middle) -->
        <ellipse cx="70" cy="82" rx="36" ry="11" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
        <!-- Pancake 3 (Top) -->
        <ellipse cx="70" cy="70" rx="34" ry="10" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
        <!-- Melting Butter Cube -->
        <rect x="64" y="58" width="12" height="10" rx="1.5" fill="#fef08a" stroke="#facc15" stroke-width="1"/>
        <!-- Honey / Syrup Dripping Down Sides -->
        <path d="M68 68 Q66 84 64 92" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
        <path d="M76 68 Q79 82 82 96" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 12. TEA & SPECIALTIES (Karak, Adani, Hot Batata, Hot Lotus)
  return `
    <svg class="drink-art-svg" viewBox="0 0 140 140" fill="none">
      <ellipse cx="70" cy="116" rx="42" ry="7" fill="#181a1f" stroke="#d4af37" stroke-width="1.5"/>
      <path d="M44 52 L48 106 C50 112 90 112 92 106 L96 52 Z" fill="#241b12" stroke="#d4af37" stroke-width="1.5"/>
      <ellipse cx="70" cy="52" rx="26" ry="6" fill="#b46f2d"/>
      <path d="M92 62 C106 62 106 90 90 90" stroke="#d4af37" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <!-- Steam -->
      <path d="M64 42 Q61 32 66 22" stroke="rgba(212,175,55,0.6)" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M72 40 Q76 28 71 18" stroke="rgba(212,175,55,0.7)" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}
