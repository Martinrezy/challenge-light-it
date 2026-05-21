import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { StatusModal } from '@/components/common/StatusModal';
import { PatientForm } from '@/components/forms/PatientForm';
import { PatientList } from '@/components/patients/PatientList';
import { usePatientRegistration } from '@/hooks/usePatientRegistration';
import { usePatients } from '@/hooks/usePatients';
import type { PatientFormValues } from '@/types/patient';
import './PatientRegistrationPage.css';

export function PatientRegistrationPage() {
  const { patients, loading, error, refresh } = usePatients();
  const [formOpen, setFormOpen] = useState(false);
  const { submitState, submitMessage, register, resetStatus, isSubmitting } =
    usePatientRegistration(refresh);

  const handleSubmit = async (values: PatientFormValues) => {
    setFormOpen(false);
    await register(values);
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Patient Registration</h1>
          <p className="page__subtitle">Manage patient records</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>Add Patient</Button>
      </header>

      <main className="page__main">
        <PatientList patients={patients} loading={loading} error={error} />
      </main>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Register new patient">
        <PatientForm onSubmit={(values) => void handleSubmit(values)} disabled={isSubmitting} />
      </Modal>

      <StatusModal state={submitState} message={submitMessage} onClose={resetStatus} />
    </div>
  );
}
