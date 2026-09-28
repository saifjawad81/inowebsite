import { company } from '../data/company.js';
import Icon from './Icon.jsx';
export default function Contact({ t, endpoint, provider }) {
  return <aside className="contact-sidebar">
    <div className="contact-card"><span className="icon-tile"><Icon name="message" size={25} /></span><h3>{t.contact.direct}</h3><p>{t.contact.directText}</p><div className="contact-links">
      <a href={`mailto:${company.email}`}><Icon name="mail" size={21} /><span><strong>{t.contact.email}</strong><bdi>{company.email}</bdi></span><Icon name="arrow" size={17} className="directional" /></a>
      <a href={`tel:${company.phone}`}><Icon name="phone" size={21} /><span><strong>{t.contact.call}</strong><bdi>{company.displayPhone}</bdi></span><Icon name="arrow" size={17} className="directional" /></a>
      <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"><Icon name="message" size={21} /><span><strong>{t.contact.whatsapp}</strong><bdi>{company.displayPhone}</bdi></span><Icon name="arrow" size={17} className="directional" /></a>
    </div></div>
    <details className="privacy-card" id="privacy"><summary><Icon name="lock" size={18} />{t.contact.privacyTitle}<Icon name="plus" size={16} /></summary><p>{t.contact.privacy}</p>{endpoint && <p><strong>{t.contact.provider}: </strong>{provider || t.contact.providerUnknown}<br /><bdi className="endpoint-host">{new URL(endpoint, window.location.origin).hostname}</bdi></p>}</details>
  </aside>;
}
