// Tipos del dominio — implementar en rama de feature

export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhotoUrl: string;
  createdAt: string;
}

export interface CreatePatientPayload {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhoto: File;
}
