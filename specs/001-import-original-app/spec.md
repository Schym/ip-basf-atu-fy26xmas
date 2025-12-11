# Feature Specification: Import Original App

**Feature Branch**: `001-import-original-app`
**Created**: 2025-12-11
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Run Original App Locally (Priority: P1)

As a developer, I want to run the Original App in my repository so that I can verify it works exactly as the source and begin further development.

**Why this priority**: Essential baseline - must work before any modifications can be made.

**Independent Test**: Start the development server and verify the iPhone-style presentation renders correctly.

**Acceptance Scenarios**:

1. **Given** the project is cloned and dependencies installed, **When** I run `npm run dev`, **Then** the application starts without errors.
2. **Given** the app is running, **When** I view it in the browser, **Then** I see the iPhone 15 Pro Max chassis with the "BASF x Microsoft: 2025 Wrapped" experience inside.
3. **Given** the app is running, **When** I scroll through the sections, **Then** all 6 sections (Hero, Top Genre, Top Tracks, Formula/Stats, Outtakes, Artist of Year) render correctly with animations.
4. **Given** the app is running, **When** I click Play/Pause, **Then** the progress bar animation toggles accordingly.

---

### User Story 2 - Maintain Original Functionality (Priority: P1)

As a developer, I want all original features preserved so that I have a faithful copy to extend.

**Why this priority**: The app must match the original exactly before modifications.

**Acceptance Scenarios**:

1. **Given** the 3D Benzene molecule scene, **When** the page loads, **Then** the molecule rotates with floating text elements (Copilot, One Microsoft, Agentic Transformation).
2. **Given** the Dynamic Island UI element, **When** viewed, **Then** it displays with the pulsing green indicator.
3. **Given** the Metallica-style "Farewell Susana" card, **When** hovered, **Then** a play button overlay appears.
4. **Given** the bottom player bar, **When** I click the play/pause button, **Then** it toggles the global isPlaying state.

### Edge Cases

- **WebGL Not Supported**: If the browser lacks WebGL, the 3D scenes should fail gracefully (black background with no crash).
- **Small Screens**: The iPhone chassis should remain centered and not overflow on smaller desktop viewports.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST copy all source files from `Original App/` to the repository root, maintaining the exact file structure.
- **FR-002**: System MUST preserve the iPhone 15 Pro Max presentation chassis layout.
- **FR-003**: System MUST preserve all 6 scrollable sections with snap behavior.
- **FR-004**: System MUST preserve the 3D Benzene molecule scene with React Three Fiber.
- **FR-005**: System MUST preserve the floating player bar with play/pause functionality.
- **FR-006**: System MUST preserve all Tailwind CSS styling (via CDN configuration in index.html).
- **FR-007**: System MUST preserve the Framer Motion animations.

### Success Criteria

- Application builds successfully with `npm run build`.
- Application runs locally with `npm run dev`.
- All 6 sections are visible and scrollable.
- 3D molecule rotates and floating text elements are present.
- Play/Pause button toggles progress bar animation.

### Assumptions

- The Original App source is complete and functional.
- React 19, Three.js, and Framer Motion versions are maintained as-is from the original package.json.
