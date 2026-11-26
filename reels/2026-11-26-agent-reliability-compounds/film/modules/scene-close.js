const { seg, eo, ei, eio, eob, lerp } = kit;
// rises from below onto the last chain, settles dead still for the final frame
const KEYS = [
  { t: 0, cx: 540, cy: 2160, z: 1.06, r: -4 },
  { t: 0.45, from: 0, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 7.0, from: 0.55, cx: 540, cy: 936, z: 1.03, r: 0 },
];
const N = 10, LW = 78, GAP = 12, X0 = 120, LY = 860;
const BRK = 5;
kit.scene('close', {
  init(kit) {
    let links = '';
    for (let i = 0; i < N; i++) links += '<div class="rl-lk cl-lk" style="left:' + (X0 + i * (LW + GAP)) + 'px;top:' + LY + 'px;width:' + LW + 'px"></div>';
    const fx = X0 + BRK * (LW + GAP) + LW / 2;
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:380px;width:900px;gap:14px">' +
        '<span class="sub cl-k">Before you trust it</span>' +
        '<span class="line cl-h" style="font-size:150px">Count</span>' +
        '<span class="line pink cl-h2" style="font-size:150px">The steps</span>' +
      '</div>' + links +
      '<div class="rl-pole cl-po" style="left:' + fx + 'px;top:904px;height:150px;transform-origin:50% 0"></div>' +
      '<span class="rl-flag cl-fl" style="left:' + (fx + 12) + 'px;top:998px;transform-origin:0 50%">Checkpoint</span>' +
      '<div class="words" style="left:110px;top:1230px;width:900px">' +
        '<span class="tape pk cl-t" style="font-size:80px;transform-origin:0 50%">Put one here</span>' +
      '</div>' +
      UI.anim(kit, 'gavel', 'cl-gv', 'left:700px;top:1120px', 330) +
      '<div class="words" style="left:110px;top:1392px;width:820px"><span class="tag cl-tg">Where the curve crosses</span></div>',
      2400, '', 'window', UI.ghost('Checkpoint', -70, 1190, 330));
    const q = this.v.q;
    this.k = q('.cl-k').style;
    this.lk = [...kit.stage.querySelectorAll('.cl-lk')].map(e => e.style);
    this.po = q('.cl-po').style; this.fl = q('.cl-fl').style;
    this.t = q('.cl-t').style; this.gv = q('.cl-gv').style; this.tg = q('.cl-tg').style;
    this.h1 = UI.letters(q('.cl-h'), 111, 0.75, 0.24);
    this.h2 = UI.letters(q('.cl-h2'), 112, 1.0, 0.36);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.gv, t);
    this.k.opacity = eo(seg(t, 0.12, 0.42));
    UI.reveal(this.h1, t); UI.reveal(this.h2, t);
    this.lk.forEach((st, i) => {
      const a = 1.8 + i * 0.055, p = seg(t, a, a + 0.18);
      st.opacity = p > 0 ? 1 : 0;
      st.background = i <= BRK ? 'var(--main)' : 'color-mix(in srgb, var(--second) 18%, var(--ground))';
      st.transform = 'scaleX(' + eob(p, 1.4).toFixed(3) + ')';
    });
    // the flag drops onto the link where the curve crosses what you can afford
    const fp = seg(t, 3.0, 3.26);
    this.po.opacity = fp > 0 ? 1 : 0;
    this.po.transform = 'translateY(' + ((1 - eob(fp, 1.5)) * -230).toFixed(1) + 'px) scaleY(' + eob(fp, 1.3).toFixed(3) + ')';
    UI.slam(this.fl, t, 3.3, 0.2, -2, 1.6);
    UI.slam(this.t, t, 4.15, 0.22, -1.6, 1.6);
    UI.pop(this.gv, t, 4.8, 4, 230);
    UI.pop(this.tg, t, 5.5, -1, 70);
    UI.punch(this.v.roll, t, [3.3, 4.15], 0.045);
  },
});
