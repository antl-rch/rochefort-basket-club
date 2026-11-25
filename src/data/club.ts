import type { ClubData } from '../utils/types/club';

export const clubData: ClubData = {
  teams: [
    { id: 'mini', number: '01', labelKey: 'teams.discovery', ageGroups: 'U7 · U9 · U11' },
    { id: 'youth', number: '02', labelKey: 'teams.training', ageGroups: 'U12 / U13 · U15 · U18' },
    { id: 'senior', number: '03', labelKey: 'teams.adults', descriptionKey: 'teams.mixed' },
  ],
  sessions: [
    { id: 'mini-wednesday', teamId: 'mini', dayKey: 'planning.wednesday', start: '14:00', end: '15:30' },
    { id: 'youth-friday', teamId: 'youth', dayKey: 'planning.friday', start: '17:30', end: '19:00' },
    { id: 'senior-tuesday', teamId: 'senior', dayKey: 'planning.tuesday', start: '20:00', end: '22:00' },
  ],
};
