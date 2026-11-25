import { SectionLink } from '../sectionLink/SectionLink';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';

export function SectionNav() {
  const { t } = useTranslation();
  return (
    <nav className="section-nav" aria-label={t('nav.skip')}>
      <div className="container">
        <SectionLink targetId="equipes">
          <span className="desktop-label">01 / </span>
          {t('nav.teams')}
        </SectionLink>
        <SectionLink targetId="planning">
          <span className="desktop-label">02 / {t('nav.training')}</span>
          <span className="mobile-label">{t('nav.planning')}</span>
        </SectionLink>
        <SectionLink targetId="infos">
          <span className="desktop-label">03 / {t('nav.info')}</span>
          <span className="mobile-label">{t('nav.infoShort')}</span>
        </SectionLink>
        <a href="#">
          <span className="desktop-label">04 / </span>
          {t('nav.shop')} <FiArrowUpRight />
        </a>
      </div>
    </nav>
  );
}
