import { Spinner } from '@/components/common/Spinner';
import { PatientCard } from './PatientCard';
import type { Patient } from '@/types/patient';
import './PatientList.css';

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => Promise<void>;
  deletingId?: number | null;
}

export function PatientList({ patients, loading, error, onDelete, deletingId = null }: PatientListProps) {
  if (loading) {
    return <Spinner label="Loading..." />;
  }

  if (error) {
    return (
      <div className="patient-list__empty patient-list__empty--error">
        <p>{error}</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="patient-list__empty">
        <p className="patient-list__empty-title">No patients</p>
        <p>Use Add Patient to create one.</p>
      </div>
    );
  }

  return (
    <div className="patient-list">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onDelete={onDelete}
          isDeleting={deletingId === patient.id}
        />
      ))}
    </div>
  );
}
