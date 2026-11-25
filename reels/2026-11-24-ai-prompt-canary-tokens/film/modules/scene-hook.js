const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is already mid-action: the key is half typed and the typist is hammering
const KEYS = [
  { t: 0, cx: 540, cy: 880, z: 1.2, r: -3 },
  { t: 0.5, from: 0.1, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.6, from: 0.55, cx: 540, cy: 915, z: 1.03, r: 1 },
  { t: 5.0, from: 4.6, cx: 1580, cy: 915, z: 1.06, r: 5, ease: kit.ei },
];
const LINE = 'aws_key = AKIA3MJ7QX2VNDPLZC4F';
kit.scene('hook', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:110px;top:410px;width:820px"><span class="tag hk-tg">Planted on purpose</span></div>' +
      '<div class="chat hk-ch" style="left:130px;top:590px;width:790px;height:430px">' +
        '<div class="hd">New prompt - to your AI vendor</div>' +
        '<div class="msg me hk-msg" style="max-width:100%;align-self:stretch"><span class="cvmono hk-tx" style="font-size:36px"></span><span class="hk-cr" style="display:inline-block;width:6px;height:36px;background:#fff;vertical-align:-6px;margin-left:4px"></span></div>' +
      '</div>' +
      UI.img(kit, 'key.webp', 'hk-key', 'left:120px;top:1130px;width:250px') +
      UI.anim(kit, 'typist', 'hk-ty', 'left:620px;top:1150px', 420) +
      '<div class="words" style="left:0;top:770px;width:1080px;align-items:center"><span class="stamp hk-s" style="position:relative;font-size:78px;transform-origin:50% 50%">This key is fake</span></div>',
      2600, '', 'window', UI.ghost('Fake', -60, 1180, 500));
    const q = this.v.q;
    this.tx = q('.hk-tx'); this.cr = q('.hk-cr').style; this.s = q('.hk-s').style;
    this.key = q('.hk-key').style; this.ty = q('.hk-ty').style;
    this.tg = q('.hk-tg').style; this.ch = q('.hk-ch').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.ty, t);
    const done = UI.type(this.tx, LINE, t, -0.85, 26);
    this.cr.opacity = done && t > 1.1 ? 0 : (Math.floor(t / 0.53) % 2 ? 0.2 : 1);
    this.ch.transform = 'rotate(' + (-0.6 + 0.3 * Math.sin(t * 0.9)).toFixed(3) + 'deg)';
    UI.pop(this.key, t, 0.35, -8, 240);
    UI.pop(this.tg, t, 3.35, -1, -70);
    UI.slam(this.s, t, 2.55, 0.24, -4, 1.75);
    UI.punch(this.v.roll, t, [2.55], 0.05);
  },
});
