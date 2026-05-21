import {
  PatientApiValidationError,
  type ApiValidationError,
  type FormErrors,
  type Patient,
  type PatientFormValues,
} from '@/types/patient';
import { mapApiErrorsToFormErrors } from '@/utils/mapApiErrors';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

const DUPLICATE_EMAIL_MESSAGE = 'Este correo ya está registrado.';

const API_HEADERS = {
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
} as const;

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

function isDuplicateEmailPayload(json: ApiValidationError | null): boolean {
  if (!json) {
    return false;
  }

  const emailErrors = json.errors?.email;
  if (emailErrors?.some((msg) => /already|taken|unique|exists|registrado/i.test(msg))) {
    return true;
  }

  return /email/i.test(json.message ?? '') && /already|taken|unique|exists|registrado/i.test(json.message ?? '');
}

function resolveValidationErrors(json: ApiValidationError | null): FormErrors {
  const fieldErrors = mapApiErrorsToFormErrors(json?.errors);

  if (!fieldErrors.email && isDuplicateEmailPayload(json)) {
    fieldErrors.email = DUPLICATE_EMAIL_MESSAGE;
  }

  return fieldErrors;
}

function throwValidationError(json: ApiValidationError | null): never {
  const fieldErrors = resolveValidationErrors(json);
  const message =
    fieldErrors.email ??
    Object.values(fieldErrors)[0] ??
    json?.message ??
    'Please fix the errors below.';

  throw new PatientApiValidationError(message, fieldErrors);
}

async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(input, {
      ...init,
      headers: {
        ...API_HEADERS,
        ...init?.headers,
      },
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Verificá que el backend esté en marcha.');
  }
}

export async function fetchPatients(): Promise<Patient[]> {
  const response = await apiFetch(`${API_URL}/patients`);
  if (!response.ok) {
    throw new Error('Failed to load patients.');
  }
  const json = await response.json();
  return json.data as Patient[];
}

export async function createPatient(values: PatientFormValues): Promise<Patient> {
  const response = await apiFetch(`${API_URL}/patients`, {
    method: 'POST',
    body: buildFormData(values),
  });

  const rawBody = await response.text();
  let json: ApiValidationError | null = null;

  if (rawBody) {
    try {
      json = JSON.parse(rawBody) as ApiValidationError;
    } catch {
      json = null;
    }
  }

  if (!response.ok) {
    if (response.status === 422) {
      const fieldErrors = resolveValidationErrors(json);
      if (Object.keys(fieldErrors).length > 0) {
        throwValidationError(json);
      }
    }

    throw new Error(json?.message ?? 'Registration failed.');
  }

  return (JSON.parse(rawBody) as { data: Patient }).data;
}

export async function deletePatient(id: number): Promise<void> {
  const response = await apiFetch(`${API_URL}/patients/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const json = (await response.json().catch(() => ({}))) as ApiValidationError;
    throw new Error(json.message ?? 'Failed to delete patient.');
  }
}
