# AI Reel - 27 Nov 2026 - Silent failure in AI-written analysis

Built from the script *"AI Reel Script - 27 Nov 2026 - Silent failure"* with the
`ai4rl-motion-reel` house style (paper collage, pink/blue, Allenoire/Morven/Regarn).

Blue carries "it passed", pink carries "it is wrong" - the whole film turns on that
one pairing, because the topic is a check that only ever looks at the blue side.

| | |
|---|---|
| Film (Claude Motion) | https://claude.ai/artifact/5bFvkSAofJWxU1ejihbzk7 |
| Master | `AI_Silent_Failure_27Nov2026_1080x1920.mp4` - H.264 High 4.1, 1080x1920, 30 fps, yuv420p, CRF 18, AAC 192 kbps 48 kHz stereo, 62.4 s |
| SFX stem | `Silent_Failure_SFX_stem.mp3` - 256 kbps, 48 kHz stereo, 62.424 s, -21.7 LUFS, peak -1.0 dBFS |
| Voice-over | none (video + SFX only, as requested) |
| Script source | `Sathya-echelon/ai-content-researcher-writer`, branch `claude/wonderful-turing-2ohqgb`, `scripts/2026-11-27-silent-failure-ai-code.md` |

## Scenes

| # | id | start | dur | beat |
|---|---|---|---|---|
| 1 | hook | 0:00 | 5.0 | Frame 0 is the hook: a full blue bar at 100% over a pink bar stopped at 31%, from one benchmark run; a gauge ticks beside them and IT RAN. IT'S WRONG. is stamped |
| 2 | ship | 0:05 | 7.0 | A terminal types itself to `status: OPTIMAL` and `finished - 0 errors` in blue while a hand works the mouse; IT SHIPS lands underneath |
| 3 | paper | 0:12 | 7.0 | The paper drops in under a lower third dated 24 Nov 2026 and a loupe; NOT A CRASH turns over into A CLEAN ANSWER TO THE WRONG QUESTION |
| 4 | blind | 0:19 | 9.5 | Split screen: three written rules land on the left, four real ones on the right - the fourth has no match and lands alone in pink; the camera tilts down to an eye with a pink stroke drawn through it |
| 5 | dropped | 0:28.5 | 9.5 | The unmatched rule is crumpled off the board while all four solver checks come back clean; the camera tilts down as a hand stamps OPTIMAL and a confident total counts up to 41,920 |
| 6 | repair | 0:38 | 7.0 | A pink bar climbs from 0.5% to 31% beside a ladder, with the population and tolerance noted on tags |
| 7 | silent | 0:45 | 5.0 | The repaired 31% holds while a hatched pink block floods the remaining 69% under the word SILENT |
| 8 | test | 0:50 | 10.0 | Three input cells land, a hand pushes unit cost from 12.00 to 14.40 and it turns pink, the answer barely moves from 41,920 to 41,930, and a red flag drops and swings to rest |
| 9 | brand | 1:00 | 2.4 | End card: the AI for Real Life logo pops onto the brand blue |

Total 62.4 s.

## Checks run

- **Scene runtime**: all 9 scenes report `state: "final"` through the film's own loader -
  every `init()` and `render(t)` runs clean, no scene falls back to its name card, and the
  renderer reported no `runner error:` lines over the whole film.
- **IG Reels safe zone**: audited over the whole film at 0.1 s steps (624 samples) through
  the film's own DOM. Zero violations held >= 0.4 s against x 44-1029 / y 234-1675 and the
  bottom-right notch rule. Three real overflows found and fixed (`They just run it`,
  `Nothing warns you`, `Change one input` were 2-28 px past the right edge); two over-wide
  tags in `repair` and `test` were rewritten to clear the notch corner. Everything still
  flagged is either a sub-0.2 s camera whip at a scene edge or a `.line` whose letters are
  still at opacity 0 - both confirmed invisible on rendered frames.
- **Poster frame**: t=0 rendered and inspected. Both bars, both numbers and both labels sit
  inside the safe zone; it reads as the hook with no text cut off.
- **Contact sheets**: one frame per scene rendered and looked at twice during the build;
  the split screen and the pacing of the sparse beats were reworked as a result.
- **Glyphs**: every module scanned - the only non-ASCII character in the film is the curly
  apostrophe U+2019, which the house fonts carry. A stray U+2212 minus in `shared.js` was
  replaced with `-`.
- **Score**: `scoretest.js` validates 420 events against the scene clock, all names known
  and all times in range. `mix_silent.py` mirrors `score.js` event for event.
- **Encode**: all 1872 frames (30 fps x 62.4 s) rendered through the film's own renderer,
  then muxed with the stem; the finished file was decoded end to end with no errors.

## No company logos

No company, model or vendor is named on camera, matching the script's own decision. The
terminal is generic Python output and the paper is set in our own type.

`film/modules/` is the exact film source. `mix_silent.py` rebuilds the SFX stem from
`library/sfx/` in the `SathyamoorthyKGit/ai4reallife-video` repo:

```
SFX_WAV=library/sfx/ python3.13 mix_silent.py Silent_Failure_SFX_stem.wav
```
