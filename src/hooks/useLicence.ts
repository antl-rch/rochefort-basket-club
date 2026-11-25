import { useContext } from 'react';
import { LicenceContext } from '../context/licence/LicenceContext';

export function useLicence() {
  const context = useContext(LicenceContext);
  if (!context) throw new Error('useLicence requires LicenceProvider');
  return context;
}
