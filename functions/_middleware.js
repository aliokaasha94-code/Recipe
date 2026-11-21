/**
 * Cloudflare Pages Edge Security Middleware
 * Emad Afandi SOP & Recipe Intellectual Property Guard
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();

  // 1. Guard all sensitive recipe JSON datasets
  if (pathname.endsWith('.json') && (pathname.includes('recipe') || pathname.includes('espresso') || pathname.includes('traditional') || pathname.includes('backbar') || pathname.includes('data/'))) {
    const secFetchSite = request.headers.get('sec-fetch-site');
    const secFetchDest = request.headers.get('sec-fetch-dest');
    const referer = request.headers.get('referer') || '';
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

    // A. Detect Automated CLI Scrapers, Headless Browsers & Crawlers
    const isScraper = /curl|wget|python|httpie|postman|insomnia|aiohttp|urllib|requests|axios|scrapy|bot|crawler|spider/i.test(userAgent);

    // B. Detect Direct Browser Address Bar Typing / Direct Tab Opening
    const isDirectAddressBarOpen = secFetchDest === 'document' || !referer || !referer.includes(url.hostname);

    if (isScraper || isDirectAddressBarOpen || (secFetchSite === 'none' && !referer)) {
      return new Response(JSON.stringify({
        status: 403,
        error: "Access Denied",
        message: "🔒 هذا المحتوى ملكية فكرية وسرية تجارية خاصة بكافيه ومحمصة عماد أفندي. يُحظر التحميل المباشر أو استخراج البيانات.",
        station: "Emad Afandi Smart Bar SOP",
        client_ip_logged: true
      }, null, 2), {
        status: 403,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Access-Control-Allow-Origin': 'null'
        }
      });
    }
  }

  // 2. Process Request and Inject Fortress Security Headers
  const response = await next();
  const headers = new Headers(response.headers);

  // Anti-Clickjacking & Anti-Framing
  headers.set('X-Frame-Options', 'DENY');
  // Anti-MIME Sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  // Strict Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Search Engine Blacklist
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  // Cache Prevention for Sensitive Dynamic Assets
  if (pathname.endsWith('.html') || pathname.endsWith('.json') || pathname.includes('manager-dashboard')) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('Pragma', 'no-cache');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}
