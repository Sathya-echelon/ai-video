const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above on the fake key, the pen strikes it out, then pulls back for the brand cut
const KEYS = [
  { t: 0, cx: 540, cy: -260, z: 1.12, r: 3 },
  { t: 0.42, from: 0, cx: 540, cy: 1040, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.5, cx: 540, cy: 1062, z: 1.05, r: -1 },
  { t: 6.4, from: 4.6, cx: 540, cy: 1020, z: 0.98, r: 0 },
  { t: 7.0, from: 6.4, cx: 540, cy: 1020, z: 1.22, r: 2, ease: kit.ei },
];
kit.scene('close', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:104px;top:424px;width:880px;gap:6px">' +
        '<span class="sub cl-k">A policy is a promise</span>' +
        '<span class="line cl-h1" style="font-size:102px">Send nothing</span>' +
        '<span class="line cl-h2" style="font-size:102px">you can’t burn</span>' +
      '</div>' +
      UI.img(kit, 'key.webp', 'cl-key', 'left:120px;top:900px;width:260px') +
      UI.img(kit, 'redpen.webp', 'cl-pen', 'left:400px;top:960px;width:400px') +
      '<svg class="art cl-sv" viewBox="0 0 1080 2600" preserveAspectRatio="none">' +
        '<path class="pk-line cl-x" style="stroke-width:24" d="M96 1298 L408 962"/>' +
      '</svg>' +
      '<div class="words" style="left:100px;top:1420px;width:800px"><span class="tape pk cl-tp" style="position:relative;font-size:56px;transform-origin:0 50%">A canary is a receipt</span></div>' +
      UI.anim(kit, 'bird', 'cl-bd', 'left:740px;top:1540px', 280),
      2600, '', 'soft', UI.ghost('Burn', -50, 1660, 520));
    const q = this.v.q;
    this.k = q('.cl-k').style; this.h1 = q('.cl-h1'); this.h2 = q('.cl-h2');
    this.key = q('.cl-key').style; this.pen = q('.cl-pen').style;
    this.tp = q('.cl-tp').style; this.bd = q('.cl-bd').style;
    this.x = UI.draw(q('.cl-x'));
    this.l1 = UI.letters(this.h1, 91, 0.45, 0.3);
    this.l2 = UI.letters(this.h2, 92, 0.72, 0.34);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.l1, t); UI.reveal(this.l2, t);
    UI.pop(this.key, t, 1.05, -6, 240);
    // the pen swings in and strikes the key through
    const sw = seg(t, 1.75, 2.3);
    this.pen.opacity = sw > 0 ? 1 : 0;
    this.pen.transform = 'translate(' + lerp(300, 0, eob(sw, 1.3)).toFixed(1) + 'px,' + lerp(-180, 0, eo(sw)).toFixed(1) + 'px) rotate(' + lerp(26, 4 + Math.sin(t * 1.6) * 1.2, eo(sw)).toFixed(2) + 'deg)';
    this.x(eo(seg(t, 2.42, 2.95)));
    UI.slam(this.tp, t, 3.5, 0.24, -2, 1.6);
    UI.frame(this.bd, t);
    UI.pop(this.bd, t, 4.35, 4, 240);
    UI.punch(this.v.roll, t, [2.42, 3.5, 4.35], 0.05);
  },
});
