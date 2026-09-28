import Icon from './Icon.jsx';
export default function Hero({ t, onNavigate }) {
  return <>
    <section className="hero dark-surface" id="home" tabIndex={-1} aria-labelledby="hero-title">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />{t.hero.badge}</p>
          <h1 id="hero-title">{t.hero.lines.map((line, index) => <span key={index} className={index === 2 ? 'hero-accent' : ''}>{line}</span>)}</h1>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="hero-actions">
            <a className="button button-cyan" href="#rfp" onClick={(event) => { event.preventDefault(); onNavigate('rfp'); }}>{t.nav.rfp}<Icon name="arrow" size={19} className="directional" /></a>
            <a className="button button-ghost" href="#services" onClick={(event) => { event.preventDefault(); onNavigate('services'); }}>{t.hero.explore}<Icon name="chevron" size={18} className="directional" /></a>
          </div>
        </div>
        <div className="capability-panel" aria-label={t.hero.diagramLabel}>
          <div className="diagram-heading"><span className="eyebrow">{t.hero.diagramLabel}</span><Icon name="network" size={24} /></div>
          <h2>{t.hero.diagramTitle}</h2><p className="diagram-description">{t.hero.diagramText}</p>
          <div className="capability-stack">
            {t.hero.diagramLayers.map(([title, desc], index) => <div className={`capability-layer layer-${index}`} key={index}>
              <span className="layer-icon"><Icon name={['cpu', 'shield', 'server'][index]} size={25} /></span>
              <div><strong>{title}</strong><span>{desc}</span></div><span className="layer-number" aria-hidden="true">0{3 - index}</span>
            </div>)}
          </div>
          <div className="diagram-footer"><span className="diagram-connector" aria-hidden="true"><i /><i /><i /></span><span>{t.hero.diagramFoot}</span></div>
        </div>
      </div>
    </section>
    <div className="principles-band"><div className="container principles-grid">{t.hero.principles.map(([title, desc], index) => <div className="principle" key={title}><Icon name={['layers', 'compass', 'network'][index]} size={26} /><div><strong>{title}</strong><p>{desc}</p></div></div>)}</div></div>
  </>;
}
