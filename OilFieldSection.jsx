import Icon from './Icon.jsx';
export default function OilFieldSection({ t, onChoosePillar }) {
  return <section className="section oil-section dark-surface" id="oilfield" tabIndex={-1} aria-labelledby="oil-title"><div className="container oil-grid">
    <div><p className="eyebrow">{t.oil.label}</p><h2 id="oil-title">{t.oil.title}</h2><p className="section-intro">{t.oil.intro}</p>
      <div className="oil-requirements">{t.oil.items.map(([title, desc], i) => <div key={title}><span className="small-icon"><Icon name={['shield', 'network', 'tool'][i]} size={23} /></span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div>
      <button type="button" className="button button-cyan" onClick={() => onChoosePillar('oilfield')}>{t.oil.cta}<Icon name="arrow" size={18} className="directional" /></button>
    </div>
    <div className="industrial-panel"><div className="industrial-art" aria-hidden="true"><span className="art-grid" /><div className="art-pylon pylon-one" /><div className="art-pylon pylon-two" /><div className="art-building"><span /><span /><span /></div><div className="art-pipe" /><span className="art-orbit" /></div>
      <div className="industrial-content"><p className="eyebrow">{t.oil.panelLabel}</p><h3>{t.oil.panelTitle}</h3><ol>{t.oil.panelRows.map(([num, title, desc]) => <li key={num}><span className="process-num">{num}</span><div><strong>{title}</strong><p>{desc}</p></div></li>)}</ol><p className="industrial-note">{t.oil.note}</p></div>
    </div>
  </div></section>;
}
