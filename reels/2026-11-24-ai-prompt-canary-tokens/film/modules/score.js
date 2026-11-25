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
  const SLOT = t => { fx('pop', t, { vel: 62 }); dr('woodblock', t + 0.02, 34); fx('thud', t + 0.05, { vel: 46 }); };
  const IN = (t, v) => fx('whoosh', t - 0.35, { dur: 0.35, vel: v || 56 });
  const LETTERS = (at, txt, seed, t0, span) => { const r = kit.rng(seed); const ts = []; for (const c of txt) { const x = at + t0 + r() * span; if (c !== ' ') ts.push(x); } S.ticks(ts, { vel: 26, jitter: 0.3 }); };

  // hook - the key is typed into the prompt, then stamped fake
  S.ticks(Array.from({ length: 30 }, (_, i) => -0.85 + i / 26).filter(x => x > 0), { vel: 30, jitter: 0.2 });
  POP(0.35, 50, -0.4); STAMP(2.55, 114); POP(3.35, 44, -0.3); WHIP(4.6, 0.6);

  // toggle - the privacy page, then the settings switch
  LETTERS(T.toggle, 'Read the page', 71, 0.55, 0.42);
  LAND(T.toggle + 0.75, 58); POP(T.toggle + 1.5, 48, 0.4);
  fx('roll', T.toggle + 2.05, { dur: 0.45, vel: 22, pitch: 5 });
  IN(T.toggle + 4.55); LAND(T.toggle + 4.55, 52);
  SLAM(T.toggle + 4.78, 62); SLAM(T.toggle + 4.98, 62);
  fx('click', T.toggle + 5.42, { vel: 92 }); dr('cowbell', T.toggle + 5.44, 22); fx('ding', T.toggle + 5.7, { vel: 30 });
  fx('whoosh', T.toggle + 6.0, { dur: 0.5, vel: 34 }); fx('sparkle', T.toggle + 6.5, { vel: 28 });
  POP(T.toggle + 6.2, 46, 0.5); STAMP(T.toggle + 7.05, 110); WHIP(T.toggle + 8.6, -0.6);

  // tested - the map wakes up under the loupe
  LETTERS(T.tested, 'They tested it', 73, 0.42, 0.38);
  LAND(T.tested + 0.6, 60);
  S.ticks(Array.from({ length: 10 }, (_, i) => T.tested + 1.35 + i * 0.13), { vel: 34, jitter: 0.2 });
  Array.from({ length: 10 }, (_, i) => POP(T.tested + 1.35 + i * 0.13, 34, -0.5 + i * 0.1));
  POP(T.tested + 2.5, 50, 0.4); SLAM(T.tested + 3.25, 70, -0.3); WHIP(T.tested + 4.6, 0.6);

  // decoy - one prompt splits into two unique decoys
  LETTERS(T.decoy, 'A unique decoy', 77, 0.5, 0.4);
  SLAM(T.decoy + 1.5, 76);
  fx('whoosh', T.decoy + 2.0, { dur: 0.45, vel: 36, pan: -0.5 }); fx('whoosh', T.decoy + 2.2, { dur: 0.45, vel: 36, pan: 0.5 });
  SLOT(T.decoy + 2.35); SLOT(T.decoy + 2.6);
  POP(T.decoy + 4.4, 54); fx('sparkle', T.decoy + 4.55, { vel: 34 });
  POP(T.decoy + 5.9, 42, -0.3); WHIP(T.decoy + 7.6, -0.6);

  // trap - the empty account, and the eye that opens over it
  LETTERS(T.trap, 'Any use is proof', 79, 0.45, 0.4);
  LAND(T.trap + 1.1, 64); POP(T.trap + 1.5, 42, 0.4);
  fx('revswell', T.trap + 2.2, { dur: 0.7, vel: 40 }); fx('ding', T.trap + 2.85, { vel: 26 });
  fx('whoosh', T.trap + 3.5, { dur: 0.7, vel: 30 });
  STAMP(T.trap + 5.45, 118); WHIP(T.trap + 7.6, 0);

  // scale - two million, five months, three providers
  fx('roll', T.scale + 0.3, { dur: 3.0, vel: 20, pitch: 6 });
  LAND(T.scale + 0.9, 56, 0.4);
  S.ticks([0, 1, 2, 3, 4].map(i => T.scale + 1.0 + i * 0.66), { vel: 38 });
  WHIP(T.scale + 4.85, 0); LETTERS(T.scale, 'Three providers', 83, 5.75, 0.4);
  [0, 1, 2].forEach(i => { const a = T.scale + 6.5 + i * 0.62; SLAM(a, 80, -0.5 + i * 0.5); fx('tick', a + 0.3, { vel: 44 }); });
  POP(T.scale + 8.95, 44, -0.3); WHIP(T.scale + 9.6, 0.6);

  // verdict - the badge is stamped, then two thirds of it floods
  LETTERS(T.verdict, 'A claim,', 87, 0.5, 0.26); LETTERS(T.verdict, 'not a control', 88, 0.78, 0.34);
  SUCK(T.verdict + 2.68, 0.55, 46); STAMP(T.verdict + 2.68, 120);
  fx('roll', T.verdict + 4.6, { dur: 0.9, vel: 26, pitch: -4 }); fx('revswell', T.verdict + 4.6, { dur: 0.8, vel: 34 });
  SLAM(T.verdict + 6.45, 92); POP(T.verdict + 7.2, 44, -0.3); POP(T.verdict + 7.55, 44, 0.3);
  WHIP(T.verdict + 9.6, 0);

  // close - the key struck out, the canary left on screen
  LETTERS(T.close, 'Send nothing', 91, 0.45, 0.3); LETTERS(T.close, 'you can’t burn', 92, 0.72, 0.34);
  LAND(T.close + 1.05, 60, -0.4);
  fx('whoosh', T.close + 1.75, { dur: 0.5, vel: 46, pan: 0.5 });
  fx('whoosh', T.close + 2.42, { dur: 0.4, vel: 52 }); fx('thud', T.close + 2.9, { vel: 74 });
  SLAM(T.close + 3.5, 78, -0.3); POP(T.close + 4.35, 50, 0.4); fx('sparkle', T.close + 4.5, { vel: 32 });
  IN(T.close + 6.4, 60);

  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 });
  fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
