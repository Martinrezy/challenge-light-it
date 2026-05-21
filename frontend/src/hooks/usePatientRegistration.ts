import { useState } from 'react';
import { createPatient } from '@/services/patientsApi';
import type { PatientFormValues, SubmitModalState } from '@/types/patient';

export function usePatientRegistration(onSuccess: () => Promise<void>) {
  const [submitState, setSubmitState] = useState<SubmitModalState>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const register = async (values: PatientFormValues) => {
    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      await createPatient(values);
      setSubmitState('success');
      await onSuccess();
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Registration failed.');
    }
  };

  const resetStatus = () => {
    setSubmitState('idle');
    setSubmitMessage('');
  };

  return {
    submitState,
    submitMessage,
    register,
    resetStatus,
    isSubmitting: submitState === 'submitting',
  };
}
