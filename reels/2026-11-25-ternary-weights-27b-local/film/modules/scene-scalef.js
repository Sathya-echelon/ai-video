const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left onto the scale factor, drops to the grid it multiplies, whips out left
const KEYS = [
  { t: 0, cx: -500, cy: 700, z: 1.05, r: 3 },
  { t: 0.45, from: 0, cx: 540, cy: 700, z: 1.0, r: 0, ease: kit.eox },
  { t: 3.3, from: 0.5, cx: 540, cy: 712, z: 1.03, r: 0 },
  { t: 3.8, from: 3.3, cx: 540, cy: 1050, z: 1.0, r: -1 },
  { t: 6.1, from: 3.9, cx: 540, cy: 1062, z: 1.04, r: 0 },
  { t: 6.5, from: 6.1, cx: -640, cy: 1062, z: 1.06, r: -5, ease: kit.ei },
];
kit.scene('scalef', {
  init(kit) {
    const r = kit.rng(53), cells = [];
    for (let i = 0; i < 32; i++) {
      const cx = 300 + (i % 8) * 50, cy = 940 + Math.floor(i / 8) * 50, k = Math.floor(r() * 3);
      cells.push('<div class="twcell sf-c" style="left:' + cx + 'px;top:' + cy + 'px;width:44px;height:44px">' +
        (k === 1 ? '<div class="twsign" style="left:17px;top:17px;width:10px;height:10px;border-radius:50%;background:color-mix(in srgb, var(--second) 45%, var(--ground))"></div>'
          : '<div class="twsign" style="left:10px;top:19px;width:24px;height:6px;background:var(--' + (k ? 'accent' : 'main') + ')"></div>') + '</div>');
    }
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:330px;width:800px;align-items:flex-start"><span class="sub sf-k">Each group of 128 shares</span></div>' +
      '<div class="twpanel sf-p" style="left:140px;top:420px;width:800px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">' +
        '<span class="lbl sf-l" style="font-size:32px">One scale factor</span>' +
        '<span class="num pink sf-v twmono" style="font-size:104px">0.0412</span>' +
      '</div>' +
      '<svg class="art" viewBox="0 0 1080 2600"><path class="twwire sf-w" d="M540 660 L540 760 L540 880"/>' + UI.arrowHead(540, 905, 90, 'twwire sf-a') + '</svg>' +
      cells.join('') +
      UI.img(kit, 'scale.webp', 'sf-sc', 'left:770px;top:950px;width:230px') +
      '<div class="words" style="left:140px;top:1200px;width:800px;gap:12px;align-items:flex-start">' +
        '<span class="line sf-h" style="font-size:84px">Under two bits</span>' +
        '<span class="tag sf-tg">Against sixteen, per weight</span>' +
      '</div>',
      2900, '', 'soft', UI.ghost('Scale', -50, 1500, 440));
    const q = this.v.q;
    this.k = q('.sf-k').style; this.p = q('.sf-p').style; this.sc = q('.sf-sc').style;
    this.h = q('.sf-h'); this.tg = q('.sf-tg').style; this.a = q('.sf-a').style;
    this.w = q('.sf-w'); this.wd = UI.draw(this.w);
    this.cells = [...kit.stage.querySelectorAll('.sf-c')].map(e => e.style);
    this.hl = UI.letters(this.h, 59, 4.35, 0.42);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.45)) * (1 - seg(t, 3.3, 3.65));
    const p = seg(t, 0.55, 0.85);
    this.p.opacity = p > 0 ? 1 : 0;
    this.p.transform = 'scale(' + (0.88 + 0.12 * eob(p, 1.5)).toFixed(3) + ') rotate(' + (0.4 * Math.sin(t * 0.9)).toFixed(3) + 'deg)';
    this.wd(eo(seg(t, 1.9, 2.5)));
    this.a.opacity = t > 2.5 ? 1 : 0;
    // the shared factor multiplies into every cell: each one takes its magnitude
    this.cells.forEach((st, i) => {
      const a = 2.6 + (i % 8) * 0.05 + Math.floor(i / 8) * 0.08, q2 = seg(t, a, a + 0.28);
      st.opacity = q2 > 0 ? eo(q2) : 0;
      st.transform = 'scale(' + (0.5 + 0.5 * eob(q2, 1.5)).toFixed(3) + ')';
    });
    UI.pop(this.sc, t, 3.95, -6, 200);
    UI.reveal(this.hl, t);
    UI.pop(this.tg, t, 5.25, -1, 60);
    UI.punch(this.v.roll, t, [0.55, 4.35], 0.045);
  },
});
