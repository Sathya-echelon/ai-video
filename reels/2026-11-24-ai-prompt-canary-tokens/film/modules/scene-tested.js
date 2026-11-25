const { seg, eo, ei, eio, eob, lerp } = kit;
// enters from the right, lands on the map, pushes in, drops away downward
const KEYS = [
  { t: 0, cx: 1680, cy: 1020, z: 1.07, r: -5 },
  { t: 0.4, from: 0, cx: 540, cy: 1000, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.5, cx: 540, cy: 1022, z: 1.05, r: 1 },
  { t: 5.0, from: 4.6, cx: 540, cy: 2360, z: 1.04, r: 3, ease: kit.ei },
];
const DOTS = [[232, 318], [300, 262], [386, 300], [450, 238], [540, 330], [612, 276], [700, 318], [764, 248], [352, 382], [630, 390]];
kit.scene('tested', {
  init(kit) {
    const r = kit.rng(305);
    this.D = DOTS.map((p, i) => ({ x: 60 + p[0], y: 780 + p[1], at: 1.35 + i * 0.13 + r() * 0.05 }));
    const dots = this.D.map(d => '<div class="dot ts-d" style="left:' + d.x + 'px;top:' + d.y + 'px"></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:400px;width:900px;gap:16px">' +
        '<span class="sub ts-k">Dragos did not read it</span>' +
        '<span class="line ts-h" style="font-size:98px">They tested it</span>' +
      '</div>' +
      UI.img(kit, 'worldmap.webp', 'ts-map', 'left:60px;top:780px;width:960px') + dots +
      UI.img(kit, 'loupe.webp', 'ts-lp', 'left:600px;top:1060px;width:400px') +
      '<div class="lt ts-lt" style="left:90px;top:1432px"><b>Dragos</b><span>Five-month study - Jul to Nov 2026</span></div>',
      2500, '', 'soft', UI.ghost('Tested', -60, 1330, 450));
    const q = this.v.q;
    this.k = q('.ts-k').style; this.h = q('.ts-h'); this.map = q('.ts-map').style;
    this.lp = q('.ts-lp').style; this.lt = q('.ts-lt').style;
    this.d = [...kit.stage.querySelectorAll('.ts-d')].map(e => e.style);
    this.hl = UI.letters(this.h, 73, 0.42, 0.38);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.hl, t);
    UI.pop(this.map, t, 0.6, -1, 200);
    this.D.forEach((d, i) => {
      const p = seg(t, d.at, d.at + 0.3);
      this.d[i].opacity = p > 0 ? 1 : 0;
      this.d[i].transform = 'scale(' + (eob(p, 1.9) * (1 + 0.12 * Math.sin(t * 3 + i))).toFixed(3) + ')';
    });
    UI.pop(this.lp, t, 2.5, 5, 240);
    UI.pop(this.lt, t, 3.25, -1, 120);
    UI.punch(this.v.roll, t, [1.35, 3.25], 0.045);
  },
});
