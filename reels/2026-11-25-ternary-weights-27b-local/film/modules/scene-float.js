const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left, settles on the one weight, pushes slowly, whips out left
const KEYS = [
  { t: 0, cx: -520, cy: 740, z: 1.06, r: -4 },
  { t: 0.45, from: 0, cx: 540, cy: 740, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.1, from: 0.5, cx: 540, cy: 752, z: 1.04, r: 0 },
  { t: 5.5, from: 5.1, cx: -620, cy: 752, z: 1.06, r: -5, ease: kit.ei },
];
const FLOAT = '0.0372619628906250';
kit.scene('float', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:330px;width:800px;gap:12px;align-items:flex-start">' +
        '<span class="sub fl-k">Every weight, stored as</span>' +
        '<span class="line fl-h" style="font-size:118px">Sixteen bits</span>' +
      '</div>' +
      '<div class="twpanel fl-p" style="left:140px;top:640px;width:800px;height:200px;display:flex;align-items:center;padding:0 36px">' +
        '<span class="twmono fl-n" style="font-size:56px"></span>' +
        '<span class="fl-cr" style="display:inline-block;width:6px;height:56px;background:var(--second);margin-left:6px"></span>' +
      '</div>' +
      '<div class="words" style="left:140px;top:900px;width:800px;align-items:flex-start"><span class="node fl-nd">One weight, full precision</span></div>' +
      UI.img(kit, 'magnifier.webp', 'fl-mg', 'left:700px;top:560px;width:230px'),
      2600, '', 'soft', UI.ghost('Precision', -70, 1200, 380));
    const q = this.v.q;
    this.k = q('.fl-k').style; this.h = q('.fl-h'); this.p = q('.fl-p').style;
    this.n = q('.fl-n'); this.cr = q('.fl-cr').style; this.nd = q('.fl-nd').style;
    this.mg = q('.fl-mg').style;
    this.hl = UI.letters(this.h, 41, 0.5, 0.42);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.hl, t);
    const p = seg(t, 1.0, 1.25);
    this.p.opacity = p > 0 ? 1 : 0;
    this.p.transform = 'scale(' + (0.9 + 0.1 * eob(p, 1.5)).toFixed(3) + ') rotate(' + (-0.4 + 0.2 * Math.sin(t * 0.9)).toFixed(3) + 'deg)';
    const done = UI.type(this.n, FLOAT, t, 1.3, 14);
    this.cr.opacity = t < 1.3 ? 0 : (done && t > 3.0 ? 0 : (Math.floor(t / 0.5) % 2 ? 0.2 : 1));
    UI.pop(this.mg, t, 3.15, -7, 200);
    UI.slam(this.nd, t, 3.9, 0.22, -1.2, 1.5);
    UI.punch(this.v.roll, t, [1.0, 3.9], 0.045);
  },
});
