const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in on the grid, pushes in slowly as the signs land, whips out right
const KEYS = [
  { t: 0, cx: 540, cy: -220, z: 1.06, r: -3 },
  { t: 0.45, from: 0, cx: 540, cy: 790, z: 1.0, r: 0, ease: kit.eox },
  { t: 6.55, from: 0.5, cx: 540, cy: 806, z: 1.05, r: 1 },
  { t: 7.0, from: 6.55, cx: 1700, cy: 806, z: 1.06, r: 4, ease: kit.ei },
];
const COLS = 16, ROWS = 8, CW = 44, GAP = 6, X0 = 140, Y0 = 560;
kit.scene('grid', {
  init(kit) {
    const r = kit.rng(29), cells = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const cx = X0 + (i % COLS) * (CW + GAP), cy = Y0 + Math.floor(i / COLS) * (CW + GAP), k = Math.floor(r() * 3);
      const mark = k === 0
        ? '<div class="twsign" style="left:10px;top:19px;width:24px;height:6px;background:var(--main)"></div>'
        : k === 2
          ? '<div class="twsign" style="left:10px;top:19px;width:24px;height:6px;background:var(--accent)"></div><div class="twsign" style="left:19px;top:10px;width:6px;height:24px;background:var(--accent)"></div>'
          : '<div class="twsign" style="left:17px;top:17px;width:10px;height:10px;border-radius:50%;background:color-mix(in srgb, var(--second) 45%, var(--ground))"></div>';
      cells.push({ at: 0.75 + (i % COLS) * 0.035 + Math.floor(i / COLS) * 0.06, html: '<div class="twcell gr-c" style="left:' + cx + 'px;top:' + cy + 'px;width:' + CW + 'px;height:' + CW + 'px">' + mark + '</div>' });
    }
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:300px;width:760px;gap:10px;align-items:flex-start">' +
        '<span class="sub wrapsub gr-k">A weight mostly needs a direction, not precision</span>' +
      '</div>' + cells.map(c => c.html).join('') +
      '<div class="words" style="left:140px;top:1000px;width:460px;align-items:flex-start"><span class="tape pk gr-tp" style="position:relative;font-size:78px;transform-origin:0 50%">128 weights</span></div>' +
      UI.img(kit, 'chips.webp', 'gr-ch', 'left:660px;top:1000px;width:300px'),
      2600, '', 'spot', UI.ghost('Direction', -70, 1210, 350));
    const q = this.v.q;
    this.k = q('.gr-k').style; this.tp = q('.gr-tp').style; this.ch = q('.gr-ch').style;
    this.cells = [...kit.stage.querySelectorAll('.gr-c')].map((e, i) => ({ s: e.style, at: cells[i].at }));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.55));
    for (const c of this.cells) {
      const p = seg(t, c.at, c.at + 0.3);
      c.s.opacity = p > 0 ? eo(p) : 0;
      c.s.transform = 'scale(' + (0.55 + 0.45 * eob(p, 1.5)).toFixed(3) + ')';
    }
    UI.slam(this.tp, t, 4.5, 0.24, -2, 1.5);
    UI.pop(this.ch, t, 5.1, 6, 220);
    UI.punch(this.v.roll, t, [4.5], 0.05);
  },
});
