#!/usr/bin/env python3
import os, re, json, sys, html
from collections import defaultdict
from PIL import Image

DIR = sys.argv[1] if len(sys.argv) > 1 else 'img-new'
src = open('products.js', encoding='utf-8').read()
P = {}
for m in re.finditer(r'\{"id".*?\}', src):
    d = json.loads(m.group(0)); P[d['id']] = d

files = sorted(f for f in os.listdir(DIR) if not f.startswith('.'))
stems = {os.path.splitext(f)[0]: f for f in files}

def hash12(p):
    q = Image.open(p).convert('RGB').resize((12, 12))
    return ''.join('%02x' % (v // 16) for px in q.getdata() for v in px)

def pasted(p):
    N = 96
    im = Image.open(p).convert('L').resize((N, N))
    b = im.point(lambda v: 255 if v >= 238 else 0)
    d = b.getdata()
    m = [[d[y*N+x] for y in range(N)] for x in range(N)]
    best = 0
    for x in range(4, N-4):
        c = 0
        for y in range(N):
            if m[x-3][y] != m[x+3][y]: c += 1
        if c > best: best = c
    for y in range(4, N-4):
        c = 0
        for x in range(N):
            if m[x][y-3] != m[x][y+3]: c += 1
        if c > best: best = c
    return best / N

groups, prob = defaultdict(list), []
_t = len(files)
for _n, f in enumerate(files, 1):
    if _n % 10 == 0 or _n == _t:
        _k = int(30 * _n / _t)
        sys.stderr.write('\r  [%s%s] %d/%d' % ('#'*_k, '.'*(30-_k), _n, _t)); sys.stderr.flush()
    p = os.path.join(DIR, f)
    groups[hash12(p)].append(os.path.splitext(f)[0])
    s = pasted(p)
    if s >= 0.45: prob.append((s, f))

dup = [ids for ids in groups.values() if len(ids) > 1]
missing = [i for i in P if i not in stems]
extra = [s for s in stems if s not in P]
cross = []
for ids in dup:
    if len(set(P.get(i, {}).get('name') for i in ids)) > 1:
        cross.append(ids)

sys.stderr.write('\n')
print('katalog          : %d' % len(P))
print('filer i %-9s: %d' % (DIR, len(files)))
print('SAKNAR BILD      : %d' % len(missing))
print('BILD UTAN PRODUKT: %d' % len(extra))
print('DELAD BILD       : %d grupper (%d filer)' % (len(dup), sum(len(g) for g in dup)))
print('  varav olika produktnamn: %d  <-- de här är fel' % len(cross))
print('RAK VITKANT      : %d  <-- misstänkt hopklistrat' % len(prob))
for ids in cross[:20]: print('    %s' % ', '.join(ids))
for s, f in sorted(prob, reverse=True)[:15]: print('    %.2f %s' % (s, f))

o = ['<meta charset="utf-8"><style>body{font:14px system-ui;background:#111;color:#eee;margin:20px}',
     'h3{margin:26px 0 8px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}',
     '.r{display:flex;gap:8px;background:#1c1c1c;border-radius:8px;padding:8px;margin-bottom:8px;flex-wrap:wrap}',
     '.c{width:150px}.c img{width:100%;aspect-ratio:1;object-fit:contain;background:#fff;border-radius:4px}',
     '.n{font-size:10px;word-break:break-all;color:#999;margin-top:4px}</style>',
     '<h3>Delad bild, olika produkt (%d grupper)</h3>' % len(cross)]
for ids in cross:
    o.append('<div class="r">' + ''.join(
        '<div class="c"><img src="../%s/%s"><div class="n">%s</div></div>'
        % (DIR, html.escape(stems[i]), html.escape(i)) for i in ids if i in stems) + '</div>')
o.append('<h3>Misstänkt hopklistrat (%d)</h3><div class="g">' % len(prob))
for s, f in sorted(prob, reverse=True):
    o.append('<div class="c"><img src="../%s/%s"><div class="n">%.2f · %s</div></div>'
             % (DIR, html.escape(f), s, html.escape(f)))
open('tools/verify.html', 'w', encoding='utf-8').write('\n'.join(o) + '</div>')
print('\n→ tools/verify.html')
