import { Link } from 'react-router-dom';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${compact ? 'brand--compact' : ''}`}
      aria-label="Rochefort Basket Club"
    >
      <img src="/images/imgLogoOfficielRochefortBasketClub.png" width="48" height="48" alt="" />
      <span>
        ROCHEFORT
        <br />
        BASKET CLUB
      </span>
    </Link>
  );
}
