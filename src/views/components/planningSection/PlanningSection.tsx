import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../sectionHeading/SectionHeading';
import { TrainingTable } from '../trainingTable/TrainingTable';
import { PhotoStrip } from '../clubPhoto/ClubPhoto';

export function PlanningSection() {
  const { t } = useTranslation();
  return (
    <section id="planning" className="planning" aria-labelledby="planning-title">
      <div className="container">
        <div className="planning__grid">
          <div>
            <SectionHeading
              id="planning-title"
              eyebrow={t('planning.eyebrow')}
              title={t('planning.title')}
            />
            <p className="section-description">{t('planning.description')}</p>
          </div>
          <TrainingTable />
        </div>
        <PhotoStrip photos={['shot', 'action']} />
      </div>
    </section>
  );
}
