# Tasks: Import existing app for smooth onboarding

**Input**: Design documents from `/specs/001-import-existing-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests requested; focus on build + manual visual verification.

**Organization**: Tasks are grouped by user story to keep each slice independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline documentation and references needed by all stories.

- [X] T001 Add prerequisite stack (Node >=18.18, npm >=9, WebGL-capable browser) to specs/001-import-existing-app/quickstart.md
- [X] T002 [P] Record external network/CDN allowlist summary in specs/001-import-existing-app/quickstart.md
- [X] T003 [P] Verify plan structure section matches Input App/ layout and update specs/001-import-existing-app/plan.md if drift exists

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Align source configuration, env handling, and manifest fundamentals before story work.

- [X] T004 Reconcile scripts in Input App/package.json with contracts/import-spec.json and update both if mismatched
- [X] T005 [P] Confirm dev server host/port in Input App/vite.config.ts matches quickstart guidance (0.0.0.0:3000); update docs if needed
- [X] T006 [P] Document optional `GEMINI_API_KEY` handling in specs/001-import-existing-app/quickstart.md and ensure Input App/.env.local template shows placeholder
- [X] T007 Validate CDN domain list in contracts/import-spec.json against Input App/index.html import map; align entries if differences

**Checkpoint**: Foundation ready — user story implementation can start.

---

## Phase 3: User Story 1 - Spin up locally from import (Priority: P1) 🎯 MVP

**Goal**: New contributor can install and run dev server using only the docs.

**Independent Test**: Follow quickstart to `npm install` and `npm run dev -- --host --port 3000`, observe full UI with no missing modules/assets.

### Implementation for User Story 1

- [X] T008 [US1] Run npm install in Input App/ and capture any troubleshooting notes in specs/001-import-existing-app/quickstart.md
- [X] T009 [P] [US1] Verify dev server startup path and expected URL/behavior in specs/001-import-existing-app/quickstart.md
- [X] T010 [US1] Add WebGL/GPU/browser troubleshooting tips to specs/001-import-existing-app/quickstart.md

**Checkpoint**: Local spin-up validated and documented.

---

## Phase 4: User Story 2 - Import into target platform with confidence (Priority: P2)

**Goal**: Platform operator can ingest the app using the import spec without guessing.

**Independent Test**: Using import-spec.json and docs, configure platform entry/source/output/env and deploy without missing-path errors; outbound CDN endpoints acknowledged.

### Implementation for User Story 2

- [X] T011 [US2] Finalize entry/source/buildOutput/script values in specs/001-import-existing-app/contracts/import-spec.json based on Input App/index.html and Input App/index.tsx
- [X] T012 [P] [US2] Document CDN allowlist and fallback guidance in specs/001-import-existing-app/contracts/README.md
- [X] T013 [US2] Add static hosting notes for dist/ output (e.g., artifact path, preview command) to specs/001-import-existing-app/quickstart.md
- [X] T014 [P] [US2] Align app description/title between Input App/metadata.json and import-spec.json if discrepancies exist

**Checkpoint**: Import manifest complete and platform-ready.

---

## Phase 5: User Story 3 - Validate 3D and media experience (Priority: P3)

**Goal**: Confirm 3D scenes and media-heavy sections render smoothly post-import.

**Independent Test**: Build app, serve or preview, and verify animations/media render without console errors or blank sections on midrange hardware.

### Implementation for User Story 3

- [X] T015 [US3] Run npm run build in Input App/ and record outcomes or issues in specs/001-import-existing-app/quickstart.md
- [ ] T016 [P] [US3] Perform manual visual QA (3D hero, wave scene, cards, console) and log checklist in specs/001-import-existing-app/quickstart.md
- [X] T017 [US3] Add performance/accessibility expectations (load time target, contrast reminders) to specs/001-import-existing-app/quickstart.md

**Checkpoint**: Visual fidelity validated and documented.

---

## Final Phase: Polish & Cross-Cutting

**Purpose**: Wrap-up improvements that span stories.

- [X] T018 [P] Add concise run/build/import summary and link to quickstart in Input App/README.md

---

## Dependencies & Execution Order

- Setup (Phase 1) → Foundational (Phase 2) → User Stories (P1 → P2 → P3) → Polish.
- User Story dependencies: US2 depends on foundational config; US3 depends on a successful build (T015) and US1’s spin-up path for verification context.

## Parallel Execution Examples

- Within Phase 2: T005, T006, T007 can run in parallel after T004 starts.
- User Story 1: T008 and T009 can run in parallel; T010 can proceed once initial run feedback exists.
- User Story 2: T011 can start after T004; T012 and T014 can run in parallel; T013 follows once manifest values are stable.
- User Story 3: T016 can run in parallel with T015 if using build output; T017 can be drafted alongside T016.

## Implementation Strategy

- MVP: Complete Phases 1–2, then deliver US1. Validate spin-up before moving on.
- Incremental: After US1, finish US2 (import manifest), then US3 (visual QA). Polish last.
- Each story remains independently testable per its checkpoint before integrating further changes.
