import {
  PatientApiValidationError,
  type ApiValidationError,
  type Patient,
  type PatientFormValues,
} from '@/types/patient';
import { mapApiErrorsToFormErrors } from '@/utils/mapApiErrors';

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

function throwValidationError(json: ApiValidationError): never {
  const fieldErrors = mapApiErrorsToFormErrors(json.errors);
  const message =
    fieldErrors.email ??
    Object.values(fieldErrors)[0] ??
    json.message ??
    'Please fix the errors below.';

  throw new PatientApiValidationError(message, fieldErrors);
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
    if (response.status === 422 && json.errors) {
      throwValidationError(json as ApiValidationError);
    }

    const error = json as ApiValidationError;
    throw new Error(error.message ?? 'Registration failed.');
  }

  return json.data as Patient;
}

export async function deletePatient(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const json = (await response.json().catch(() => ({}))) as ApiValidationError;
    throw new Error(json.message ?? 'Failed to delete patient.');
  }
}
