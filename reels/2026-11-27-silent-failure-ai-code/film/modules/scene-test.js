const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left, works the cells, tilts down to the flag, pulls back for the end card
const KEYS = [
  { t: 0, cx: -680, cy: 960, z: 1.1, r: 5 },
  { t: 0.46, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.6, from: 0.56, cx: 540, cy: 976, z: 1.03, r: 0 },
  { t: 6.3, from: 5.6, cx: 540, cy: 1960, z: 1.0, r: 1 },
  { t: 9.5, from: 6.4, cx: 540, cy: 1974, z: 1.03, r: 0 },
  { t: 10.0, from: 9.5, cx: 540, cy: 1974, z: 1.22, r: -3, ease: kit.ei },
];
const CELLS = [
  { x: 90, lab: 'Unit cost', a: '12.00', b: '14.40' },
  { x: 356, lab: 'Capacity', a: '900', b: '900' },
  { x: 622, lab: 'Demand', a: '740', b: '740' },
];
kit.scene('test', {
  init(kit) {
    const cells = CELLS.map((c, i) =>
      '<div class="sfcl ts-c' + i + '" style="left:' + c.x + 'px;top:634px;width:240px;height:160px"><small>' + c.lab + '</small><b class="ts-v' + i + '">' + c.a + '</b></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px;gap:4px">' +
        '<span class="sub ts-k">So stop asking if it ran</span>' +
        '<span class="line ts-h" style="font-size:92px">Change one input</span>' +
      '</div>' + cells +
      UI.anim(kit, 'hand', 'ts-hd', 'left:120px;top:800px', 230) +
      '<div class="sfhd ts-hd2" style="left:90px;top:1118px">The answer it gives back</div>' +
      '<div class="words" style="left:90px;top:1156px;width:760px"><span class="num bluet ts-n" style="font-size:140px">41,920</span></div>' +
      '<div class="words" style="left:90px;top:1330px;width:700px"><span class="tag ts-tg">It barely moved</span></div>' +
      '<div class="words" style="left:90px;top:1648px;width:900px;gap:2px">' +
        '<span class="line ts-h2" style="font-size:98px">If it will not</span>' +
        '<span class="line ts-h3" style="font-size:98px">move with you,</span>' +
        '<span class="line pink ts-h4" style="font-size:98px">it is wrong</span>' +
      '</div>' +
      '<div class="ts-fg" style="position:absolute;left:600px;top:1990px;width:290px;height:300px;transform-origin:8px 300px">' +
        '<div class="sfpole" style="left:0;top:0;height:300px"></div>' +
        '<div class="sffl">Red flag</div></div>' +
      '<div class="words" style="left:90px;top:2290px;width:760px"><span class="tag ts-tg2">Execution never checked it</span></div>',
      2900, '', 'window', UI.ghost('Move', -70, 1530, 470));
    const q = this.v.q;
    this.k = q('.ts-k').style; this.h = q('.ts-h');
    this.c = CELLS.map((_, i) => q('.ts-c' + i));
    this.cs = this.c.map(e => e.style);
    this.val = CELLS.map((_, i) => q('.ts-v' + i));
    this.hd = q('.ts-hd').style; this.hd2 = q('.ts-hd2').style;
    this.n = q('.ts-n'); this.tg = q('.ts-tg').style; this.tg2 = q('.ts-tg2').style;
    this.fg = q('.ts-fg').style;
    this.h2 = q('.ts-h2'); this.h3 = q('.ts-h3'); this.h4 = q('.ts-h4');
    this.hl = UI.letters(this.h, 101, 0.55, 0.32);
    this.l2 = UI.letters(this.h2, 102, 6.6, 0.26);
    this.l3 = UI.letters(this.h3, 103, 6.92, 0.26);
    this.l4 = UI.letters(this.h4, 104, 7.26, 0.26);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.hd, t);
    // part A clears before the tilt, so nothing stale hangs at the top of part B
    const fa = 1 - eo(seg(t, 5.5, 5.9));
    this.k.opacity = eo(seg(t, 0.2, 0.5)) * fa;
    UI.reveal(this.hl, t); this.h.style.opacity = fa;
    this.cs.forEach((st, i) => { UI.slam(st, t, 1.2 + i * 0.26, 0.2, 0, 1.45); st.opacity = (+st.opacity || 0) * fa; });
    UI.pop(this.hd, t, 1.9, -4, 230); this.hd.opacity = (+this.hd.opacity || 0) * fa;
    // one cell is pushed up; it turns pink, the others hold
    const ch = t >= 2.55;
    this.val[0].textContent = ch ? CELLS[0].b : CELLS[0].a;
    this.c[0].classList.toggle('on', ch);
    this.cs[0].transform = 'translateY(' + (ch ? -14 * Math.exp(-(t - 2.55) * 5) : 0).toFixed(2) + 'px)';
    this.hd2.opacity = eo(seg(t, 3.2, 3.5)) * fa;
    // the result barely moves: 41,920 to 41,930
    this.n.textContent = UI.num(lerp(41920, 41930, eo(seg(t, 3.5, 4.3))));
    this.n.style.opacity = (t >= 3.3 ? 1 : 0) * fa;
    UI.pop(this.tg, t, 4.4, -1, 70); this.tg.opacity = (+this.tg.opacity || 0) * fa;
    UI.reveal(this.l2, t); UI.reveal(this.l3, t); UI.reveal(this.l4, t);
    // the flag drops in and swings to rest
    const fp = seg(t, 7.9, 8.5);
    this.fg.opacity = fp > 0 ? 1 : 0;
    this.fg.transform = 'rotate(' + (fp < 1 ? lerp(-46, 0, eob(fp, 1.5)) : Math.sin((t - 8.5) * 7) * 2.4 * Math.exp(-(t - 8.5) * 2.2)).toFixed(2) + 'deg)';
    UI.pop(this.tg2, t, 8.8, -1, 70);
    UI.punch(this.v.roll, t, [2.55, 4.3, 7.9], 0.045);
  },
});
