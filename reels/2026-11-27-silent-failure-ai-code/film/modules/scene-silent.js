const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the right, one held frame on the gap, whips out right again
const KEYS = [
  { t: 0, cx: 1640, cy: 960, z: 1.1, r: -5 },
  { t: 0.42, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.5, from: 0.52, cx: 540, cy: 972, z: 1.04, r: 1 },
  { t: 5.0, from: 4.5, cx: 1640, cy: 972, z: 1.08, r: 5, ease: kit.ei },
];
const TW = 692;
kit.scene('silent', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px;gap:4px">' +
        '<span class="sub sl-k">Thirty-one is repaired</span>' +
        '<span class="line sl-h" style="font-size:106px">The rest is</span>' +
        '<span class="line pink sl-h2" style="font-size:150px">Silent</span>' +
      '</div>' +
      '<div class="sftrk sl-t" style="left:90px;top:942px;width:700px">' +
        '<div class="sffill sl-f" style="width:215px"></div>' +
        '<div class="sfhatch sl-x" style="left:215px;width:0px"></div>' +
      '</div>' +
      '<div class="sfhd sl-hd1" style="left:90px;top:1022px">Right 31</div>' +
      '<div class="sfhd sl-hd2" style="left:386px;top:1022px">Wrong, and quiet 69</div>' +
      '<div class="words" style="left:90px;top:1118px;width:760px"><span class="num pink sl-n" style="font-size:176px">69%</span></div>' +
      '<div class="words" style="left:90px;top:1358px;width:760px"><span class="tag sl-tg">Ran clean. Came back wrong.</span></div>',
      2500, '', 'dark', UI.ghost('Quiet', -70, 1280, 470));
    const q = this.v.q;
    this.k = q('.sl-k').style; this.h = q('.sl-h'); this.h2 = q('.sl-h2');
    this.t = q('.sl-t').style; this.x = q('.sl-x').style;
    this.hd1 = q('.sl-hd1').style; this.hd2 = q('.sl-hd2').style;
    this.n = q('.sl-n'); this.tg = q('.sl-tg').style;
    this.hl = UI.letters(this.h, 91, 0.42, 0.26);
    this.l2 = UI.letters(this.h2, 92, 0.78, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.12, 0.4));
    UI.reveal(this.hl, t); UI.reveal(this.l2, t);
    UI.pop(this.t, t, 1.15, 0, 80);
    // the pink hatched block floods out across the rest of the bar
    this.x.width = ((TW - 215) * eo(seg(t, 1.5, 2.5))).toFixed(1) + 'px';
    this.hd1.opacity = eo(seg(t, 1.45, 1.7));
    this.hd2.opacity = eo(seg(t, 2.35, 2.6));
    this.n.textContent = Math.round(lerp(0, 69, eo(seg(t, 1.6, 2.6)))) + '%';
    this.n.style.opacity = t >= 1.6 ? 1 : 0;
    UI.pop(this.tg, t, 3.3, -1, 70);
    UI.punch(this.v.roll, t, [1.5, 2.6], 0.045);
  },
});
