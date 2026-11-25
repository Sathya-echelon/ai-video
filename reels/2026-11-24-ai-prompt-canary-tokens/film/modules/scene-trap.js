const { seg, eo, ei, eio, eob, lerp } = kit;
// enters from the right onto the watched account, holds, then drops downward
const KEYS = [
  { t: 0, cx: 1700, cy: 1040, z: 1.08, r: -4 },
  { t: 0.42, from: 0, cx: 540, cy: 1040, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.2, from: 0.5, cx: 540, cy: 1062, z: 1.04, r: 1 },
  { t: 6.4, from: 5.2, cx: 540, cy: 1050, z: 1.03, r: 0 },
  { t: 8.0, from: 7.5, cx: 540, cy: 2500, z: 1.05, r: 3, ease: kit.ei },
];
kit.scene('trap', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:104px;top:404px;width:880px;gap:16px">' +
        '<span class="sub tp-k">Nobody legitimate touches it</span>' +
        '<span class="line tp-h" style="font-size:86px">Any use is proof</span>' +
      '</div>' +
      '<svg class="art tp-sv" viewBox="0 0 1080 2600" preserveAspectRatio="none">' +
        '<path class="cvwire tp-w" d="M540 648 C540 760 470 800 500 960"/>' +
      '</svg>' +
      UI.img(kit, 'eye.webp', 'tp-eye', 'left:252px;top:952px;width:560px') +
      UI.img(kit, 'vault.webp', 'tp-vl', 'left:392px;top:1332px;width:300px') +
      '<div class="words" style="left:0;top:716px;width:1080px;align-items:center"><span class="stamp tp-s" style="position:relative;font-size:66px;transform-origin:50% 50%">Leaked - and by whom</span></div>' +
      '<div class="words" style="left:120px;top:1420px;width:320px"><span class="node tp-n" style="font-size:36px">Empty account</span></div>',
      2600, '', 'dark', UI.ghost('Watched', -80, 1500, 400));
    const q = this.v.q;
    this.k = q('.tp-k').style; this.h = q('.tp-h');
    this.eye = q('.tp-eye').style; this.vl = q('.tp-vl').style;
    this.s = q('.tp-s').style; this.n = q('.tp-n').style;
    this.w = UI.draw(q('.tp-w'));
    this.hl = UI.letters(this.h, 79, 0.45, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.18, 0.48));
    UI.reveal(this.hl, t);
    UI.pop(this.vl, t, 1.1, -3, 240);
    UI.pop(this.n, t, 1.5, 1, 90);
    // the eye opens: it scales up from a slit and keeps watching
    const o = seg(t, 2.2, 2.9);
    this.eye.opacity = o > 0 ? 1 : 0;
    this.eye.transform = 'scaleY(' + (0.08 + 0.92 * eob(o, 1.4)).toFixed(3) + ') scale(' + (1 + 0.02 * Math.sin(t * 1.7)).toFixed(3) + ')';
    this.eye.transformOrigin = '50% 70%';
    this.w(eo(seg(t, 3.5, 4.2)));
    UI.slam(this.s, t, 5.45, 0.26, -3, 1.8);
    UI.punch(this.v.roll, t, [2.2, 5.45], 0.05);
  },
});
