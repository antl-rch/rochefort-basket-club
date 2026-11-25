import Select from 'react-select';

export interface SelectOption<Value extends string> {
  value: Value;
  label: string;
}

interface AppSelectProps<Value extends string> {
  id: string;
  value: Value | '';
  options: readonly SelectOption<Value>[];
  placeholder: string;
  required?: boolean;
  onChange: (value: Value | '') => void;
}

export function AppSelect<Value extends string>({
  id,
  value,
  options,
  placeholder,
  required = false,
  onChange,
}: AppSelectProps<Value>) {
  return (
    <Select<SelectOption<Value>, false>
      inputId={id}
      instanceId={id}
      name={id}
      className="app-select"
      classNamePrefix="app-select"
      unstyled
      required={required}
      isSearchable={false}
      options={options}
      value={options.find((option) => option.value === value) ?? null}
      placeholder={placeholder}
      onChange={(option) => onChange(option?.value ?? '')}
    />
  );
}
