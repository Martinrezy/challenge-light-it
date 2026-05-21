import { useState } from 'react';
import { createPatient } from '@/services/patientsApi';
import { PatientApiValidationError, type PatientFormValues, type RegisterResult, type SubmitModalState } from '@/types/patient';

export function usePatientRegistration(onSuccess: () => Promise<void>) {
  const [submitState, setSubmitState] = useState<SubmitModalState>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const register = async (values: PatientFormValues): Promise<RegisterResult> => {
    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      await createPatient(values);
      setSubmitState('success');
      await onSuccess();
      return { status: 'success' };
    } catch (error) {
      if (error instanceof PatientApiValidationError) {
        setSubmitState('idle');
        return { status: 'validation', fieldErrors: error.fieldErrors };
      }

      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Registration failed.');
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Registration failed.',
      };
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
