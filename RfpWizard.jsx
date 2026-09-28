import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Contact from './Contact.jsx';
import { company } from '../data/company.js';
import { ALLOWED_EXTENSIONS, briefText, createDraft, describeDraft, endpointUrl, selectPillar, submitInquiry, validateDraft, validateFile } from '../lib/inquiry.js';

function Field({ id, label, required = false, hint, error, children, className = '' }) {
  return <div className={`form-field ${className}`}>
    <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    {children}
    {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
    {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
  </div>;
}
function SelectField({ id, label, choices, value, onChange, error, t }) {
  return <Field id={id} label={label} required error={error}><select id={id} name={id} value={value} onChange={onChange} required aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}><option value="">{t.rfp.choose}</option>{choices.map(([key, title]) => <option key={key} value={key}>{title}</option>)}</select></Field>;
}
function Summary({ draft, t }) {
  return <dl className="inquiry-summary">{describeDraft(draft, t).map(([label, value]) => <div key={label}><dt>{label}</dt><dd dir="auto">{value}</dd></div>)}</dl>;
}
function downloadBrief(draft, t) {
  const blob = new Blob(['\uFEFF', briefText(draft, t)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'The-Smart-Innovation-project-inquiry.txt';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function RfpWizard({ lang, t, draft, setDraft, step, setStep, outcome, setOutcome, pending, setPending, scopeNotice, setScopeNotice }) {
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const heading = useRef(null);
  const feedback = useRef(null);
  const fileInput = useRef(null);
  const activeController = useRef(null);
  const rawEndpoint = import.meta.env.VITE_RFP_ENDPOINT || '';
  let endpoint = ''; let invalidConfiguration = false;
  try { endpoint = endpointUrl(rawEndpoint, window.location.origin); } catch { invalidConfiguration = true; }
  const online = Boolean(endpoint);
  const provider = import.meta.env.VITE_RFP_PROVIDER_LABEL || '';
  useEffect(() => () => activeController.current?.abort(), []);

  const errorFor = (id) => errors[id] ? t.rfp.errors[errors[id]] : undefined;
  const change = (event) => {
    const { name, value, checked, type } = event.target;
    setDraft((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setFormError(''); setScopeNotice(false);
  };
  const changePillar = (id) => { setDraft((previous) => selectPillar(previous, id)); setErrors({}); setScopeNotice(false); };
  const toggleModule = (id) => setDraft((previous) => ({ ...previous, modules: previous.modules.includes(id) ? previous.modules.filter((v) => v !== id) : [...previous.modules, id] }));
  const changeFile = (event) => {
    const file = event.target.files?.[0] || null;
    const error = validateFile(file);
    setErrors((previous) => ({ ...previous, file: error }));
    setDraft((previous) => ({ ...previous, file: error ? null : file }));
    if (error) event.target.value = '';
  };
  const focusHeading = () => requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  const showErrors = (found) => {
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first === 'pillar') setStep(1);
    else if (['location','facility','timeline','notes'].includes(first)) setStep(2);
    else setStep(3);
    requestAnimationFrame(() => document.getElementById(first === 'pillar' ? 'pillar-infrastructure' : first)?.focus());
  };
  const submit = async (event) => {
    event.preventDefault();
    if (pending) return;
    const found = validateDraft(draft, step);
    if (Object.keys(found).length) { showErrors(found); return; }
    setErrors({}); setFormError('');
    if (step < 3) { setStep(step + 1); focusHeading(); return; }
    if (!online) { setOutcome({ kind: 'prepared' }); focusHeading(); return; }
    setPending(true);
    const controller = new AbortController(); activeController.current = controller;
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const reference = await submitInquiry({ endpoint, draft, lang, signal: controller.signal });
      setOutcome({ kind: 'accepted', reference }); focusHeading();
    } catch (error) {
      const code = error.name === 'AbortError' ? 'timeout' : error.message === 'response' ? 'response' : 'network';
      setFormError(code);
      requestAnimationFrame(() => feedback.current?.focus({ preventScroll: true }));
    } finally { clearTimeout(timeout); setPending(false); activeController.current = null; }
  };
  const reset = () => { setDraft(createDraft()); setStep(1); setOutcome(null); setErrors({}); setFormError(''); setScopeNotice(false); focusHeading(); };
  const solutionChoices = [...t.pillars.map((p) => ({ id: p.id, icon: p.icon, title: p.title })), { id: 'oilfield', icon: 'network', title: t.options.oilfield }];
  const shortText = briefText(draft, t, { short: true });
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(shortText)}`;
  const emailUrl = `mailto:${company.email}?subject=${encodeURIComponent(`${t.rfp.title} — ${draft.company || draft.name}`)}&body=${encodeURIComponent(shortText)}`;
  return <section className="section inquiry-section" id="contact" tabIndex={-1} aria-labelledby="contact-title"><div className="container">
    <div className="section-heading"><p className="eyebrow">{t.contact.label}</p><h2 id="contact-title">{t.contact.title}</h2><p>{t.contact.intro}</p></div>
    <div className="inquiry-layout">
      <div className="wizard-card" id="rfp" tabIndex={-1}>
        <div className="wizard-top"><div><h3>{t.rfp.title}</h3><p>{t.rfp.subtitle}</p></div><span className="mode-badge"><Icon name={online ? 'globe' : 'file'} size={15} />{online ? t.rfp.modeApi : t.rfp.modeManual}</span></div>
        {invalidConfiguration && <p className="form-alert" role="alert">{t.rfp.errors.endpoint}</p>}
        {outcome ? <div className="inquiry-result">
          <span className={`result-icon ${outcome.kind === 'accepted' ? 'is-accepted' : ''}`}><Icon name={outcome.kind === 'accepted' ? 'check' : 'file'} size={29} /></span>
          <h3 ref={heading} tabIndex={-1}>{outcome.kind === 'accepted' ? t.rfp.sentTitle : t.rfp.readyTitle}</h3>
          <p role="status">{outcome.kind === 'accepted' ? t.rfp.sentText : t.rfp.readyText}</p>
          {outcome.reference && <div className="receipt">{t.rfp.reference}: <strong dir="auto">{outcome.reference}</strong></div>}
          <details className="review-details" open><summary>{t.rfp.summary}</summary><Summary draft={draft} t={t} /></details>
          {outcome.kind === 'prepared' && <div className="handoff-actions"><a href={emailUrl} className="button button-primary"><Icon name="mail" size={18} />{t.rfp.emailAction}</a><a href={whatsappUrl} className="button button-secondary" target="_blank" rel="noopener noreferrer"><Icon name="message" size={18} />{t.rfp.whatsappAction}</a></div>}
          <button type="button" className="button button-secondary download-button" onClick={() => downloadBrief(draft, t)}><Icon name="download" size={18} />{t.rfp.download}</button>
          {outcome.kind === 'prepared' && <p className="field-hint">{t.rfp.linkNote}</p>}
          <div className="result-footer">{outcome.kind === 'prepared' && <button type="button" className="text-button" onClick={() => { setOutcome(null); focusHeading(); }}>{t.rfp.edit}</button>}<button type="button" className="text-button" onClick={reset}>{t.rfp.new}</button></div>
        </div> : <>
          <ol className="form-stepper" aria-label={`${t.rfp.step} ${step} ${t.rfp.of} 3`}>{t.rfp.steps.map((label, index) => <li key={index} className={step === index + 1 ? 'current' : step > index + 1 ? 'complete' : ''} aria-current={step === index + 1 ? 'step' : undefined}><span className="step-circle">{step > index + 1 ? <Icon name="check" size={16} /> : index + 1}</span><span className="step-label">{label}</span></li>)}</ol>
          <div className="wizard-explanation"><Icon name={online ? 'globe' : 'file'} size={17} /><p>{online ? t.rfp.modeApiText : t.rfp.modeManualText}</p></div>
          {scopeNotice && <p className="scope-notice" role="status">{t.rfp.scopeChanged}</p>}
          <form onSubmit={submit} noValidate aria-busy={pending}>
            <fieldset className="wizard-fields" disabled={pending}>
              <legend className="sr-only">{t.rfp.title}</legend>
              <h3 className="step-title" ref={heading} tabIndex={-1}>{[t.rfp.scopeTitle, t.rfp.projectTitle, t.rfp.contactTitle][step - 1]}</h3>
              <p className="required-note">{t.rfp.required}</p>
              {step === 1 && <>
                <fieldset className="scope-options"><legend className="field-label">{t.rfp.pillar} *</legend><div className="scope-grid">{solutionChoices.map((p) => <label key={p.id} className={`scope-option ${draft.pillar === p.id ? 'selected' : ''}`}><input id={`pillar-${p.id}`} name="pillar" type="radio" value={p.id} checked={draft.pillar === p.id} onChange={() => changePillar(p.id)} /><Icon name={p.icon} size={21} /><span>{p.title}</span></label>)}</div></fieldset>
                <fieldset className="module-options"><legend className="field-label">{t.rfp.modulesTitle} <span>({t.rfp.optional})</span></legend><div className="module-grid">{t.options.modules[draft.pillar].map(([id, label]) => <label key={id}><input type="checkbox" name="modules" value={id} checked={draft.modules.includes(id)} onChange={() => toggleModule(id)} /><span>{label}</span></label>)}</div></fieldset>
              </>}
              {step === 2 && <>
                <div className="form-grid"><SelectField id="location" label={t.rfp.location} choices={t.options.locations} value={draft.location} onChange={change} error={errorFor('location')} t={t} /><SelectField id="facility" label={t.rfp.facility} choices={t.options.facilities} value={draft.facility} onChange={change} error={errorFor('facility')} t={t} /></div>
                <SelectField id="timeline" label={t.rfp.timeline} choices={t.options.timelines} value={draft.timeline} onChange={change} error={errorFor('timeline')} t={t} />
                <Field id="notes" label={`${t.rfp.notes} (${t.rfp.optional})`} hint={t.rfp.notesHint} error={errorFor('notes')}><textarea id="notes" name="notes" rows={4} maxLength={1500} value={draft.notes} onChange={change} placeholder={t.rfp.notePlaceholder} aria-invalid={Boolean(errors.notes)} aria-describedby={`notes-hint${errors.notes ? ' notes-error' : ''}`} /><span className="character-count" dir="ltr">{draft.notes.length} / 1500</span></Field>
              </>}
              {step === 3 && <>
                <div className="form-grid">
                  <Field id="name" label={t.rfp.name} required error={errorFor('name')}><input id="name" name="name" autoComplete="name" maxLength={100} value={draft.name} onChange={change} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></Field>
                  <Field id="company" label={`${t.rfp.company} (${t.rfp.optional})`} error={errorFor('company')}><input id="company" name="company" autoComplete="organization" maxLength={150} value={draft.company} onChange={change} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'company-error' : undefined} /></Field>
                  <Field id="email" label={t.rfp.email} required error={errorFor('email')}><input id="email" name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" maxLength={254} value={draft.email} onChange={change} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></Field>
                  <Field id="phone" label={t.rfp.phone} required error={errorFor('phone')}><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={30} value={draft.phone} onChange={change} required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} /></Field>
                </div>
                {online ? <Field id="file" label={`${t.rfp.attachment} (${t.rfp.optional})`} hint={t.rfp.fileHint} error={errorFor('file')}><input ref={fileInput} type="file" id="file" name="attachment" accept={ALLOWED_EXTENSIONS.map((value) => `.${value}`).join(',')} onChange={changeFile} aria-describedby={`file-hint${errors.file ? ' file-error' : ''}`} aria-invalid={Boolean(errors.file)} />{draft.file && <div className="selected-file"><Icon name="file" size={19} /><span dir="auto">{draft.file.name}</span><button className="text-button" type="button" onClick={() => { setDraft((previous) => ({ ...previous, file: null })); setErrors((previous) => ({ ...previous, file: undefined })); if (fileInput.current) fileInput.current.value = ''; }}>{t.rfp.removeFile}</button></div>}</Field> : <p className="attachment-note"><Icon name="file" size={19} /><span>{t.rfp.manualFile}</span></p>}
                <details className="review-details"><summary>{t.rfp.summary}</summary><Summary draft={draft} t={t} /></details>
                <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" value={draft.website} onChange={change} autoComplete="off" tabIndex={-1} /></div>
                <label className="consent-row"><input id="consent" name="consent" type="checkbox" checked={draft.consent} onChange={change} required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>{online ? t.rfp.consentApi : t.rfp.consent}</span></label>{errors.consent && <p className="field-error" id="consent-error">{errorFor('consent')}</p>}
              </>}
              {formError && <p className="form-alert" role="alert" ref={feedback} tabIndex={-1}><Icon name="alert" size={19} />{t.rfp.errors[formError]}</p>}
              <div className="form-actions"><span>{step > 1 && <button type="button" className="button button-secondary" onClick={() => { setStep(step - 1); setErrors({}); setFormError(''); focusHeading(); }}><Icon name="arrow" className="back-arrow" size={17} />{t.rfp.back}</button>}</span><button type="submit" className="button button-primary">{pending ? t.rfp.submitting : step < 3 ? t.rfp.next : online ? t.rfp.submit : t.rfp.prepare}<Icon name="arrow" size={18} className="directional" /></button></div>
            </fieldset>
          </form>
          <p className="draft-retained"><Icon name="globe" size={14} />{t.rfp.retained}</p>
        </>}
      </div>
      <Contact t={t} endpoint={endpoint} provider={provider} />
    </div>
  </div></section>;
}
