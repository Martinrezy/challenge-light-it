import type { ApiValidationError, Patient, PatientFormValues } from '@/types/patient';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

function buildFormData(values: PatientFormValues): FormData {
  const formData = new FormData();
  formData.append('full_name', values.fullName.trim());
  formData.append('email', values.email.trim());
  formData.append('phone_country_code', values.phoneCountryCode.trim());
  formData.append('phone_number', values.phoneNumber.trim());

  if (values.documentPhoto) {
    formData.append('document_photo', values.documentPhoto);
  }

  return formData;
}

export async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch(`${API_URL}/patients`);
  if (!response.ok) {
    throw new Error('Failed to load patients.');
  }
  const json = await response.json();
  return json.data as Patient[];
}

export async function createPatient(values: PatientFormValues): Promise<Patient> {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    body: buildFormData(values),
  });

  const json = await response.json();

  if (!response.ok) {
    const error = json as ApiValidationError;
    const message = error.errors
      ? Object.values(error.errors).flat().join(' ')
      : (error.message ?? 'Registration failed.');
    throw new Error(message);
  }

  return json.data as Patient;
}
