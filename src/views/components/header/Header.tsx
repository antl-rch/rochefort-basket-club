import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiX, FiArrowUpRight } from 'react-icons/fi';
import { Brand } from '../brand/Brand';
import { ButtonLink } from '../button/Button';

export function Header({ licence = false }: { licence?: boolean }) {
  const { t } = useTranslation();
  return (
    <header className={`header ${licence ? 'header--licence' : ''}`} id="top">
      <div className="container header__inner">
        <Brand />
        {licence ? (
          <Link to="/" className="text-link">
            {t('licence.exit')} <FiX />
          </Link>
        ) : (
          <>
            <nav className="header__nav" aria-label="Navigation">
              <a href="#equipes">{t('nav.teams')}</a>
              <a href="#planning">{t('nav.planning')}</a>
              <a href="#infos">{t('nav.info')}</a>
              <a href="#">
                {t('nav.shop')} <FiArrowUpRight />
              </a>
            </nav>
            <ButtonLink to="/licence" variant="orange">
              <span className="desktop-label">{t('nav.licence')}</span>
              <span className="mobile-label">{t('nav.licenceShort')}</span>
            </ButtonLink>
          </>
        )}
      </div>
    </header>
  );
}
