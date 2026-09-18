// Genererar förhandsbild 1200x630 för en duell: /api/og?a=<id>&b=<id>
import { ImageResponse } from '@vercel/og';
import { loadData, label, originOf } from './_data.js';

let font = null;
const el = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });

function side(p, imgUrl) {
  return el('div', { flexDirection: 'column', alignItems: 'center', width: 440 }, [
    imgUrl
      ? { type: 'img', props: { src: imgUrl, width: 300, height: 300, style: { objectFit: 'contain' } } }
      : el('div', { width: 300, height: 300, borderRadius: 150, background: '#e9e4d8' }, []),
    el('div', { fontSize: 26, color: '#6b6b6b', marginTop: 14 }, p.brand),
    el('div', { fontFamily: 'Bebas', fontSize: 58, color: '#111820', textAlign: 'center', lineHeight: 1, marginTop: 6, maxWidth: 440, justifyContent: 'center' }, p.name.toUpperCase()),
  ]);
}

export async function GET(req) {
  const u = new URL(req.url);
  const { origin } = originOf(req);
  const [{ byId, images }] = await Promise.all([
    loadData(origin),
    font ? null : fetch(origin + '/fonts/BebasNeue-Regular.ttf').then(r => r.arrayBuffer()).then(b => { font = b; }),
  ]);
  const A = byId[u.searchParams.get('a')], B = byId[u.searchParams.get('b')];
  if (!A || !B) return Response.redirect(origin + '/og.jpg', 302);

  const src = p => (images[p.id] ? `${origin}/img/${images[p.id]}` : null);

  const tree = el('div', { width: 1200, height: 630, background: '#ffffff', flexDirection: 'column', alignItems: 'center', padding: '28px 40px' }, [
    { type: 'img', props: { src: origin + '/logo.png', width: 420, height: 100, style: { objectFit: 'contain' } } },
    el('div', { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }, [
      side(A, src(A)),
      el('div', { width: 120, height: 120, borderRadius: 60, background: '#111820', color: '#fff', fontFamily: 'Bebas', fontSize: 64, paddingTop: 6, alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)' }, 'VS'),
      side(B, src(B)),
    ]),
  ]);

  return new ImageResponse(tree, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Bebas', data: font, weight: 400, style: 'normal' }],
    headers: { 'cache-control': 'public, max-age=86400, s-maxage=604800, immutable' },
  });
}
