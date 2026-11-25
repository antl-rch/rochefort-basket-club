import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fr } from './locales/fr';
import { en } from './locales/en';

let language = 'fr';
try { language = localStorage.getItem('rbc.language') === 'en' ? 'en' : 'fr'; } catch { /* Storage can be unavailable in private browsing. */ }

void i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: language, fallbackLng: 'fr', interpolation: { escapeValue: false },
});

document.documentElement.lang = language;
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try { localStorage.setItem('rbc.language', lng); } catch { /* Translation still works without storage. */ }
});

export default i18n;
