import { clubData } from '../../data/club';
import type { ClubRepository } from '../../utils/types/club';

// Swap this adapter for an HTTP repository when the club gets its API.
export const clubService: ClubRepository = {
  async getClub(signal) {
    signal.throwIfAborted();
    return clubData;
  },
};
