import { createContext } from 'react';
import type { LicenceDraft } from '../../utils/types/club';

export interface LicenceState {
  draft: LicenceDraft;
  updateDraft: (draft: LicenceDraft) => void;
  signature: string;
  setSignature: (signature: string) => void;
}
export const LicenceContext = createContext<LicenceState | undefined>(undefined);
