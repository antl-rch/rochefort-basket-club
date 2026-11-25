import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import type { LicenceDraft } from '../../utils/types/club';
import { LicenceContext } from './LicenceContext';

export function LicenceProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<LicenceDraft>({
    firstName: '',
    lastName: '',
    birthDate: '',
    category: '',
    email: '',
  });
  const [signature, setSignature] = useState('');
  const updateDraft = useCallback((nextDraft: LicenceDraft) => {
    setDraft(nextDraft);
    // A signature must always be collected again after editing the application.
    setSignature('');
  }, []);
  const value = useMemo(
    () => ({ draft, updateDraft, signature, setSignature }),
    [draft, signature, updateDraft],
  );
  return <LicenceContext.Provider value={value}>{children}</LicenceContext.Provider>;
}
