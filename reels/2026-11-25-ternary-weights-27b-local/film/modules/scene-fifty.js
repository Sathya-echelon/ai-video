const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above on the counter, holds, whips out right
const KEYS = [
  { t: 0, cx: 540, cy: -260, z: 1.08, r: 3 },
  { t: 0.45, from: 0, cx: 540, cy: 760, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.1, from: 0.5, cx: 540, cy: 774, z: 1.04, r: 0 },
  { t: 5.5, from: 5.1, cx: 1700, cy: 774, z: 1.06, r: 4, ease: kit.ei },
];
const SX = [150, 430, 710];
kit.scene('fifty', {
  init(kit) {
    const svs = SX.map((x, i) => '<div class="fv-sv" style="position:absolute;left:' + x + 'px;top:1010px;width:220px;height:227px">' +
      UI.img(kit, 'server.webp', '', 'left:0;top:0;width:220px') + '</div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:330px;width:800px;gap:10px;align-items:flex-start">' +
        '<span class="sub fv-k">27 billion of those</span>' +
        '<span class="num pink fv-n" style="font-size:210px">54 GB</span>' +
      '</div>' +
      '<div class="words" style="left:140px;top:790px;width:800px;gap:16px;align-items:flex-start">' +
        '<span class="tag fv-t1">Before any of your own code</span>' +
        '<span class="node fv-nd">Full precision footprint</span>' +
      '</div>' + svs,
      2600, '', 'window', UI.ghost('Fifty four', -80, 1210, 330));
    const q = this.v.q;
    this.k = q('.fv-k').style; this.n = q('.fv-n'); this.t1 = q('.fv-t1').style; this.nd = q('.fv-nd').style;
    this.sv = [...kit.stage.querySelectorAll('.fv-sv')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.5));
    // the counter starts well up, so a paused frame never shows zero
    this.n.textContent = Math.round(lerp(31, 54, eo(seg(t, 0.35, 2.5)))) + ' GB';
    this.sv.forEach((st, i) => {
      const a = 0.85 + i * 0.3, p = seg(t, a, a + 0.3);
      st.opacity = p > 0 ? 1 : 0;
      st.transform = 'translateY(' + ((1 - eob(p, 1.4)) * 230).toFixed(1) + 'px) rotate(' + (i === 1 ? 1.5 : -1.5) + 'deg)';
    });
    UI.pop(this.t1, t, 3.3, -1, -60);
    UI.slam(this.nd, t, 4.1, 0.22, 1, 1.5);
    UI.punch(this.v.roll, t, [0.85, 1.15, 1.45, 4.1], 0.042);
  },
});
