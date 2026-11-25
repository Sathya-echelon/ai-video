const { seg, eo, ei, eio, eob, lerp } = kit;
// whips in from the left, the badge is stamped, then two thirds of it floods; drops away downward
const KEYS = [
  { t: 0, cx: -700, cy: 1040, z: 1.08, r: 5 },
  { t: 0.45, from: 0, cx: 540, cy: 1040, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.4, from: 0.55, cx: 540, cy: 1020, z: 1.02, r: -1 },
  { t: 6.2, from: 4.4, cx: 540, cy: 1120, z: 1.0, r: 0 },
  { t: 10.0, from: 9.4, cx: 540, cy: 2600, z: 1.05, r: -4, ease: kit.ei },
];
kit.scene('verdict', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:104px;top:452px;width:880px;gap:8px">' +
        '<span class="sub vd-k">Therefore the toggle is</span>' +
        '<span class="line vd-h1" style="font-size:104px">A claim,</span>' +
        '<span class="line vd-h2" style="font-size:104px">not a control</span>' +
      '</div>' +
      '<div class="vd-bg" style="position:absolute;left:94px;top:888px;width:892px;height:116px;overflow:hidden">' +
        '<span class="stamp solid vd-s" style="left:0;top:0;width:892px;height:116px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:64px;transform-origin:50% 50%">Zero Data Retention</span>' +
        '<div class="cvflood vd-fl" style="width:0px"></div>' +
      '</div>' +
      UI.img(kit, 'stamp.webp', 'vd-hand', 'left:560px;top:470px;width:390px') +
      '<div class="words" style="left:104px;top:1256px;width:700px;gap:10px">' +
        '<span class="num pink vd-n" style="font-size:216px">2/3</span>' +
        '<span class="tag vd-t1">Of ZDR-flagged prompts</span>' +
        '<span class="tag vd-t2">Secret URLs still fetched</span>' +
      '</div>',
      2700, '', 'spot', UI.ghost('Claim', -60, 1560, 470));
    const q = this.v.q;
    this.k = q('.vd-k').style; this.h1 = q('.vd-h1'); this.h2 = q('.vd-h2');
    this.bg = q('.vd-bg').style; this.s = q('.vd-s').style; this.fl = q('.vd-fl').style;
    this.hand = q('.vd-hand').style; this.n = q('.vd-n').style;
    this.t1 = q('.vd-t1').style; this.t2 = q('.vd-t2').style;
    this.l1 = UI.letters(this.h1, 87, 0.5, 0.26);
    this.l2 = UI.letters(this.h2, 88, 0.78, 0.34);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.5));
    UI.reveal(this.l1, t); UI.reveal(this.l2, t);
    // the hand comes down and stamps the badge, then lifts away
    const dn = seg(t, 2.1, 2.72), up = seg(t, 2.86, 3.5);
    this.hand.opacity = dn > 0 && up < 1 ? 1 : 0;
    this.hand.transform = 'translateY(' + (lerp(-420, 92, eo(dn)) - 520 * ei(up)).toFixed(1) + 'px) rotate(' + lerp(-9, -2, eo(dn)).toFixed(2) + 'deg)';
    this.bg.opacity = t >= 2.6 ? 1 : 0;
    UI.slam(this.s, t, 2.68, 0.22, 0, 1.55);
    // two thirds of the badge floods pink
    this.fl.width = (595 * eo(seg(t, 4.6, 5.5))).toFixed(1) + 'px';
    UI.slam(this.n, t, 6.45, 0.26, -2, 1.7);
    UI.pop(this.t1, t, 7.2, -1, 80);
    UI.pop(this.t2, t, 7.55, -1, 80);
    UI.punch(this.v.roll, t, [2.68, 4.6, 6.45], 0.05);
  },
});
