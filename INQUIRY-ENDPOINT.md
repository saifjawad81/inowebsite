# Optional inquiry endpoint contract

## Client behavior

With `VITE_RFP_ENDPOINT` blank, the application does not call a submission API. It prepares email/WhatsApp drafts and a downloadable full brief. With a valid HTTPS endpoint configured, it sends a POST with `FormData`, `Accept: application/json`, and `credentials: omit`. HTTP localhost is permitted only for local development. The browser chooses the multipart boundary; do not set `Content-Type` yourself.

Required endpoint response after actual, durable acceptance:

```json
{"ok":true,"reference":"YOUR-SERVER-GENERATED-REFERENCE"}
```

Return a 2xx status and a nonempty reference string no longer than 120 characters. The acknowledgement means the receiving service has actually accepted the inquiry. It does not imply a human has reviewed it or guarantee delivery through a subsequent email queue. The UI states acceptance only.

An HTTP 200 by itself, an HTML thank-you page, an empty reference, or `ok: false` does not create a success state. Server and network errors retain the draft. The client aborts after 20 seconds. A timeout cannot establish whether the server accepted the request: check for duplicates before retrying.

## Multipart fields

| Field | Representation |
|---|---|
| pillar | `infrastructure`, `security`, `cyber_ai`, or `oilfield` |
| modules | JSON array of canonical module identifiers |
| location | `baghdad`, `basra`, `maysan`, `dhiqar`, `erbil`, or `other` |
| facility | `enterprise`, `datacenter`, `industrial`, `public`, `logistics`, or `other` |
| timeline | `urgent`, `quarter`, `planning`, or `exploring` |
| name | Required, at most 100 characters |
| company | Optional, at most 150 characters |
| email | Required, at most 254 characters |
| phone | Required, 7–15 digits after normalization; may contain Arabic/Persian digits |
| notes | Optional, at most 1,500 characters |
| attachment | Optional actual File bytes; not merely filename metadata |
| language | `en` or `ar` |
| consent | String `true` |
| consentVersion | String `2026-09-28` |
| website | Honeypot; must be empty for legitimate submissions |

Module mappings are in `src/lib/inquiry.js`. The frontend accepts a nonempty PDF, DOCX, XLSX, DWG, or ZIP up to 25 MiB. This is a usability check, **not security validation**.

## Server responsibilities before enabling online delivery

Implement independent schema validation; field-length/body limits; rejection of unexpected fields and unsafe content; a narrow CORS allowlist for your actual site origin; rate limiting and bot controls; attachment extension, MIME and signature checks; malware scanning; and safe storage outside the web root. Treat ZIP and Office documents as potentially hazardous content. Do not automatically execute or extract them. Match request-size limits across the proxy, serverless platform, parser, and storage tier.

Use server-held secrets to connect mail/CRM services. Configure authenticated outbound mail and durable storage or a delivery queue; define failures and retry behavior. Escape user content in all emails, CRM views, and administrative tools. Do not log full inquiries, documents, or contact information unnecessarily. Define restricted access, retention/deletion rules, and an accurate privacy notice reflecting the actual provider.

The endpoint should implement duplicate protection/idempotency appropriate to your backend. The frontend does not guarantee exactly-once delivery. Do not return an invented receipt when a downstream operation has already failed or when spam is discarded. No real provider was configured or called during package preparation.

## Acceptance tests with your service

Use controlled test data and verify one stored record plus any expected outbound message. Confirm actual attachment content arrives. Test invalid fields, empty files, size limits, disallowed types, blocked origins, spam, 4xx/5xx, timeouts and retries. Verify that language changes preserve the selected file and entered details, and that clear error states retain the draft. Confirm your published privacy text matches the endpoint configuration.
