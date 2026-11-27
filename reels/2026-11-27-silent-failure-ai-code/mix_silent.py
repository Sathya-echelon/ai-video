"""SFX stem for the 27 Nov 2026 "silent failure" reel.
Mirrors modules/score.js event for event; library WAVs from ai4reallife-video/library/sfx/.
  SFX_WAV=library/sfx/ python3.13 mix_silent.py sfx_stem.wav
"""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 62.4
import os
W = os.environ.get('SFX_WAV', 'library/sfx/')  # folder of the library WAVs (repo: library/sfx/)
T = dict(hook=0, ship=5.0, paper=12.0, blind=19.0, dropped=28.5, repair=38.0, silent=45.0, test=50.0, brand=60.0)

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

# 1 hook: both bars already read at frame 0, the pink one strains, then the stamp lands
sub(0.0, -13, 1.6); count(0.05, 0.7, -13)
pop(0.8, -6, 0.4); pop(1.45, -7, -0.3)
stamp(2.72, -1); whip(4.6, -5, 0.6, 1)

# 2 ship: the terminal types itself clean
g = T['ship']
letters(g, 'They just run it', 41, 0.5, 0.34)
land(g + 0.72, -8); pop(g + 0.6, -7, 0.4)
for i, a in enumerate([0.95, 1.55, 2.05, 2.55, 3.25, 3.65, 4.25]):
    for j in range(7): key(g + a + j * 0.055, -10, pan=(j / 6 - 0.5) * 0.7)
    if i >= 4: click(g + a + 0.42, -7, 0.3)
pop(g + 3.3, -6); shutter(g + 4.6, -9)
slam(g + 5.1, -4); pop(g + 5.65, -7, -0.3); whip(g + 6.6, -5, 0, 2)

# 3 paper: the paper drops in, the headline turns over
p = T['paper']
IN(p + 0.1, -8); land(p + 0.62, -8, 0.4); click(p + 0.88, -5)
letters(p, 'Not a crash', 51, 1.45, 0.3)
letters(p, 'A clean answer', 52, 2.70, 0.26)
letters(p, 'to the wrong', 53, 3.02, 0.26)
letters(p, 'question', 54, 3.32, 0.22)
pop(p + 3.95, -6, 0.4); pop(p + 4.75, -7, -0.3); whip(p + 6.6, -5, -0.6, 1)

# 4 blind: the split lands row by row, the fourth has no match, then the eye is struck through
b = T['blind']
letters(b, 'What you wrote', 61, 0.55, 0.32)
pop(b + 1.3, -7, -0.4); pop(b + 1.65, -7, 0.4)
for i in range(3):
    slam(b + 2.4 + i * 0.3, -5, -0.45); slam(b + 2.55 + i * 0.3, -5, 0.45)
slam(b + 3.3, -7, -0.45); stamp(b + 3.45, -2)
whip(b + 5.4, -5, 0, 2)
letters(b, 'It cannot see', 62, 6.25, 0.3)
letters(b, 'the business', 63, 6.6, 0.3)
pop(b + 6.35, -6, 0.4)
fast(b + 6.95, -8); put('Deep_Hit_2', b + 7.5, at=0.02, db=-7, fade=0.5)
pop(b + 7.85, -7, -0.3); whip(b + 9.1, -5, 0.6, 1)

# 5 dropped: the rule is crumpled away while every check comes back clean
d = T['dropped']
letters(d, 'Nothing warns you', 71, 0.55, 0.34)
slam(d + 1.1, -5, -0.4); pop(d + 1.95, -7, 0.4)
fast(d + 2.1, -9, 0.5); click(d + 2.7, -9, 0.4)
for i in range(4):
    a = d + 2.55 + i * 0.36
    slam(a, -5, -0.3); pop(a + 0.14, -10, 0.2)
whip(d + 5.45, -5, 0, 1)
letters(d, 'Still valid', 72, 6.1, 0.3)
fast(d + 6.4, -8); stamp(d + 6.68, 0)
count(d + 7.3, 0.7, -12)
pop(d + 8.3, -7, -0.3); whip(d + 9.1, -5, 0, 2)

# 6 repair: the bar climbs from half a percent to thirty-one
r = T['repair']
letters(r, 'Half a percent', 81, 0.5, 0.3)
letters(r, 'to thirty-one', 82, 0.86, 0.3)
land(r + 1.5, -8); pop(r + 1.75, -7, 0.4); pop(r + 1.9, -11, -0.4)
sub(r + 2.3, -12, 2.0); count(r + 2.3, 2.3, -12)
pop(r + 4.3, -10, 0.4); pop(r + 4.6, -5)
pop(r + 4.9, -7, -0.3); pop(r + 5.3, -7, 0.3); whip(r + 6.6, -5, -0.6, 1)

# 7 silent: the hatched block floods the rest of the bar
s = T['silent']
letters(s, 'The rest is', 91, 0.42, 0.26)
letters(s, 'Silent', 92, 0.78, 0.3)
land(s + 1.15, -8)
sub(s + 1.5, -11, 2.0); big_whoosh(s + 1.5, -10, 3)
slam(s + 2.6, -3); pop(s + 3.3, -7, -0.3); whip(s + 4.6, -5, 0.6, 2)

# 8 test: one input is pushed, the answer barely moves, the flag drops
k = T['test']
letters(k, 'Change one input', 101, 0.55, 0.32)
for i in range(3): slam(k + 1.2 + i * 0.26, -5, -0.4 + i * 0.4)
pop(k + 1.9, -6, -0.4)
click(k + 2.55, -1); click(k + 2.62, -9, 0.3)
count(k + 3.5, 0.8, -14)
pop(k + 4.4, -7, -0.3); whip(k + 6.0, -5, 0, 1)
letters(k, 'If it will not', 102, 6.6, 0.26)
letters(k, 'move with you,', 103, 6.92, 0.26)
letters(k, 'it is wrong', 104, 7.26, 0.26)
fast(k + 8.2, -8); slam(k + 8.5, -2)
pop(k + 8.8, -7, 0.3); big_whoosh(k + 9.8, -9, 4)

# 9 brand sting
bc = T['brand']
fast(bc + 0.1, -8); glitch(bc + 0.2, -10, 1)
put('Dramatic_Impact', bc + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(bc + 0.56, -6)

stem = out[: int(DUR * SR)]
kk = int(0.6 * SR); stem[-kk:] *= np.linspace(1, 0, kk)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
