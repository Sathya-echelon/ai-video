# AI Reel - 24 Nov 2026 - AI Prompt Canary Tokens

Built from the Drive script *"AI Reel Script - 24 Nov 2026 - AI Prompt Canary Tokens"*
with the `ai4rl-motion-reel` house style (paper collage, pink/blue, Allenoire/Morven/Regarn).

| | |
|---|---|
| Film (Claude Motion) | https://claude.ai/artifact/3FSkC7PAegFxfBCPh85aQX |
| Master | `AI_Canary_Tokens_24Nov2026_1080x1920.mp4` - H.264 High, 1080x1920, 30 fps, yuv420p, AAC 48 kHz stereo, 64.4 s, ~3.9 Mbps |
| SFX stem | `Canary_Tokens_SFX_stem.mp3` - 256 kbps, 48 kHz, -22.5 LUFS, peak -1.0 dBFS |
| Voice-over | none (video + SFX only, as requested) |

## Scenes

| # | id | dur | beat |
|---|---|---|---|
| 1 | hook | 5.0 | A typist hammers a fake AWS key into a prompt; THIS KEY IS FAKE |
| 2 | toggle | 9.0 | Privacy page, then the Zero Data Retention switch; AUDIT DONE |
| 3 | tested | 5.0 | Map wakes under the loupe; Dragos tested it |
| 4 | decoy | 8.0 | One prompt splits into a one-off URL and a unique AWS key; the canary |
| 5 | trap | 8.0 | The eye opens over an empty account; LEAKED - AND BY WHOM |
| 6 | scale | 10.0 | Counter to 2,000,000, Jul to Nov, three providers go red |
| 7 | verdict | 10.0 | The badge is stamped, two thirds floods; 2/3 |
| 8 | close | 7.0 | The key struck out; SEND NOTHING YOU CAN'T BURN |
| 9 | brand | 2.4 | AI for Real Life end card |

## Checks run

- All 9 scenes init + render clean (no scene falls back to its name card).
- IG Reels safe zone audited over the whole film at 0.2 s steps: no text outside
  x 44-1029 / y 234-1675, and nothing breaks the bottom-right notch rule.
- Poster frame (t=0) verified inside the safe zone.
- Western-European glyphs only.
- Encoded file decoded end to end with no errors.

`film/modules/` is the exact film source; `mix_canary.py` rebuilds the SFX stem
from `library/sfx/` in the ai4reallife-video repo.
