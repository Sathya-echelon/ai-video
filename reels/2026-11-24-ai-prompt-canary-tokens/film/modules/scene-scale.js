const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above on the counter, tilts down to the three providers, whips out right
const KEYS = [
  { t: 0, cx: 540, cy: -300, z: 1.08, r: -3 },
  { t: 0.42, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.8, from: 0.5, cx: 540, cy: 922, z: 1.04, r: 0 },
  { t: 5.45, from: 4.8, cx: 540, cy: 2120, z: 1.0, r: 1 },
  { t: 9.5, from: 5.55, cx: 540, cy: 2142, z: 1.03, r: 0 },
  { t: 10.0, from: 9.5, cx: 1760, cy: 2142, z: 1.06, r: 4, ease: kit.ei },
];
const MON = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const SX = [116, 418, 720];
kit.scene('scale', {
  init(kit) {
    const svs = SX.map((x, i) => '<div class="sc-sv" style="position:absolute;left:' + x + 'px;top:1976px;width:244px;height:251px">' +
      UI.img(kit, 'server.webp', 'sc-si', 'left:0;top:0;width:244px') + '</div>').join('');
    const nds = SX.map((x, i) => '<div class="words" style="left:' + (x - 4) + 'px;top:2252px;width:260px"><span class="node sc-nd" style="font-size:36px">Breached</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:410px;width:900px;gap:8px">' +
        '<span class="sub sc-k">Over five months they sent</span>' +
        '<span class="num pink sc-n" style="font-size:166px">1,180,000</span>' +
        '<span class="sub sc-k2">decoy prompts</span>' +
      '</div>' +
      UI.img(kit, 'calendar.webp', 'sc-cal', 'left:668px;top:742px;width:300px') +
      '<div class="words" style="left:110px;top:786px;width:420px"><span class="tape bl sc-mo" style="position:relative;font-size:74px;transform-origin:0 50%">Jul</span></div>' +
      '<div class="words" style="left:90px;top:1692px;width:900px;gap:14px">' +
        '<span class="sub sc-k3">Tens of thousands of callbacks</span>' +
        '<span class="line sc-h" style="font-size:100px">Three providers</span>' +
      '</div>' + svs + nds +
      '<div class="words" style="left:90px;top:2366px;width:700px"><span class="tag sc-tg">They had no idea</span></div>',
      3200, '', 'window', UI.ghost('Two million', -70, 1140, 360));
    const q = this.v.q;
    this.k = q('.sc-k').style; this.k2 = q('.sc-k2').style; this.k3 = q('.sc-k3').style;
    this.n = q('.sc-n'); this.cal = q('.sc-cal').style; this.mo = q('.sc-mo');
    this.h = q('.sc-h'); this.tg = q('.sc-tg').style;
    this.sv = [...kit.stage.querySelectorAll('.sc-sv')].map(e => e.style);
    this.si = [...kit.stage.querySelectorAll('.sc-si')].map(e => e.style);
    this.nd = [...kit.stage.querySelectorAll('.sc-nd')].map(e => e.style);
    this.hl = UI.letters(this.h, 83, 5.75, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.1, 0.4));
    this.k2.opacity = eo(seg(t, 0.5, 0.8));
    // the counter is already most of the way up at frame 0, then finishes
    this.n.textContent = UI.num(lerp(1180000, 2000000, eo(seg(t, 0.3, 3.3))));
    UI.pop(this.cal, t, 0.9, 4, 200);
    const mi = Math.max(0, Math.min(4, Math.floor(seg(t, 1.0, 4.3) * 5)));
    this.mo.textContent = MON[mi];
    this.mo.style.transform = 'rotate(-2deg) scale(' + (1 + 0.06 * Math.exp(-((seg(t, 1.0, 4.3) * 5) % 1) * 6)).toFixed(3) + ')';
    this.k3.opacity = eo(seg(t, 5.6, 5.9));
    UI.reveal(this.hl, t);
    // the three providers go over one by one
    this.sv.forEach((st, i) => {
      const a = 6.5 + i * 0.62, p = seg(t, a, a + 0.3);
      st.opacity = p > 0 ? 1 : 0;
      const sh = Math.exp(-(t - a) * 6) * (t > a ? 1 : 0);
      st.transform = 'translateY(' + ((1 - eob(p, 1.5)) * 220).toFixed(1) + 'px) translateX(' + (Math.sin(t * 42 + i) * 7 * sh).toFixed(2) + 'px)';
      this.si[i].filter = 'drop-shadow(20px 28px 16px rgba(0,0,0,.36))' + (t >= a + 0.25 ? ' sepia(1) saturate(5.5) hue-rotate(296deg)' : '');
      UI.slam(this.nd[i], t, a + 0.3, 0.2, i === 1 ? 1.5 : -1.5, 1.55);
    });
    UI.pop(this.tg, t, 8.95, -1, 80);
    UI.punch(this.v.roll, t, [6.8, 7.42, 8.04], 0.05);
  },
});
