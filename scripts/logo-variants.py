"""Régénère toutes les déclinaisons du logo à partir du logo officiel.

À exécuter si public/images/logo-yanexpro.png change (nécessite Python 3
et Pillow : `pip install pillow`) :

    python3 scripts/logo-variants.py

Produit :
- public/images/logo-yanexpro-clair.png  (texte foncé recoloré en blanc cassé)
- public/favicon.png (64) et public/apple-touch-icon.png (180)  (emblème)
- public/icon-192.png et public/icon-512.png  (manifeste, fond encre)
- public/images/og-image.png  (carte de partage 1200 x 630)
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / 'public'
SRC = PUB / 'images' / 'logo-yanexpro.png'

im = Image.open(SRC).convert('RGBA')
w, h = im.size
print(f'source : {SRC.name} {im.size}')

# ---- Variante claire : tout ce qui n'est pas rouge devient blanc cassé ----
light = im.copy()
px = light.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        is_red = r > 110 and r > g * 1.5 and r > b * 1.5
        if not is_red:
            px[x, y] = (246, 246, 244, a)
light.save(PUB / 'images' / 'logo-yanexpro-clair.png', optimize=True)
print('logo-yanexpro-clair.png')

# ---- Emblème (engrenage + voiture) : partie au-dessus du mot-symbole ----
top = im.crop((0, 0, w, int(h * 0.54)))
emblem = top.crop(top.getbbox())
ew, eh = emblem.size

# Favicons : emblème sur fond transparent
side = max(ew, eh) + 8
square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
square.paste(emblem, ((side - ew) // 2, (side - eh) // 2))
square.resize((64, 64), Image.LANCZOS).save(PUB / 'favicon.png', optimize=True)
square.resize((180, 180), Image.LANCZOS).save(PUB / 'apple-touch-icon.png', optimize=True)
print('favicon.png, apple-touch-icon.png')

# Icônes du manifeste : emblème sur fond encre, zone sûre « maskable »
for size in (192, 512):
    canvas = Image.new('RGBA', (size, size), (20, 22, 26, 255))
    target = int(size * 0.58)
    scale = target / max(ew, eh)
    resized = emblem.resize((int(ew * scale), int(eh * scale)), Image.LANCZOS)
    canvas.paste(resized, ((size - resized.width) // 2, (size - resized.height) // 2), resized)
    canvas.convert('RGB').save(PUB / f'icon-{size}.png', optimize=True)
    print(f'icon-{size}.png')

# ---- Carte Open Graph : logo centré sur fond papier ----
og = Image.new('RGBA', (1200, 630), (246, 246, 244, 255))
target_w = 480
scaled = im.resize((target_w, int(h * target_w / w)), Image.LANCZOS)
og.paste(scaled, ((1200 - scaled.width) // 2, (630 - scaled.height) // 2), scaled)
og.convert('RGB').save(PUB / 'images' / 'og-image.png', optimize=True)
print('og-image.png')
