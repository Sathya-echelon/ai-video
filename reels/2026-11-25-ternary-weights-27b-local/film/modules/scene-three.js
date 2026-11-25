const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left onto the crumpling float, lands on the three values, whips out left
const KEYS = [
  { t: 0, cx: -500, cy: 740, z: 1.05, r: 4 },
  { t: 0.42, from: 0, cx: 540, cy: 740, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.48, cx: 540, cy: 754, z: 1.04, r: -1 },
  { t: 5.0, from: 4.6, cx: -640, cy: 754, z: 1.06, r: -5, ease: kit.ei },
];
const VALS = [['-1', 'main'], ['0', 'second'], ['+1', 'accent']];
kit.scene('three', {
  init(kit) {
    const box = VALS.map((v, i) => '<div class="twpanel th-b" style="left:' + (140 + i * 280) + 'px;top:720px;width:240px;height:240px;display:flex;align-items:center;justify-content:center;background:var(--' + v[1] + ')">' +
      '<span class="num th-v" style="font-size:' + (i === 1 ? 150 : 120) + 'px;color:color-mix(in srgb, var(--ground) 14%, #fff)">' + v[0] + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:330px;width:800px;gap:10px;align-items:flex-start">' +
        '<span class="sub th-k">It stores three values</span>' +
        '<span class="line th-h" style="font-size:124px">Sign only</span>' +
      '</div>' +
      UI.anim(kit, 'crumple', 'th-cr', 'left:560px;top:470px', 400) + box +
      '<div class="words" style="left:140px;top:1010px;width:800px;align-items:flex-start"><span class="tag th-tg">Minus one, zero, plus one</span></div>',
      2600, '', 'soft', UI.ghost('Three', -60, 1190, 430));
    const q = this.v.q;
    this.k = q('.th-k').style; this.h = q('.th-h'); this.cr = q('.th-cr').style; this.tg = q('.th-tg').style;
    this.b = [...kit.stage.querySelectorAll('.th-b')].map(e => e.style);
    this.hl = UI.letters(this.h, 47, 0.45, 0.38);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.cr, t);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.hl, t);
    UI.pop(this.cr, t, 0.55, 5, 180);
    this.b.forEach((st, i) => UI.slam(st, t, 1.55 + i * 0.4, 0.24, i === 1 ? 1.4 : -1.4, 1.6));
    UI.pop(this.tg, t, 3.5, -1, 70);
    UI.punch(this.v.roll, t, [1.55, 1.95, 2.35], 0.05);
  },
});
