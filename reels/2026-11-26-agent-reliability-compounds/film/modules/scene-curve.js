const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left, holds on the chart, whips out left again
const KEYS = [
  { t: 0, cx: -580, cy: 900, z: 1.06, r: -5 },
  { t: 0.42, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 8.6, from: 0.5, cx: 540, cy: 940, z: 1.03, r: 1 },
  { t: 9.0, from: 8.6, cx: -640, cy: 940, z: 1.06, r: -4, ease: kit.ei },
];
const X0 = 120, X1 = 960, YB = 1180, YH = 520, NMAX = 55;
const X = n => X0 + (n / NMAX) * (X1 - X0);
const Y = v => YB - v * YH;
const PTS = [[5, 0.7738], [10, 0.5987], [20, 0.3585], [50, 0.0769]];
kit.scene('curve', {
  init(kit) {
    let d = 'M' + X(0).toFixed(1) + ' ' + Y(1).toFixed(1);
    for (let n = 1; n <= NMAX; n++) d += ' L' + X(n).toFixed(1) + ' ' + Y(Math.pow(0.95, n)).toFixed(1);
    const dots = PTS.map((p, i) => '<div class="rl-dot cv-dt' + (i === 2 ? '' : ' bl') + '" style="left:' + X(p[0]).toFixed(1) + 'px;top:' + Y(p[1]).toFixed(1) + 'px"></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px;gap:14px">' +
        '<span class="sub cv-k">At 95% per step</span>' +
        '<span class="line cv-h" style="font-size:150px">The curve</span>' +
      '</div>' +
      '<svg class="art" viewBox="0 0 1080 2400">' +
        '<path class="cv-ax" d="M' + X0 + ' 640 V' + YB + ' H' + X1 + '" style="fill:none;stroke:color-mix(in srgb, var(--second) 35%, var(--ground));stroke-width:5;stroke-linecap:round"/>' +
        '<path class="cv-cu pk-line" d="' + d + '"/>' +
      '</svg>' +
      '<span class="lbl cv-l1" style="position:absolute;left:132px;top:648px">End to end success</span>' +
      '<span class="lbl cv-l2" style="position:absolute;left:700px;top:1198px">Steps</span>' + dots +
      '<span class="node cv-n0" style="position:absolute;left:240px;top:700px">5: 77%</span>' +
      '<span class="node cv-n1" style="position:absolute;left:320px;top:800px">10: 60%</span>' +
      '<span class="node cv-n2" style="position:absolute;left:470px;top:926px;font-size:56px;background:var(--main)">20: 36%</span>' +
      '<span class="node cv-n3" style="position:absolute;left:636px;top:1070px">50: 8%</span>' +
      '<div class="words" style="left:120px;top:1252px;width:820px"><span class="tag cv-tg">Fifty steps: under 8%</span></div>' +
      UI.anim(kit, 'dominoes', 'cv-dm', 'left:600px;top:1330px', 420),
      2500, '', 'window', UI.ghost('Decay', -60, 1180, 470));
    const q = this.v.q;
    this.k = q('.cv-k').style;
    this.ax = q('.cv-ax'); this.axd = UI.draw(this.ax);
    this.cu = q('.cv-cu'); this.cud = UI.draw(this.cu);
    this.l1 = q('.cv-l1').style; this.l2 = q('.cv-l2').style;
    this.dt = [...kit.stage.querySelectorAll('.cv-dt')].map(e => e.style);
    this.nd = [0, 1, 2, 3].map(i => q('.cv-n' + i).style);
    this.tg = q('.cv-tg').style; this.dm = q('.cv-dm').style;
    this.h1 = UI.letters(q('.cv-h'), 81, 0.5, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.dm, t);
    this.k.opacity = eo(seg(t, 0.12, 0.42));
    UI.reveal(this.h1, t);
    this.axd(eo(seg(t, 1.2, 1.7)));
    this.l1.opacity = eo(seg(t, 1.5, 1.8));
    this.l2.opacity = eo(seg(t, 1.6, 1.9));
    this.cud(eo(seg(t, 1.9, 4.6)));
    // each marker lands as the curve passes it
    const AT = [2.35, 2.75, 3.45, 4.55];
    for (let i = 0; i < AT.length; i++) {
      const st = this.dt[i], p = seg(t, AT[i], AT[i] + 0.2);
      if (st) { st.opacity = p > 0 ? 1 : 0; st.transform = 'scale(' + (0.3 + 0.7 * eob(p, 1.8)).toFixed(3) + ')'; }
      UI.slam(this.nd[i], t, AT[i] + 0.05, 0.2, i % 2 ? 1.2 : -1.2, 1.55);
    }
    UI.pop(this.tg, t, 5.4, -1, 70);
    UI.pop(this.dm, t, 6.0, 3, 230);
    UI.punch(this.v.roll, t, [2.35, 2.75, 3.45, 4.55], 0.04);
  },
});
