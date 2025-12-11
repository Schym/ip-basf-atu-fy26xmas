# Data Model — Import existing app

## Entities

- **EnvironmentConfiguration**
  - Fields: `GEMINI_API_KEY` (string | optional)
  - Notes: Used in build-time define; runtime currently does not consume the value. App must run if unset.

- **ImportPackage**
  - Fields: `entryHtml` (index.html), `sourceEntry` (index.tsx), `buildOutput` (dist/), `scripts` (dev, build, preview), `nodeVersion` (>=18.18), `packageManager` (npm)
  - Notes: Describes how platform should ingest and build the app.

- **ExternalProvider**
  - Fields: `domains` (aistudiocdn.com, cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com), `purpose` (runtime modules, styling, fonts), `fallback` (bundle locally if outbound blocked)
  - Notes: Must be reachable or replaced with bundled assets before deployment.
