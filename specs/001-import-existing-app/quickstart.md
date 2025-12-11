# Quickstart — Import existing app

## Prerequisites

- Node.js >= 18.18 and npm >= 9
- Network access to: aistudiocdn.com, cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com
- WebGL-capable browser (for three.js scenes)
- If outbound network is restricted, allowlist the above CDNs or bundle these assets locally before deploy.

## Setup

1) `cd Input App`
2) `npm install`
3) (Optional) Create `.env.local` with `GEMINI_API_KEY=...` — app runs without it.

- Install verified: generates `package-lock.json` and `node_modules/` with no additional steps required.

## Run locally

- `npm run dev -- --host --port 3000`
- Open [http://localhost:3000](http://localhost:3000)
- Vite config already binds host 0.0.0.0 and port 3000; the flags above are optional.

Troubleshooting:

- If you see a blank canvas or WebGL warning, ensure hardware acceleration is enabled and use a modern Chromium/Edge/Firefox build.
- If you see a blank canvas or WebGL warning, ensure hardware acceleration is enabled and use a modern Chromium/Edge/Firefox build.

## Build

- `npm run build`
- Output: `dist/`
- Preview: `npm run preview`
- Deploy: serve `dist/` with any static host/CDN; no server-side runtime required.
- Build note: current bundle triggers Vite chunk-size warning (~1.4 MB gzip) due to heavy 3D assets; acceptable for now, consider code-splitting if hosting requires smaller chunks.

## Verification checklist

- Page renders wrapped experience without missing module/asset errors.
- 3D hero and wave scenes animate smoothly; no WebGL errors in console.
- UI loads within ~3 seconds on broadband; scroll is responsive.
- If `GEMINI_API_KEY` is absent, app still loads; no crashes.
- External CDNs reachable (React/three/Tailwind/fonts); if blocked, bundle locally before deploy.
- No blocking console errors after scrolling through all sections (look for WebGL warnings and missing assets).
- Color contrast and text legibility remain acceptable on dark backgrounds.
