const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the right (the hook left to the right), holds on the terminal, drops away downward
const KEYS = [
  { t: 0, cx: 1620, cy: 960, z: 1.07, r: -5 },
  { t: 0.46, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 6.4, from: 0.56, cx: 540, cy: 972, z: 1.03, r: -1 },
  { t: 7.0, from: 6.4, cx: 540, cy: 2360, z: 1.05, r: 3, ease: kit.ei },
];
const LINES = [
  { t: 0.95, c: '', s: '> python allocate.py' },
  { t: 1.55, c: '', s: 'reading demand.csv ...' },
  { t: 2.05, c: '', s: 'building model ...' },
  { t: 2.55, c: '', s: 'solving ...' },
  { t: 3.25, c: 'ok', s: 'status: OPTIMAL' },
  { t: 3.65, c: 'ok', s: 'total cost: 41,920' },
  { t: 4.25, c: 'ok', s: 'finished - 0 errors' },
];
kit.scene('ship', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px;gap:6px">' +
        '<span class="sub sh-k">The cheapest check</span>' +
        '<span class="line sh-h" style="font-size:96px">They just run it</span>' +
      '</div>' +
      '<div class="sfterm sh-tm" style="left:90px;top:626px;width:760px;height:492px">' +
        '<div class="tb"><i></i><i></i><i></i></div>' +
        LINES.map((L, i) => '<p class="' + L.c + ' sh-l' + i + '"></p>').join('') +
      '</div>' +
      UI.anim(kit, 'handmouse', 'sh-hm', 'left:688px;top:1070px', 310) +
      '<div class="words" style="left:90px;top:1262px;width:700px"><span class="stamp sh-s" style="position:relative;font-size:78px;transform-origin:0 50%">It ships</span></div>' +
      '<div class="words" style="left:90px;top:1418px;width:760px"><span class="tag sh-tg">It did not crash, so it shipped</span></div>',
      2500, '', 'soft', UI.ghost('Run', -60, 1210, 500));
    const q = this.v.q;
    this.k = q('.sh-k').style; this.h = q('.sh-h');
    this.tm = q('.sh-tm').style; this.hm = q('.sh-hm').style;
    this.s = q('.sh-s').style; this.tg = q('.sh-tg').style;
    this.l = LINES.map((L, i) => q('.sh-l' + i));
    this.hl = UI.letters(this.h, 41, 0.5, 0.34);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.hm, t);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.hl, t);
    UI.pop(this.tm, t, 0.72, -0.6, 200);
    UI.pop(this.hm, t, 0.6, -3, 230);
    this.l.forEach((el, i) => { UI.type(el, LINES[i].s, t, LINES[i].t, 34); });
    UI.slam(this.s, t, 5.1, 0.24, -3, 1.65);
    UI.pop(this.tg, t, 5.65, -1, 70);
    UI.punch(this.v.roll, t, [3.25, 5.1], 0.045);
  },
});
