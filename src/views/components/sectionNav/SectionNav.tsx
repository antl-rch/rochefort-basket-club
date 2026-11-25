import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';

export function SectionNav() {
  const { t } = useTranslation();
  return <nav className="section-nav" aria-label={t('nav.skip')}><div className="container">
    <a href="#equipes"><span className="desktop-label">01 / </span>{t('nav.teams')}</a>
    <a href="#planning"><span className="desktop-label">02 / {t('nav.training')}</span><span className="mobile-label">{t('nav.planning')}</span></a>
    <a href="#infos"><span className="desktop-label">03 / {t('nav.info')}</span><span className="mobile-label">{t('nav.infoShort')}</span></a>
    <a href="#"><span className="desktop-label">04 / </span>{t('nav.shop')} <FiArrowUpRight /></a>
  </div></nav>;
}
