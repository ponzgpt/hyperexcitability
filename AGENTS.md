# hyperexcitability
Interactive study atlas of the EURO-NMD webinar "Muscle hyperexcitability and cramps" (Montagnese, 2023), for clinical neurophysiologists. Live: https://hyperexcitability.technoir.cloud

## Commands
- Check (before every commit and deploy): `node scripts/check.mjs`
- Dev: open `atlas.html` in a browser
- Deploy: `./scripts/deploy.sh`

## Non-negotiables
1. `atlas.html` has no document skeleton: it is also published as a Claude artifact, which adds its own. `head.html` supplies the skeleton for the container.
2. Light mode only; the reader asked for it.
3. Every claim comes from the talk or carries a `bg` badge saying it is background; keep that distinction when editing content.
4. EMG sounds are synthesised from pattern rules and must stay labelled as such, never presented as recordings.
5. No external fetches beyond Google Fonts; the page must work as one static file.
