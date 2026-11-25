import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';
import { ClubPhoto } from '../clubPhoto/ClubPhoto';

export function ShopSection() {
  const { t } = useTranslation();
  return <section id="boutique" className="shop container" aria-labelledby="shop-title"><div className="shop__banner"><ClubPhoto photo="shop" /><div className="shop__overlay" /><div className="shop__copy"><p className="eyebrow">{t('shop.eyebrow')}</p><h2 id="shop-title">{t('shop.title')}</h2><p>{t('shop.description')}</p><a className="button button--blue" href="#">{t('shop.button')}<FiArrowUpRight /></a></div></div></section>;
}
