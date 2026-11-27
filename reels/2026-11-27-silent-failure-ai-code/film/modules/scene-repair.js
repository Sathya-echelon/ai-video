const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above (the last scene fell away downward), holds, whips out left
const KEYS = [
  { t: 0, cx: 540, cy: -340, z: 1.08, r: 3 },
  { t: 0.44, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 6.4, from: 0.54, cx: 540, cy: 976, z: 1.03, r: -1 },
  { t: 7.0, from: 6.4, cx: -660, cy: 976, z: 1.06, r: -5, ease: kit.ei },
];
const TW = 692;
kit.scene('repair', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px;gap:4px">' +
        '<span class="sub rp-k">They built a check for it</span>' +
        '<span class="line rp-h" style="font-size:92px">Half a percent</span>' +
        '<span class="line pink rp-h2" style="font-size:92px">to thirty-one</span>' +
      '</div>' +
      '<div class="words" style="left:90px;top:766px;width:760px"><span class="num pink rp-n" style="font-size:160px">0.5%</span></div>' +
      '<div class="sfhd rp-m1" style="left:90px;top:1006px">Before</div><div class="sfhd rp-m2" style="left:312px;top:1006px">After</div><div class="sftrk rp-t" style="left:90px;top:930px;width:700px"><div class="sffill pk rp-f" style="width:0px"></div></div>' +
      UI.anim(kit, 'ladder', 'rp-ld', 'left:756px;top:688px', 250) +
      '<div class="words" style="left:90px;top:1058px;width:760px"><span class="tag rp-tg">Correctness on that benchmark</span></div>' +
      '<div class="words" style="left:90px;top:1156px;width:760px"><span class="tag rp-tg2">Best run, strict tolerance</span></div>',
      2500, '', 'spot', UI.ghost('Repair', -70, 1340, 440));
    const q = this.v.q;
    this.k = q('.rp-k').style; this.h = q('.rp-h'); this.h2 = q('.rp-h2');
    this.n = q('.rp-n'); this.f = q('.rp-f').style; this.t = q('.rp-t').style;
    this.ld = q('.rp-ld').style; this.m1 = q('.rp-m1').style; this.m2 = q('.rp-m2').style; this.tg = q('.rp-tg').style; this.tg2 = q('.rp-tg2').style;
    this.hl = UI.letters(this.h, 81, 0.5, 0.3);
    this.l2 = UI.letters(this.h2, 82, 0.86, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.ld, t);
    this.k.opacity = eo(seg(t, 0.15, 0.45));
    UI.reveal(this.hl, t); UI.reveal(this.l2, t);
    UI.pop(this.t, t, 1.5, 0, 90);
    UI.pop(this.ld, t, 1.75, -3, 240);
    // the bar climbs from half a percent to thirty-one
    const p = eo(seg(t, 2.3, 4.6)), v = lerp(0.5, 31, p);
    this.n.textContent = (v < 1 ? v.toFixed(1) : Math.round(v)) + '%';
    this.n.style.opacity = t >= 1.7 ? 1 : 0;
    this.f.width = Math.max(10, TW * v / 100).toFixed(1) + 'px';
    this.m1.opacity = eo(seg(t, 1.9, 2.15)) * (1 - eo(seg(t, 3.4, 3.8)));
    this.m2.opacity = eo(seg(t, 4.3, 4.6));
    UI.pop(this.tg, t, 4.9, -1, 70);
    UI.pop(this.tg2, t, 5.3, -1, 70);
    UI.punch(this.v.roll, t, [2.3, 4.6], 0.04);
  },
});
