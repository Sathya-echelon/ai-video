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
  const LETTERS = (at, txt, seed, t0, span) => { const r = kit.rng(seed); const ts = []; for (const c of txt) { const x = at + t0 + r() * span; if (c !== ' ') ts.push(x); } S.ticks(ts.filter(x => x > 0), { vel: 26, jitter: 0.3 }); };

  // hook - the exponent typed into a calculator, then stamped 36%
  LETTERS(0, 'Twenty', 41, -0.75, 0.3); LETTERS(0, 'Steps', 42, -0.5, 0.3);
  S.ticks(Array.from({ length: 12 }, (_, i) => -0.55 + i / 14).filter(x => x > 0), { vel: 30, jitter: 0.2 });
  fx('roll', 1.35, { dur: 1.1, vel: 20, pitch: 6 });
  STAMP(2.55, 114); WHIP(4.6, 0.6);

  // slide - the vendor deck, then the question nobody asks
  LAND(T.slide + 0.45, 56); POP(T.slide + 0.85, 42, -0.3); POP(T.slide + 1.05, 42, 0.3);
  LAND(T.slide + 1.45, 64, 0.4); fx('ding', T.slide + 1.62, { vel: 28 });
  SLAM(T.slide + 2.35, 84, -0.4); SLAM(T.slide + 2.85, 84, 0.2); SLAM(T.slide + 3.35, 84, -0.2);
  WHIP(T.slide + 4.95, -0.6);
  LETTERS(T.slide, 'How many', 51, 6.1, 0.38); LETTERS(T.slide, 'Steps', 52, 6.45, 0.3);
  POP(T.slide + 7.5, 50, 0.4); POP(T.slide + 8.4, 44, -0.3); WHIP(T.slide + 9.6, 0.6);

  // chain - twenty links, then the one that takes the rest down
  LETTERS(T.chain, 'It', 61, 0.95, 0.22); LETTERS(T.chain, 'Multiplies', 62, 1.2, 0.36);
  S.ticks(Array.from({ length: 20 }, (_, i) => T.chain + 1.95 + i * 0.038), { vel: 32, jitter: 0.2 });
  SUCK(T.chain + 2.9, 0.3, 44); fx('thud', T.chain + 2.9, { vel: 100 }); dr('kick', T.chain + 2.9, 90); dr('snare', T.chain + 2.9, 56);
  fx('roll', T.chain + 3.0, { dur: 0.8, vel: 18, pitch: -6 });
  POP(T.chain + 3.5, 50, 0.4); POP(T.chain + 4.1, 44, -0.3); WHIP(T.chain + 4.6, -0.6);

  // power - the formula builds
  LETTERS(T.power, 'The math', 71, 0.5, 0.4);
  POP(T.power + 1.5, 40, -0.3);
  SLAM(T.power + 2.15, 88, -0.2); SLAM(T.power + 2.75, 76, 0.4); fx('sparkle', T.power + 2.95, { vel: 30 });
  SLAM(T.power + 3.5, 70, -0.4); SLAM(T.power + 4.1, 70, 0.3);
  POP(T.power + 4.9, 48, 0.4); fx('tick', T.power + 5.3, { vel: 40 }); fx('tick', T.power + 5.65, { vel: 40 });
  POP(T.power + 6.1, 44, -0.3); IN(T.power + 7.95, 60);

  // curve - the axis and the curve draw, four markers land
  LETTERS(T.curve, 'The curve', 81, 0.5, 0.4);
  fx('whoosh', T.curve + 1.2, { dur: 0.5, vel: 30, pan: -0.3 }); POP(T.curve + 1.5, 36, -0.4); POP(T.curve + 1.6, 36, 0.4);
  fx('roll', T.curve + 1.9, { dur: 2.7, vel: 20, pitch: -5 });
  [2.35, 2.75, 3.45, 4.55].forEach((a, i) => { SLAM(T.curve + a, i === 2 ? 96 : 72, -0.4 + i * 0.3); fx('tick', T.curve + a + 0.22, { vel: 40 }); });
  POP(T.curve + 5.4, 44, -0.3); POP(T.curve + 6.0, 50, 0.4);
  S.ticks([0, 1, 2, 3, 4, 5].map(i => T.curve + 6.35 + i * 0.16), { vel: 34, jitter: 0.25 });
  WHIP(T.curve + 8.6, -0.6);

  // study - nine models, ten thousand runs, a geometric law
  LETTERS(T.study, 'Nine models', 91, 0.5, 0.4);
  fx('roll', T.study + 1.2, { dur: 1.8, vel: 22, pitch: 6 }); fx('ding', T.study + 3.0, { vel: 30 });
  STAMP(T.study + 3.7, 108);
  POP(T.study + 4.35, 50, 0.4); POP(T.study + 4.85, 44, -0.4);
  SLAM(T.study + 5.75, 84, -0.3); SLAM(T.study + 6.35, 84, 0.3); WHIP(T.study + 7.6, 0.6);

  // back - solve backwards, then the governance gap
  LETTERS(T.back, 'To clear 90%', 101, 0.5, 0.4);
  fx('roll', T.back + 1.6, { dur: 1.0, vel: 22, pitch: 7 }); fx('chime', T.back + 2.62, { vel: 34 });
  SLAM(T.back + 2.7, 80, -0.3); POP(T.back + 3.2, 50, 0.4); POP(T.back + 4.1, 44, -0.3);
  WHIP(T.back + 5.0, 0);
  LETTERS(T.back, 'The gap', 102, 6.1, 0.3);
  SLAM(T.back + 6.75, 76, -0.3); fx('revswell', T.back + 6.95, { dur: 0.65, vel: 38 });
  SLAM(T.back + 8.0, 76, 0.3); fx('revswell', T.back + 8.2, { dur: 0.55, vel: 30 });
  POP(T.back + 9.0, 44, -0.3); IN(T.back + 9.95, 60);

  // close - count the steps, drop the checkpoint
  LETTERS(T.close, 'Count', 111, 0.75, 0.24); LETTERS(T.close, 'The steps', 112, 1.0, 0.36);
  S.ticks(Array.from({ length: 10 }, (_, i) => T.close + 1.8 + i * 0.055), { vel: 32, jitter: 0.2 });
  SUCK(T.close + 3.3, 0.3, 44); SLAM(T.close + 3.3, 98, 0); dr('woodblock', T.close + 3.32, 36);
  STAMP(T.close + 4.15, 106);
  POP(T.close + 4.8, 50, 0.4); fx('sparkle', T.close + 4.95, { vel: 30 }); POP(T.close + 5.5, 44, -0.3);
  IN(T.close + 6.9, 60);

  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 });
  fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
