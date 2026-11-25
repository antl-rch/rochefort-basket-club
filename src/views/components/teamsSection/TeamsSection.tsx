import { useTranslation } from 'react-i18next';
import { useClub } from '../../../hooks/useClub';
import { SectionHeading } from '../sectionHeading/SectionHeading';
import { TeamCard } from '../teamCard/TeamCard';
import { PhotoStrip } from '../clubPhoto/ClubPhoto';

export function TeamsSection() {
  const { t } = useTranslation();
  const { data } = useClub();
  return <section id="equipes" className="teams container" aria-labelledby="teams-title"><SectionHeading id="teams-title" eyebrow={t('teams.eyebrow')} title={t('teams.title')} /><p className="section-description">{t('teams.description')}</p><div className="teams__grid">{data.teams.map(team => <TeamCard key={team.id} team={team} />)}</div><PhotoStrip photos={['youth', 'women', 'duel']} /><p className="small-note">{t('teams.note')}</p></section>;
}
