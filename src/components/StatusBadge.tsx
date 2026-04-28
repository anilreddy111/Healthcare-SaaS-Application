import type { PatientStatus } from '../types';

const statusClassMap: Record<PatientStatus, string> = {
  Admitted: 'status-admitted',
  Stable: 'status-stable',
  Discharged: 'status-discharged',
  Critical: 'status-critical',
};

export function StatusBadge({ status }: { status: PatientStatus }) {
  return <span className={`status-badge ${statusClassMap[status]}`}>{status}</span>;
}
