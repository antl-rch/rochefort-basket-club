import { useEffect, useState, type PropsWithChildren } from 'react';
import { clubService } from '../../API/services/clubService';
import { clubData } from '../../data/club';
import type { ClubRepository } from '../../utils/types/club';
import { ClubContext, type ClubState } from './ClubContext';

export function ClubProvider({
  children,
  repository = clubService,
}: PropsWithChildren<{ repository?: ClubRepository }>) {
  const [state, setState] = useState<ClubState>({ data: clubData, status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    repository.getClub(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setState({ data, status: 'ready' });
      },
      () => {
        if (!controller.signal.aborted) setState({ data: clubData, status: 'error' });
      },
    );
    return () => controller.abort();
  }, [repository]);
  return <ClubContext.Provider value={state}>{children}</ClubContext.Provider>;
}
