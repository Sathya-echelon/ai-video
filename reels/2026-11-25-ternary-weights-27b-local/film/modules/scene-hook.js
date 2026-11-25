const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is already mid-action: the two rows are on the wall, the second one still landing
const KEYS = [
  { t: 0, cx: 540, cy: 600, z: 1.12, r: -2 },
  { t: 0.6, from: 0.1, cx: 540, cy: 760, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.65, cx: 540, cy: 772, z: 1.03, r: 1 },
  { t: 5.0, from: 4.6, cx: 1620, cy: 772, z: 1.06, r: 5, ease: kit.ei },
];
kit.scene('hook', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:330px;width:800px;align-items:flex-start"><span class="sub hk-k">One open coding model</span></div>' +
      '<div class="twrow hk-r1" style="left:140px;top:420px;width:800px;height:150px"><b>Model file</b><i class="pink twmono">5.9 GB</i></div>' +
      '<div class="twrow hk-r2" style="left:140px;top:600px;width:800px;height:150px"><b>Parameters</b><i class="bluet twmono">27 B</i></div>' +
      '<div class="words" style="left:0;top:830px;width:1080px;align-items:center"><span class="stamp hk-s" style="position:relative;font-size:82px;transform-origin:50% 50%">Both are real</span></div>' +
      UI.anim(kit, 'floppy', 'hk-fl', 'left:350px;top:1020px', 400),
      2600, '', 'window', UI.ghost('Bits', -50, 1180, 480));
    const q = this.v.q;
    this.k = q('.hk-k').style; this.r1 = q('.hk-r1').style; this.r2 = q('.hk-r2').style;
    this.s = q('.hk-s').style; this.fl = q('.hk-fl').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.fl, t);
    this.k.opacity = eo(seg(t, -0.4, -0.05));
    // row one is already pinned at frame 0; row two lands just after
    this.r1.opacity = 1;
    this.r1.transform = 'rotate(' + (-0.5 + 0.25 * Math.sin(t * 0.8)).toFixed(3) + 'deg)';
    UI.slam(this.r2, t, -0.35, 0.26, 0.8, 1.35);
    UI.pop(this.fl, t, 0.75, -6, 260);
    UI.slam(this.s, t, 2.65, 0.24, -4, 1.75);
    UI.punch(this.v.roll, t, [2.65], 0.05);
  },
});
