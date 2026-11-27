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

  // hook - both bars already read at frame 0; the pink one strains, then the stamp lands
  fx('revswell', 0, { dur: 0.6, vel: 34 });
  fx('roll', 0.05, { dur: 0.7, vel: 20, pitch: -3 });
  POP(0.8, 48, 0.4); POP(1.45, 44, -0.3);
  STAMP(2.72, 116); WHIP(4.6, 0.6);

  // ship - the terminal types itself clean
  LETTERS(T.ship, 'They just run it', 41, 0.5, 0.34);
  LAND(T.ship + 0.72, 58); POP(T.ship + 0.6, 44, 0.4);
  [0.95, 1.55, 2.05, 2.55, 3.25, 3.65, 4.25].forEach((a, i) => {
    S.ticks(Array.from({ length: 7 }, (_, j) => T.ship + a + j * 0.055), { vel: 24, jitter: 0.25 });
    if (i >= 4) fx('tick', T.ship + a + 0.42, { vel: 40 });
  });
  fx('ding', T.ship + 3.3, { vel: 30 }); fx('sparkle', T.ship + 4.6, { vel: 26 });
  SLAM(T.ship + 5.1, 86); POP(T.ship + 5.65, 44, -0.3); WHIP(T.ship + 6.6, 0);

  // paper - the paper drops in, the headline turns over
  IN(T.paper + 0.1, 60); LAND(T.paper + 0.62, 62, 0.4);
  fx('click', T.paper + 0.88, { vel: 70 }); dr('woodblock', T.paper + 0.90, 30);
  LETTERS(T.paper, 'Not a crash', 51, 1.45, 0.3);
  LETTERS(T.paper, 'A clean answer', 52, 2.70, 0.26);
  LETTERS(T.paper, 'to the wrong', 53, 3.02, 0.26);
  LETTERS(T.paper, 'question', 54, 3.32, 0.22);
  POP(T.paper + 3.95, 50, 0.4); POP(T.paper + 4.75, 44, -0.3); WHIP(T.paper + 6.6, -0.6);

  // blind - the split lands row by row, then the eye is struck through
  LETTERS(T.blind, 'What you wrote', 61, 0.55, 0.32);
  POP(T.blind + 1.3, 48, -0.4); POP(T.blind + 1.65, 48, 0.4);
  [0, 1, 2].forEach(i => { SLAM(T.blind + 2.4 + i * 0.3, 70, -0.45); SLAM(T.blind + 2.55 + i * 0.3, 70, 0.45); });
  // the fourth row has no match on the left: it lands alone and pink
  SLAM(T.blind + 3.3, 56, -0.45); STAMP(T.blind + 3.45, 104);
  WHIP(T.blind + 5.4, 0);
  LETTERS(T.blind, 'It cannot see', 62, 6.25, 0.3);
  LETTERS(T.blind, 'the business', 63, 6.6, 0.3);
  POP(T.blind + 6.35, 50, 0.4);
  fx('whoosh', T.blind + 6.95, { dur: 0.55, vel: 48 }); fx('thud', T.blind + 7.5, { vel: 76 }); dr('snare', T.blind + 7.5, 48);
  POP(T.blind + 7.85, 44, -0.3); WHIP(T.blind + 9.1, 0.6);

  // dropped - four rules land, one is crumpled away, OPTIMAL is stamped
  LETTERS(T.dropped, 'Nothing warns you', 71, 0.55, 0.34);
  SLAM(T.dropped + 1.1, 74, -0.4); POP(T.dropped + 1.95, 46, 0.4);
  fx('whoosh', T.dropped + 2.1, { dur: 0.6, vel: 46, pan: 0.5 }); fx('tick', T.dropped + 2.7, { vel: 30 });
  // every check the solver can run comes back clean
  [0, 1, 2, 3].forEach(i => { const a = T.dropped + 2.55 + i * 0.36; SLAM(a, 70, -0.3); fx('ding', a + 0.14, { vel: 24 }); });
  WHIP(T.dropped + 5.45, 0);
  LETTERS(T.dropped, 'Still valid', 72, 6.1, 0.3);
  SUCK(T.dropped + 6.68, 0.5, 46); STAMP(T.dropped + 6.68, 120);
  fx('roll', T.dropped + 7.3, { dur: 0.7, vel: 22, pitch: 5 });
  POP(T.dropped + 8.3, 44, -0.3); WHIP(T.dropped + 9.1, 0);

  // repair - the bar climbs from half a percent to thirty-one
  LETTERS(T.repair, 'Half a percent', 81, 0.5, 0.3);
  LETTERS(T.repair, 'to thirty-one', 82, 0.86, 0.3);
  LAND(T.repair + 1.5, 56); POP(T.repair + 1.75, 46, 0.4); POP(T.repair + 1.9, 34, -0.4);
  fx('revswell', T.repair + 2.3, { dur: 1.0, vel: 38 });
  fx('roll', T.repair + 2.3, { dur: 2.3, vel: 22, pitch: 7 });
  POP(T.repair + 4.3, 36, 0.4); fx('ding', T.repair + 4.6, { vel: 34 }); dr('cowbell', T.repair + 4.62, 24);
  POP(T.repair + 4.9, 44, -0.3); POP(T.repair + 5.3, 44, 0.3); WHIP(T.repair + 6.6, -0.6);

  // silent - the hatched block floods the rest of the bar
  LETTERS(T.silent, 'The rest is', 91, 0.42, 0.26);
  LETTERS(T.silent, 'Silent', 92, 0.78, 0.3);
  LAND(T.silent + 1.15, 54);
  fx('revswell', T.silent + 1.5, { dur: 0.9, vel: 40 }); fx('whoosh', T.silent + 1.5, { dur: 1.0, vel: 30 });
  SLAM(T.silent + 2.6, 90); POP(T.silent + 3.3, 44, -0.3); WHIP(T.silent + 4.6, 0.6);

  // test - one input is pushed, the answer barely moves, the flag drops
  LETTERS(T.test, 'Change one input', 101, 0.55, 0.32);
  [0, 1, 2].forEach(i => SLAM(T.test + 1.2 + i * 0.26, 70, -0.4 + i * 0.4));
  POP(T.test + 1.9, 48, -0.4);
  fx('click', T.test + 2.55, { vel: 96 }); dr('woodblock', T.test + 2.57, 36); fx('tick', T.test + 2.62, { vel: 44 });
  fx('roll', T.test + 3.5, { dur: 0.8, vel: 18, pitch: 2 });
  POP(T.test + 4.4, 44, -0.3); WHIP(T.test + 6.0, 0);
  LETTERS(T.test, 'If it will not', 102, 6.6, 0.26);
  LETTERS(T.test, 'move with you,', 103, 6.92, 0.26);
  LETTERS(T.test, 'it is wrong', 104, 7.26, 0.26);
  SUCK(T.test + 8.5, 0.5, 44); SLAM(T.test + 8.5, 98);
  POP(T.test + 8.8, 44, 0.3); IN(T.test + 9.8, 58);

  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 });
  fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
