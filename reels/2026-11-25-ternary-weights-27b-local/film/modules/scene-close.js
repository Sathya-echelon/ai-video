const { seg, eo, ei, eio, eob, lerp } = kit;
// back on the opening rows, pushed in; the parameter row dims and the file size stays lit
const KEYS = [
  { t: 0, cx: -500, cy: 760, z: 1.05, r: 3 },
  { t: 0.45, from: 0, cx: 540, cy: 760, z: 1.0, r: 0, ease: kit.eox },
  { t: 5.0, from: 0.5, cx: 540, cy: 776, z: 1.05, r: 0 },
  { t: 5.5, from: 5.0, cx: 540, cy: 786, z: 1.09, r: -1 },
];
kit.scene('close', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="twrow cl-r1" style="left:140px;top:380px;width:800px;height:150px"><b>Model file</b><i class="pink twmono">5.9 GB</i></div>' +
      '<div class="twrow cl-r2" style="left:140px;top:560px;width:800px;height:150px"><b>Parameters</b><i class="bluet twmono">27 B</i></div>' +
      '<div class="cl-dim twdim" style="left:140px;top:560px;width:800px;height:150px"></div>' +
      '<div class="words" style="left:140px;top:800px;width:800px;gap:10px;align-items:flex-start">' +
        '<span class="sub cl-k">Not how many parameters</span>' +
        '<span class="line cl-h" style="font-size:76px">Ask what each</span>' +
        '<span class="line pink cl-h2" style="font-size:76px">one costs in bits</span>' +
      '</div>' +
      UI.anim(kit, 'floppy', 'cl-fl', 'left:700px;top:1120px', 300),
      2600, '', 'window', UI.ghost('Bits', -50, 1200, 480));
    const q = this.v.q;
    this.r1 = q('.cl-r1').style; this.r2 = q('.cl-r2').style; this.dm = q('.cl-dim').style;
    this.k = q('.cl-k').style; this.h = q('.cl-h'); this.h2 = q('.cl-h2'); this.fl = q('.cl-fl').style;
    this.hl = UI.letters(this.h, 91, 1.05, 0.3);
    this.hl2 = UI.letters(this.h2, 92, 1.35, 0.36);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.frame(this.fl, t);
    this.r1.opacity = 1;
    this.r1.transform = 'rotate(' + (-0.5 + 0.25 * Math.sin(t * 0.8)).toFixed(3) + 'deg)';
    this.r2.opacity = 1;
    this.r2.transform = 'rotate(' + (0.4 + 0.2 * Math.sin(t * 0.7 + 1)).toFixed(3) + 'deg)';
    // the parameter count fades back; the file size keeps its colour
    this.dm.opacity = (0.72 * eo(seg(t, 0.7, 1.4))).toFixed(3);
    this.dm.transform = this.r2.transform;
    this.k.opacity = eo(seg(t, 0.55, 0.9));
    UI.reveal(this.hl, t); UI.reveal(this.hl2, t);
    UI.pop(this.fl, t, 2.6, 6, 200);
    UI.punch(this.v.roll, t, [0.7, 2.6], 0.04);
  },
});
