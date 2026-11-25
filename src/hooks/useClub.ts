import { useContext } from 'react';
import { ClubContext } from '../context/club/ClubContext';

export function useClub() {
  const context = useContext(ClubContext);
  if (!context) throw new Error('useClub requires ClubProvider');
  return context;
}
