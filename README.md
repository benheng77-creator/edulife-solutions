# Edulife Solutions

Public website for Edulife Solutions, a Singapore digital-solutions business building websites, CMS platforms, portals, and workflow systems.

Production site: [edulifesolutions.com](https://edulifesolutions.com/)

## Structure

- `index.html` — static public site
- `functions/` — Cloudflare Pages Functions
- `apps-script/` — supporting Google Apps Script code
- `robots.txt` and `sitemap.xml` — search-engine controls

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Local development

```bash
npm ci
npm run dev
```

The local Cloudflare Pages server uses port 8788.

## Build

```bash
npm run build
```

This is a static site, so there is no compilation step.

## Deploy

```bash
npm run deploy
```

Deployment requires authenticated Cloudflare Wrangler access configured outside the repository.

## Security

Please report vulnerabilities privately through this repository's **Security** tab. See [SECURITY.md](SECURITY.md).
