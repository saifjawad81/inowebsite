# Changes — 1.0.0

Prepared 2026-09-28 against inspected source commit `4ffd70cfdbad065410738d0c12c15231ba4ae428`.

## Design

- Replaced the continuous dark cyber styling with navy hero/footer and light content sections.
- Preserved brand cyan; introduced deeper blue for actions on light surfaces.
- Shortened the hero, reduced competing actions, and replaced dense preview text with a static capability overview.
- Simplified navigation; added dedicated About and Contact destinations.
- Removed three-category filtering and added native expandable solution specifications.
- Repositioned standards below the solutions, industrial approach and company sections.
- Added logical spacing, responsive type, RTL-aware direction, visible focus and reduced motion.
- Retained the original white logo with its transparent canvas cropped; included a mark-based favicon.

## Inquiry flow

- Removed simulated success, local random receipt codes and metadata-only fake uploads.
- Defaulted to clearly labeled email/WhatsApp handoff and full-text brief download.
- Added optional multipart endpoint support with actual file bytes and verified server acknowledgement.
- Hoisted draft state; changing language or solution no longer remounts and clears contact/project data.
- Used stable option IDs in both languages; validated required fields and attachments.
- Added field-level feedback, focus handling, consent, timeouts and recoverable errors.

## Content and engineering

- Retained the three principal solution groups and oil/remote operations offering.
- Reworded certification, uptime, emergency-response and deployment-count claims that lacked supplied substantiation.
- Omitted invented projects, customer references and vendor-partnership claims.
- Replaced the external icon dependency with a small, consistent local SVG icon component.
- Added 21 unit tests, deployment/PR check workflows, setup instructions, endpoint documentation and QA evidence.
- Preserved original selected React/Vite package versions as exact pins; no lockfile fabricated.

## Release gate

Run `npm install`, `npm run check`, and the deployment-specific smoke tests before merging. Production Vite build and ESLint were not executable in the offline preparation environment; details are in `docs/QA.md`.
