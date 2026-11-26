# AI Reel - 26 Nov 2026 - Why a "95% accurate" agent is a 36% workflow

Built from the upstream script `scripts/2026-11-26-agent-reliability-compounds.md`
(*"AI Reel Script - 26 Nov 2026 - Why a 95% accurate AI agent is a 36% workflow"*)
with the `ai4rl-motion-reel` house style (paper collage, pink/blue, Allenoire/Morven/Regarn).

| | |
|---|---|
| Film (Claude Motion) | https://claude.ai/artifact/L5CLAN4ueYfubbxADx86Ch |
| Master | `AI_Agent_Reliability_26Nov2026_1080x1920.mp4` - H.264 High 4.1, 1080x1920, 30 fps, yuv420p, CRF 18, AAC 48 kHz stereo 192 kbps, 64.4 s |
| SFX stem | `Agent_Reliability_SFX_stem.mp3` - 256 kbps, 48 kHz, -22.0 LUFS, peak -1.0 dBFS |
| Voice-over | none (video + SFX only, as requested) |

## Scenes

| # | id | start | dur | beat |
|---|---|---|---|---|
| 1 | hook | 0:00 | 5.0 | TWENTY STEPS over a calculator typing `0.95 ^ 20 =`; the result counts to 0.3585 and a pink stamp slams 36% |
| 2 | slide | 0:05 | 10.0 | The vendor deck: one 95% ACCURATE badge with a dart in it, tapes ONE TASK / ONE DEMO / ONE NUMBER, then a tilt down to HOW MANY STEPS |
| 3 | chain | 0:15 | 5.0 | Twenty links fill in; link seven goes grey and every link after it follows - IT MULTIPLIES |
| 4 | power | 0:20 | 8.0 | The formula builds: SUCCESS = R to the N, with R and N named on a pink and a blue node |
| 5 | curve | 0:28 | 9.0 | The curve draws down the axis; markers land at 5: 77%, 10: 60%, 20: 36%, 50: 8% |
| 6 | study | 0:37 | 8.0 | NINE MODELS, a counter to 10,664 agent runs, A GEOMETRIC LAW - step count, not context length |
| 7 | back | 0:45 | 10.0 | Solve backwards to 99.5% per step, then a tilt down to 42% expecting autonomy against 5% with the controls |
| 8 | close | 0:55 | 7.0 | COUNT THE STEPS; a checkpoint flag drops onto the link where the curve crosses what you can afford to lose |
| 9 | brand | 1:02 | 2.4 | AI for Real Life end card |

## Checks run

- Every scene's `init()` and `render(t)` run clean against stubs at 30 fps across its whole
  duration, plus `render(0)`; no scene falls back to its name card.
- The film loads in the Motion runner with no `runner error:` lines.
- IG Reels safe zone audited over the whole film at 0.2 s steps (323 samples, measured in the
  runner's own DOM through `__animation.seek`): **0 violations held >= 0.4 s**. Boxes wholly or
  mostly off-frame, letters still at opacity 0, and the ~0.7 s camera whips at scene edges are
  excluded. Part-A text now fades before the two camera tilts (`slide`, `back`) so nothing hangs
  at the top of frame.
- Poster frame (t=0) checked box by box: inside x 44-1029 / y 234-1675 and legible.
- Contact sheet of one frame per scene reviewed before export.
- Glyphs: every module is pure ASCII (no arrows, ellipses or en dashes).
- `score.js` validated offline with `scoretest.js` (273 events, all names and times legal).
- Encoded master decoded end to end with no errors; stream properties verified with ffprobe.

## Sources behind the numbers

Carried over from the script's own verification note:

- 42% expect agents to act autonomously by 2030; 5% have the full set of agent controls -
  BCG, *Applied AI Index 2026*. These are two different measures (a stated expectation against
  current reported practice) and the film states them as two separate bars, labelled as such.
- The geometric decay law (9 models, 10,664 trajectories) - Mittal, *How Fast Do Agents Rot?*,
  arXiv:2609.01660. The film says "a recent study" rather than naming a month.
- `0.95^20 = 0.3585` and `0.90^(1/20) = 99.475%` - arithmetic, computed directly.
- 95% per step is used as an illustrative figure, labelled as such on screen, not as a measured rate.

`film/modules/` is the exact film source; `mix_agent.py` rebuilds the SFX stem from
`library/sfx/` in the `SathyamoorthyKGit/ai4reallife-video` repo
(`SFX_WAV=library/sfx/ python3 mix_agent.py stem.wav`, needs numpy + scipy).
