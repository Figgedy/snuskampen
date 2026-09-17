#!/usr/bin/env python3
import os, re, json, html
from PIL import Image

src = open('products.js', encoding='utf-8').read()
P = {d['id']: d for d in (json.loads(m.group(0)) for m in re.finditer(r'\{"id".*?\}', src))}
have = [os.path.splitext(f)[0] for f in sorted(os.listdir('img')) if not f.startswith('.')]
mini = [i for i in have if P.get(i, {}).get('format') == 'Mini']
os.makedirs('img-mini-test', exist_ok=True)

for i in mini[:14]:
    im = Image.open('img/%s.jpg' % i).convert('RGB')
    w, h = im.size
    cx, cy = w/2, h/2
    for k in (100, 80, 74, 68):
        s = min(w, h) * k/100
        c = im.crop((round(cx-s/2), round(cy-s/2), round(cx+s/2), round(cy+s/2)))
        c = c.resize((400, 400), Image.LANCZOS)
        c.save('img-mini-test/%s__%d.jpg' % (i, k), quality=90)

o = ['<meta charset="utf-8"><style>body{font:14px system-ui;background:#111;color:#eee;margin:20px}',
     '.r{background:#1c1c1c;border-radius:8px;padding:8px;margin-bottom:10px}',
     '.p{display:flex;gap:8px}.p div{width:170px;text-align:center;font-size:11px;color:#888}',
     '.p img{width:100%;aspect-ratio:1;object-fit:contain;background:#fce8ec;border-radius:4px}',
     '.n{font-size:11px;color:#999;margin-top:6px}</style><h2>Mini-crop: %d produkter</h2>' % len(mini[:14])]
for i in mini[:14]:
    o.append('<div class="r"><div class="p">' + ''.join(
        '<div><img src="../img-mini-test/%s__%d.jpg"><br>%d%%</div>' % (html.escape(i), k, k)
        for k in (100, 80, 74, 68)) + '</div><div class="n">%s</div></div>' % html.escape(i))
open('tools/qa-mini.html','w',encoding='utf-8').write('\n'.join(o))
print('%d mini-produkter totalt · 14 testade -> tools/qa-mini.html' % len(mini))
