"""SFX stem builder template (copy, then set DUR, T and the scene events) - builds the stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 64.4
import os
W = os.environ.get('SFX_WAV', 'library/sfx/')  # folder of the library WAVs (repo: library/sfx/)
T = dict(hook=0, toggle=5.0, tested=14.0, decoy=19.0, trap=27.0, scale=35.0, verdict=45.0, close=55.0, brand=62.0)

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
# 1 hook: headlines rattle out of the ticker, freeze, three pulled
# 1 hook: the fake key typed into the prompt, then stamped
for i in range(30):
    x = -0.85 + i / 26.0
    if x > 0.02: key(x, -9, pan=(0.35 if i % 2 else -0.35))
pop(0.35, -6, -0.4); stamp(2.55, -1); pop(3.35, -7, -0.3); whip(4.6, -5, 0.6, 1)
# 2 toggle: the privacy page, then the Zero Data Retention switch
g = T['toggle']
letters(g, 'Read the page', 71, 0.55, 0.42)
land(g + 0.75, -8); pop(g + 1.5, -7, 0.4); count(g + 2.05, 0.45, -12)
IN(g + 4.55); land(g + 4.55, -9); slam(g + 4.78, -5); slam(g + 4.98, -5)
click(g + 5.42, -1); pop(g + 5.7, -7)
fast(g + 6.0, -9); shutter(g + 6.5, -8); pop(g + 6.2, -7, 0.5)
stamp(g + 7.05, -1); whip(g + 8.6, -5, -0.6, 2)
# 3 tested: the map wakes up under the loupe
e = T['tested']
letters(e, 'They tested it', 73, 0.42, 0.38); land(e + 0.6, -8)
for i in range(10): pop(e + 1.35 + i * 0.13, -9, -0.5 + i * 0.1)
pop(e + 2.5, -6, 0.4); slam(e + 3.25, -5, -0.3); whip(e + 4.6, -5, 0.6, 1)
# 4 decoy: one prompt splits into two unique decoys
d = T['decoy']
letters(d, 'A unique decoy', 77, 0.5, 0.4); slam(d + 1.5, -4)
fast(d + 2.0, -10, -0.5); fast(d + 2.2, -10, 0.5); SLOT(d + 2.35); SLOT(d + 2.6)
pop(d + 4.4, -5); shutter(d + 4.55, -9); pop(d + 5.9, -8, -0.3); whip(d + 7.6, -5, -0.6, 2)
# 5 trap: the empty account and the eye that opens over it
p = T['trap']
letters(p, 'Any use is proof', 79, 0.45, 0.4); land(p + 1.1, -7); pop(p + 1.5, -8, 0.4)
sub(p + 2.2, -12, 1.8); shutter(p + 2.85, -9); big_whoosh(p + 3.5, -11, 3)
stamp(p + 5.45, 0); whip(p + 7.6, -5, 0, 1)
# 6 scale: two million, five months, three providers
c = T['scale']
count(c + 0.3, 3.0, -12); land(c + 0.9, -8, 0.4)
for i in range(5): click(c + 1.0 + i * 0.66, -6, (i - 2) * 0.2)
whip(c + 4.85, -5, 0, 2); letters(c, 'Three providers', 83, 5.75, 0.4)
for i in range(3):
    a = c + 6.5 + i * 0.62
    slam(a, -3, -0.5 + i * 0.5); glitch(a + 0.3, -12, 1 if i % 2 == 0 else 2)
pop(c + 8.95, -8, -0.3); whip(c + 9.6, -5, 0.6, 1)
# 7 verdict: the badge stamped, then two thirds of it floods
v = T['verdict']
letters(v, 'A claim,', 87, 0.5, 0.26); letters(v, 'not a control', 88, 0.78, 0.34)
fast(v + 2.4, -8); stamp(v + 2.68, 0)
sub(v + 4.6, -11, 2.2); count(v + 4.6, 0.9, -13)
slam(v + 6.45, -2); pop(v + 7.2, -7, -0.3); pop(v + 7.55, -7, 0.3); whip(v + 9.6, -5, 0, 2)
# 8 close: the key struck out, the canary left on screen
k = T['close']
letters(k, 'Send nothing', 91, 0.45, 0.3); letters(k, 'you can’t burn', 92, 0.72, 0.34)
land(k + 1.05, -7, -0.4); fast(k + 1.75, -9, 0.5)
fast(k + 2.42, -7); put('Deep_Hit_2', k + 2.9, at=0.02, db=-7, fade=0.5)
slam(k + 3.5, -4, -0.3); pop(k + 4.35, -6, 0.4); shutter(k + 4.5, -9)
big_whoosh(k + 6.4, -9, 4)
# 9 brand sting
b = T['brand']
fast(b + 0.1, -8); glitch(b + 0.2, -10, 1)
put('Dramatic_Impact', b + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(b + 0.56, -6)
stem = out[: int(DUR * SR)]
kk = int(0.6 * SR); stem[-kk:] *= np.linspace(1, 0, kk)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
