# BIOLAQA Static Prototype

Vietnamese educational board-game concept site.

> Student prototype only. This repository does not claim a commercial product, medical validation, secure activation system, or verified retail partnership.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Public-safety changes

- removed hard-coded browser activation codes
- removed third-party social embeds and an unrelated guide video
- removed personal phone/email details and team portraits pending owner consent
- removed partner branding pending written permission
- repaired invalid markup that appeared after the closing HTML tag
- labeled the digital experience as a static demo

Real access control must be implemented on an authenticated server; secrets and entitlement codes must never ship in client JavaScript.

## Ownership checkpoint

Before restoring names, portraits, contact details, social embeds, or partner logos, verify who owns the project and obtain permission from every person or organization represented.

No repository license has been added; reuse permission has not been granted.
