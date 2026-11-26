const { seg, eo, ei, eio, eob, lerp } = kit;
// comes down from above onto the chain, whips out to the right
const KEYS = [
  { t: 0, cx: 540, cy: -320, z: 1.08, r: -3 },
  { t: 0.4, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.5, cx: 540, cy: 930, z: 1.03, r: 0 },
  { t: 5.0, from: 4.6, cx: 1680, cy: 930, z: 1.06, r: 4, ease: kit.ei },
];
const N = 20, LW = 78, GAP = 12, X0 = 96, ROW = [800, 886];
kit.scene('chain', {
  init(kit) {
    let links = '';
    for (let i = 0; i < N; i++) {
      const r = i < 10 ? 0 : 1, c = i % 10;
      links += '<div class="rl-lk ch-lk" style="left:' + (X0 + c * (LW + GAP)) + 'px;top:' + ROW[r] + 'px;width:' + LW + 'px"></div>';
    }
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px;gap:14px">' +
        '<span class="sub ch-k">A chain does not average</span>' +
        '<span class="line ch-h" style="font-size:150px">It</span>' +
        '<span class="line pink ch-h2" style="font-size:150px">Multiplies</span>' +
      '</div>' + links +
      UI.img(kit, 'chain.webp', 'ch-cn', 'left:620px;top:1010px;width:380px') +
      '<div class="words" style="left:110px;top:1300px;width:860px"><span class="tag ch-tg">One step fails, the job fails</span></div>',
      2400, '', 'dark', UI.ghost('Chain', -60, 1210, 470));
    const q = this.v.q;
    this.k = q('.ch-k').style;
    this.lk = [...kit.stage.querySelectorAll('.ch-lk')].map(e => e.style);
    this.cn = q('.ch-cn').style; this.tg = q('.ch-tg').style;
    this.h1 = UI.letters(q('.ch-h'), 61, 0.95, 0.22);
    this.h2 = UI.letters(q('.ch-h2'), 62, 1.2, 0.36);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.12, 0.42));
    UI.reveal(this.h1, t); UI.reveal(this.h2, t);
    // the links arrive left to right, then one goes grey and everything after it follows
    const BRK = 6, b0 = 2.9;
    this.lk.forEach((st, i) => {
      const a = 1.95 + i * 0.038, p = seg(t, a, a + 0.18);
      st.opacity = p > 0 ? 1 : 0;
      const dead = i === BRK ? t >= b0 : (i > BRK && t >= b0 + 0.12 + (i - BRK) * 0.055);
      st.background = dead ? (i === BRK ? 'color-mix(in srgb, var(--second) 40%, var(--ground))' : 'color-mix(in srgb, var(--second) 16%, var(--ground))') : 'var(--main)';
      const sh = i === BRK ? Math.exp(-(t - b0) * 7) * (t > b0 ? 1 : 0) : 0;
      st.transform = 'scaleX(' + eob(p, 1.4).toFixed(3) + ') translateX(' + (Math.sin(t * 46) * 5 * sh).toFixed(2) + 'px)';
    });
    UI.pop(this.cn, t, 3.5, -6, 230);
    UI.pop(this.tg, t, 4.1, -1, 70);
    UI.punch(this.v.roll, t, [2.9], 0.05);
  },
});
