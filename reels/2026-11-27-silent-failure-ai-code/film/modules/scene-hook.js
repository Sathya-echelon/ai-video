const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 IS the hook: both bars already read, the camera is still pulling out of the push-in
const KEYS = [
  { t: 0, cx: 540, cy: 876, z: 1.18, r: -3 },
  { t: 0.62, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.72, cx: 540, cy: 906, z: 1.03, r: 1 },
  { t: 5.0, from: 4.6, cx: 1620, cy: 906, z: 1.06, r: 5, ease: kit.ei },
];
const TW = 692;
kit.scene('hook', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:150px;top:392px;width:760px"><span class="sub hk-k">One benchmark run</span></div>' +
      '<div class="words" style="left:150px;top:460px;width:760px"><span class="sub hk-a">Code that ran</span></div>' +
      '<div class="words" style="left:150px;top:506px;width:760px"><span class="num bluet hk-n1" style="font-size:152px">100%</span></div>' +
      '<div class="sftrk hk-t1" style="left:150px;top:674px;width:700px"><div class="sffill hk-f1" style="width:0px"></div></div>' +
      '<div class="words" style="left:150px;top:794px;width:760px"><span class="sub hk-b">Code that was right</span></div>' +
      '<div class="words" style="left:150px;top:840px;width:760px"><span class="num pink hk-n2" style="font-size:152px">31%</span></div>' +
      '<div class="sftrk hk-t2" style="left:150px;top:1008px;width:700px"><div class="sffill pk hk-f2" style="width:0px"></div></div>' +
      '<div class="words" style="left:150px;top:1116px;width:700px"><span class="tag hk-tg">It stopped here</span></div>' +
      UI.anim(kit, 'gauge', 'hk-g', 'left:700px;top:1192px', 250) +
      '<div class="words" style="left:150px;top:1254px;width:700px"><span class="stamp hk-s" style="position:relative;font-size:66px;transform-origin:0 50%">It ran. It’s wrong.</span></div>',
      2500, '', 'window', UI.ghost('Wrong', -70, 1230, 470));
    const q = this.v.q;
    this.k = q('.hk-k').style; this.a = q('.hk-a').style; this.b = q('.hk-b').style;
    this.f1 = q('.hk-f1').style; this.f2 = q('.hk-f2').style;
    this.n1 = q('.hk-n1'); this.n2 = q('.hk-n2');
    this.tg = q('.hk-tg').style; this.s = q('.hk-s').style; this.g = q('.hk-g').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.g, t);
    this.k.opacity = 1; this.a.opacity = 1; this.b.opacity = 1;
    // both bars are already at their value at frame 0; the pink one keeps straining at its stop
    this.n1.textContent = '100%'; this.n2.textContent = '31%';
    this.f1.width = TW.toFixed(1) + 'px';
    const strain = Math.max(0, 1 - t / 2.2) * 5 * Math.sin(t * 17);
    this.f2.width = (TW * 0.31 + strain).toFixed(1) + 'px';
    this.n2.style.transform = 'translateX(' + (strain * 0.35).toFixed(2) + 'px)';
    UI.pop(this.tg, t, 1.45, -1, 70);
    UI.pop(this.g, t, 0.8, -4, 240);
    UI.slam(this.s, t, 2.72, 0.24, -3, 1.7);
    UI.punch(this.v.roll, t, [2.72], 0.05);
  },
});
