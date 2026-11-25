import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../sectionHeading/SectionHeading';
import { PhotoStrip } from '../clubPhoto/ClubPhoto';

const blocks = [['place', 'gym', 'address'], ['contact', 'office', 'details'], ['registration', 'help', 'helpText']] as const;
export function InfoSection() {
  const { t } = useTranslation();
  return <section id="infos" className="info container" aria-labelledby="info-title"><hr /><SectionHeading id="info-title" eyebrow={t('info.eyebrow')} title={t('info.title')} /><div className="info__grid">{blocks.map(([eyebrow, title, description]) => <article key={title}><p className="eyebrow">{t(`info.${eyebrow}`)}</p><h3>{t(`info.${title}`)}</h3><p>{t(`info.${description}`)}</p></article>)}</div><PhotoStrip photos={['defence', 'movement']} /></section>;
}
