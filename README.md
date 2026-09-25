# Flex AI Website

This repository contains the Flex AI marketing website and the protected Penguin Skate concept previews currently deployed through S3 and CloudFront.

## Repository Layout

```text
.
├── src/                  React storefront concept app
├── data/                 Product catalog and sourcing audit data
├── public/images/        Shared concept imagery and product assets
├── scripts/              Asset, verification, and screenshot utilities
├── docs/                 Catalog, migration, and deployment notes
└── static-site/          Flex AI static marketing pages and latest built concept shells
```

The React app powers the four Penguin Skate concept previews:

- `penguin-classic` -> `/concept-a/`
- `penguin-modern` -> `/concept-b/`
- `pro-shop` -> `/concept-c/`
- `premium-ice` -> `/concept-d/`

The `static-site/` folder contains the Flex AI public pages, client portal login pages, legal pages, strategy pages, and the latest deployed concept HTML/CSS/JS bundles. Duplicated generated concept image folders were intentionally not copied into `static-site/`; the canonical image assets live once under `public/images/`.

## Install

```bash
npm install
```

## Run Locally

Run a single default theme:

```bash
npm run dev
```

Run all four concepts:

```bash
npm run dev:all
```

Individual concept themes:

```bash
npm run dev:premium  # http://localhost:8088
npm run dev:pro      # http://localhost:8089
npm run dev:modern   # http://localhost:8090
npm run dev:classic  # http://localhost:8091
```

## Verify

```bash
npm run verify
npm run build
```

## Current AWS Deployment

- Region: `us-west-2`
- S3 bucket: `flex-ai-650433001040-us-west-2`
- Production domain: `flex-ai.com`
- Concept paths: `/concept-a/`, `/concept-b/`, `/concept-c/`, `/concept-d/`

The CloudFront functions and deployment notes live in `static-site/cloudfront-concept-rewrite.js` and `docs/aws-deployment.md`.
