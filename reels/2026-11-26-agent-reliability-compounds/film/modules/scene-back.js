const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the right onto the backwards solve, tilts down to the governance gap
const KEYS = [
  { t: 0, cx: 1680, cy: 900, z: 1.06, r: 5 },
  { t: 0.42, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.9, from: 0.5, cx: 540, cy: 940, z: 1.03, r: 0 },
  { t: 5.55, from: 4.9, cx: 540, cy: 1912, z: 1.0, r: -1 },
  { t: 9.5, from: 5.65, cx: 540, cy: 1950, z: 1.03, r: 0 },
  { t: 10.0, from: 9.5, cx: 540, cy: 3120, z: 1.06, r: 3, ease: kit.ei },
];
const TRK = 760;
kit.scene('back', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px;gap:12px">' +
        '<span class="sub bk-k">Run it backwards</span>' +
        '<span class="line bk-h" style="font-size:115px">To clear 90%</span>' +
        '<span class="sub bk-k2">Across twenty steps</span>' +
      '</div>' +
      '<div class="words" style="left:110px;top:672px;width:900px">' +
        '<span class="num pink bk-n" style="font-size:210px">99.5%</span>' +
      '</div>' +
      '<div class="words" style="left:110px;top:912px;width:860px"><span class="node bk-nd">Every single step</span></div>' +
      UI.anim(kit, 'ladder', 'bk-ld', 'left:690px;top:872px', 300) +
      '<div class="words" style="left:110px;top:1012px;width:820px"><span class="tag bk-tg">0.90 to the power 1/20</span></div>' +
      '<div class="words" style="left:110px;top:1640px;width:900px;gap:12px">' +
        '<span class="sub bk-k3">BCG, Applied AI Index 2026</span>' +
        '<span class="line bk-h2" style="font-size:115px">The gap</span>' +
      '</div>' +
      '<div class="words" style="left:110px;top:1846px;width:860px"><span class="node bk-l1">Expect autonomy by 2030</span></div>' +
      '<div class="rl-trk" style="left:110px;top:1900px;width:' + TRK + 'px"></div>' +
      '<div class="rl-bar pk bk-b1" style="left:110px;top:1900px;width:' + TRK + 'px;transform-origin:0 50%"></div>' +
      '<span class="num pink bk-v1" style="position:absolute;left:460px;top:1898px;font-size:92px">42%</span>' +
      '<div class="words" style="left:110px;top:2056px;width:860px"><span class="node bk-l2" style="background:var(--accent)">Have the controls today</span></div>' +
      '<div class="rl-trk" style="left:110px;top:2110px;width:' + TRK + 'px"></div>' +
      '<div class="rl-bar bl bk-b2" style="left:110px;top:2110px;width:' + TRK + 'px;transform-origin:0 50%"></div>' +
      '<span class="num bluet bk-v2" style="position:absolute;left:190px;top:2108px;font-size:92px">5%</span>' +
      '<div class="words" style="left:110px;top:2254px;width:820px"><span class="tag bk-tg2">Two different measures</span></div>',
      2800, '', 'soft', UI.ghost('Backwards', -70, 1180, 380));
    const q = this.v.q;
    this.k = q('.bk-k').style; this.k2 = q('.bk-k2').style; this.k3 = q('.bk-k3').style;
    this.hEl = q('.bk-h').style;
    this.n = q('.bk-n'); this.nd = q('.bk-nd').style; this.ld = q('.bk-ld').style; this.tg = q('.bk-tg').style;
    this.l1 = q('.bk-l1').style; this.l2 = q('.bk-l2').style;
    this.b1 = q('.bk-b1').style; this.b2 = q('.bk-b2').style;
    this.v1 = q('.bk-v1'); this.v2 = q('.bk-v2');
    this.tg2 = q('.bk-tg2').style;
    this.h1 = UI.letters(q('.bk-h'), 101, 0.5, 0.4);
    this.h2 = UI.letters(q('.bk-h2'), 102, 6.1, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.ld, t);
    // part A clears before the camera tilts down to the gap
    const fade = 1 - eo(seg(t, 4.6, 5.0));
    this.k.opacity = eo(seg(t, 0.12, 0.42)) * fade;
    UI.reveal(this.h1, t); this.hEl.opacity = fade;
    this.k2.opacity = eo(seg(t, 1.1, 1.4)) * fade;
    const p = seg(t, 1.6, 2.6);
    this.n.textContent = t < 1.6 ? '' : (t < 2.65 ? lerp(90, 99.5, eo(p)).toFixed(1) + '%' : '99.5%');
    this.n.style.opacity = t < 1.6 ? 0 : 1;
    this.n.style.transform = 'scale(' + (1 + 0.07 * Math.exp(-(t - 2.6) * 9) * (t > 2.6 ? 1 : 0)).toFixed(3) + ')';
    UI.slam(this.nd, t, 2.7, 0.2, -1.2, 1.5);
    UI.pop(this.ld, t, 3.2, 4, 230);
    UI.pop(this.tg, t, 4.1, -1, 70);
    this.n.style.opacity = (+this.n.style.opacity || 0) * fade;
    UI.out(this.nd, t, 4.6, 0.4); UI.out(this.ld, t, 4.6, 0.4); UI.out(this.tg, t, 4.65, 0.4);
    this.k3.opacity = eo(seg(t, 5.8, 6.1));
    UI.reveal(this.h2, t);
    UI.slam(this.l1, t, 6.75, 0.2, -1.0, 1.4);
    const q1 = eo(seg(t, 6.95, 7.6));
    this.b1.transform = 'scaleX(' + (0.42 * q1).toFixed(4) + ')';
    this.v1.style.opacity = q1 > 0.02 ? 1 : 0;
    this.v1.textContent = Math.round(42 * q1) + '%';
    UI.slam(this.l2, t, 8.0, 0.2, 1.0, 1.4);
    const q2 = eo(seg(t, 8.2, 8.75));
    this.b2.transform = 'scaleX(' + (0.05 * q2).toFixed(4) + ')';
    this.v2.style.opacity = q2 > 0.02 ? 1 : 0;
    this.v2.textContent = Math.round(5 * q2) + '%';
    UI.pop(this.tg2, t, 9.0, -1, 70);
    UI.punch(this.v.roll, t, [2.7, 6.75, 8.0], 0.045);
  },
});
