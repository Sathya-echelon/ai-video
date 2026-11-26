const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is already mid-action: the headline is up and the calculator is half typed
const KEYS = [
  { t: 0, cx: 540, cy: 920, z: 1.12, r: -3 },
  { t: 0.55, from: 0.1, cx: 540, cy: 930, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.6, cx: 540, cy: 945, z: 1.03, r: 1 },
  { t: 5.0, from: 4.6, cx: 1620, cy: 945, z: 1.06, r: 5, ease: kit.ei },
];
const EXPR = '0.95 ^ 20 =';
kit.scene('hook', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:130px;top:376px;width:860px;gap:14px">' +
        '<span class="sub hk-k">Your agent: 95% accurate</span>' +
        '<span class="line hk-h" style="font-size:170px">Twenty</span>' +
        '<span class="line hk-h2" style="font-size:170px">Steps</span>' +
      '</div>' +
      '<div class="rl-cal hk-cd" style="left:130px;top:800px;width:780px;height:270px">' +
        '<div class="hd">End to end</div>' +
        '<div class="ex hk-ex"></div>' +
        '<div class="rs hk-rs"></div>' +
      '</div>' +
      '<div class="words" style="left:150px;top:1170px;width:520px">' +
        '<span class="stamp hk-s" style="position:relative;font-size:104px;transform-origin:50% 50%">36%</span>' +
      '</div>' +
      UI.anim(kit, 'typist', 'hk-ty', 'left:600px;top:1130px', 400),
      2500, '', 'window', UI.ghost('Agent', -60, 1200, 470));
    const q = this.v.q;
    this.k = q('.hk-k').style; this.cd = q('.hk-cd').style;
    this.ex = q('.hk-ex'); this.rs = q('.hk-rs'); this.s = q('.hk-s').style;
    this.ty = q('.hk-ty').style;
    this.h1 = UI.letters(q('.hk-h'), 41, -0.75, 0.3);
    this.h2 = UI.letters(q('.hk-h2'), 42, -0.5, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.ty, t);
    this.k.opacity = 1;
    UI.reveal(this.h1, t); UI.reveal(this.h2, t);
    this.cd.transform = 'rotate(' + (-0.6 + 0.3 * Math.sin(t * 0.9)).toFixed(3) + 'deg)';
    UI.type(this.ex, EXPR, t, -0.55, 14);
    // the result lands, then settles on the rounded figure
    const p = seg(t, 1.35, 2.45);
    this.rs.textContent = t < 1.35 ? '' : (t < 2.5 ? (0.3585 * eo(p)).toFixed(4) : '0.3585');
    this.rs.style.opacity = t < 1.35 ? 0 : 1;
    UI.slam(this.s, t, 2.55, 0.24, -4, 1.75);
    UI.punch(this.v.roll, t, [2.55], 0.05);
  },
});
