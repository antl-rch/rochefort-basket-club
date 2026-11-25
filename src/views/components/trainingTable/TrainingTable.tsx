import { useTranslation } from 'react-i18next';
import { useClub } from '../../../hooks/useClub';
import { formatTime } from '../../../utils/formatTime';

export function TrainingTable() {
  const { t, i18n } = useTranslation();
  const { data } = useClub();
  return (
    <div className="training-table">
      <table>
        <caption className="sr-only">{t('planning.title')}</caption>
        <thead>
          <tr>
            <th scope="col">{t('planning.category')}</th>
            <th scope="col">{t('planning.day')}</th>
            <th scope="col">{t('planning.time')}</th>
          </tr>
        </thead>
        <tbody>
          {data.sessions.map((session) => (
            <tr key={session.id}>
              <th scope="row">{t(`teams.${session.teamId}`)}</th>
              <td>{t(session.dayKey)}</td>
              <td>
                {formatTime(session.start, i18n.language)} –{' '}
                {formatTime(session.end, i18n.language)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{t('planning.note')}</p>
    </div>
  );
}
