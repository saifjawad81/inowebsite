import test from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../src/data/translations.js';
import { briefText, createDraft, describeDraft, endpointUrl, MAX_FILE_SIZE, MODULE_IDS, normalizePhone, selectPillar, submitInquiry, submissionBody, validateDraft, validateFile } from '../src/lib/inquiry.js';
const valid = () => ({ ...createDraft(), location: 'baghdad', facility: 'enterprise', timeline: 'quarter', name: 'Test User', email: 'test@example.com', phone: '+964 780 123 4567', consent: true });
test('both languages have matching structural keys', () => {
  function keys(value) { return Object.keys(value).sort(); }
  const walk = (en, ar, path = '') => { assert.deepEqual(keys(en), keys(ar), path); for (const key of keys(en)) if (en[key] && typeof en[key] === 'object') walk(en[key], ar[key], `${path}.${key}`); };
  walk(translations.en, translations.ar);
});
test('canonical solution and module IDs match both translations', () => {
  for (const t of Object.values(translations)) for (const [id, modules] of Object.entries(MODULE_IDS)) assert.deepEqual(t.options.modules[id].map(([key]) => key), modules);
});
test('valid inquiry passes all three stages', () => { for (const step of [1,2,3]) assert.deepEqual(validateDraft(valid(), step), {}); });
test('stage one does not require personal fields', () => assert.deepEqual(validateDraft(createDraft(), 1), {}));
test('location, facility, and timeline cannot silently default', () => assert.deepEqual(Object.keys(validateDraft(createDraft(), 2)), ['location','facility','timeline']));
test('changing solution preserves contact and project data', () => {
  const draft = { ...valid(), notes: 'Keep this text', modules: ['fiber'], company: 'Company' };
  const result = selectPillar(draft, 'security');
  assert.equal(result.notes, draft.notes); assert.equal(result.name, draft.name); assert.equal(result.company, draft.company); assert.equal(result.location, draft.location); assert.deepEqual(result.modules, []); assert.equal(result.pillar, 'security');
});
test('selecting the same solution preserves compatible modules', () => assert.deepEqual(selectPillar({ ...valid(), modules: ['fiber'] }, 'infrastructure').modules, ['fiber']));
test('unknown solution does not corrupt the draft', () => { const draft = valid(); assert.equal(selectPillar(draft, 'unknown'), draft); });
test('changing presentation language does not translate stored identifiers', () => { const draft = valid(); describeDraft(draft, translations.ar); assert.equal(draft.location, 'baghdad'); assert.equal(draft.facility, 'enterprise'); });
test('phone validation accepts Arabic and Persian digits', () => { assert.equal(normalizePhone('٠٧٨٠۱۲۳٤٥٦٧'), '07801234567'); assert.equal(validateDraft({ ...valid(), phone: '٠٧٨٠١٢٣٤٥٦٧' }).phone, undefined); });
test('email, phone, name, and consent errors are explicit', () => { const errors = validateDraft({ ...valid(), name: '', email: 'wrong', phone: 'call me', consent: false }); assert.deepEqual(Object.keys(errors), ['name','email','phone','consent']); });
test('notes and email lengths are bounded', () => { assert.equal(validateDraft({ ...valid(), notes: 'x'.repeat(1501) }).notes, 'tooLong'); assert.equal(validateDraft({ ...valid(), email: `${'x'.repeat(255)}@x.com` }).email, 'email'); });
test('attachments reject dangerous suffixes and oversized files', () => { assert.equal(validateFile({ name: 'payload.exe', size: 100 }), 'fileType'); assert.equal(validateFile({ name: 'brief.PDF', size: MAX_FILE_SIZE }), null); assert.equal(validateFile({ name: 'brief.pdf', size: MAX_FILE_SIZE + 1 }), 'fileSize'); assert.equal(validateFile(null), null); });
test('FormData includes the actual file bytes, canonical IDs and consent version', async () => { const body = submissionBody({ ...valid(), file: new File(['fixture only'], 'brief.pdf', { type: 'application/pdf' }) }, 'ar'); assert.equal(await body.get('attachment').text(), 'fixture only'); assert.equal(body.get('location'), 'baghdad'); assert.equal(body.get('language'), 'ar'); assert.equal(body.get('consent'), 'true'); });
test('endpoint validation allows HTTPS and local HTTP only', () => { assert.equal(endpointUrl('', 'https://site.test'), ''); assert.equal(endpointUrl('/inquiry', 'https://site.test'), 'https://site.test/inquiry'); assert.equal(endpointUrl('http://localhost:3001/inquiry', 'https://site.test'), 'http://localhost:3001/inquiry'); for (const endpoint of ['http://untrusted.test', 'javascript:alert(1)', 'https://user:password@example.com', 'https://site.test/path#fragment']) assert.throws(() => endpointUrl(endpoint, 'https://site.test'), /endpoint/); });
test('HTTP 200 alone is not a receipt', async () => { for (const data of [{}, { ok: true }, { ok: false, reference: 'X' }, { ok: true, reference: ' ' }]) await assert.rejects(submitInquiry({ endpoint: 'https://api.test', draft: valid(), lang: 'en', fetchFn: async () => new Response(JSON.stringify(data), { status: 200 }) }), /response/); });
test('HTML thank-you pages are not interpreted as successful receipts', async () => { await assert.rejects(submitInquiry({ endpoint: 'https://api.test', draft: valid(), lang: 'en', fetchFn: async () => new Response('<html>Thanks</html>', { status: 200 }) }), /response/); });
test('valid service acknowledgement returns only its reference', async () => { const reference = await submitInquiry({ endpoint: 'https://api.test', draft: valid(), lang: 'en', fetchFn: async () => new Response(JSON.stringify({ ok: true, reference: 'SERVER-1234' }), { status: 201 }) }); assert.equal(reference, 'SERVER-1234'); });
test('server errors do not generate local receipt IDs', async () => { await assert.rejects(submitInquiry({ endpoint: 'https://api.test', draft: valid(), lang: 'en', fetchFn: async () => new Response('Unavailable', { status: 503 }) }), /response/); });
test('network errors propagate without deleting source data', async () => { const draft = valid(); await assert.rejects(submitInquiry({ endpoint: 'https://api.test', draft, lang: 'en', fetchFn: async () => { throw new Error('offline'); } })); assert.equal(draft.email, 'test@example.com'); });
test('full brief preserves notes and bilingual labels', () => { const draft = { ...valid(), notes: 'x'.repeat(1400) }; const full = briefText(draft, translations.en); const short = briefText(draft, translations.en, { short: true }); assert.ok(full.includes(draft.notes)); assert.ok(short.length < full.length); assert.ok(briefText(draft, translations.ar).includes('بغداد')); });
