import { useMemo, useState, type PropsWithChildren } from 'react';
import type { LicenceDraft } from '../../utils/types/club';
import { LicenceContext } from './LicenceContext';

export function LicenceProvider({ children }: PropsWithChildren) {
  const [draft, updateDraft] = useState<LicenceDraft>({
    firstName: '',
    lastName: '',
    birthDate: '',
    category: '',
    email: '',
  });
  const [signature, setSignature] = useState('');
  const value = useMemo(
    () => ({ draft, updateDraft, signature, setSignature }),
    [draft, signature],
  );
  return <LicenceContext.Provider value={value}>{children}</LicenceContext.Provider>;
}
