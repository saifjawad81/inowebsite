# Verification report

Prepared: 28 September 2026. Baseline source: `4ffd70cfdbad065410738d0c12c15231ba4ae428`.

## Completed checks

| Check | Result |
|---|---|
| Node unit tests | 21 passed, 0 failed |
| Source JSX/JavaScript syntax compilation | 17 modules passed |
| Desktop/tablet/mobile reflow | Passed at 1440, 1024, 768, 390 and 320 CSS pixels in each language |
| Horizontal page overflow | None detected in the 10 tested landing-page configurations |
| Original logo | All tested views loaded the cropped local original artwork |
| Mobile menu | Opens, closes with Escape and restores focus to the toggle in the tested mobile configurations |
| Solution details | Native details expansion works |
| Form validation | Missing project selections are rejected and focus moves to the first invalid field |
| Language changes | Name, email and consent retained |
| Solution changes | Project, location and contact values retained; solution selection updates |
| Manual-mode result | Explicitly states that the inquiry has not been sent |
| Email handoff | Correctly encodes test contact data into the draft link |
| Full-brief download | Contains the complete test notes |
| JavaScript exceptions in the browser smoke run | None recorded |

Machine-readable results: [browser-results.json](qa/browser-results.json). Unit-test log: [unit-tests.txt](qa/unit-tests.txt).

Screenshots captured from the current implementation:

- [English desktop](qa/en-1440-home.png)
- [English mobile](qa/en-390-home.png)
- [Arabic desktop](qa/ar-1440-home.png)
- [Arabic mobile](qa/ar-390-home.png)

The original PNG's Git blob hash was verified as `70dc0048bac13b8262bee23a1594021deb8ba7b6` before cropping its transparent canvas. The source PNG is retained in `public/images/Horizental-white-2.png`.

## Execution scope

Network access to the npm registry was unavailable. Source modules were syntax-transpiled using the available TypeScript compiler and rendered in Chromium using a temporary inline-module harness with cached **React 19.1.1**. The package's intended production React version is **19.2.6**. The harness changes module delivery and injects the same local logo bytes; it does not replace the component logic. Screenshots use available fallback fonts because external Google Fonts were not accessible during the run.

These checks provide source, interaction and responsive-layout evidence. They do **not** establish that the exact production dependency tree has built successfully. The temporary runtime and any container font files are not included in the deliverable.

## Required release checks

Run `npm install` and `npm run check` with the intended Node/npm environment. Commit the generated lockfile. Run the actual Vite application and inspect both languages with Inter/Cairo loaded. Verify the original domain, Pages configuration, external email/WhatsApp handlers and any configured submission service. A production dependency/security audit, live Lighthouse/Core Web Vitals measurements, full WCAG conformance review, screen-reader audit, multi-browser testing and real backend delivery tests were not completed here.

No real inquiry, email, WhatsApp message or attachment was submitted during testing. Endpoint acknowledgements and multipart byte handling were checked with controlled unit-test stubs, not a deployed service.

## Repeat the browser smoke test against your local application

Keep `VITE_RFP_ENDPOINT` blank for this manual-mode test. Start `npm run dev` in one terminal. In another:

```sh
python -m pip install playwright
python -m playwright install chromium
python scripts/browser-smoke.py --url http://localhost:3000
```

The script uses synthetic test contact details and does not click external send links. It rejects online-submission mode before the form-flow test. It writes fresh results and screenshots into `.artifacts/qa/`, not the checked-in evidence directory. The script requires Playwright and a compatible Chromium installation on your computer.
