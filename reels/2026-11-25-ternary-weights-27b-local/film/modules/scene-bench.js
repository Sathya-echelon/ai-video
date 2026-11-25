const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left, holds on the two bars as they grow, whips out left
const KEYS = [
  { t: 0, cx: -520, cy: 940, z: 1.05, r: -3 },
  { t: 0.45, from: 0, cx: 540, cy: 940, z: 1.0, r: 0, ease: kit.eox },
  { t: 6.55, from: 0.5, cx: 540, cy: 954, z: 1.04, r: 0 },
  { t: 7.0, from: 6.55, cx: -640, cy: 954, z: 1.06, r: -5, ease: kit.ei },
];
const BASE = 1150, MAXH = 430;
kit.scene('bench', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:140px;top:300px;width:560px;align-items:flex-start"><span class="sub wrapsub bn-k">On PrismML’s own SWE-bench Verified run</span></div>' +
      UI.anim(kit, 'dart', 'bn-dt', 'left:720px;top:300px', 300) +
      '<div class="twbar bn-b1" style="left:170px;width:250px;background:var(--main)"></div>' +
      '<div class="twbar bn-b2" style="left:490px;width:250px;background:var(--accent)"></div>' +
      '<div class="words" style="left:170px;top:600px;width:250px;align-items:center"><span class="num pink bn-n1" style="font-size:96px">75.6</span></div>' +
      '<div class="words" style="left:490px;top:560px;width:250px;align-items:center"><span class="num bluet bn-n2" style="font-size:96px">80.6</span></div>' +
      '<div class="bar" style="left:140px;top:' + BASE + 'px;width:700px;height:8px;background:var(--second)"></div>' +
      '<div class="words" style="left:150px;top:1185px;width:300px;align-items:flex-start;gap:8px"><span class="node bn-l1" style="font-size:34px">Ternary</span><span class="node bn-l1b" style="font-size:34px">5.9 GB</span></div>' +
      '<div class="words" style="left:470px;top:1185px;width:380px;align-items:flex-start;gap:8px"><span class="node bn-l2" style="font-size:34px">Full precision</span><span class="node bn-l2b" style="font-size:34px">54 GB</span></div>' +
      '<div class="words" style="left:140px;top:1345px;width:760px;align-items:flex-start"><span class="tag bn-tg">No independent test yet</span></div>',
      2600, '', 'spot', UI.ghost('Verified', -70, 1480, 370));
    const q = this.v.q;
    this.k = q('.bn-k').style; this.dt = q('.bn-dt').style;
    this.b1 = q('.bn-b1').style; this.b2 = q('.bn-b2').style;
    this.n1 = q('.bn-n1'); this.n2 = q('.bn-n2');
    this.l1 = q('.bn-l1').style; this.l2 = q('.bn-l2').style;
    this.l1b = q('.bn-l1b').style; this.l2b = q('.bn-l2b').style; this.tg = q('.bn-tg').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.dt, t);
    this.k.opacity = eo(seg(t, 0.2, 0.55));
    UI.pop(this.dt, t, 0.6, 6, 220);
    // both bars grow from the same baseline; the numbers start well up and finish with them
    const g1 = eo(seg(t, 1.0, 2.4)), g2 = eo(seg(t, 1.5, 2.9));
    const h1 = MAXH * (75.6 / 80.6) * g1, h2 = MAXH * g2;
    this.b1.height = h1.toFixed(1) + 'px'; this.b1.top = (BASE - h1).toFixed(1) + 'px';
    this.b2.height = h2.toFixed(1) + 'px'; this.b2.top = (BASE - h2).toFixed(1) + 'px';
    this.n1.textContent = lerp(41.0, 75.6, g1).toFixed(1);
    this.n2.textContent = lerp(44.0, 80.6, g2).toFixed(1);
    this.n1.parentElement.style.opacity = eo(seg(t, 0.9, 1.2));
    this.n2.parentElement.style.opacity = eo(seg(t, 1.4, 1.7));
    UI.slam(this.l1, t, 3.2, 0.22, -1, 1.5); UI.slam(this.l1b, t, 3.32, 0.22, -1, 1.5);
    UI.slam(this.l2, t, 3.55, 0.22, 1, 1.5); UI.slam(this.l2b, t, 3.67, 0.22, 1, 1.5);
    UI.pop(this.tg, t, 4.6, -1, 70);
    UI.punch(this.v.roll, t, [2.4, 2.9, 3.2, 3.55], 0.04);
  },
});
