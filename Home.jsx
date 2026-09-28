import Hero from './Hero.jsx';
import Services from './Services.jsx';
import OilFieldSection from './OilFieldSection.jsx';
import WhoWeAre from './WhoWeAre.jsx';
import TrustBar from './TrustBar.jsx';
import RfpWizard from './RfpWizard.jsx';
export default function Home(props) {
  const { t, onNavigate, onChoosePillar } = props;
  return <>
    <Hero t={t} onNavigate={onNavigate} />
    <Services t={t} onChoosePillar={onChoosePillar} />
    <OilFieldSection t={t} onChoosePillar={onChoosePillar} />
    <WhoWeAre t={t} />
    <TrustBar t={t} />
    {/* Stable component identity: no language/pillar key and no persisted personal data. */}
    <RfpWizard {...props} />
  </>;
}
