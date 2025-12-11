<!--
Sync Impact Report
- Version change: unspecified → 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> I. Celebration-First Experience
	- [PRINCIPLE_2_NAME] -> II. Static-First, Simple Architecture
	- [PRINCIPLE_3_NAME] -> III. Inclusive & Accessible by Default
	- [PRINCIPLE_4_NAME] -> IV. Privacy-Minimal Data Practice
	- [PRINCIPLE_5_NAME] -> V. Iterative Ownership & Automated Quality
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Templates reviewed:
	- .specify/templates/plan-template.md: ✅ reviewed — no changes required
	- .specify/templates/spec-template.md: ✅ reviewed — no changes required
	- .specify/templates/tasks-template.md: ✅ reviewed — no changes required
	- .specify/templates/checklist-template.md: ✅ reviewed — no changes required
	- .specify/templates/agent-file-template.md: ✅ reviewed — no changes required
- Follow-up TODOs: none — all placeholders filled
-->

# Year‑End Celebration Site Constitution

## Core Principles

### I. Celebration-First Experience
All project decisions MUST prioritize delivering a delightful, low-friction experience
for the team viewing the Year‑End site. Content changes that improve clarity or
joyful presentation MAY be merged rapidly following the Deployment Playbook.
Rationale: This project exists to celebrate the team's year; user experience is the
primary success metric.

### II. Static-First, Simple Architecture
The site MUST be implemented as a static site (Next.js static export or equivalent).
No custom runtime servers are allowed unless explicitly justified and approved by
project maintainers. Builds MUST produce fully static artifacts suitable for CDN
hosting and fast cold-starts. Rationale: simplicity reduces operational burden and
aligns with event-focused deliverables.

### III. Inclusive & Accessible by Default
All public-facing content and UI elements MUST meet WCAG 2.1 AA accessibility
standards where feasible. Color contrast, semantic markup, and keyboard
navigation MUST be validated before release. Rationale: the site represents our
team—accessibility is non-negotiable.

### IV. Privacy — Minimal Data Practice
The site MUST NOT collect personal data. Any telemetry or analytics MUST be
opt-in and reviewed; defaults are off. If comments or feedback are added later,
they MUST follow privacy guidance and store the least data necessary. Rationale:
This is a celebratory internal site; avoid needless data collection.

### V. Iterative Ownership & Automated Quality
Small, frequent updates are preferred. Every change MUST include a short
description in the PR, automated checks (build, link-check, basic accessibility
audit), and at least one approving reviewer. Critical visual changes SHOULD include
a screenshot or preview. Rationale: automation keeps releases safe and fast.

## Additional Constraints

- Technology: Next.js (React) with static export (`next export`) OR another static
	static-site framework producing CDN-ready artifacts.
- Assets: Images MUST be optimized (webp/AVIF preferred) and sized responsively.
- Third-party: Minimal external scripts; analytics must be privacy-conscious.
- Performance: Lighthouse Performance score SHOULD be >= 80 for the primary
	landing page on desktop.

## Development Workflow

- Branching: `main` is the production branch. Feature branches MUST be named
	`feat/<short-description>` or `fix/<short-description>`.
- Pull Requests: PRs MUST include a summary, related images (if visual change),
	and link to preview deployment when available. PRs MUST be reviewed by at
	least one maintainer before merge.
- Quality Gates: Each PR MUST pass:
	- `npm run build` (production build)
	- static link-checker
	- accessibility smoke tests (e.g., axe-core automated checks)
- Releases: Merges to `main` trigger an automated static site build and deploy
	pipeline (CI configured by repo maintainers). Hotfixes to the live site MUST be
	accompanied by a short changelog entry.

## Governance

Amendments: Proposals to amend this Constitution MUST be submitted as a PR titled
"Constitution: <short summary>". Amendments require approval from **two
maintainers** or a majority of the defined maintainers list. Substantive changes
that alter principles or governance MUST include a migration plan and a version
bump per the Versioning policy below.

Versioning policy:
- MAJOR: Backwards-incompatible principle removals or redefinition (e.g., removing
	the Accessibility principle).
- MINOR: Adding a new principle or materially expanding an existing principle.
- PATCH: Non-semantic wording fixes, clarifications, or typographical corrections.

Compliance reviews: All PRs MUST reference this Constitution where applicable and
maintainers MUST verify compliance during review. Periodic audits SHOULD run at
least once per year to validate ongoing alignment with these principles.

**Version**: 1.0.0 | **Ratified**: 2025-12-11 | **Last Amended**: 2025-12-11
