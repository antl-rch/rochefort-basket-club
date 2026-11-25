import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/nunito';
import './i18n';
import './utils/styles/global.scss';
import App from './App';
import { ClubProvider } from './context/club/ClubProvider';

// Hash routes keep direct links and refreshes working on static GitHub Pages hosting.
const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ClubProvider>
        <App />
      </ClubProvider>
    </Router>
  </StrictMode>,
);
