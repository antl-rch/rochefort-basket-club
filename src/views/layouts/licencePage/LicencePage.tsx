import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Header } from '../../components/header/Header';
import { Button, ButtonLink } from '../../components/button/Button';
import { LicenceForm } from '../../components/licenceForm/LicenceForm';
import { SignatureField } from '../../components/signatureField/SignatureField';
import { LicenceSummary } from '../../components/licenceSummary/LicenceSummary';
import { LanguageSwitcher } from '../../components/languageSwitcher/LanguageSwitcher';
import { useLicence } from '../../../hooks/useLicence';
import { downloadApplication } from '../../../utils/services/licenceExportService';

export function LicencePage() {
  const { t } = useTranslation();
  const { draft, signature, setSignature } = useLicence();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus(); window.scrollTo(0, 0); }, [step]);
  const titles = ['licence.dossier', 'licence.signTitle', 'licence.review', 'licence.thanks'];
  const descriptions = ['licence.intro', 'licence.signIntro', 'licence.reviewIntro', 'licence.confirmation'];
  const download = () => downloadApplication({ ...draft, signature });
  return <><Header licence /><main id="main-content" className="licence-page container"><section className="licence-panel" aria-labelledby="licence-step-title"><p className="eyebrow">{step === 4 ? t('licence.prepared') : t('licence.step', { step: String(step).padStart(2, '0') })}</p><h1 ref={headingRef} tabIndex={-1} id="licence-step-title">{t(titles[step - 1])}</h1><p>{t(descriptions[step - 1])}</p><hr />
    {step === 1 && <LicenceForm onContinue={() => setStep(2)} />}
    {step === 2 && <><strong>{draft.firstName} {draft.lastName} · {t(`teams.${draft.category}`)}</strong><SignatureField value={signature} onChange={setSignature} /><div className="licence-actions"><button className="text-link" type="button" onClick={() => setStep(1)}><FiArrowLeft />{t('licence.back')}</button><Button icon={<FiArrowRight />} disabled={!signature} onClick={() => setStep(3)}>{t('licence.validate')}</Button></div></>}
    {step === 3 && <><LicenceSummary /><p className="small-note">{t('licence.staticNotice')}</p><div className="licence-actions"><button type="button" className="text-link" onClick={() => setStep(2)}><FiArrowLeft />{t('licence.back')}</button><Button icon={<FiArrowRight />} onClick={() => { download(); setStep(4); }}>{t('licence.download')}</Button></div></>}
    {step === 4 && <><ButtonLink to="/" icon={<FiArrowRight />}>{t('licence.home')}</ButtonLink><button type="button" className="text-link" onClick={download}>{t('licence.downloadAgain')}</button></>}
  </section><LanguageSwitcher /></main></>;
}
