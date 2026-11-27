# ai-video

Nightly **AI for Real Life** reels, built from the scripts that land in Google Drive at 11pm.

Each night at 11:30pm Asia/Colombo a Claude session reads the latest dated script - from the
Drive folder, or from `Sathya-echelon/ai-content-researcher-writer` (branch
`claude/wonderful-turing-2ohqgb`, `scripts/`) when the Drive connector is not available in the
session - builds it as a Claude Motion film in the `ai4rl-motion-reel` house style,
verifies it, renders the master offline and commits it here under `reels/<date>-<slug>/`.

Style, fonts, SFX library and the nine reference reels live in
`SathyamoorthyKGit/ai4reallife-video`.

| Reel | Date | Topic |
|---|---|---|
| [2026-11-24](reels/2026-11-24-ai-prompt-canary-tokens/) | 24 Nov 2026 | AI prompt canary tokens |
| [2026-11-27](reels/2026-11-27-silent-failure-ai-code/) | 27 Nov 2026 | Silent failure in AI-written analysis |
