# BIOLAQA Website

Self-hosted Vietnamese informational website for BIOLAQA, a biology-themed board game. The site presents the product, play guide, digital version, contact information, and embedded social updates.

## Technology

- HTML, CSS, and vanilla JavaScript
- Static assets including product, partner, and team imagery
- Facebook post embeds for the research and communications section

## Run locally

## Run locally (recommended)
### Option A: Python http server
```bash
python -m http.server 8000
```
Open: http://localhost:8000

### Option B: VS Code Live Server
Right click `index.html` -> Open with Live Server

## Notes
- Homepage includes Facebook embeds (iframes). These require internet access and may be blocked by browser privacy settings or ad blockers.

## Current status and limitations

This is a static website intended for self-hosting. It has no build step or automated test suite in the repository. Replace or review third-party embeds and asset paths before deployment.
