// Delad laddning av produktdata för api/vs.js och api/og.js
let cache = null, cacheAt = 0;

export async function loadData(origin) {
  if (cache && Date.now() - cacheAt < 3600e3) return cache;
  const [p, i] = await Promise.all([
    fetch(origin + '/products.js').then(r => r.text()),
    fetch(origin + '/images.js').then(r => r.text()),
  ]);
  const w = {};
  new Function('window', p + '\n' + i)(w);
  const byId = {};
  for (const x of w.PRODUCTS || []) byId[x.id] = x;
  cache = { byId, images: w.IMAGES || {} };
  cacheAt = Date.now();
  return cache;
}

export const label = p => `${p.brand} ${p.name}`;

export function originOf(req) {
  const host = req.headers.get('host') || new URL(req.url).host;
  return { host, origin: 'https://' + host };
}
