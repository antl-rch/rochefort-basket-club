import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../sectionHeading/SectionHeading';
import { ButtonLink } from '../button/Button';
import { ClubPhoto } from '../clubPhoto/ClubPhoto';

export function LicenceSection() {
  const { t } = useTranslation();
  return (
    <section id="licence" className="licence-section container" aria-labelledby="licence-title">
      <div className="licence-callout">
        <div className="licence-callout__copy">
          <SectionHeading
            id="licence-title"
            eyebrow={t('licence.eyebrow')}
            title={t('licence.title')}
          />
          <p>{t('licence.description')}</p>
          <ButtonLink to="/licence">{t('licence.create')}</ButtonLink>
        </div>
        <div className="licence-callout__steps">
          <ClubPhoto photo="licence" />
          <ol>
            {[0, 1, 2].map((index) => (
              <li key={index}>
                <span>0{index + 1}</span>
                {t(`licence.steps.${index}`)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
