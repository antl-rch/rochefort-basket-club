import { useTranslation } from 'react-i18next';
import type { Team } from '../../../utils/types/club';

export function TeamCard({ team }: { team: Team }) {
  const { t } = useTranslation();
  return <article className="team-card"><p className="eyebrow">{team.number} / {t(team.labelKey)}</p><h3>{t(`teams.${team.id}`)}</h3><p>{team.ageGroups ?? t(team.descriptionKey ?? '')}</p></article>;
}
