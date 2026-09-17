#!/usr/bin/env python3
import os, html
from PIL import Image

SRC, DST, SIZE, FILL, THRESH = 'img-new', 'img-final', 400, 0.88, 22
os.makedirs(DST, exist_ok=True)

def norm(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    bg = im.getpixel((0, 0))
    px = im.load()
    minx, miny, maxx, maxy = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if abs(r-bg[0]) + abs(g-bg[1]) + abs(b-bg[2]) > THRESH:
                if x < minx: minx = x
                if x > maxx: maxx = x
                if y < miny: miny = y
                if y > maxy: maxy = y
    if maxx < 0: return None, bg, 'tom'
    cr = im.crop((minx, miny, maxx+1, maxy+1))
    t = SIZE * FILL
    s = min(t/cr.width, t/cr.height, 1.3)
    cr = cr.resize((max(1, round(cr.width*s)), max(1, round(cr.height*s))), Image.LANCZOS)
    out = Image.new('RGB', (SIZE, SIZE), bg)
    out.paste(cr, ((SIZE-cr.width)//2, (SIZE-cr.height)//2))
    return out, bg, '%dx%d → %dx%d' % (w, h, cr.width, cr.height)

files = sorted(f for f in os.listdir(SRC) if not f.startswith('.'))
rows, before, after, fails, nonwhite = [], 0, 0, 0, []
for f in files:
    sp = os.path.join(SRC, f); dp = os.path.join(DST, f)
    try:
        out, bg, note = norm(sp)
        if out is None: raise ValueError(note)
        if not all(c >= 240 for c in bg):
            nonwhite.append(f); note += ' · bakgrund %s' % (bg,)
        dp = dp.rsplit('.',1)[0]+'.jpg'
        out.convert('RGB').save(dp, quality=90, optimize=True)
        f = os.path.basename(dp)
        before += os.path.getsize(sp); after += os.path.getsize(dp)
        rows_dst = f
        rows.append((os.path.basename(sp), f, note))
    except Exception as e:
        fails += 1; rows.append((f, None, 'FEL: %s' % e))

rows.sort(key=lambda r: (r[1] is not None, 'bakgrund' not in r[2], r[0]))
o = ['<meta charset="utf-8"><style>body{font:14px system-ui;background:#111;color:#eee;margin:20px}',
     '.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}',
     '.c{background:#1c1c1c;border-radius:8px;padding:8px}.c.bad{outline:2px solid #e11}',
     '.p{display:flex;gap:6px}.p div{flex:1;text-align:center;font-size:10px;color:#888}',
     '.p img{width:100%;aspect-ratio:1;object-fit:contain;border-radius:4px;background:#fce8ec}',
     '.n{font-size:11px;word-break:break-all;margin-top:6px}</style>',
     '<h2>%d filer · %d fel · %d ej vit bakgrund · %.0f MB → %.0f MB</h2><div class="g">'
     % (len(files), fails, len(nonwhite), before/1e6, after/1e6)]
for a, b, note in rows:
    pair = ('<div><img src="../%s/%s"><br>före</div>' % (SRC, html.escape(a)) +
            ('<div><img src="../%s/%s"><br>efter</div>' % (DST, html.escape(b)) if b else '<div>—</div>'))
    o.append('<div class="c%s"><div class="p">%s</div><div class="n">%s<br>%s</div></div>'
             % ('' if b else ' bad', pair, html.escape(a), html.escape(note)))
open('tools/qa-norm.html', 'w', encoding='utf-8').write('\n'.join(o) + '</div>')
print('%d filer, %d fel, %d ej vit bakgrund, %.0f MB → %.0f MB'
      % (len(files), fails, len(nonwhite), before/1e6, after/1e6))
