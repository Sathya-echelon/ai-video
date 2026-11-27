const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left, holds on the split, tilts down to the eye, whips out right
const KEYS = [
  { t: 0, cx: -680, cy: 960, z: 1.08, r: 5 },
  { t: 0.46, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.3, from: 0.56, cx: 540, cy: 974, z: 1.03, r: 0 },
  { t: 5.95, from: 5.3, cx: 540, cy: 1960, z: 1.0, r: 1 },
  { t: 9.0, from: 6.05, cx: 540, cy: 1974, z: 1.03, r: 0 },
  { t: 9.5, from: 9.0, cx: 1640, cy: 1974, z: 1.06, r: 4, ease: kit.ei },
];
const RULES = ['Depot capacity', 'Minimum order', 'Cold store cap'];
const EXTRA = 'Shift limit 8 h';
const RY = [886, 956, 1026, 1096];
kit.scene('blind', {
  init(kit) {
    const row = (cls, x, y, txt, mod) => '<div class="sfrow ' + mod + ' ' + cls + '" style="left:' + x + 'px;top:' + y + 'px;width:410px;height:60px;font-size:30px">' +
      (txt ? '<span class="tk"></span><span>' + txt + '</span>' : '') + '</div>';
    const left = RULES.map((s, i) => row('bl-la' + i, 90, RY[i], s, '')).join('') +
      '<div class="sfrow bl-la3" style="left:90px;top:' + RY[3] + 'px;width:410px;height:60px;background:transparent;border:4px dashed color-mix(in srgb, var(--main) 70%, var(--ground));box-shadow:none"></div>';
    const right = RULES.map((s, i) => row('bl-ra' + i, 560, RY[i], s, '')).join('') + row('bl-ra3', 560, RY[3], EXTRA, 'pk');
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px;gap:4px">' +
        '<span class="sub bl-k">The solver only checks</span>' +
        '<span class="line bl-h" style="font-size:92px">What you wrote</span>' +
      '</div>' +
      '<div class="sfhd bl-hd1" style="left:90px;top:598px">On paper</div>' +
      '<div class="sfhd bl-hd2" style="left:560px;top:598px">The real business</div>' +
      UI.anim(kit, 'clipboard', 'bl-cb', 'left:126px;top:636px', 200) +
      UI.img(kit, 'containers.webp', 'bl-ct', 'left:592px;top:660px;width:270px') +
      left + right +
      '<div class="words" style="left:90px;top:1690px;width:900px;gap:2px">' +
        '<span class="line bl-h2" style="font-size:96px">It cannot see</span>' +
        '<span class="line pink bl-h3" style="font-size:96px">the business</span>' +
      '</div>' +
      UI.img(kit, 'eye.webp', 'bl-ey', 'left:646px;top:1980px;width:280px') +
      '<svg class="art bl-sv" viewBox="0 0 1080 2900"><path class="pk-line bl-strike" d="M630 2150 L950 1986"/></svg>' +
      '<div class="words" style="left:90px;top:2282px;width:760px"><span class="tag bl-tg">You described it. It never saw it.</span></div>',
      2900, '', 'window', UI.ghost('Blind', -70, 1570, 470));
    const q = this.v.q;
    this.k = q('.bl-k').style; this.h = q('.bl-h');
    this.hd1 = q('.bl-hd1').style; this.hd2 = q('.bl-hd2').style;
    this.cb = q('.bl-cb').style; this.ct = q('.bl-ct').style; this.ey = q('.bl-ey').style;
    this.la = [0, 1, 2, 3].map(i => q('.bl-la' + i).style);
    this.ra = [0, 1, 2, 3].map(i => q('.bl-ra' + i).style);
    this.h2 = q('.bl-h2'); this.h3 = q('.bl-h3'); this.tg = q('.bl-tg').style;
    this.strike = UI.draw(q('.bl-strike'));
    this.hl = UI.letters(this.h, 61, 0.55, 0.32);
    this.l2 = UI.letters(this.h2, 62, 6.25, 0.3);
    this.l3 = UI.letters(this.h3, 63, 6.6, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.cb, t);
    // part A clears before the camera tilts down, so nothing stale hangs at the top of part B
    const fa = 1 - eo(seg(t, 5.3, 5.7));
    this.k.opacity = eo(seg(t, 0.2, 0.5)) * fa;
    UI.reveal(this.hl, t);
    this.h.style.opacity = fa;
    this.hd1.opacity = eo(seg(t, 1.15, 1.4)) * fa;
    this.hd2.opacity = eo(seg(t, 1.15, 1.4)) * fa;
    UI.pop(this.cb, t, 1.3, -3, 220); this.cb.opacity = (+this.cb.opacity || 0) * fa;
    UI.pop(this.ct, t, 1.65, 3, 220); this.ct.opacity = (+this.ct.opacity || 0) * fa;
    // the three written rules land on the left, the four real ones on the right - one has no match
    this.la.forEach((st, i) => { UI.slam(st, t, 2.4 + i * 0.3, 0.2, 0, 1.4); st.opacity = (+st.opacity || 0) * fa; });
    this.ra.forEach((st, i) => { UI.slam(st, t, 2.55 + i * 0.3, 0.2, 0, 1.4); st.opacity = (+st.opacity || 0) * fa; });
    UI.reveal(this.l2, t); UI.reveal(this.l3, t);
    UI.pop(this.ey, t, 6.35, 3, 220);
    this.strike(eo(seg(t, 6.95, 7.5)));
    UI.pop(this.tg, t, 7.85, -1, 70);
    UI.punch(this.v.roll, t, [2.4, 2.7, 3.0, 3.45, 6.95], 0.04);
  },
});
