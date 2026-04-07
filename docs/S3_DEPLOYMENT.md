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
├── index.html          # Root redirect → /en
├── en.html             # English page
├── ar.html             # Arabic page
├── fr.html             # French page
├── es.html             # Spanish page
├── ru.html             # Russian page
├── 404.html            # Not found page
├── logo-en.png         # Logo files (served directly, no API)
├── logo-ar.png
├── segments/           # Segment images
├── _next/
│   └── static/         # JS, CSS, fonts
└── ...
```

## CloudFront configuration

### 1. Default root object
Set to `index.html`

### 2. Error pages (CRITICAL)
Create a custom error response for 403 and 404:

| HTTP Error Code | Response Page Path | HTTP Response Code |
|-----------------|-------------------|--------------------|
| 403             | `/index.html`     | 200                |
| 404             | `/index.html`     | 200                |

This ensures client-side routing works (e.g., `/en` resolves to `en.html` via the Next.js client router).

**Alternative (recommended):** Use CloudFront Functions to rewrite clean URLs:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If URI has no extension and doesn't end with /
  if (!uri.includes('.') && !uri.endsWith('/')) {
    request.uri = uri + '.html';
  }

  // If URI ends with /
  if (uri.endsWith('/') && uri !== '/') {
    request.uri = uri.slice(0, -1) + '.html';
  }

  return request;
}
```

Attach this as a **Viewer Request** function. This directly maps `/en` → `/en.html`, `/ar` → `/ar.html`, etc., without relying on the SPA fallback.

### 3. Cache behavior
- `_next/static/*` → Cache for 1 year (immutable, hashed filenames)
- `*.html` → Cache for 0 seconds or use short TTL (content changes on deploy)
- Images/fonts → Cache for 1 week

### 4. Invalidation after deploy
After uploading new files:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*.html" "/index.html"
```

## What NOT to do

- **Do NOT** use `npm run build` (without `:static`) for S3 — it produces server-dependent output
- **Do NOT** set CloudFront error pages to return the root `index.html` for ALL paths with status 200 — this breaks JS/CSS/image loading by serving HTML instead of assets. Use the CloudFront Function above instead.
- **Do NOT** delete `src/middleware.ts` — it's still needed for the Vercel deployment

## Verifying locally

```bash
npm run build:static
npx serve out
# Open http://localhost:3000/en
```
