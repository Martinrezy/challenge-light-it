import type { PatientFormValues, FormErrors } from '@/types/patient';

const LETTERS_REGEX = /^[A-Za-z\s]+$/;
const GMAIL_REGEX = /^[^\s@]+@gmail\.com$/i;
const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;
const PHONE_NUMBER_REGEX = /^\d{6,15}$/;

export function validatePatientForm(values: PatientFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (!LETTERS_REGEX.test(values.fullName.trim())) {
    errors.fullName = 'Full name may only contain letters and spaces.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!GMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Email must be a Gmail address (@gmail.com).';
  }

  if (!values.phoneCountryCode.trim()) {
    errors.phoneCountryCode = 'Country code is required.';
  } else if (!COUNTRY_CODE_REGEX.test(values.phoneCountryCode.trim())) {
    errors.phoneCountryCode = 'Use format like +598.';
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!PHONE_NUMBER_REGEX.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Phone number must contain only digits (6-15).';
  }

  if (!values.documentPhoto) {
    errors.documentPhoto = 'Document photo is required.';
  } else if (!/\.jpe?g$/i.test(values.documentPhoto.name)) {
    errors.documentPhoto = 'Only JPG images are allowed.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
