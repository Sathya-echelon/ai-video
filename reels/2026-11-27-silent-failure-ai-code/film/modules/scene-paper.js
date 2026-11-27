const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above (the last scene fell away downward), holds, then whips out left
const KEYS = [
  { t: 0, cx: 540, cy: -340, z: 1.08, r: 3 },
  { t: 0.44, from: 0, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },
  { t: 6.4, from: 0.54, cx: 540, cy: 974, z: 1.03, r: -1 },
  { t: 7.0, from: 6.4, cx: -660, cy: 974, z: 1.06, r: -5, ease: kit.ei },
];
kit.scene('paper', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:398px;width:900px"><span class="sub pp-k">A paper landed Tuesday</span></div>' +
      '<div class="lt pp-lt" style="left:90px;top:470px;width:520px;box-sizing:border-box">' +
        '<b>Failure patterns</b><span>In AI-built optimisation</span></div>' +
      UI.img(kit, 'page.webp', 'pp-pg', 'left:660px;top:452px;width:290px') +
      '<div class="words" style="left:90px;top:736px;width:900px;gap:4px">' +
        '<span class="sub pp-k2">The main failure is</span>' +
        '<span class="line pp-h1" style="font-size:112px">Not a crash</span>' +
      '</div>' +
      '<div class="words" style="left:90px;top:960px;width:900px;gap:2px">' +
        '<span class="line pink pp-h2" style="font-size:94px">A clean answer</span>' +
        '<span class="line pp-h3" style="font-size:94px">to the wrong</span>' +
        '<span class="line pp-h4" style="font-size:94px">question</span>' +
      '</div>' +
      UI.img(kit, 'loupe.webp', 'pp-lp', 'left:700px;top:1134px;width:250px') +
      '<div class="words" style="left:90px;top:1396px;width:760px"><span class="tag pp-tg">Submitted 24 Nov 2026</span></div>',
      2500, '', 'spot', UI.ghost('Clean', -60, 1310, 480));
    const q = this.v.q;
    this.k = q('.pp-k').style; this.k2 = q('.pp-k2').style;
    this.lt = q('.pp-lt').style; this.pg = q('.pp-pg').style; this.lp = q('.pp-lp').style;
    this.h1 = q('.pp-h1'); this.h2 = q('.pp-h2'); this.h3 = q('.pp-h3'); this.h4 = q('.pp-h4');
    this.tg = q('.pp-tg').style;
    this.l1 = UI.letters(this.h1, 51, 1.45, 0.3);
    this.l2 = UI.letters(this.h2, 52, 2.70, 0.26);
    this.l3 = UI.letters(this.h3, 53, 3.02, 0.26);
    this.l4 = UI.letters(this.h4, 54, 3.32, 0.22);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.5));
    UI.pop(this.pg, t, 0.62, 4, 230);
    UI.card(this.lt, t, 0.88, 99, -1.5, -140);
    this.k2.opacity = eo(seg(t, 1.15, 1.42));
    UI.reveal(this.l1, t); UI.reveal(this.l2, t); UI.reveal(this.l3, t); UI.reveal(this.l4, t);
    UI.pop(this.lp, t, 3.95, -5, 220);
    UI.pop(this.tg, t, 4.75, -1, 70);
    UI.punch(this.v.roll, t, [1.45, 2.70], 0.04);
  },
});
