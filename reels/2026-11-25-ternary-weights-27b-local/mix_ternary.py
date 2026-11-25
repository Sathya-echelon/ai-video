"""SFX stem for the 25 Nov 2026 reel (ternary weights). Mirrors modules/score.js event for event.
Run: SFX_WAV=<ai4reallife-video>/library/sfx/ python3 mix_ternary.py Ternary_Bonsai_SFX_stem.wav"""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 64.4
import os
W = os.environ.get('SFX_WAV', 'library/sfx/')  # folder of the library WAVs (repo: library/sfx/)
T = dict(hook=0, float_=5.0, fifty=10.5, three=16.0, grid=21.0, scalef=28.0, train=34.5, bench=43.5, local=50.5, close=56.5, brand=62.0)

_cache = {}
def load(name):
    if name not in _cache:
        sr, a = wavfile.read(W + name + '.wav'); _cache[name] = a.astype(np.float32) / 32768
    return _cache[name]

out = np.zeros((int(DUR * SR) + SR, 2), np.float32)

def put(name, t, at=0.0, db=0.0, pan=0.0, rate=1.0, trim=None, fade=0.08, fadein=0.0):
    """Place `name` so that sample time `at` (seconds, after trim) lands on film time t."""
    a = load(name)
    if trim:
        a = a[int(trim[0] * SR): int(trim[1] * SR) if trim[1] else None]
    if rate != 1.0:
        up, down = int(round(1000 / rate)), 1000
        a = resample_poly(a, up, down, axis=0).astype(np.float32)
        at = at / rate
    a = a.copy()
    n = len(a)
    if fade and n > 2:
        k = min(n, int(fade * SR)); a[-k:] *= np.linspace(1, 0, k)[:, None]
    if fadein:
        k = min(n, int(fadein * SR)); a[:k] *= np.linspace(0, 1, k)[:, None]
    g = 10 ** (db / 20)
    l, r = math.cos((pan + 1) * math.pi / 4) * math.sqrt(2), math.sin((pan + 1) * math.pi / 4) * math.sqrt(2)
    a[:, 0] *= g * l; a[:, 1] *= g * r
    s = int(round((t - at) * SR))
    if s < 0: a = a[-s:]; s = 0
    e = min(len(out), s + len(a)); out[s:e] += a[: e - s]

def rng(seed):
    s = [seed & 0xffffffff]
    def f():
        s[0] = (s[0] * 1664525 + 1013904223) & 0xffffffff
        return s[0] / 4294967296
    return f

# ── sample bank ──
KEYS = [3.94, 4.16, 4.475, 7.98, 8.185, 8.48, 10.405, 10.825, 12.115, 12.485, 12.735, 14.385, 14.585, 16.68, 19.15, 22.01]
SH = [0.53, 2.98, 5.59, 8.195]            # analog shutter clicks
R = rng(4242)
def key(t, db=-6, pan=0.0, rate=None):
    k = KEYS[int(R() * len(KEYS))]
    put('Mechanical_Keyboard', t, at=0.0, db=db, pan=pan, rate=rate or (0.94 + R() * 0.14), trim=(k - 0.01, k + 0.2), fade=0.05)
def letters(base, txt, seed, t0, span, db=-7):
    r = rng(seed)
    for i, c in enumerate(txt):
        x = base + t0 + r() * span
        if c != ' ': key(x, db, pan=(i / max(1, len(txt) - 1) - 0.5) * 0.8)
def count(t, d, db=-10, start=0.11, end=0.035):
    x = t
    while x < t + d:
        p = (x - t) / d; key(x, db + 3 * p, pan=(R() - 0.5) * 0.6, rate=1.0 + 0.15 * p)
        x += start + (end - start) * p
def shutter(t, db=-4, pan=0.0, i=None):
    c = SH[i if i is not None else int(R() * len(SH))]
    put('Analog_Shutter', t, at=0.0, db=db, pan=pan, trim=(c - 0.005, c + 0.32), fade=0.1)
def click(t, db=-2, pan=0.0, rate=1.0):
    put('1_Click_Mouse', t, at=0.03, db=db, pan=pan, rate=rate)
def whip(t, db=-6, pan=0.0, which=1):     # t = the fastest instant of the move
    n = {1: 'Deep_Whoosh_1', 2: 'Deep_Whoosh_2'}[which]
    put(n, t, at=0.52, db=db, pan=pan, fade=0.4)
def big_whoosh(t, db=-6, which=3):         # peak lands on t
    put('Deep_Whoosh_' + str(which), t, at={3: 0.73, 4: 0.87}[which], db=db, fade=0.6)
def fast(t, db=-8, pan=0.0, rate=1.0):     # little slide, peak on t
    put('Fast_Whoosh', t, at=0.21, db=db, pan=pan, rate=rate)
def slam(t, db=-4, pan=0.0):               # tapes and number lands
    fast(t - 0.02, -12, pan); put('Deep_Hit_3', t, at=0.01, db=db, pan=pan, fade=0.4); shutter(t, -10, pan)
def stamp(t, db=-2):                       # the big stamps
    fast(t - 0.03, -10); put('Deep_Hit', t, at=0.13, db=db, fade=0.8); put('Hit_1', t, at=0.04, db=db - 4); shutter(t + 0.01, -6)
def land(t, db=-8, pan=0.0):               # stickers landing
    put('Hit_2', t, at=0.1, db=db, pan=pan, trim=(0, 1.2), fade=0.5)
