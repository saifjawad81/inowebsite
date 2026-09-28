# The Smart Innovation — enterprise website refresh

A complete replacement frontend source package for `saifjawad81/thesmartinnovation`, based on inspected main commit `4ffd70cfdbad065410738d0c12c15231ba4ae428`.

React + Vite. English and Arabic. Responsive single-page navigation. Original logo artwork and contact details retained. Navy and cyan hero/footer, light solution and inquiry sections, accessible controls, and a transparent inquiry workflow.

## Run locally

Use Node.js 22.12 or later in the Node 22 release line, and npm.

```sh
npm install
npm run check
npm run dev
```

Open `http://localhost:3000`. For production output:

```sh
npm run build
npm run preview
```

The output directory is `dist/`. Do not open `index.html` directly as a local file; the production application requires Vite to compile JSX.

`npm test` uses Node's built-in test runner and needs no downloaded test dependencies. `npm run check` runs the unit tests, ESLint, and the production build.

### Verification status

- 21 unit tests passed in the preparation environment.
- JSX/JavaScript syntax compilation passed for 17 source modules.
- The actual components were rendered and exercised in Chromium at five viewport widths in English and Arabic through an offline compatibility harness using cached React 19.1.1.
- Production dependencies retain the original repository's version selections, pinned to exact versions; production React is 19.2.6.
- The preparation environment could not reach the npm registry. Therefore **the exact Vite production build, ESLint execution, npm dependency audit, and live deployment have not been verified here**. Run `npm install` and `npm run check` before merging or publishing.
- No `package-lock.json` is fabricated. `npm install` generates the real lockfile; commit it after successful verification. CI uses `npm ci` when the lockfile exists and `npm install` otherwise.

See [the QA report](docs/QA.md) for evidence and scope. The compatibility harness itself is not a production dependency and is not included in this repository.

## Inquiry delivery: what is operational

**Default: prepare and hand off.** No external submission provider is required. Visitors choose a solution, describe the project, and enter their contact details. The final screen explicitly says the inquiry has **not been sent**, then offers an email draft, a WhatsApp draft, and a complete text download. The visitor sends the message in their chosen application. Attachments must be added manually in that application.

**Optional: actual HTTP submission.** Set the two public build-time values in `.env.local`:

```dotenv
VITE_RFP_ENDPOINT=https://your-approved-service.example/api/inquiries
VITE_RFP_PROVIDER_LABEL=Your approved inquiry service
```

These are configuration examples, not a working endpoint. The endpoint must implement [the submission contract](docs/INQUIRY-ENDPOINT.md). It receives real multipart file bytes and must return a genuine acknowledgement. No backend or mail-service credentials are bundled. An arbitrary Formspree or other form-provider URL is not automatically compatible with the acknowledgement contract.

The `VITE_` variables become public client-side configuration. Never put private API keys, SMTP passwords, or service secrets in them. Leave the endpoint blank until a real service is deployed and tested.

Project/contact data remains in React memory during the page session, not localStorage. Only the chosen language is stored. Reloading or closing the page clears an unfinished draft. Language changes and solution changes preserve entered project/contact details; incompatible solution modules are cleared.

## Apply this package to your existing repository

1. Back up the current repository and create a review branch.
2. Copy the contents of this package's `thesmartinnovation/` folder into the repository root, replacing the matching files. Keep your existing `.git` directory. Do not nest this package inside another `thesmartinnovation/` directory.
3. Run the installation and checks above; commit the resulting package lockfile.
4. Review English and Arabic pages and test your actual delivery method. Commit the changes and open a pull request.

Old, unreferenced assets may remain if you overlay the package. `src/components/CyberBackground.jsx` and `public/icons.svg` are not used by the updated application. The new `src/index.css` replaces the old stylesheet completely; do not append it to the old CSS.

This package contains the new application source and required assets, not the repository's Git history, unused duplicate logo exports, or an npm dependency cache. No GitHub branch, commit, pull request, or deployment was created when preparing this ZIP.

## GitHub Pages

The included deployment workflow preserves GitHub Pages as the deployment target and runs tests, lint, and build before deployment. Publishing the branch to `main` triggers deployment. Enable **Settings → Pages → Build and deployment → GitHub Actions** in your repository.

For your custom domain, keep:

```dotenv
VITE_BASE_PATH=/
```

Both `CNAME` and `public/CNAME` retain `thesmartinnovation.com`; Vite copies `public/CNAME` into `dist/`.

For a GitHub project URL without your custom domain, use `VITE_BASE_PATH=/thesmartinnovation/` as a GitHub Actions repository variable and remove both CNAME files. Also update the canonical/Open Graph URLs in `index.html` and the URLs in `public/sitemap.xml` and `public/robots.txt` to the actual public site. Do not do this while retaining the custom domain.

Configure optional endpoint values under **Settings → Secrets and variables → Actions → Variables**. The workflow reads repository variables, not GitHub Environment variables. Every endpoint change requires a rebuild.

## Where to edit

| Requirement | File |
|---|---|
| English/Arabic copy, solution details, form options | `src/data/translations.js` |
| Original email, phone, WhatsApp | `src/data/company.js` |
| Colors, typography, spacing, breakpoints, RTL | `src/index.css` |
| Homepage structure | `src/components/Home.jsx` |
| Navigation, language and shared inquiry state | `src/App.jsx` |
| Form, file controls and feedback | `src/components/RfpWizard.jsx` |
| Validation and endpoint acknowledgement | `src/lib/inquiry.js` |
| Metadata and font stylesheet | `index.html` |

The original logo was retrieved through the connected repository and byte-verified against Git blob `70dc0048bac13b8262bee23a1594021deb8ba7b6`. `brand-white.png` removes its excessive transparent canvas without redrawing the artwork; `brand-mark.png` is a favicon crop of its mark. No font binaries are included. Inter and Cairo are requested from Google Fonts with system-font fallbacks when unavailable.

No case studies, customer logos, fabricated certifications, uptime results, or deployment counts have been invented. Add approved project evidence through a separately reviewed content change.
