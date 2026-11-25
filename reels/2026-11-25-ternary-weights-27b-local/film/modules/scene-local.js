const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in on the laptop, holds while the cable is pulled, whips out right
const KEYS = [
  { t: 0, cx: 540, cy: -240, z: 1.07, r: -3 },
  { t: 0.45, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.55, from: 0.5, cx: 540, cy: 914, z: 1.04, r: 1 },
  { t: 6.0, from: 5.55, cx: 1720, cy: 914, z: 1.06, r: 4, ease: kit.ei },
];
kit.scene('local', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:300px;width:700px;gap:10px;align-items:flex-start">' +
        '<span class="sub lo-k">Nine times less memory</span>' +
        '<span class="line lo-h" style="font-size:96px">On your own</span>' +
        '<span class="line pink lo-h2" style="font-size:96px">hardware</span>' +
      '</div>' +
      UI.img(kit, 'laptop.webp', 'lo-lp', 'left:250px;top:640px;width:520px') +
      '<svg class="art" viewBox="0 0 1080 2600"><path class="twwire lo-w" d="M690 1020 Q750 1110 800 1050"/></svg>' +
      UI.img(kit, 'plug.webp', 'lo-pg', 'left:760px;top:1010px;width:200px') +
      '<div class="words" style="left:140px;top:1240px;width:760px;gap:14px;align-items:flex-start">' +
        '<span class="node lo-n" style="font-size:36px">Code never leaves the building</span>' +
        '<span class="tag lo-tg">Open weight, Apache 2.0</span>' +
      '</div>',
      2600, '', 'window', UI.ghost('Local', -50, 1520, 450));
    const q = this.v.q;
    this.k = q('.lo-k').style; this.h = q('.lo-h'); this.h2 = q('.lo-h2');
    this.lp = q('.lo-lp').style; this.pg = q('.lo-pg').style;
    this.w = q('.lo-w'); this.wd = UI.draw(this.w);
    this.n = q('.lo-n').style; this.tg = q('.lo-tg').style;
    this.hl = UI.letters(this.h, 71, 0.5, 0.3);
    this.hl2 = UI.letters(this.h2, 72, 0.78, 0.34);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.hl, t); UI.reveal(this.hl2, t);
    UI.pop(this.lp, t, 1.5, -4, 240);
    this.wd(eo(seg(t, 2.2, 2.6)));
    UI.pop(this.pg, t, 2.5, 8, 160);
    // the plug is pulled clear and the cable goes slack
    const pull = eo(seg(t, 3.0, 3.6));
    this.pg.transform = (this.pg.transform || '') + ' translate(' + (pull * 90).toFixed(1) + 'px,' + (pull * 50).toFixed(1) + 'px)';
    this.w.setAttribute('d', 'M690 1020 Q' + (750 + pull * 30) + ' ' + (1110 + pull * 80) + ' ' + (800 + pull * 90) + ' ' + (1050 + pull * 60));
    UI.slam(this.n, t, 4.0, 0.22, -1, 1.5);
    UI.pop(this.tg, t, 4.75, -1, 60);
    UI.punch(this.v.roll, t, [3.0, 4.0], 0.045);
  },
});
