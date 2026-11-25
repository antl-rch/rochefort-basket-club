import { useTranslation } from 'react-i18next';
import { FiArrowUp } from 'react-icons/fi';
import { Brand } from '../brand/Brand';
import { LanguageSwitcher } from '../languageSwitcher/LanguageSwitcher';

export function Footer() {
  const { t } = useTranslation();
  return <footer className="footer"><div className="container footer__inner"><Brand compact /><a href="#top" className="text-link">{t('nav.top')} <FiArrowUp /></a><div className="footer__right"><span>ROCHEFORT (17) · BASKET</span><LanguageSwitcher /></div></div></footer>;
}
