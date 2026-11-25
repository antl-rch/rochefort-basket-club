import { useTranslation } from 'react-i18next';

const photoAssets = {
  hero: 'imgJoueurAuTir', youth: 'imgEquipeJeunesEnGroupe', women: 'imgEquipeFeminineEnGroupe', duel: 'imgDuelAuTir', shot: 'imgTirPresDuPanier', action: 'imgActionSousLePanier', licence: 'imgPhotosDuClubLicence', defence: 'imgDribbleFaceALaDefense', movement: 'imgJoueusesEnMouvement', shop: 'imgDribbleEnMatch',
};
export type PhotoId = keyof typeof photoAssets;
export function ClubPhoto({ photo, className = '', priority = false }: { photo: PhotoId; className?: string; priority?: boolean }) {
  const { t } = useTranslation();
  return <div className={`club-photo club-photo--${photo} ${className}`}><img src={`/images/${photoAssets[photo]}.png`} alt={t(`photos.${photo}`)} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} /></div>;
}
export function PhotoStrip({ photos, className = '' }: { photos: readonly PhotoId[]; className?: string }) {
  return <div className={`photo-strip ${className}`}>{photos.map(photo => <ClubPhoto key={photo} photo={photo} />)}</div>;
}
