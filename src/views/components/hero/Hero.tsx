import { SectionLink } from '../sectionLink/SectionLink';
import { useTranslation } from 'react-i18next';
import { FiArrowDown } from 'react-icons/fi';
import { ButtonLink } from '../button/Button';
import { ClubPhoto } from '../clubPhoto/ClubPhoto';

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow">{t('hero.eyebrow')}</p>
        <h1 id="hero-title">
          ROCHEFORT<span>BASKET CLUB</span>
        </h1>
        <p className="hero__description">{t('hero.description')}</p>
        <div className="hero__actions">
          <ButtonLink to="/licence">{t('nav.licence')}</ButtonLink>
          <SectionLink targetId="planning" className="text-link">
            <span className="desktop-label">{t('hero.planning')}</span>
            <span className="mobile-label">{t('nav.planning')}</span>
            <FiArrowDown />
          </SectionLink>
        </div>
      </div>
      <ClubPhoto photo="hero" priority />
    </section>
  );
}
