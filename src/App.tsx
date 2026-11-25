import { SectionLink } from './views/components/sectionLink/SectionLink';
import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomePage } from './views/layouts/homePage/HomePage';
import { LicenceProvider } from './context/licence/LicenceProvider';

const LicencePage = lazy(() =>
  import('./views/layouts/licencePage/LicencePage').then((module) => ({
    default: module.LicencePage,
  })),
);

export default function App() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <SectionLink className="skip-link" targetId="main-content">
        {t('nav.skip')}
      </SectionLink>
      <Suspense
        fallback={
          <main aria-busy="true" className="container loading">
            Rochefort Basket Club…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/licence"
            element={
              <LicenceProvider>
                <LicencePage />
              </LicenceProvider>
            }
          />
          <Route
            path="*"
            element={
              <main id="main-content" className="container licence-page">
                <h1>{t('notFound.title')}</h1>
                <p>{t('notFound.description')}</p>
                <Link to="/">{t('licence.home')}</Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}
