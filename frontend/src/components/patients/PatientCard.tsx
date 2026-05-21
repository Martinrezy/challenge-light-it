import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import type { Patient } from '@/types/patient';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
  onDelete: (id: number) => Promise<void>;
  isDeleting?: boolean;
}

export function PatientCard({ patient, onDelete, isDeleting = false }: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await onDelete(patient.id);
      setConfirmOpen(false);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete patient.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <article className={`patient-card ${expanded ? 'patient-card--expanded' : ''}`}>
        <div className="patient-card__top">
          <button
            type="button"
            className="patient-card__header"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            <img
              src={patient.document_photo_url}
              alt={`Document for ${patient.full_name}`}
              className="patient-card__photo"
            />
            <div className="patient-card__title-wrap">
              <h3 className="patient-card__name">{patient.full_name}</h3>
              <span className="patient-card__toggle">{expanded ? 'Show less' : 'Show more'}</span>
            </div>
          </button>

          <button
            type="button"
            className="patient-card__delete"
            onClick={() => setConfirmOpen(true)}
            disabled={isDeleting || deleting}
            aria-label={`Delete ${patient.full_name}`}
            title="Delete patient"
          >
            <svg
              className="patient-card__delete-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4a1 1 0 0 1 0-2h4V4a1 1 0 0 1 1-1zm1 2h4V5h-4V5zm-3 4v10h10V9H7zm3 2h2v6H10v-6zm3 0h2v6h-2v-6z"
              />
            </svg>
          </button>
        </div>

        <div
          className={`patient-card__details-panel ${expanded ? 'patient-card__details-panel--open' : ''}`}
          aria-hidden={!expanded}
        >
          <div className="patient-card__details">
            <dl>
              <div>
                <dt>Email</dt>
                <dd>{patient.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  {patient.phone_country_code} {patient.phone_number}
                </dd>
              </div>
              <div>
                <dt>Registered</dt>
                <dd>{new Date(patient.created_at).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>

      <Modal
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        title="Delete patient"
      >
        <div className="patient-card__confirm">
          <p>
            Delete <strong>{patient.full_name}</strong>?
          </p>
          {deleteError && <p className="patient-card__confirm-error">{deleteError}</p>}
          <div className="patient-card__confirm-actions">
            <button
              type="button"
              className="patient-card__confirm-cancel"
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="patient-card__confirm-delete"
              onClick={() => void handleConfirmDelete()}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
