#!/usr/bin/env python3
import os, re, json, html
from PIL import Image, ImageDraw

src = open('products.js', encoding='utf-8').read()
P = {d['id']: d for d in (json.loads(m.group(0)) for m in re.finditer(r'\{"id".*?\}', src))}
have = [os.path.splitext(f)[0] for f in sorted(os.listdir('img')) if not f.startswith('.')]
mini = [i for i in have if P.get(i, {}).get('format') == 'Mini']
os.makedirs('img-mini-test', exist_ok=True)

def mask(im, pct):
    w, h = im.size
    r = min(w, h) * pct / 200.0
    cx, cy = w/2, h/2
    out = Image.new('RGB', (w, h), (255, 255, 255))
    m = Image.new('L', (w, h), 0)
    ImageDraw.Draw(m).ellipse((cx-r, cy-r, cx+r, cy+r), fill=255)
    out.paste(im, (0, 0), m)
    return out

for i in mini[:14]:
    im = Image.open('img/%s.jpg' % i).convert('RGB')
    for k in (100, 84, 78, 72):
        mask(im, k).save('img-mini-test/%s__%d.jpg' % (i, k), quality=90)

o = ['<meta charset="utf-8"><style>body{font:14px system-ui;background:#111;color:#eee;margin:20px}',
     '.r{background:#1c1c1c;border-radius:8px;padding:8px;margin-bottom:10px}',
     '.p{display:flex;gap:8px}.p div{width:170px;text-align:center;font-size:11px;color:#888}',
     '.p img{width:100%;aspect-ratio:1;object-fit:contain;background:#fce8ec;border-radius:4px}',
     '.n{font-size:11px;color:#999;margin-top:6px}</style><h2>Rund maskning, mini</h2>']
for i in mini[:14]:
    o.append('<div class="r"><div class="p">' + ''.join(
        '<div><img src="../img-mini-test/%s__%d.jpg"><br>%d%%</div>' % (html.escape(i), k, k)
        for k in (100, 84, 78, 72)) + '</div><div class="n">%s</div></div>' % html.escape(i))
open('tools/qa-mini.html','w',encoding='utf-8').write('\n'.join(o))
print('%d mini totalt · 14 testade -> tools/qa-mini.html' % len(mini))
