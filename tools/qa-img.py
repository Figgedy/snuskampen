#!/usr/bin/env python3
import os, re, html
from collections import Counter
from PIL import Image

IMG = 'img'
src = open('products.js', encoding='utf-8').read()
IDS = set(re.findall(r'''["']?id["']?\s*:\s*["']([^"']+)["']''', src))

def nearwhite(p): return all(c >= 235 for c in p[:3])

def ahash(im):
    q = im.resize((6, 6))
    return ''.join('%02x' % (v // 24) for p in q.getdata() for v in p)

rows, seen, tally = [], {}, Counter()
files = sorted(f for f in os.listdir(IMG) if not f.startswith('.'))
stems = set(os.path.splitext(f)[0] for f in files)

for f in files:
    path = os.path.join(IMG, f); stem = os.path.splitext(f)[0]; flags = []
    if stem not in IDS: flags.append('Id saknas i products.js')
    try: im = Image.open(path).convert('RGB')
    except Exception as e:
        rows.append((f, 0, 0, 0, ['Kan ej öppnas'])); tally['Kan ej öppnas'] += 1; continue
    w, h = im.size; kb = os.path.getsize(path)//1024
    c = [im.getpixel((1,1)), im.getpixel((w-2,1)), im.getpixel((1,h-2)), im.getpixel((w-2,h-2))]
    if not all(nearwhite(p) for p in c): flags.append('Ej vit bakgrund %s' % (c[0],))
    if not 0.9 <= w/h <= 1.1: flags.append('Ej kvadratisk %dx%d' % (w, h))
    if min(w, h) < 400: flags.append('För liten %dx%d' % (w, h))
    if kb > 400: flags.append('Tung %d kB' % kb)

    s = im.resize((120, 120)); px = s.load(); bg = c[0]
    xs = [x for y in range(120) for x in range(120)
          if sum(abs(px[x,y][i]-bg[i]) for i in range(3)) > 45]
    if not xs: flags.append('Tom bild')
    else:
        ys = [y for y in range(120) for x in range(120)
              if sum(abs(px[x,y][i]-bg[i]) for i in range(3)) > 45]
        mnx, mxx, mny, mxy = min(xs), max(xs), min(ys), max(ys)
        fill = ((mxx-mnx)*(mxy-mny))/(120*120)
        if fill < 0.30: flags.append('Mycket luft (%.0f%%)' % (fill*100))
        if mnx <= 1 or mny <= 1 or mxx >= 118 or mxy >= 118: flags.append('Beskuren i kant')

    hsh = ahash(im)
    if hsh in seen: flags.append('Identisk med %s' % seen[hsh])
    else: seen[hsh] = f
    for fl in flags: tally[fl.split(' (')[0].split(' %s' % '')[0][:22]] += 1
    rows.append((f, w, h, kb, flags))

for i in sorted(IDS - stems):
    rows.append(('(saknas) %s' % i, 0, 0, 0, ['Produkt utan bild'])); tally['Produkt utan bild'] += 1

rows.sort(key=lambda r: (-len(r[4]), r[0]))
bad = sum(1 for r in rows if r[4])
hist = ''.join('<li>%s — <b>%d</b></li>' % (html.escape(k), v) for k, v in tally.most_common())

out = ['<meta charset="utf-8"><style>body{font:14px system-ui;background:#111;color:#eee;margin:20px}',
 '.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}',
 '.c{background:#1c1c1c;border-radius:8px;padding:8px}.c.bad{outline:2px solid #e11}',
 '.c img{width:100%;aspect-ratio:1;object-fit:contain;background:#fff;border-radius:4px}',
 '.n{font-size:11px;word-break:break-all;margin:6px 0 2px}.f{font-size:11px;color:#f88}',
 'ul{columns:2;max-width:700px}</style>',
 '<h2>%d filer · %d flaggade</h2><ul>%s</ul><div class="g">' % (len(files), bad, hist)]
for f, w, h, kb, flags in rows:
    img = '<img src="../%s/%s">' % (IMG, html.escape(f)) if w else ''
    out.append('<div class="c%s">%s<div class="n">%s</div><div class="f">%s</div></div>'
               % (' bad' if flags else '', img, html.escape(f), html.escape(' · '.join(flags))))
open('tools/qa-img.html', 'w', encoding='utf-8').write('\n'.join(out) + '</div>')
print('%d filer, %d flaggade' % (len(files), bad))
for k, v in tally.most_common(): print('  %-28s %d' % (k, v))
