<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy

Quickstart and import details live in [specs/001-import-existing-app/quickstart.md](../specs/001-import-existing-app/quickstart.md).

## Run locally

**Prerequisites:** Node.js >= 18.18, npm >= 9, WebGL-capable browser.

1. Install dependencies: `npm install`
2. (Optional) Set `GEMINI_API_KEY` in [.env.local](.env.local); app runs without it.
3. Start dev server: `npm run dev -- --host --port 3000` (flags optional; Vite config sets host/port).
4. Open [http://localhost:3000](http://localhost:3000)

## Build & preview

- Production build: `npm run build` (outputs to `dist/`)
- Preview locally: `npm run preview`
- Deploy `dist/` to any static host/CDN; no backend required.
