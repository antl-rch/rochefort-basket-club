import i18n from '../../i18n';
import type { SignedApplication } from '../types/club';

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  );
}

// Static-site boundary: export locally. This service does not send or store personal data.
export function downloadApplication(application: SignedApplication) {
  if (!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(application.signature))
    throw new Error('Invalid signature image');
  const t = i18n.t.bind(i18n);
  const fields = [
    [t('licence.firstName'), application.firstName],
    [t('licence.lastName'), application.lastName],
    [t('licence.birthDate'), application.birthDate],
    [t('licence.category'), t(`teams.${application.category}`)],
    [t('licence.email'), application.email],
  ];
  const html = `<!doctype html><html lang="${i18n.language === 'en' ? 'en' : 'fr'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Rochefort Basket Club</title><style>body{font:16px system-ui;max-width:720px;margin:48px auto;padding:24px;color:#01009e}h1{font-size:28px}dt{font-weight:bold;margin-top:18px}dd{margin:4px 0}img{max-width:100%;width:360px;border:1px solid #dcd8cf}small{display:block;margin-top:32px}</style><h1>ROCHEFORT BASKET CLUB</h1><h2>${escapeHtml(t('licence.dossier'))}</h2><dl>${fields.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl><h2>${escapeHtml(t('licence.signature'))}</h2><img alt="${escapeHtml(t('licence.signature'))}" src="${application.signature}"><small>${escapeHtml(t('licence.staticNotice'))}</small></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'rochefort-basket-club-demande-licence.html';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
