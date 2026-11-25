# AI Reel - 25 Nov 2026 - Ternary weights: 27B in 5.9 GB

Built from the script *"AI Reel Script - 25 Nov 2026 - Ternary-weight models"*
(`scripts/2026-11-25-ternary-weights-27b-local.md` on `claude/wonderful-turing-2ohqgb`
in `Sathya-echelon/ai-content-researcher-writer`) with the `ai4rl-motion-reel` house
style: paper collage, pink/blue, Allenoire/Morven/Regarn.

| | |
|---|---|
| Film (Claude Motion) | https://claude.ai/artifact/PRoKnB6Nao6maN2p7bHu2m |
| Master | `AI_Ternary_Bonsai_25Nov2026_1080x1920.mp4` - H.264 High 4.1, 1080x1920, 30 fps, yuv420p, AAC 48 kHz stereo, 64.4 s |
| SFX stem | `Ternary_Bonsai_SFX_stem.mp3` - 256 kbps, 48 kHz, -23.2 LUFS, peak -0.9 dBFS |
| Voice-over | none (video + SFX only, as requested) |

## Scenes

| # | id | start | dur | beat |
|---|---|---|---|---|
| 1 | hook | 0.0 | 5.0 | Two rows on the wall: a model file at 5.9 GB and 27 B parameters; BOTH ARE REAL |
| 2 | float | 5.0 | 5.5 | One weight typed out as a long sixteen-bit decimal under a magnifier |
| 3 | fifty | 10.5 | 5.5 | The counter climbs to 54 GB as three servers stack up |
| 4 | three | 16.0 | 5.0 | The decimal crumples; -1, 0 and +1 land as three blocks |
| 5 | grid | 21.0 | 7.0 | 128 cells fill in, each a pink minus, a blue plus or a grey dot |
| 6 | scalef | 28.0 | 6.5 | One shared scale factor, 0.0412, runs down a pink arrow into the grid; UNDER TWO BITS |
| 7 | train | 34.5 | 9.0 | A hammer cracks the model rounded afterwards; below, cells settle into the lattice; NOT BOLTED ON |
| 8 | bench | 43.5 | 7.0 | 75.6 against 80.6 on PrismML's own SWE-bench Verified run; no independent test yet |
| 9 | local | 50.5 | 6.0 | A laptop with the cable pulled clear; code never leaves the building, Apache 2.0 |
| 10 | close | 56.5 | 5.5 | Back on the rows: the parameter count dims, 5.9 GB stays lit; ask what each one costs in bits |
| 11 | brand | 62.0 | 2.4 | AI for Real Life end card |

## Checks run

- All 11 scenes `init()` + `render(t)` run clean against stubs over every frame; the
  offline runner reports no `runner error:` and no scene falls back to its name card.
- IG Reels safe zone audited over the whole film at 0.2 s steps (323 samples, every
  text box measured inside the player's own iframe): no box outside x 44-1029 /
  y 234-1675, and nothing breaks the bottom-right notch rule
  (bottom > 1172 implies right edge <= 900). Camera whips at scene edges excluded.
- Poster frame (t = 0) verified: both rows and the kicker are already on the wall,
  all inside the safe zone, lowest text at y 1075.
- Contact sheet of one frame per scene rendered and reviewed.
- Western European glyphs only across every module (no arrows, ellipses, en dashes
  or minus signs).
- `scoretest.js` validates `score.js`: 282 events, every name and time in range.
- Encoded master decoded end to end with no errors.

## Script fidelity

The verification note on the script says the 75.6 / 80.6 figures are PrismML's own
and that the "on PrismML's own SWE-bench Verified run" qualifier must not be cut.
It is on screen as the scene 8 kicker, with a second tag reading "No independent
test yet". Bits per weight is stated only as "under two bits", never a single
contested figure. No company logo appears anywhere; PrismML is set in our own type.

## Rebuilding

`film/modules/` is the exact film source as pushed to the Motion artifact's store.
`mix_ternary.py` rebuilds the SFX stem; it needs the WAV library from
`SathyamoorthyKGit/ai4reallife-video`:

```
SFX_WAV=<ai4reallife-video>/library/sfx/ python3 mix_ternary.py Ternary_Bonsai_SFX_stem.wav
ffmpeg -y -i Ternary_Bonsai_SFX_stem.wav -c:a libmp3lame -b:a 256k -ar 48000 Ternary_Bonsai_SFX_stem.mp3
```

Stickers are reused from the reel library in that repo: `floppy`, `crumple`,
`hammer` and `dart` as 6-frame sprite strips, `magnifier`, `server`, `chips`,
`scale`, `brain`, `laptop` and `plug` as stills.
