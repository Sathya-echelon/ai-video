const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above, slow push, whips out right
const KEYS = [
  { t: 0, cx: 540, cy: -340, z: 1.08, r: 3 },
  { t: 0.42, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 7.6, from: 0.5, cx: 540, cy: 944, z: 1.035, r: -1 },
  { t: 8.0, from: 7.6, cx: 1700, cy: 944, z: 1.06, r: 4, ease: kit.ei },
];
kit.scene('study', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px;gap:12px">' +
        '<span class="sub st-k">A recent study found it</span>' +
        '<span class="line st-h" style="font-size:128px">Nine models</span>' +
        '<span class="num pink st-n" style="font-size:150px">10,664</span>' +
        '<span class="sub st-k2">Agent runs</span>' +
      '</div>' +
      '<div class="words" style="left:110px;top:838px;width:900px">' +
        '<span class="tape bl st-t" style="font-size:80px;transform-origin:0 50%">A geometric law</span>' +
      '</div>' +
      UI.anim(kit, 'books', 'st-bk', 'left:650px;top:952px', 320) +
      UI.img(kit, 'loupe.webp', 'st-lp', 'left:420px;top:1178px;width:260px') +
      '<div class="words" style="left:110px;top:1400px;width:860px;gap:16px">' +
        '<span class="node st-n1">Step count kills you</span>' +
        '<span class="node st-n2" style="background:var(--accent)">Not context length</span>' +
      '</div>',
      2500, '', 'spot', UI.ghost('Study', -60, 1190, 470));
    const q = this.v.q;
    this.k = q('.st-k').style; this.k2 = q('.st-k2').style;
    this.n = q('.st-n'); this.t = q('.st-t').style;
    this.bk = q('.st-bk').style; this.lp = q('.st-lp').style;
    this.n1 = q('.st-n1').style; this.n2 = q('.st-n2').style;
    this.h1 = UI.letters(q('.st-h'), 91, 0.5, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.bk, t);
    this.k.opacity = eo(seg(t, 0.12, 0.42));
    UI.reveal(this.h1, t);
    const p = seg(t, 1.2, 3.0);
    this.n.textContent = UI.num(lerp(0, 10664, eo(p)));
    this.n.style.opacity = t > 1.2 ? 1 : 0;
    this.k2.opacity = eo(seg(t, 2.9, 3.2));
    UI.slam(this.t, t, 3.7, 0.22, -1.6, 1.6);
    UI.pop(this.bk, t, 4.35, 4, 230);
    UI.pop(this.lp, t, 4.85, -7, 200);
    UI.slam(this.n1, t, 5.75, 0.2, -1.2, 1.5);
    UI.slam(this.n2, t, 6.35, 0.2, 1.0, 1.5);
    UI.punch(this.v.roll, t, [3.7, 5.75, 6.35], 0.045);
  },
});
