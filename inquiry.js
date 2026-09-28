export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'xlsx', 'dwg', 'zip'];
export const PILLARS = ['infrastructure', 'security', 'cyber_ai', 'oilfield'];
export const MODULE_IDS = {
  infrastructure: ['datacenter', 'fiber', 'network', 'power'],
  security: ['cctv', 'access', 'perimeter', 'alpr'],
  cyber_ai: ['soc', 'ot', 'ai', 'software'],
  oilfield: ['rugged', 'remote', 'fieldsecurity', 'maintenance'],
};
export const createDraft = () => ({ pillar: 'infrastructure', modules: [], location: '', facility: '', timeline: '', name: '', company: '', email: '', phone: '', notes: '', file: null, consent: false, website: '' });
export function selectPillar(draft, pillar) {
  if (!PILLARS.includes(pillar)) return draft;
  return { ...draft, pillar, modules: draft.modules.filter((id) => MODULE_IDS[pillar].includes(id)) };
}
export function validateFile(file) {
  if (!file) return null;
  if (file.size > MAX_FILE_SIZE || file.size === 0) return 'fileSize';
  if (!ALLOWED_EXTENSIONS.includes(file.name.split('.').pop().toLowerCase())) return 'fileType';
  return null;
}
export function normalizePhone(value) {
  return value.replace(/[٠-٩]/g, (n) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(n))).replace(/[۰-۹]/g, (n) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(n)));
}
export function validateDraft(draft, step = 3) {
  const errors = {};
  if (!PILLARS.includes(draft.pillar)) errors.pillar = 'required';
  if (step >= 2) {
    if (!['baghdad','basra','maysan','dhiqar','erbil','other'].includes(draft.location)) errors.location = 'required';
    if (!['enterprise','datacenter','industrial','public','logistics','other'].includes(draft.facility)) errors.facility = 'required';
    if (!['urgent','quarter','planning','exploring'].includes(draft.timeline)) errors.timeline = 'required';
    if (draft.notes.length > 1500) errors.notes = 'tooLong';
  }
  if (step >= 3) {
    if (!draft.name.trim()) errors.name = 'required';
    else if (draft.name.length > 100) errors.name = 'tooLong';
    if (draft.company.length > 150) errors.company = 'tooLong';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()) || draft.email.length > 254) errors.email = 'email';
    const phone = normalizePhone(draft.phone.trim());
    const digits = phone.replace(/\D/g, '');
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'phone';
    if (!draft.consent) errors.consent = 'consent';
    const fileError = validateFile(draft.file);
    if (fileError) errors.file = fileError;
  }
  return errors;
}
export function labelFor(options, value, fallback = '') {
  return options.find(([id]) => id === value)?.[1] || fallback;
}
export function describeDraft(draft, t) {
  const missing = t.rfp.notProvided;
  return [
    [t.rfp.pillar, draft.pillar === 'oilfield' ? t.options.oilfield : t.pillars.find((p) => p.id === draft.pillar)?.title],
    [t.rfp.modulesTitle, draft.modules.map((id) => labelFor(t.options.modules[draft.pillar], id)).filter(Boolean).join(', ') || t.rfp.noModules],
    [t.rfp.location, labelFor(t.options.locations, draft.location, missing)],
    [t.rfp.facility, labelFor(t.options.facilities, draft.facility, missing)],
    [t.rfp.timeline, labelFor(t.options.timelines, draft.timeline, missing)],
    [t.rfp.name, draft.name], [t.rfp.company, draft.company || missing],
    [t.rfp.email, draft.email], [t.rfp.phone, draft.phone],
    [t.rfp.notes, draft.notes || missing],
  ];
}
export function briefText(draft, t, { short = false } = {}) {
  const rows = describeDraft(draft, t);
  if (short && draft.notes.length > 450) rows[rows.length - 1][1] = `${draft.notes.slice(0, 450)}…`;
  return `${t.rfp.title} — The Smart Innovation\n\n${rows.map(([k,v]) => `${k}: ${v}`).join('\n\n')}${short ? `\n\n${t.rfp.linkNote}` : ''}`;
}
export function endpointUrl(value, origin) {
  if (!value.trim()) return '';
  try {
    const url = new URL(value, origin);
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (url.username || url.password || url.hash || (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))) throw new Error('endpoint');
    return url.href;
  } catch { throw new Error('endpoint'); }
}
export function submissionBody(draft, lang) {
  const body = new FormData();
  for (const key of ['pillar','location','facility','timeline','name','company','email','phone','notes','website']) body.append(key, draft[key].trim());
  body.append('modules', JSON.stringify(draft.modules));
  body.append('language', lang);
  body.append('consent', 'true');
  body.append('consentVersion', '2026-09-28');
  if (draft.file) body.append('attachment', draft.file, draft.file.name);
  return body;
}
export async function submitInquiry({ endpoint, draft, lang, signal, fetchFn = fetch }) {
  const response = await fetchFn(endpoint, { method: 'POST', body: submissionBody(draft, lang), signal, credentials: 'omit', headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('response');
  let data;
  try { data = await response.json(); } catch { throw new Error('response'); }
  // Never interpret an HTML thank-you page, HTTP 200 alone, or a local code as a receipt.
  if (data?.ok !== true || typeof data.reference !== 'string' || !data.reference.trim() || data.reference.length > 120) throw new Error('response');
  return data.reference.trim();
}
