import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/nunito';
import './i18n';
import './utils/styles/global.scss';
import App from './App';
import { ClubProvider } from './context/club/ClubProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClubProvider>
        <App />
      </ClubProvider>
    </BrowserRouter>
  </StrictMode>,
);
