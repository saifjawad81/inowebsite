import { useEffect, useRef, useState } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';

export default function Header({ lang, t, onToggleLanguage, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const header = useRef(null);
  const links = [['services', t.nav.services], ['oilfield', t.nav.oilfield], ['who-we-are', t.nav.about], ['contact', t.nav.contact]];
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    const closeOutside = (event) => { if (!header.current?.contains(event.target)) setOpen(false); };
    const closeDesktop = () => { if (window.innerWidth > 1000) setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    window.addEventListener('resize', closeDesktop);
    return () => { document.removeEventListener('keydown', closeOnEscape); document.removeEventListener('pointerdown', closeOutside); window.removeEventListener('resize', closeDesktop); };
  }, [open]);
  const navigate = (event, id) => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); setOpen(false); onNavigate(id); };
  return <header className="header" ref={header}>
    <div className="container header-inner">
      <a href="#home" className="brand-link" onClick={(event) => navigate(event, 'home')} aria-label={`${t.nav.home} — The Smart Innovation`}><Brand /></a>
      <nav className="desktop-nav" aria-label={t.nav.open}>{links.map(([id, text]) => <a key={id} href={`#${id}`} onClick={(event) => navigate(event, id)} aria-current={activeSection === id ? 'location' : undefined}>{text}</a>)}</nav>
      <div className="header-actions">
        <button type="button" className="language-button" onClick={onToggleLanguage} lang={lang === 'en' ? 'ar' : 'en'} aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}><Icon name="globe" size={17} /><span>{t.nav.language}</span></button>
        <a href="#rfp" className="button button-cyan header-cta" onClick={(event) => navigate(event, 'rfp')}>{t.nav.rfp}<Icon className="directional" name="arrow" size={17} /></a>
        <button type="button" ref={menuButton} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? t.nav.close : t.nav.open}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
    <nav className="mobile-navigation" id="mobile-navigation" hidden={!open} aria-label={t.nav.open}>
      <div className="container">{links.map(([id, text]) => <a key={id} href={`#${id}`} onClick={(event) => navigate(event, id)} aria-current={activeSection === id ? 'location' : undefined}>{text}<Icon name="arrow" size={18} className="directional" /></a>)}
        <a className="mobile-proposal" href="#rfp" onClick={(event) => navigate(event, 'rfp')}>{t.nav.rfp}<Icon name="arrow" className="directional" size={18} /></a>
      </div>
    </nav>
  </header>;
}
