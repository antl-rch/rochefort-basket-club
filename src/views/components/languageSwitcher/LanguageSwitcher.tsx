import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  return <div className="language-switcher" role="group" aria-label={t('nav.language')}>
    {(['fr', 'en'] as const).map((language) => <button key={language} type="button" lang={language} aria-pressed={i18n.language === language} onClick={() => void i18n.changeLanguage(language)}>{language.toUpperCase()}</button>)}
  </div>;
}
