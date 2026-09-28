import Icon from './Icon.jsx';
export default function Services({ t, onChoosePillar }) {
  return <section className="section solutions-section" id="services" tabIndex={-1} aria-labelledby="solutions-title">
    <div className="container">
      <div className="section-heading"><p className="eyebrow">{t.solutions.label}</p><h2 id="solutions-title">{t.solutions.title}</h2><p>{t.solutions.intro}</p></div>
      <div className="solutions-grid">{t.pillars.map((pillar) => <article className="solution-card" key={pillar.id}>
        <div className="solution-top"><span className="icon-tile"><Icon name={pillar.icon} size={29} /></span><span className="solution-number" aria-hidden="true">{pillar.number}</span></div>
        <h3>{pillar.title}</h3><p className="solution-tagline">{pillar.tagline}</p>
        <ul className="deliverables">{pillar.summary.map((line) => <li key={line}><Icon name="check" size={17} /><span>{line}</span></li>)}</ul>
        <details className="solution-details"><summary><span className="details-closed">{t.solutions.view}</span><span className="details-open">{t.solutions.less}</span><Icon name="plus" size={18} /></summary><div><h4>{t.solutions.detailTitle}</h4><ul>{pillar.details.map((line) => <li key={line}>{line}</li>)}</ul></div></details>
        <button type="button" className="solution-action" onClick={() => onChoosePillar(pillar.id)}>{t.solutions.request}<Icon name="arrow" size={18} className="directional" /></button>
      </article>)}</div>
    </div>
  </section>;
}
