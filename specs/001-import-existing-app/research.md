# Research — Import existing app

## Decisions

- **Decision**: Treat `GEMINI_API_KEY` as optional for import; app must run without it while documenting where to set it.  
  **Rationale**: Current code only references `process.env.GEMINI_API_KEY` via Vite define; no runtime usage detected. Keeping optional avoids blocking onboarding.  
  **Alternatives considered**: Mark as required and stub usage, but that would create false urgency and potential import failures.

- **Decision**: Allow CDN dependencies at runtime (aistudiocdn.com for React/three/etc., cdn.tailwindcss.com, fonts.googleapis.com/fonts.gstatic.com); document allowlist/fallback expectation.  
  **Rationale**: index.html import map and Tailwind CDN are already wired; keeping them avoids bundling churn and matches current artifact.  
  **Alternatives considered**: Remove CDN usage and rely solely on bundled node_modules; rejected for now to avoid altering runtime paths before import is validated.

- **Decision**: Minimum tooling versions — Node >=18.18, npm >=9; package manager npm.  
  **Rationale**: Aligns with Vite 6/React 19 and avoids ESM/resolution issues on older Node.  
  **Alternatives considered**: Broader range (>=16) but risks ESM incompatibilities and missing Web APIs.

- **Decision**: Verification focuses on `npm run build` + manual visual check; no automated tests yet.  
  **Rationale**: Project is a static experiential UI with no backend; build ensures dependency integrity. Manual visual check needed for 3D/animation fidelity.  
  **Alternatives considered**: Add vitest/playwright/axe now; postponed to keep import scope minimal.

- **Decision**: Keep Vite dev server at host 0.0.0.0 port 3000 as canonical local run.  
  **Rationale**: Matches vite.config.ts and simplifies proxying for platform import.  
  **Alternatives considered**: Change ports/host to defaults; rejected to avoid drift from config.
