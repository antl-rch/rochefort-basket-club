import { createContext } from 'react';
import type { ClubData } from '../../utils/types/club';

export interface ClubState { data: ClubData; status: 'loading' | 'ready' | 'error' }
export const ClubContext = createContext<ClubState | undefined>(undefined);
