const { seg, eo, ei, eio, eob, lerp } = kit;
// drops in from above onto the diagram, builds it layer by layer, whips out left
const KEYS = [
  { t: 0, cx: 540, cy: -220, z: 1.1, r: 3 },
  { t: 0.42, from: 0, cx: 540, cy: 1080, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.2, from: 0.5, cx: 540, cy: 1100, z: 1.03, r: 0 },
  { t: 6.0, from: 4.2, cx: 540, cy: 1150, z: 1.02, r: -1 },
  { t: 8.0, from: 7.5, cx: -760, cy: 1150, z: 1.04, r: -5, ease: kit.ei },
];
// a paper card for one half of the decoy: a kicker, the thing itself, and the value under it
const slip = (cls, x, y, kick, name, val) =>
  '<div class="clip ' + cls + '" style="left:' + x + 'px;top:' + y + 'px;width:400px;height:258px;gap:10px">' +
    '<span class="lbl" style="font-size:26px">' + kick + '</span>' +
    '<span class="blk" style="font-size:54px">' + name + '</span>' +
    '<span class="cvmono" style="font-size:25px;color:color-mix(in srgb, var(--second) 72%, var(--ground))">' + val + '</span></div>';
kit.scene('decoy', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:104px;top:500px;width:880px;gap:16px">' +
        '<span class="sub dc-k">Every prompt carried</span>' +
        '<span class="line dc-h" style="font-size:100px">A unique decoy</span>' +
      '</div>' +
      '<svg class="art dc-sv" viewBox="0 0 1080 2600" preserveAspectRatio="none">' +
        '<path class="cvwire dc-w1" d="M520 925 C470 990 360 1000 300 1072"/>' +
        '<path class="cvwire dc-w2" d="M560 925 C610 990 720 1000 760 1072"/>' +
      '</svg>' +
      '<div class="words" style="left:0;top:842px;width:1080px;align-items:center"><span class="node dc-n" style="position:relative;font-size:50px">One prompt</span></div>' +
      slip('dc-c1', 100, 1080, 'One-off', 'Decoy URL', 'canary-7f3a2b.example') +
      slip('dc-c2', 560, 1080, 'Unique', 'AWS key', 'AKIA3MJ7QX2VNDPLZC4F') +
      UI.anim(kit, 'bird', 'dc-bd', 'left:150px;top:1450px', 280) +
      '<div class="words" style="left:410px;top:1570px;width:460px"><span class="tag dc-tg">No legitimate use</span></div>',
      2600, '', 'spot', UI.ghost('Canary', -70, 1420, 430));
    const q = this.v.q;
    this.k = q('.dc-k').style; this.h = q('.dc-h'); this.n = q('.dc-n').style;
    this.c1 = q('.dc-c1').style; this.c2 = q('.dc-c2').style;
    this.bd = q('.dc-bd').style; this.tg = q('.dc-tg').style;
    this.w1 = UI.draw(q('.dc-w1')); this.w2 = UI.draw(q('.dc-w2'));
    this.hl = UI.letters(this.h, 77, 0.5, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.5));
    UI.reveal(this.hl, t);
    UI.slam(this.n, t, 1.5, 0.22, -2, 1.6);
    this.w1(eo(seg(t, 2.0, 2.45)));
    this.w2(eo(seg(t, 2.2, 2.65)));
    UI.card(this.c1, t, 2.35, 99, -2, -140);
    UI.card(this.c2, t, 2.6, 99, 2, -140);
    UI.frame(this.bd, t);
    UI.pop(this.bd, t, 4.4, -3, 260);
    UI.pop(this.tg, t, 5.9, -1, 90);
    UI.punch(this.v.roll, t, [1.5, 2.35, 2.6, 4.4], 0.045);
  },
});
