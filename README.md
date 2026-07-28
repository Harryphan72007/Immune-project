# BIOLAQA — Static Educational Prototype

![Status](https://img.shields.io/badge/status-student%20prototype-F59E0B)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-2563EB)
![Language](https://img.shields.io/badge/interface-Vietnamese-0F766E)

A responsive Vietnamese-language concept site for **BIOLAQA**, an educational board-game idea that introduces biology and immune-system topics through missions and group interaction.

> [!IMPORTANT]
> This is a static student prototype. It does not sell a commercial product, validate activation codes, make medical claims, or represent a verified retail partner.

## Overview

The project explores how a board-game concept could be presented through a lightweight multi-page website. The current version focuses on a clear visual identity, navigable product information, a digital-demo boundary, and privacy-safe public presentation.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Project introduction and concept overview |
| `product.html` | Board-game concept and component information |
| `guide.html` | Educational gameplay guidance |
| `digital.html` | Static digital-experience demonstration |
| `contact.html` | Public-safe contact and project context |

## Implementation

- Semantic multi-page HTML
- Mobile-first responsive CSS
- Shared navigation and active-page state
- Lightweight browser interactions in vanilla JavaScript
- Static assets for the logo and product concept
- Explicitly disabled client-side activation flow

The activation form never validates a secret in the browser. It displays a clear message explaining that activation is unavailable in this static prototype.

## Run locally

No build step or package installation is required.

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Project structure

```text
index.html       landing page
product.html     product-concept page
guide.html       gameplay guide
digital.html     digital-demo boundary
contact.html     contact and context
styles.css       shared responsive visual system
app.js           navigation and demo interactions
*.jpg / *.png    project imagery
```

## Public-safety changes

The public version was deliberately reduced to remove data and behavior that should not ship in a static site:

- Removed hard-coded browser activation codes
- Removed third-party social embeds and an unrelated guide video
- Removed personal phone numbers, email addresses, and team portraits pending consent
- Removed partner branding pending written permission
- Repaired invalid markup outside the document boundary
- Labeled the digital experience as a static demonstration

Real access control must be implemented on an authenticated server. Secrets, entitlement codes, and private customer data must never be embedded in client-side JavaScript.

## Current limitations

- The project is a static concept, not a transaction or account system.
- Cart state is an interface demonstration and is not persisted.
- Activation, authentication, payment, and fulfillment are intentionally unavailable.
- The educational content has not been medically or commercially validated.

## Ownership and reuse

Before restoring names, portraits, contact details, social embeds, or partner logos, verify project ownership and obtain permission from every represented person or organization.

No repository license has been added. Reuse permission has not been granted.
