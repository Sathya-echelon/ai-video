const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the right, slow push on the formula, drops out downward
const KEYS = [
  { t: 0, cx: 1660, cy: 900, z: 1.06, r: 5 },
  { t: 0.42, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 7.6, from: 0.5, cx: 540, cy: 936, z: 1.035, r: -1 },
  { t: 8.0, from: 7.6, cx: 540, cy: 2060, z: 1.05, r: 3, ease: kit.ei },
];
kit.scene('power', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px;gap:14px">' +
        '<span class="sub pw-k">Every step inherits</span>' +
        '<span class="line pw-h" style="font-size:150px">The math</span>' +
      '</div>' +
      '<span class="rl-op pw-eq1" style="left:130px;top:690px;font-size:76px">Success =</span>' +
      '<span class="rl-eq pink pw-r" style="left:620px;top:612px;font-size:200px">R</span>' +
      '<span class="rl-eq bluet pw-n" style="left:762px;top:580px;font-size:112px">N</span>' +
      '<div class="words" style="left:130px;top:912px;width:860px;gap:16px">' +
        '<span class="node pw-l1" style="background:var(--main)">R = per-step reliability</span>' +
        '<span class="node pw-l2" style="background:var(--accent)">N = dependent steps</span>' +
      '</div>' +
      UI.anim(kit, 'gauge', 'pw-ga', 'left:700px;top:1040px', 300) +
      '<div class="words" style="left:130px;top:1200px;width:820px"><span class="tag pw-tg">0.95 to the twentieth</span></div>',
      2500, '', 'soft', UI.ghost('Power', -60, 1180, 470));
    const q = this.v.q;
    this.k = q('.pw-k').style; this.e1 = q('.pw-eq1').style;
    this.r = q('.pw-r').style; this.n = q('.pw-n').style; this.ga = q('.pw-ga').style;
    this.l1 = q('.pw-l1').style; this.l2 = q('.pw-l2').style; this.tg = q('.pw-tg').style;
    this.h1 = UI.letters(q('.pw-h'), 71, 0.5, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.ga, t);
    this.k.opacity = eo(seg(t, 0.12, 0.42));
    UI.reveal(this.h1, t);
    this.e1.opacity = eo(seg(t, 1.5, 1.8));
    UI.slam(this.r, t, 2.15, 0.24, -2, 1.7);
    UI.slam(this.n, t, 2.75, 0.22, 4, 1.9);
    UI.slam(this.l1, t, 3.5, 0.2, -1.2, 1.5);
    UI.slam(this.l2, t, 4.1, 0.2, 1.0, 1.5);
    UI.pop(this.ga, t, 4.9, 5, 230);
    UI.pop(this.tg, t, 6.1, -1, 70);
    UI.punch(this.v.roll, t, [2.15, 2.75, 3.5, 4.1], 0.045);
  },
});
