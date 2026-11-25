const { seg, eo, ei, eio, eob, lerp } = kit;
// enters from above, reads the privacy page, tilts down to the settings panel, whips out left
const KEYS = [
  { t: 0, cx: 540, cy: -340, z: 1.08, r: 4 },
  { t: 0.42, from: 0, cx: 540, cy: 880, z: 1.0, r: 0, ease: kit.eox },
  { t: 4.1, from: 0.5, cx: 540, cy: 902, z: 1.03, r: 0 },
  { t: 4.75, from: 4.1, cx: 540, cy: 2010, z: 1.0, r: -1 },
  { t: 8.5, from: 4.85, cx: 540, cy: 2032, z: 1.03, r: 0 },
  { t: 9.0, from: 8.5, cx: -780, cy: 2032, z: 1.06, r: -5, ease: kit.ei },
];
const WID = [560, 630, 500, 648, 430, 580];
kit.scene('toggle', {
  init(kit) {
    const bars = WID.map((w, i) => '<div class="tg-ln" style="position:absolute;left:44px;top:' + (150 + i * 74) + 'px;height:20px;width:' + w + 'px;background:color-mix(in srgb, var(--second) 18%, var(--ground))"></div>').join('');
    const row = (cls, label, top) => '<div class="cvrow ' + cls + '" style="left:134px;top:' + top + 'px;width:812px;height:112px"><span>' + label + '</span><span class="cvtg ' + cls + '-t"><i class="' + cls + '-k"></i></span></div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:90px;top:424px;width:900px;gap:16px">' +
        '<span class="sub tg-k">How most teams audit a vendor</span>' +
        '<span class="line tg-h" style="font-size:104px">Read the page</span>' +
      '</div>' +
      '<div class="panel tg-doc" style="left:180px;top:700px;width:720px;height:612px">' +
        '<div class="lbl" style="position:absolute;left:44px;top:56px;font-size:30px">Data processing addendum</div>' + bars +
        '<div class="tg-hi" style="position:absolute;left:38px;top:364px;height:34px;width:500px;background:var(--main);opacity:.9;mix-blend-mode:multiply"></div>' +
      '</div>' +
      UI.img(kit, 'loupe.webp', 'tg-lp', 'left:540px;top:900px;width:420px') +
      '<div class="panel tg-pan" style="left:90px;top:1780px;width:900px;height:452px">' +
        '<div class="lbl" style="position:absolute;left:44px;top:44px;font-size:30px">Vendor settings</div>' +
      '</div>' +
      row('tg-r1', 'Log prompts', 1900) + row('tg-r2', 'Zero Data Retention', 2048) +
      '<svg class="art tg-sv" viewBox="0 0 1080 3000" preserveAspectRatio="none"><path class="pk-line tg-tick" style="stroke-width:28" d="M300 2004 l96 118 l244 -290"/></svg>' +
      UI.img(kit, 'toggle.webp', 'tg-st', 'left:648px;top:2130px;width:330px') +
      '<div class="words" style="left:100px;top:2338px;width:560px"><span class="stamp tg-s" style="position:relative;font-size:66px;transform-origin:0 50%">Audit done</span></div>',
      3000, '', 'window', UI.ghost('Policy', -70, 1260, 440));
    const q = this.v.q;
    this.k = q('.tg-k').style; this.h = q('.tg-h'); this.doc = q('.tg-doc').style;
    this.hi = q('.tg-hi').style; this.lp = q('.tg-lp').style; this.pan = q('.tg-pan').style;
    this.r1 = q('.tg-r1').style; this.r2 = q('.tg-r2').style;
    this.t2 = q('.tg-r2-t').style; this.k2 = q('.tg-r2-k').style;
    this.t1 = q('.tg-r1-t').style; this.k1 = q('.tg-r1-k').style;
    this.st = q('.tg-st').style; this.s = q('.tg-s').style;
    this.tick = UI.draw(q('.tg-tick'));
    this.hl = UI.letters(this.h, 71, 0.55, 0.42);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.25, 0.55));
    UI.reveal(this.hl, t);
    // the privacy page slides up and the clause highlights
    const d = seg(t, 0.75, 1.15);
    this.doc.opacity = d > 0 ? 1 : 0;
    this.doc.transform = 'translateY(' + lerp(180, 0, eob(d, 1.3)) + 'px) rotate(' + lerp(3, -1, eo(d)) + 'deg)';
    this.hi.transform = 'scaleX(' + eo(seg(t, 2.05, 2.5)) + ')';
    this.hi.transformOrigin = '0 50%';
    UI.pop(this.lp, t, 1.5, -6, 220);
    // the settings panel and its two rows
    const p = seg(t, 4.55, 4.9);
    this.pan.opacity = p > 0 ? 1 : 0;
    this.pan.transform = 'scale(' + lerp(0.94, 1, eob(p, 1.3)) + ')';
    UI.slam(this.r1, t, 4.78, 0.2, 0, 1.25);
    UI.slam(this.r2, t, 4.98, 0.2, 0, 1.25);
    this.t1.background = '#c3c3c3'; this.k1.transform = 'translateX(0px)';
    const on = seg(t, 5.42, 5.76);
    this.t2.background = on > 0.5 ? 'var(--main)' : '#c3c3c3';
    this.k2.transform = 'translateX(' + lerp(0, 48, eob(on, 1.5)).toFixed(1) + 'px)';
    this.tick(eo(seg(t, 6.0, 6.55)));
    UI.pop(this.st, t, 6.2, 5, 260);
    UI.slam(this.s, t, 7.05, 0.24, -3, 1.7);
    UI.punch(this.v.roll, t, [4.78, 5.42, 7.05], 0.045);
  },
});
