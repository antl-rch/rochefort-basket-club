import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { useLicence } from '../../../hooks/useLicence';
import { useClub } from '../../../hooks/useClub';
import { FormField } from '../formField/FormField';
import { Button } from '../button/Button';
import { AppSelect } from '../appSelect/AppSelect';
import type { LicenceDraft } from '../../../utils/types/club';

export function LicenceForm({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation();
  const { draft, updateDraft } = useLicence();
  const { data } = useClub();
  const update = (field: keyof LicenceDraft, value: string) =>
    updateDraft({ ...draft, [field]: value });
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return (
    <form
      className="licence-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.firstName.trim() || !draft.lastName.trim()) return;
        updateDraft({
          ...draft,
          firstName: draft.firstName.trim(),
          lastName: draft.lastName.trim(),
          email: draft.email.trim(),
        });
        onContinue();
      }}
    >
      <div className="form-grid">
        <FormField id="firstName" label={t('licence.firstName')}>
          <input
            id="firstName"
            name="given-name"
            autoComplete="given-name"
            required
            maxLength={80}
            pattern=".*\S.*"
            value={draft.firstName}
            onChange={(event) => update('firstName', event.target.value)}
          />
        </FormField>
        <FormField id="lastName" label={t('licence.lastName')}>
          <input
            id="lastName"
            name="family-name"
            autoComplete="family-name"
            required
            maxLength={80}
            pattern=".*\S.*"
            value={draft.lastName}
            onChange={(event) => update('lastName', event.target.value)}
          />
        </FormField>
        <FormField id="birthDate" label={t('licence.birthDate')}>
          <input
            id="birthDate"
            name="bday"
            type="date"
            autoComplete="bday"
            min="1900-01-01"
            max={maxDate}
            required
            value={draft.birthDate}
            onChange={(event) => update('birthDate', event.target.value)}
          />
        </FormField>
        <FormField id="category" label={t('licence.category')}>
          <AppSelect
            id="category"
            required
            value={draft.category}
            options={data.teams.map((team) => ({ value: team.id, label: t(`teams.${team.id}`) }))}
            placeholder={t('licence.choose')}
            onChange={(value) => update('category', value)}
          />
        </FormField>
        <FormField id="email" label={t('licence.email')}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={draft.email}
            onChange={(event) => update('email', event.target.value)}
          />
        </FormField>
      </div>
      <p className="small-note">{t('licence.required')}</p>
      <Button type="submit" icon={<FiArrowRight />}>
        {t('licence.next')}
      </Button>
    </form>
  );
}
