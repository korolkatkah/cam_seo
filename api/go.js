// /go traffic link (vercel.json rewrites /go here). Forwards the click to the worker-cabinet traffic router
// with the visitor's IP and country, which a plain external rewrite does not pass on, and returns its redirect.
const BACKEND = 'https://worker-cabinet-production.up.railway.app/public/cb/go';

export default async function handler(req, res) {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const h = req.headers;
  const headers = {
    'user-agent': h['user-agent'] || '',
    'x-forwarded-for': (h['x-forwarded-for'] || h['x-real-ip'] || '').split(',')[0].trim(),
    'x-vercel-ip-country': h['x-vercel-ip-country'] || '',
  };
  if (h.referer) headers.referer = h.referer;
  try {
    const r = await fetch(BACKEND + query, { headers, redirect: 'manual' });
    const location = r.headers.get('location');
    if (location) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Referrer-Policy', 'no-referrer');
      res.redirect(302, location);
      return;
    }
  } catch {}
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, 'https://chaturbate.com/');
}
