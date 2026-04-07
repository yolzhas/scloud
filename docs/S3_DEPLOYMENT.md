# S3/CloudFront Static Deployment Guide

## What changed

The previous S3 deployment was broken because Next.js uses a server-side Image Optimization API (`/_next/image/`) and middleware — neither works on static hosting.

We added a **static export mode** that generates a fully self-contained `out/` directory. This disables the image API (uses direct `<img>` tags) and removes middleware dependency.

The default `npm run build` for Vercel is unchanged.

## Build for S3

```bash
npm run build:static
```

This generates the `out/` directory with all static files ready for S3.

## Upload to S3

Upload the **entire contents** of the `out/` directory to the S3 bucket root:

```bash
aws s3 sync out/ s3://YOUR_BUCKET_NAME --delete
```

### File structure after upload

```
s3://bucket/
├── index.html          # Root redirect → /en/
├── en/index.html       # English page
├── ar/index.html       # Arabic page
├── fr/index.html       # French page
├── es/index.html       # Spanish page
├── ru/index.html       # Russian page
├── 404/index.html      # Not found page
├── logo-en.png         # Logo files (served directly, no API)
├── logo-ar.png
├── segments/           # Segment images
├── _next/
│   └── static/         # JS, CSS, fonts
└── ...
```

## CloudFront configuration

No CloudFront Functions needed. S3 natively serves `index.html` from directories.

### 1. Default root object
Set to `index.html`

### 2. S3 static website hosting
Enable static website hosting on the S3 bucket with:
- Index document: `index.html`
- Error document: `404/index.html`

### 3. Cache behavior
- `_next/static/*` → Cache for 1 year (immutable, hashed filenames)
- `*.html` → Cache for 0 seconds or use short TTL (content changes on deploy)
- Images/fonts → Cache for 1 week

### 4. Invalidation after deploy
After uploading new files:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

## What NOT to do

- **Do NOT** use `npm run build` (without `:static`) for S3 — it produces server-dependent output
- **Do NOT** set CloudFront error pages to return the root `index.html` for ALL paths with status 200 — this serves HTML instead of JS/CSS/images and breaks the site
- **Do NOT** delete `src/middleware.ts` — it's still needed for the Vercel deployment

## Verifying locally

```bash
npm run build:static
npx serve out
# Open http://localhost:3000/en/
```
