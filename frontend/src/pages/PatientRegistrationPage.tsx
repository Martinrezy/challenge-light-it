import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { StatusModal } from '@/components/common/StatusModal';
import { PatientForm } from '@/components/forms/PatientForm';
import { PatientList } from '@/components/patients/PatientList';
import { usePatientRegistration } from '@/hooks/usePatientRegistration';
import { usePatients } from '@/hooks/usePatients';
import type { FormErrors, PatientFormValues } from '@/types/patient';
import './PatientRegistrationPage.css';

export function PatientRegistrationPage() {
  const { patients, loading, error, refresh, remove } = usePatients();
  const [formOpen, setFormOpen] = useState(false);
  const [serverErrors, setServerErrors] = useState<FormErrors | undefined>();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { submitState, submitMessage, register, resetStatus, isSubmitting } =
    usePatientRegistration(refresh);

  const handleSubmit = async (values: PatientFormValues) => {
    setServerErrors(undefined);
    const result = await register(values);

    if (result.status === 'success') {
      setFormOpen(false);
      setServerErrors(undefined);
      return;
    }

    if (result.status === 'validation') {
      setServerErrors(result.fieldErrors);
    }
  };

  const handleOpenForm = () => {
    setServerErrors(undefined);
    setFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await remove(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Patient Registration</h1>
          <p className="page__subtitle">Manage patient records</p>
        </div>
        <Button onClick={handleOpenForm}>Add Patient</Button>
      </header>

      <main className="page__main">
        <PatientList
          patients={patients}
          loading={loading}
          error={error}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      </main>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Register new patient">
        <PatientForm
          onSubmit={(values) => void handleSubmit(values)}
          disabled={isSubmitting}
          serverErrors={serverErrors}
        />
      </Modal>

      <StatusModal state={submitState} message={submitMessage} onClose={resetStatus} />
    </div>
  );
}
