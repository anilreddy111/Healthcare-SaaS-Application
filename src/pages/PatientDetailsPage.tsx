import { PatientCard } from '../components/PatientCard';
import { PatientListRow } from '../components/PatientListRow';
import { ViewToggle } from '../components/ViewToggle';
import { useAppStore } from '../store/useAppStore';

export function PatientDetailsPage() {
  const patients = useAppStore((state) => state.patients);
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  return (
    <section className="content-stack">
      <div className="page-heading page-heading-wide">
        <div>
          <p className="eyebrow">Patient Management</p>
          <h2>Patient details with flexible operational views</h2>
          <p className="muted-copy">
            Switch between card-based summaries and a dense list layout depending on the
            workflow.
          </p>
        </div>

        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === 'grid' ? (
        <div className="patient-grid">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="table-shell">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Condition</th>
                <th>Doctor</th>
                <th>Room</th>
                <th>Next Appointment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <PatientListRow key={patient.id} patient={patient} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
