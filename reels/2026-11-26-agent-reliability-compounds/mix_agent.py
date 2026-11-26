"""SFX stem for the 26 Nov 2026 reel (95% becomes 36%). Mirrors modules/score.js event for event.
Run: SFX_WAV=<ai4reallife-video>/library/sfx/ python3 mix_agent.py agent_sfx_stem.wav"""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 64.4
import os
W = os.environ.get('SFX_WAV', 'library/sfx/')  # folder of the library WAVs (repo: library/sfx/)
T = dict(hook=0, slide=5.0, chain=15.0, power=20.0, curve=28.0, study=37.0, back=45.0, close=55.0, brand=62.0)

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
def LETTERS(base, txt, seed, t0, span, db=-7): letters(base, txt, seed, t0, span, db)

# 1 hook: TWENTY STEPS revealed, the exponent typed into a calculator, then stamped 36%
LETTERS(0, 'Twenty', 41, -0.75, 0.3); LETTERS(0, 'Steps', 42, -0.5, 0.3)
for i in range(12):
    x = -0.55 + i / 14.0
    if x > 0.02: key(x, -9, pan=(0.35 if i % 2 else -0.35))
count(1.35, 1.1, -12)
stamp(2.55, -1); whip(4.6, -5, 0.6, 1)
# 2 slide: the vendor deck, the badge, three tapes, then the question nobody asks
g = T['slide']
land(g + 0.45, -8); pop(g + 0.85, -8, -0.3); pop(g + 1.05, -8, 0.3)
land(g + 1.45, -7, 0.4); pop(g + 1.62, -7)
slam(g + 2.35, -4, -0.4); slam(g + 2.85, -4, 0.2); slam(g + 3.35, -4, -0.2)
whip(g + 4.95, -5, -0.6, 2)
LETTERS(g, 'How many', 51, 6.1, 0.38); LETTERS(g, 'Steps', 52, 6.45, 0.3)
pop(g + 7.5, -6, 0.4); pop(g + 8.4, -8, -0.3); whip(g + 9.6, -5, 0.6, 1)
# 3 chain: twenty links, then the one that takes the rest down
c = T['chain']
LETTERS(c, 'It', 61, 0.95, 0.22); LETTERS(c, 'Multiplies', 62, 1.2, 0.36)
for i in range(20): pop(c + 1.95 + i * 0.038, -12, -0.5 + i * 0.05)
stamp(c + 2.9, -2); sub(c + 3.0, -11, 1.6)
pop(c + 3.5, -6, 0.4); pop(c + 4.1, -8, -0.3); whip(c + 4.6, -5, -0.6, 2)
# 4 power: the formula builds
p = T['power']
LETTERS(p, 'The math', 71, 0.5, 0.4); pop(p + 1.5, -9, -0.3)
slam(p + 2.15, -3, -0.2); slam(p + 2.75, -5, 0.4); shutter(p + 2.95, -9)
slam(p + 3.5, -5, -0.4); slam(p + 4.1, -5, 0.3)
pop(p + 4.9, -6, 0.4); click(p + 5.3, -8); click(p + 5.65, -8)
pop(p + 6.1, -8, -0.3); IN(p + 7.95, -8)
# 5 curve: the axis and the curve draw, four markers land
v = T['curve']
LETTERS(v, 'The curve', 81, 0.5, 0.4)
fast(v + 1.2, -10, -0.3); pop(v + 1.5, -10, -0.4); pop(v + 1.6, -10, 0.4)
sub(v + 1.9, -12, 2.6)
for i, a in enumerate([2.35, 2.75, 3.45, 4.55]):
    slam(v + a, -2 if i == 2 else -5, -0.4 + i * 0.3); click(v + a + 0.22, -9)
pop(v + 5.4, -8, -0.3); pop(v + 6.0, -6, 0.4)
for i in range(6): pop(v + 6.35 + i * 0.16, -11, (i - 3) * 0.2)
whip(v + 8.6, -5, -0.6, 1)
# 6 study: nine models, ten thousand runs, a geometric law
s = T['study']
LETTERS(s, 'Nine models', 91, 0.5, 0.4)
count(s + 1.2, 1.8, -12); shutter(s + 3.0, -9)
stamp(s + 3.7, -1)
pop(s + 4.35, -6, 0.4); pop(s + 4.85, -8, -0.4)
slam(s + 5.75, -4, -0.3); slam(s + 6.35, -4, 0.3); whip(s + 7.6, -5, 0.6, 2)
# 7 back: solve backwards, then the governance gap
b = T['back']
LETTERS(b, 'To clear 90%', 101, 0.5, 0.4)
count(b + 1.6, 1.0, -12); shutter(b + 2.62, -8)
slam(b + 2.7, -4, -0.3); pop(b + 3.2, -6, 0.4); pop(b + 4.1, -8, -0.3)
whip(b + 5.0, -5, 0, 1)
LETTERS(b, 'The gap', 102, 6.1, 0.3)
slam(b + 6.75, -4, -0.3); sub(b + 6.95, -13, 0.7)
slam(b + 8.0, -4, 0.3); sub(b + 8.2, -14, 0.6)
pop(b + 9.0, -8, -0.3); IN(b + 9.95, -8)
# 8 close: count the steps, drop the checkpoint
k = T['close']
LETTERS(k, 'Count', 111, 0.75, 0.24); LETTERS(k, 'The steps', 112, 1.0, 0.36)
for i in range(10): pop(k + 1.8 + i * 0.055, -11, -0.5 + i * 0.1)
slam(k + 3.3, -2, 0); put('Deep_Hit_2', k + 3.32, at=0.02, db=-8, fade=0.5)
stamp(k + 4.15, -1)
pop(k + 4.8, -6, 0.4); shutter(k + 4.95, -9); pop(k + 5.5, -8, -0.3)
big_whoosh(k + 6.9, -9, 4)
# 9 brand sting
bd = T['brand']
fast(bd + 0.1, -8); glitch(bd + 0.2, -10, 1)
put('Dramatic_Impact', bd + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(bd + 0.56, -6)
stem = out[: int(DUR * SR)]
kk = int(0.6 * SR); stem[-kk:] *= np.linspace(1, 0, kk)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
