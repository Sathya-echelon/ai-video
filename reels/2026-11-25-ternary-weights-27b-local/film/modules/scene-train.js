const { seg, eo, ei, eio, eob, lerp } = kit;
// lands on the damaged model, tilts down to the one that learned around it, whips out right
const KEYS = [
  { t: 0, cx: 540, cy: -200, z: 1.07, r: 3 },
  { t: 0.45, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.1, from: 0.5, cx: 540, cy: 974, z: 1.04, r: 0 },
  { t: 4.75, from: 4.1, cx: 540, cy: 1960, z: 1.0, r: 1 },
  { t: 8.55, from: 4.85, cx: 540, cy: 1974, z: 1.04, r: 0 },
  { t: 9.0, from: 8.55, cx: 1720, cy: 1974, z: 1.06, r: 4, ease: kit.ei },
];
kit.scene('train', {
  init(kit) {
    const r = kit.rng(67), cells = [], pcells = [];
    for (let i = 0; i < 27; i++) {
      const cx = 175 + (i % 9) * 50, cy = 620 + Math.floor(i / 9) * 50;
      pcells.push('<div class="twcell tr-pc" style="left:' + cx + 'px;top:' + cy + 'px;width:44px;height:44px">' +
        '<div class="twsign" style="left:10px;top:19px;width:24px;height:6px;background:var(--' + (r() > 0.5 ? 'accent' : 'main') + ')"></div></div>');
    }
    for (let i = 0; i < 24; i++) {
      const cx = 150 + (i % 8) * 50, cy = 1980 + Math.floor(i / 8) * 50;
      cells.push('<div class="twcell tr-c" style="left:' + cx + 'px;top:' + cy + 'px;width:44px;height:44px">' +
        '<div class="twsign" style="left:10px;top:19px;width:24px;height:6px;background:var(--' + (r() > 0.5 ? 'accent' : 'main') + ')"></div></div>');
    }
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:300px;width:760px;align-items:flex-start"><span class="sub wrapsub tr-k">The constraint goes in during training</span></div>' +
      '<div class="words" style="left:140px;top:420px;width:620px;align-items:flex-start"><span class="tape pk tr-t1" style="position:relative;font-size:66px;transform-origin:0 50%">Rounded afterwards</span></div>' +
      '<div class="twpanel tr-p1" style="left:140px;top:560px;width:520px;height:300px"></div>' + pcells.join('') +
      '<svg class="art" viewBox="0 0 1080 3000"><path class="twcrack tr-cr" d="M190 580 L300 680 L250 740 L380 820 L330 850 L470 845"/></svg>' +
      UI.anim(kit, 'hammer', 'tr-hm', 'left:600px;top:470px', 420) +
      '<div class="words" style="left:140px;top:900px;width:760px;align-items:flex-start"><span class="node tr-n1">Damage the network cannot undo</span></div>' +
      '<div class="words" style="left:140px;top:1560px;width:700px;align-items:flex-start"><span class="tape bl tr-t2" style="position:relative;font-size:66px;transform-origin:0 50%">Trained inside it</span></div>' +
      '<div class="words" style="left:140px;top:1720px;width:760px;align-items:flex-start"><span class="sub wrapsub tr-k2">The network learns around the rounding</span></div>' + cells.join('') +
      UI.img(kit, 'brain.webp', 'tr-br', 'left:640px;top:1900px;width:320px') +
      '<div class="words" style="left:140px;top:2180px;width:760px;align-items:flex-start"><span class="stamp tr-s" style="position:relative;font-size:72px;transform-origin:0 50%">Not bolted on</span></div>',
      3000, '', 'dark', UI.ghost('Training', -70, 1230, 360));
    const q = this.v.q;
    this.k = q('.tr-k').style; this.t1 = q('.tr-t1').style; this.p1 = q('.tr-p1').style;
    this.hm = q('.tr-hm').style; this.n1 = q('.tr-n1').style;
    this.t2 = q('.tr-t2').style; this.k2 = q('.tr-k2').style; this.br = q('.tr-br').style;
    this.s = q('.tr-s').style;
    this.cd = UI.draw(q('.tr-cr'));
    this.cells = [...kit.stage.querySelectorAll('.tr-c')].map(e => e.style);
    this.pc = [...kit.stage.querySelectorAll('.tr-pc')].map((e, i) => ({ s: e.style, dx: (r() - 0.5) * 26, dy: (r() - 0.5) * 22, rt: (r() - 0.5) * 22 }));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.hm, t);
    this.k.opacity = eo(seg(t, 0.2, 0.5)) * (1 - seg(t, 3.7, 4.05));
    UI.slam(this.t1, t, 0.75, 0.24, -2, 1.45);
    this.t1.opacity = (t >= 0.75 ? 1 : 0) * (1 - seg(t, 4.0, 4.4));
    const pp = seg(t, 1.0, 1.3);
    this.p1.opacity = (pp > 0 ? 1 : 0) * (1 - seg(t, 4.1, 4.5));
    // the hammer lands and the crack runs across the model
    const shake = Math.exp(-(t - 2.0) * 7) * (t > 2.0 ? 1 : 0);
    this.p1.transform = 'translateX(' + (Math.sin(t * 46) * 9 * shake).toFixed(2) + 'px) scale(' + (0.9 + 0.1 * eob(pp, 1.5)).toFixed(3) + ')';
    // the rounding knocks every weight off its place
    const kn = eo(seg(t, 2.0, 2.45));
    for (const c of this.pc) {
      c.s.opacity = (t >= 1.05 ? 1 : 0) * (1 - seg(t, 4.1, 4.5));
      c.s.transform = 'translate(' + (c.dx * kn).toFixed(2) + 'px,' + (c.dy * kn).toFixed(2) + 'px) rotate(' + (c.rt * kn).toFixed(2) + 'deg)';
    }
    UI.pop(this.hm, t, 1.35, 6, 200);
    this.hm.opacity = (t >= 1.35 ? 1 : 0) * (1 - seg(t, 4.1, 4.5));
    this.cd(eo(seg(t, 2.0, 2.6)));
    UI.slam(this.n1, t, 2.9, 0.22, -1, 1.5);
    this.n1.opacity = (t >= 2.9 ? 1 : 0) * (1 - seg(t, 4.0, 4.4));
    UI.slam(this.t2, t, 5.25, 0.24, 2, 1.45);
    this.k2.opacity = eo(seg(t, 5.6, 5.9));
    this.cells.forEach((st, i) => {
      const a = 6.0 + (i % 8) * 0.045 + Math.floor(i / 8) * 0.09, p = seg(t, a, a + 0.3);
      st.opacity = p > 0 ? eo(p) : 0;
      st.transform = 'translateY(' + ((1 - eob(p, 1.4)) * 70).toFixed(1) + 'px)';
    });
    UI.pop(this.br, t, 6.5, -5, 220);
    UI.slam(this.s, t, 7.5, 0.24, -3, 1.7);
    UI.punch(this.v.roll, t, [2.0, 7.5], 0.05);
  },
});
