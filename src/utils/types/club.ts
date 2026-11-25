export type TeamId = 'mini' | 'youth' | 'senior';
export interface Team {
  id: TeamId;
  number: string;
  labelKey: string;
  ageGroups?: string;
  descriptionKey?: string;
}
export interface TrainingSession {
  id: string;
  teamId: TeamId;
  dayKey: string;
  start: string;
  end: string;
}
export interface ClubData {
  teams: readonly Team[];
  sessions: readonly TrainingSession[];
}
export interface ClubRepository {
  getClub: (signal: AbortSignal) => Promise<ClubData>;
}
export interface LicenceDraft {
  firstName: string;
  lastName: string;
  birthDate: string;
  category: TeamId | '';
  email: string;
}
export interface SignedApplication extends LicenceDraft {
  signature: string;
}
