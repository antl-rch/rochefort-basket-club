import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Hero } from '../../components/hero/Hero';
import { SectionNav } from '../../components/sectionNav/SectionNav';
import { TeamsSection } from '../../components/teamsSection/TeamsSection';
import { PlanningSection } from '../../components/planningSection/PlanningSection';
import { LicenceSection } from '../../components/licenceSection/LicenceSection';
import { InfoSection } from '../../components/infoSection/InfoSection';
import { ShopSection } from '../../components/shopSection/ShopSection';

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <SectionNav />
        <TeamsSection />
        <PlanningSection />
        <LicenceSection />
        <InfoSection />
        <ShopSection />
      </main>
      <Footer />
    </>
  );
}
