import type { PatientRecord } from '../types';
import { StatusBadge } from './StatusBadge';

export function PatientCard({ patient }: { patient: PatientRecord }) {
  return (
    <article className="patient-card">
      <div className="patient-card-header">
        <div>
          <p className="eyebrow">{patient.id}</p>
          <h3>{patient.name}</h3>
        </div>
        <StatusBadge status={patient.status} />
      </div>

      <dl className="patient-meta-grid">
        <div>
          <dt>Condition</dt>
          <dd>{patient.condition}</dd>
        </div>
        <div>
          <dt>Doctor</dt>
          <dd>{patient.attendingDoctor}</dd>
        </div>
        <div>
          <dt>Room</dt>
          <dd>{patient.room}</dd>
        </div>
        <div>
          <dt>Risk Score</dt>
          <dd>{patient.riskScore}/100</dd>
        </div>
      </dl>
    </article>
  );
}