def pop(t, db=-8, pan=0.0):
    click(t, db, pan, rate=0.85 + R() * 0.4)
def glitch(t, db=-6, which=1):
    if which == 1: put('Glitch_1', t, at=0.05, db=db)
    else: put('Glitch_2', t, at=0.15, db=db)
def sub(t, db=-8, length=2.4):
    put('Impact__Subdrop', t, at=0.0, db=db, trim=(0, length), fade=1.2)




def SLOT(t): click(t, -4); land(t + 0.05, -12)
def IN(t, db=-9): fast(t, db)

# 1 hook: the two rows on the wall, then the stamp
pop(0.75, -6, -0.3); stamp(2.65, -1); whip(4.6, -5, 0.6, 1)

# 2 float: one weight typed out at full precision
g = T['float_']
letters(g, 'Sixteen bits', 41, 0.5, 0.42)
land(g + 1.0, -8)
for i in range(18): key(g + 1.32 + i / 14.0, -9, pan=(0.3 if i % 2 else -0.3))
pop(g + 3.15, -6, 0.4); slam(g + 3.9, -5, -0.3); whip(g + 5.1, -5, -0.6, 2)

# 3 fifty: the counter climbs, three servers stack
c = T['fifty']
count(c + 0.35, 2.1, -12)
for i in range(3): land(c + 0.85 + i * 0.3, -8, -0.4 + i * 0.4)
pop(c + 3.3, -8, -0.3); slam(c + 4.1, -4, 0.3); whip(c + 5.1, -5, 0.6, 1)

# 4 three: the long float crumples into three values
h = T['three']
letters(h, 'Sign only', 47, 0.45, 0.38)
pop(h + 0.55, -6, 0.3)
for i in range(3):
    a = h + 1.55 + i * 0.4
    slam(a, -3, -0.5 + i * 0.5); glitch(a + 0.26, -13, 1 if i % 2 == 0 else 2)
pop(h + 3.5, -8, -0.3); whip(h + 4.6, -5, -0.6, 2)

# 5 grid: 128 cells fill in
r = T['grid']
for i in range(24): key(r + 0.78 + i * 0.047, -11, pan=(i / 23.0 - 0.5) * 0.9)
shutter(r + 1.9, -9)
slam(r + 4.5, -3); pop(r + 5.1, -7, 0.4); whip(r + 6.55, -5, 0.6, 1)

# 6 scalef: one shared factor multiplies into the grid
s = T['scalef']
land(s + 0.55, -8)
sub(s + 1.9, -12, 1.6); shutter(s + 2.5, -9)
for i in range(12): key(s + 2.62 + i * 0.055, -11, pan=(i / 11.0 - 0.5) * 0.8)
whip(s + 3.5, -6, 0, 2); pop(s + 3.95, -6, -0.4)
letters(s, 'Under two bits', 59, 4.35, 0.42)
pop(s + 5.25, -8, 0.3); whip(s + 6.1, -5, -0.6, 1)

# 7 train: rounded afterwards cracks, trained inside it settles
p = T['train']
slam(p + 0.75, -3, -0.3); land(p + 1.0, -8); pop(p + 1.35, -6, 0.4)
stamp(p + 2.0, 0); glitch(p + 2.05, -10, 1)
slam(p + 2.9, -4, -0.3); whip(p + 4.4, -5, 0, 2)
slam(p + 5.25, -3, 0.3)
for i in range(10): key(p + 6.02 + i * 0.06, -11, pan=(i / 9.0 - 0.5) * 0.8)
pop(p + 6.5, -6, -0.3); stamp(p + 7.5, 0); whip(p + 8.55, -5, 0.6, 1)

# 8 bench: the two bars grow
b = T['bench']
pop(b + 0.6, -6, 0.4)
count(b + 1.0, 1.4, -13); count(b + 1.5, 1.4, -13)
shutter(b + 2.4, -8); shutter(b + 2.9, -7)
slam(b + 3.2, -4, -0.4); slam(b + 3.32, -9, -0.4)
slam(b + 3.55, -4, 0.4); slam(b + 3.67, -9, 0.4)
pop(b + 4.6, -8, -0.3); whip(b + 6.55, -5, -0.6, 2)

# 9 local: the cable is pulled out
k = T['local']
letters(k, 'On your own', 71, 0.5, 0.3); letters(k, 'hardware', 72, 0.78, 0.34)
land(k + 1.5, -8, -0.3)
fast(k + 2.2, -10, 0.5); pop(k + 2.5, -7, 0.5)
fast(k + 3.0, -7, 0.6); put('Deep_Hit_2', k + 3.5, at=0.02, db=-10, fade=0.5)
slam(k + 4.0, -4, -0.3); pop(k + 4.75, -8, 0.3); whip(k + 5.55, -5, 0.6, 1)

# 10 close: the parameter row fades back
z = T['close']
fast(z + 0.7, -11)
letters(z, 'Ask what each', 91, 1.05, 0.3); letters(z, 'one costs in bits', 92, 1.35, 0.36)
pop(z + 2.6, -6, 0.4); big_whoosh(z + 5.3, -9, 4)

# 11 brand sting
n = T['brand']
fast(n + 0.1, -8); glitch(n + 0.2, -10, 1)
put('Dramatic_Impact', n + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(n + 0.56, -6)

stem = out[: int(DUR * SR)]
kk = int(0.6 * SR); stem[-kk:] *= np.linspace(1, 0, kk)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
