import { useState } from 'react';
import type { Patient } from '@/types/patient';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`patient-card ${expanded ? 'patient-card--expanded' : ''}`}>
      <button
        type="button"
        className="patient-card__header"
        onClick={() => setExpanded((e) => !e)}
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

      <div className={`patient-card__details ${expanded ? 'patient-card__details--open' : ''}`}>
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
    </article>
  );
}
