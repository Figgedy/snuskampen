// Serverar index.html för /vs/a/b med rätt titel, og-taggar och canonical,
// så att Facebook, iMessage, LinkedIn m.fl. visar själva duellen.
import { loadData, label, originOf } from './_data.js';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const html = (body, cacheSec) => new Response(body, {
  headers: {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': `public, max-age=0, s-maxage=${cacheSec}, stale-while-revalidate=86400`,
  },
});

export async function GET(req) {
  const u = new URL(req.url);
  const { host, origin } = originOf(req);
  const a = u.searchParams.get('a') || '', b = u.searchParams.get('b') || '';

  const page = await fetch(origin + '/index.html').then(r => r.text());
  let A, B;
  try { const { byId } = await loadData(origin); A = byId[a]; B = byId[b]; } catch (e) { console.error(e); }
  if (!A || !B) {
    if (!host.includes('snusbattle')) return html(page, 300);
    const en = page
      .replace(/<title>[^<]*<\/title>/, '<title>Which pouch wins? – Snusbattle</title>')
      .replace(/(<meta property="og:site_name" content=")[^"]*"/, '$1Snusbattle"')
      .replace(/(<meta property="og:title"[^>]*content=")[^"]*"/, '$1Which pouch wins? – Snusbattle"')
      .replace(/(<meta property="og:description"[^>]*content=")[^"]*"/, '$1Two pouches. You pick. The winner stays."')
      .replace(/(<meta property="og:image" content=")[^"]*"/, (_, p1) => `${p1}${origin}/og-en.jpg"`);
    return html(en, 300);
  }

  const en = host.includes('snusbattle');
  const site = en ? 'Snusbattle' : 'Snuskampen';
  const title = `${label(A)} vs ${label(B)} – ${site}`;
  const desc = en ? 'Which one wins? Cast your vote.' : 'Vilket snus vinner? Rösta nu.';
  const url = `${origin.replace('://www.', '://')}/vs/${encodeURIComponent(a)}/${encodeURIComponent(b)}`;
  const img = `${origin}/api/og?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}&v=8`;

  const out = page
    .replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace(/(<meta property="og:site_name" content=")[^"]*"/, (_, p1) => `${p1}${site}"`)
    .replace(/(<meta property="og:title"[^>]*content=")[^"]*"/, (_, p1) => `${p1}${esc(title)}"`)
    .replace(/(<meta property="og:description"[^>]*content=")[^"]*"/, (_, p1) => `${p1}${esc(desc)}"`)
    .replace(/(<meta property="og:image" content=")[^"]*"/, (_, p1) => `${p1}${esc(img)}"`)
    .replace(/<meta property="og:type"[^>]*>/, m =>
      `${m}\n<meta property="og:url" content="${esc(url)}">\n<link rel="canonical" id="canon" href="${esc(url)}">`);

  return html(out, 3600);
}
