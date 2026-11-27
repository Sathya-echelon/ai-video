const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the right, the dropped rule is crumpled while the checks all pass, then tilts down
const KEYS = [
  { t: 0, cx: 1640, cy: 960, z: 1.08, r: -5 },
  { t: 0.46, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.1, from: 0.56, cx: 540, cy: 972, z: 1.03, r: -1 },
  { t: 5.75, from: 5.1, cx: 540, cy: 1960, z: 1.0, r: -1 },
  { t: 9.0, from: 5.85, cx: 540, cy: 1976, z: 1.03, r: 0 },
  { t: 9.5, from: 9.0, cx: 540, cy: 3420, z: 1.06, r: -4, ease: kit.ei },
];
const CHECKS = ['Constraints in file: 3', 'All satisfied: yes', 'Infeasible: no', 'Errors: 0'];
kit.scene('dropped', {
  init(kit) {
    const checks = CHECKS.map((s, i) =>
      '<div class="sfrow dp-c' + i + '" style="left:90px;top:' + (812 + i * 84) + 'px;width:600px;height:68px;font-size:31px"><span class="tk"></span><span>' + s + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px;gap:4px">' +
        '<span class="sub dp-k">The dropped rule</span>' +
        '<span class="line dp-h" style="font-size:82px">Nothing warns you</span>' +
      '</div>' +
      '<div class="sfrow pk dp-r" style="left:90px;top:634px;width:410px;height:60px;font-size:30px"><span class="tk"></span><span>Shift limit 8 h</span></div>' +
      UI.anim(kit, 'crumple', 'dp-cr', 'left:586px;top:574px', 250) +
      checks +
      '<div class="words" style="left:90px;top:1636px;width:860px;gap:4px">' +
        '<span class="sub dp-k2">So it comes back</span>' +
        '<span class="line dp-h2" style="font-size:98px">Still valid</span>' +
      '</div>' +
      '<div class="words" style="left:90px;top:1866px;width:700px"><span class="stamp solid dp-s" style="position:relative;font-size:70px;transform-origin:0 50%">Optimal</span></div>' +
      UI.img(kit, 'stamp.webp', 'dp-st', 'left:636px;top:1786px;width:290px') +
      '<div class="words" style="left:90px;top:2004px;width:760px"><span class="num bluet dp-n" style="font-size:146px">41,920</span></div>' +
      '<div class="words" style="left:90px;top:2208px;width:760px"><span class="tag dp-tg2">Confident, valid, and wrong</span></div>',
      3400, '', 'dark', UI.ghost('Valid', -70, 1560, 470));
    const q = this.v.q;
    this.k = q('.dp-k').style; this.h = q('.dp-h'); this.cr = q('.dp-cr').style;
    this.r = q('.dp-r'); this.rs = this.r.style;
    this.c = CHECKS.map((_, i) => q('.dp-c' + i).style);
    this.k2 = q('.dp-k2').style; this.h2 = q('.dp-h2');
    this.s = q('.dp-s').style; this.st = q('.dp-st').style;
    this.n = q('.dp-n'); this.tg2 = q('.dp-tg2').style;
    this.hl = UI.letters(this.h, 71, 0.55, 0.34);
    this.l2 = UI.letters(this.h2, 72, 6.1, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.cr, t);
    const fa = 1 - eo(seg(t, 5.1, 5.5));
    this.k.opacity = eo(seg(t, 0.2, 0.5)) * fa;
    UI.reveal(this.hl, t); this.h.style.opacity = fa;
    // the rule that never reached the model is crumpled off the board
    UI.slam(this.rs, t, 1.1, 0.2, 0, 1.4);
    const gone = seg(t, 2.1, 2.9);
    if (gone > 0) {
      this.rs.transform = 'translate(' + (gone * 180).toFixed(1) + 'px,' + (-gone * 50).toFixed(1) + 'px) rotate(' + (gone * 14).toFixed(2) + 'deg) scale(' + (1 - 0.45 * eo(gone)).toFixed(3) + ')';
      this.rs.opacity = (1 - eo(gone)).toFixed(3);
    }
    this.rs.opacity = (+this.rs.opacity || 0) * fa;
    UI.pop(this.cr, t, 1.95, 5, 230); this.cr.opacity = (+this.cr.opacity || 0) * fa;
    // every check the solver can run comes back clean
    this.c.forEach((st, i) => { UI.slam(st, t, 2.55 + i * 0.36, 0.2, 0, 1.4); st.opacity = (+st.opacity || 0) * fa; });
    this.k2.opacity = eo(seg(t, 5.9, 6.15));
    UI.reveal(this.l2, t);
    const dn = seg(t, 6.3, 6.7), up = seg(t, 6.9, 7.4);
    this.st.opacity = dn > 0 && up < 1 ? 1 : 0;
    this.st.transform = 'translateY(' + (lerp(-400, 70, eo(dn)) - 500 * ei(up)).toFixed(1) + 'px) rotate(' + lerp(-10, -2, eo(dn)).toFixed(2) + 'deg)';
    UI.slam(this.s, t, 6.68, 0.22, -2, 1.42);
    this.n.textContent = UI.num(lerp(0, 41920, eo(seg(t, 7.3, 8.0))));
    this.n.style.opacity = t >= 7.3 ? 1 : 0;
    UI.pop(this.tg2, t, 8.3, -1, 70);
    UI.punch(this.v.roll, t, [2.1, 6.68, 7.3], 0.045);
  },
});
