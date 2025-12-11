# Contracts — Import existing app

- Runtime is a static Vite React experience; no backend API endpoints are exposed.
- Import manifest: see [import-spec.json](import-spec.json) for entry points, scripts, env, output, and external CDN requirements.
- If platform requires API schema, mark as N/A for this feature; only static assets are produced.

## CDN allowlist / fallback

- aistudiocdn.com (React, react-dom, drei, fiber, three, framer-motion, lucide-react)
- cdn.tailwindcss.com (Tailwind runtime config)
- fonts.googleapis.com / fonts.gstatic.com (Inter font)
- If outbound egress is blocked, bundle these dependencies locally before deployment.
