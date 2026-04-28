import type { PatientRecord } from '../types';
import { StatusBadge } from './StatusBadge';

export function PatientListRow({ patient }: { patient: PatientRecord }) {
  return (
    <tr>
      <td>{patient.name}</td>
      <td>{patient.condition}</td>
      <td>{patient.attendingDoctor}</td>
      <td>{patient.room}</td>
      <td>{patient.nextAppointment}</td>
      <td>
        <StatusBadge status={patient.status} />
      </td>
    </tr>
  );
}
