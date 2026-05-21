import type { ApiValidationError, FormErrors, PatientFormValues } from '@/types/patient';

const API_FIELD_MAP: Record<string, keyof PatientFormValues> = {
  full_name: 'fullName',
  email: 'email',
  phone_country_code: 'phoneCountryCode',
  phone_number: 'phoneNumber',
  document_photo: 'documentPhoto',
};

export function mapApiErrorsToFormErrors(apiErrors: ApiValidationError['errors']): FormErrors {
  if (!apiErrors) {
    return {};
  }

  const formErrors: FormErrors = {};

  for (const [apiField, messages] of Object.entries(apiErrors)) {
    const formField = API_FIELD_MAP[apiField];
    if (formField && messages[0]) {
      formErrors[formField] = messages[0];
    }
  }

  return formErrors;
}
