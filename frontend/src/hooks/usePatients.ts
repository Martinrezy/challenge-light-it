import { useCallback, useEffect, useState } from 'react';
import { deletePatient, fetchPatients } from '@/services/patientsApi';
import type { Patient } from '@/types/patient';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = useCallback(async (id: number) => {
    setError(null);
    try {
      await deletePatient(id);
      setPatients((current) => current.filter((patient) => patient.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete patient.');
      throw err;
    }
  }, []);

  return { patients, loading, error, refresh: load, remove };
}
