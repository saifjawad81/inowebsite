import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import { translations } from './data/translations.js';
import { createDraft, selectPillar } from './lib/inquiry.js';

function savedLanguage() {
  try { return window.localStorage.getItem('tsi-language') === 'ar' ? 'ar' : 'en'; } catch { return 'en'; }
}
export default function App() {
  const [lang, setLang] = useState(savedLanguage);
  const [activeSection, setActiveSection] = useState('home');
  const [draft, setDraft] = useState(createDraft);
  const [step, setStep] = useState(1);
  const [outcome, setOutcome] = useState(null);
  const [pending, setPending] = useState(false);
  const [scopeNotice, setScopeNotice] = useState(false);
  const lastScroll = useRef(0);
  const t = translations[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'الابتكار الذكي | البنية التحتية والأمن والذكاء الاصطناعي' : 'The Smart Innovation | Infrastructure, Security & AI';
    try { window.localStorage.setItem('tsi-language', lang); } catch { /* Private browsing may deny storage. */ }
  }, [lang]);
  useEffect(() => {
    const sections = ['home', 'services', 'oilfield', 'who-we-are', 'trust', 'contact'];
    const update = () => {
      lastScroll.current = 0;
      let current = 'home';
      for (const id of sections) { if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 180) current = id; }
      setActiveSection(current);
    };
    const onScroll = () => { if (!lastScroll.current) lastScroll.current = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    lastScroll.current = requestAnimationFrame(update);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(lastScroll.current); };
  }, []);
  const navigate = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    const focusTarget = id === 'privacy' ? element.querySelector('summary') : element;
    focusTarget?.focus({ preventScroll: true });
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    setActiveSection(id === 'rfp' ? 'contact' : id);
  };
  useEffect(() => {
    const restoreHash = () => {
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    const timer = setTimeout(restoreHash, 50);
    window.addEventListener('hashchange', restoreHash);
    return () => { clearTimeout(timer); window.removeEventListener('hashchange', restoreHash); };
  }, []);
  const choosePillar = (id) => {
    if (pending) return;
    setDraft((previous) => selectPillar(previous, id));
    setStep(1); setOutcome(null); setScopeNotice(true);
    navigate('rfp');
  };
  return <>
    <a className="skip-link" href="#main-content">{t.nav.skip}</a>
    <Header lang={lang} t={t} onToggleLanguage={() => setLang((value) => value === 'en' ? 'ar' : 'en')} activeSection={activeSection} onNavigate={navigate} />
    <main id="main-content" tabIndex={-1}><Home lang={lang} t={t} onNavigate={navigate} onChoosePillar={choosePillar} draft={draft} setDraft={setDraft} step={step} setStep={setStep} outcome={outcome} setOutcome={setOutcome} pending={pending} setPending={setPending} scopeNotice={scopeNotice} setScopeNotice={setScopeNotice} /></main>
    <Footer t={t} onNavigate={navigate} />
  </>;
}
