#!/usr/bin/env python3
import os, sys
from PIL import Image
SRC, DST, SIZE = 'img-new', 'img-small', 500
os.makedirs(DST, exist_ok=True)
files = sorted(f for f in os.listdir(SRC) if not f.startswith('.'))
before = after = 0
for n, f in enumerate(files, 1):
    sp = os.path.join(SRC, f)
    dp = os.path.join(DST, os.path.splitext(f)[0] + '.jpg')
    im = Image.open(sp)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im)
    im = im.convert('RGB')
    im.thumbnail((SIZE, SIZE), Image.LANCZOS)
    im.save(dp, quality=88, optimize=True)
    before += os.path.getsize(sp); after += os.path.getsize(dp)
    if n % 20 == 0 or n == len(files):
        k = int(30*n/len(files))
        sys.stderr.write('\r  [%s%s] %d/%d' % ('#'*k, '.'*(30-k), n, len(files))); sys.stderr.flush()
sys.stderr.write('\n')
print('%d filer · %.0f MB -> %.0f MB' % (len(files), before/1e6, after/1e6))
