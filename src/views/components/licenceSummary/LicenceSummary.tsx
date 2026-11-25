import { useTranslation } from 'react-i18next';
import { FiCheck } from 'react-icons/fi';
import { useLicence } from '../../../hooks/useLicence';

export function LicenceSummary() {
  const { t, i18n } = useTranslation();
  const { draft, signature } = useLicence();
  return <div className="licence-summary"><strong>{draft.firstName} {draft.lastName} · {t(`teams.${draft.category}`)}</strong><p>{draft.email}</p><p>{new Intl.DateTimeFormat(i18n.language).format(new Date(`${draft.birthDate}T12:00:00`))}</p><p className="text-link"><FiCheck />{t('licence.signed')}</p><img src={signature} alt={t('licence.signature')} /></div>;
}
