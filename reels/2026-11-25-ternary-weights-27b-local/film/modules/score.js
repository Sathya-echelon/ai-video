kit.score(function (S, T) {
  // Sound design only, no music: every effect sits on the frame of its picture event.
  S.tempo(100, { t0: 0 });
  const fx = (n, t, o) => S.fx(n, Math.max(0, t), o || {});
  const dr = (n, t, v) => S.drum(n, { t: Math.max(0, t), vel: v });
  const SUCK = (t, d, v) => fx('whoosh', t - (d || 0.3), { dur: d || 0.3, vel: v || 42, into: 1 });
  const SLAM = (t, v, p) => { SUCK(t, 0.22, 36); fx('thud', t, { vel: v || 92, pan: p || 0 }); dr('clap', t, 50); dr('kick', t, 70); };
  const STAMP = (t, v) => { SUCK(t, 0.25, 40); fx('thud', t, { vel: v || 112 }); dr('snare', t, 70); dr('crash', t + 0.01, 32); dr('kick', t, 92); };
  const LAND = (t, v, p) => { fx('thud', t, { vel: v || 68, pan: p || 0 }); dr('tom', t, 44); };
  const WHIP = (t, p) => { fx('whoosh', t, { dur: 0.36, vel: 64, pan: p || 0 }); dr('hat', t + 0.02, 18); };
  const POP = (t, v, p) => fx('pop', t, { vel: v || 46, pan: p || 0 });
  const IN = (t, v) => fx('whoosh', t - 0.35, { dur: 0.35, vel: v || 56 });
  const LETTERS = (at, txt, seed, t0, span) => { const r = kit.rng(seed); const ts = []; for (const c of txt) { const x = at + t0 + r() * span; if (c !== ' ') ts.push(x); } S.ticks(ts, { vel: 26, jitter: 0.3 }); };

  // hook - two rows on the wall, then the stamp
  POP(0.75, 50, -0.3); STAMP(2.65, 116); WHIP(4.6, 0.6);

  // float - one weight typed out at full precision
  LETTERS(T.float, 'Sixteen bits', 41, 0.5, 0.42);
  LAND(T.float + 1.0, 62);
  S.ticks(Array.from({ length: 18 }, (_, i) => T.float + 1.32 + i / 14), { vel: 30, jitter: 0.2 });
  POP(T.float + 3.15, 50, 0.4); SLAM(T.float + 3.9, 72, -0.3); WHIP(T.float + 5.1, -0.6);

  // fifty - the counter climbs and the servers stack up
  fx('roll', T.fifty + 0.35, { dur: 2.1, vel: 22, pitch: 5 });
  [0, 1, 2].forEach(i => LAND(T.fifty + 0.85 + i * 0.3, 64, -0.4 + i * 0.4));
  POP(T.fifty + 3.3, 44, -0.3); SLAM(T.fifty + 4.1, 74, 0.3); WHIP(T.fifty + 5.1, 0.6);

  // three - the long float crumples into three values
  LETTERS(T.three, 'Sign only', 47, 0.45, 0.38);
  POP(T.three + 0.55, 54, 0.3);
  [0, 1, 2].forEach(i => { const a = T.three + 1.55 + i * 0.4; SLAM(a, 88, -0.5 + i * 0.5); fx('tick', a + 0.26, { vel: 40 }); });
  POP(T.three + 3.5, 44, -0.3); WHIP(T.three + 4.6, -0.6);

  // grid - 128 cells fill in
  S.ticks(Array.from({ length: 24 }, (_, i) => T.grid + 0.78 + i * 0.047), { vel: 24, jitter: 0.4 });
  fx('sparkle', T.grid + 1.9, { vel: 26 });
  SLAM(T.grid + 4.5, 90); POP(T.grid + 5.1, 48, 0.4); WHIP(T.grid + 6.55, 0.6);

  // scalef - one factor multiplies into the grid
  LAND(T.scalef + 0.55, 66);
  fx('revswell', T.scalef + 1.9, { dur: 0.6, vel: 36 }); fx('ding', T.scalef + 2.5, { vel: 28 });
  S.ticks(Array.from({ length: 12 }, (_, i) => T.scalef + 2.62 + i * 0.055), { vel: 24, jitter: 0.3 });
  WHIP(T.scalef + 3.5, 0); POP(T.scalef + 3.95, 50, -0.4);
  LETTERS(T.scalef, 'Under two bits', 59, 4.35, 0.42);
  POP(T.scalef + 5.25, 44, 0.3); WHIP(T.scalef + 6.1, -0.6);

  // train - rounded afterwards cracks; trained inside it settles
  SLAM(T.train + 0.75, 84, -0.3); LAND(T.train + 1.0, 60);
  POP(T.train + 1.35, 50, 0.4);
  STAMP(T.train + 2.0, 118); dr('sidestick', T.train + 2.05, 46);
  SLAM(T.train + 2.9, 76, -0.3); WHIP(T.train + 4.4, 0);
  SLAM(T.train + 5.25, 84, 0.3);
  S.ticks(Array.from({ length: 10 }, (_, i) => T.train + 6.02 + i * 0.06), { vel: 24, jitter: 0.3 });
  POP(T.train + 6.5, 50, -0.3); STAMP(T.train + 7.5, 120); WHIP(T.train + 8.55, 0.6);

  // bench - the two bars grow
  POP(T.bench + 0.6, 50, 0.4);
  fx('roll', T.bench + 1.0, { dur: 1.4, vel: 20, pitch: 6 });
  fx('roll', T.bench + 1.5, { dur: 1.4, vel: 20, pitch: 3 });
  fx('ding', T.bench + 2.4, { vel: 30 }); fx('ding', T.bench + 2.9, { vel: 34 });
  SLAM(T.bench + 3.2, 78, -0.4); SLAM(T.bench + 3.32, 58, -0.4);
  SLAM(T.bench + 3.55, 78, 0.4); SLAM(T.bench + 3.67, 58, 0.4);
  POP(T.bench + 4.6, 44, -0.3); WHIP(T.bench + 6.55, -0.6);

  // local - the cable is pulled out
  LETTERS(T.local, 'On your own', 71, 0.5, 0.3); LETTERS(T.local, 'hardware', 72, 0.78, 0.34);
  LAND(T.local + 1.5, 64, -0.3);
  fx('whoosh', T.local + 2.2, { dur: 0.45, vel: 34, pan: 0.5 }); POP(T.local + 2.5, 48, 0.5);
  fx('whoosh', T.local + 3.0, { dur: 0.5, vel: 52, pan: 0.6 }); fx('boing', T.local + 3.5, { vel: 34 });
  SLAM(T.local + 4.0, 76, -0.3); POP(T.local + 4.75, 44, 0.3); WHIP(T.local + 5.55, 0.6);

  // close - the parameter row fades back
  fx('whoosh', T.close + 0.7, { dur: 0.6, vel: 30 });
  LETTERS(T.close, 'Ask what each', 91, 1.05, 0.3); LETTERS(T.close, 'one costs in bits', 92, 1.35, 0.36);
  POP(T.close + 2.6, 50, 0.4); IN(T.close + 5.3, 58);

  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 });
  fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
