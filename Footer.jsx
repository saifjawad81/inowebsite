import Brand from './Brand.jsx';
import Icon from './Icon.jsx';
import { company } from '../data/company.js';
export default function Footer({ t, onNavigate }) {
  const links = [['services', t.nav.services], ['oilfield', t.nav.oilfield], ['who-we-are', t.nav.about], ['trust', t.footer.standards]];
  return <footer className="footer dark-surface"><div className="container"><div className="footer-grid"><div className="footer-brand"><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} aria-label={t.nav.home}><Brand /></a><p>{t.footer.desc}</p></div><div><h2>{t.footer.explore}</h2><nav aria-label={t.footer.explore}>{links.map(([id, text]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); onNavigate(id); }}>{text}</a>)}</nav></div><div className="footer-contact"><h2>{t.footer.contact}</h2><a href={`mailto:${company.email}`}><bdi>{company.email}</bdi></a><a href={`tel:${company.phone}`}><bdi>{company.displayPhone}</bdi></a><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">{t.contact.whatsapp}<Icon name="arrow" size={17} className="directional" /></a></div></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} The Smart Innovation. {t.footer.rights}</p><button type="button" className="text-button" onClick={() => { const privacy = document.getElementById('privacy'); if (privacy) privacy.open = true; onNavigate('privacy'); }}>{t.footer.privacy}</button><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>{t.footer.top}<Icon name="arrow" size={16} className="up-arrow" /></a></div>
  </div></footer>;
}
