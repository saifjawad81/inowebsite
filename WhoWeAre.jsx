import Icon from './Icon.jsx';
export default function WhoWeAre({ t }) {
  return <section className="section about-section" id="who-we-are" tabIndex={-1} aria-labelledby="about-title"><div className="container">
    <div className="about-intro"><div><p className="eyebrow">{t.about.label}</p><h2 id="about-title">{t.about.title}</h2></div><div><p className="about-lead">{t.about.intro}</p><p>{t.about.body}</p></div></div>
    <div className="process-heading"><span className="eyebrow">{t.about.processLabel}</span><span aria-hidden="true" /></div>
    <ol className="delivery-process">{t.about.process.map(([title, desc], i) => <li key={i}><div className="process-top"><span className="process-num">0{i + 1}</span><Icon name={['compass', 'layers', 'check', 'tool'][i]} size={25} /></div><h3>{title}</h3><p>{desc}</p></li>)}</ol>
  </div></section>;
}
