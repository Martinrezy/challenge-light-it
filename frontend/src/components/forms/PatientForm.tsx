import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/common/Button';
import { DragDropInput } from './DragDropInput';
import { validatePatientForm, hasErrors } from '@/utils/validation';
import type { FormErrors, PatientFormValues } from '@/types/patient';
import './PatientForm.css';

const initialValues: PatientFormValues = {
  fullName: '',
  email: '',
  phoneCountryCode: '+598',
  phoneNumber: '',
  documentPhoto: null,
};

interface PatientFormProps {
  onSubmit: (values: PatientFormValues) => void;
  disabled?: boolean;
  serverErrors?: FormErrors;
}

export function PatientForm({ onSubmit, disabled, serverErrors }: PatientFormProps) {
  const [values, setValues] = useState<PatientFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (serverErrors && Object.keys(serverErrors).length > 0) {
      setErrors(serverErrors);
      setSubmitted(true);
    }
  }, [serverErrors]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validatePatientForm(values);
    setErrors(nextErrors);
    if (!hasErrors(nextErrors)) {
      onSubmit(values);
    }
  };

  const field = (
    name: keyof Omit<PatientFormValues, 'documentPhoto'>,
    label: string,
    type = 'text',
    placeholder = '',
  ) => (
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className={`field__input ${submitted && errors[name] ? 'field__input--error' : ''}`}
        type={type}
        value={values[name]}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          setValues((v) => ({ ...v, [name]: e.target.value }));
          if (errors[name]) {
            setErrors((current) => {
              const next = { ...current };
              delete next[name];
              return next;
            });
          }
        }}
      />
      {submitted && errors[name] && <p className="field__error">{errors[name]}</p>}
    </div>
  );

  return (
    <form className="patient-form" onSubmit={handleSubmit} noValidate>
      {field('fullName', 'Full name', 'text', 'John Doe')}
      {field('email', 'Email', 'email', 'name@gmail.com')}

      <div className="field-row">
        <div className="field field--short">
          <label className="field__label" htmlFor="phoneCountryCode">
            Country code
          </label>
          <input
            id="phoneCountryCode"
            className={`field__input ${submitted && errors.phoneCountryCode ? 'field__input--error' : ''}`}
            type="text"
            value={values.phoneCountryCode}
            placeholder="+598"
            disabled={disabled}
            onChange={(e) => {
              setValues((v) => ({ ...v, phoneCountryCode: e.target.value }));
              if (errors.phoneCountryCode) {
                setErrors((current) => {
                  const next = { ...current };
                  delete next.phoneCountryCode;
                  return next;
                });
              }
            }}
          />
          {submitted && errors.phoneCountryCode && (
            <p className="field__error">{errors.phoneCountryCode}</p>
          )}
        </div>
        <div className="field field--grow">
          <label className="field__label" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            id="phoneNumber"
            className={`field__input ${submitted && errors.phoneNumber ? 'field__input--error' : ''}`}
            type="text"
            value={values.phoneNumber}
            placeholder="99123456"
            disabled={disabled}
            onChange={(e) => {
              setValues((v) => ({ ...v, phoneNumber: e.target.value }));
              if (errors.phoneNumber) {
                setErrors((current) => {
                  const next = { ...current };
                  delete next.phoneNumber;
                  return next;
                });
              }
            }}
          />
          {submitted && errors.phoneNumber && (
            <p className="field__error">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <DragDropInput
        file={values.documentPhoto}
        onChange={(documentPhoto) => {
          setValues((v) => ({ ...v, documentPhoto }));
          if (errors.documentPhoto) {
            setErrors((current) => {
              const next = { ...current };
              delete next.documentPhoto;
              return next;
            });
          }
        }}
        error={errors.documentPhoto}
        showError={submitted}
      />

      <Button type="submit" disabled={disabled} className="patient-form__submit">
        {disabled ? 'Registering...' : 'Register patient'}
      </Button>
    </form>
  );
}
