export default function TrustBar({ t }) {
  return <section className="section standards-section" id="trust" tabIndex={-1} aria-labelledby="standards-title"><div className="container">
    <div className="section-heading"><p className="eyebrow">{t.trust.label}</p><h2 id="standards-title">{t.trust.title}</h2><p>{t.trust.intro}</p></div>
    <div className="standards-grid">{t.trust.items.map(([code, title, desc]) => <article key={code}><span className="standard-code" dir="ltr">{code}</span><h3>{title}</h3><p>{desc}</p></article>)}</div><p className="standards-note">{t.trust.note}</p>
  </div></section>;
}
