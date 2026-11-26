const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left onto the vendor slide, then tilts down to the question nobody asks
const KEYS = [
  { t: 0, cx: -560, cy: 900, z: 1.06, r: -5 },
  { t: 0.42, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.9, from: 0.5, cx: 540, cy: 918, z: 1.03, r: 0 },
  { t: 5.5, from: 4.9, cx: 540, cy: 1900, z: 1.0, r: 1 },
  { t: 9.5, from: 5.6, cx: 540, cy: 1930, z: 1.03, r: 0 },
  { t: 10.0, from: 9.5, cx: 1700, cy: 1930, z: 1.06, r: 4, ease: kit.ei },
];
kit.scene('slide', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px"><span class="sub sl-k">How it looks on a slide</span></div>' +
      '<div class="rl-pan sl-pan" style="left:110px;top:446px;width:860px;height:520px">' +
        '<div class="hd">Vendor deck</div>' +
        '<div class="rl-badge"><i class="sl-pc">95%</i><b class="sl-ac">Accurate</b></div>' +
      '</div>' +
      UI.anim(kit, 'dart', 'sl-dt', 'left:730px;top:636px', 272) +
      '<div class="words" style="left:110px;top:1016px;width:900px;gap:16px">' +
        '<span class="tape sl-t1" style="font-size:80px;transform-origin:0 50%">One task</span>' +
        '<span class="tape pk sl-t2" style="font-size:80px;transform-origin:0 50%">One demo</span>' +
        '<span class="tape bl sl-t3" style="font-size:80px;transform-origin:0 50%">One number</span>' +
      '</div>' +
      '<div class="words" style="left:110px;top:1690px;width:900px;gap:14px">' +
        '<span class="sub sl-k2">Nobody asks</span>' +
        '<span class="line sl-h" style="font-size:150px">How many</span>' +
        '<span class="line pink sl-h2" style="font-size:150px">Steps</span>' +
      '</div>' +
      UI.img(kit, 'point.webp', 'sl-pt', 'left:660px;top:2040px;width:340px') +
      '<div class="words" style="left:110px;top:2140px;width:820px"><span class="tag sl-tg">Measured on one step</span></div>',
      2700, '', 'spot', UI.ghost('Slide', -60, 1180, 460));
    const q = this.v.q;
    this.k = q('.sl-k').style; this.pan = q('.sl-pan').style;
    this.pc = q('.sl-pc').style; this.ac = q('.sl-ac').style; this.dt = q('.sl-dt').style;
    this.t1 = q('.sl-t1').style; this.t2 = q('.sl-t2').style; this.t3 = q('.sl-t3').style;
    this.k2 = q('.sl-k2').style; this.pt = q('.sl-pt').style; this.tg = q('.sl-tg').style;
    this.h1 = UI.letters(q('.sl-h'), 51, 6.1, 0.38);
    this.h2 = UI.letters(q('.sl-h2'), 52, 6.45, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.dt, t);
    // part A clears before the camera tilts down, so nothing hangs at the top of frame
    const fade = 1 - eo(seg(t, 4.55, 4.95));
    this.k.opacity = eo(seg(t, 0.15, 0.45)) * fade;
    const pp = seg(t, 0.3, 0.6);
    this.pan.opacity = (pp > 0 ? 1 : 0) * fade;
    this.pan.transform = 'scale(' + (0.86 + 0.14 * eob(pp, 1.5)).toFixed(3) + ') rotate(' + lerp(-1.6, -0.5, eo(pp)).toFixed(2) + 'deg)';
    this.pc.opacity = eo(seg(t, 0.75, 1.0));
    this.ac.opacity = eo(seg(t, 0.95, 1.2));
    UI.pop(this.dt, t, 1.45, 6, 220);
    UI.slam(this.t1, t, 2.35, 0.2, -1.5, 1.5);
    UI.slam(this.t2, t, 2.85, 0.2, 1.2, 1.5);
    UI.slam(this.t3, t, 3.35, 0.2, -1.0, 1.5);
    UI.out(this.dt, t, 4.55, 0.4); UI.out(this.t1, t, 4.55, 0.4); UI.out(this.t2, t, 4.6, 0.4); UI.out(this.t3, t, 4.65, 0.4);
    this.k2.opacity = eo(seg(t, 5.75, 6.05));
    UI.reveal(this.h1, t); UI.reveal(this.h2, t);
    UI.pop(this.pt, t, 7.5, -5, 200);
    UI.pop(this.tg, t, 8.4, -1, 70);
    UI.punch(this.v.roll, t, [2.35, 2.85, 3.35], 0.045);
  },
});
