export interface Patient {
  id: number;
  full_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  document_photo_url: string;
  created_at: string;
}

export interface PatientFormValues {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhoto: File | null;
}

export type FormErrors = Partial<Record<keyof PatientFormValues, string>>;

export type SubmitModalState = 'idle' | 'submitting' | 'success' | 'error';

export interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

export class PatientApiValidationError extends Error {
  readonly fieldErrors: FormErrors;

  constructor(message: string, fieldErrors: FormErrors) {
    super(message);
    this.name = 'PatientApiValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export type RegisterResult =
  | { status: 'success' }
  | { status: 'validation'; fieldErrors: FormErrors }
  | { status: 'error'; message: string };
