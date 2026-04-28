import { dashboardMetrics, patients } from '../data/patients';
import { notifyCareTeam } from '../lib/notifications';
import { MetricCard } from '../components/MetricCard';

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.75a4.5 4.5 0 0 0-4.5 4.5v1.41c0 .62-.18 1.23-.51 1.76L5.83 13.2a1.5 1.5 0 0 0 1.28 2.3h9.78a1.5 1.5 0 0 0 1.28-2.3l-1.16-1.78a3.38 3.38 0 0 1-.51-1.76V8.25A4.5 4.5 0 0 0 12 3.75Zm0 16.5a2.63 2.63 0 0 0 2.47-1.75H9.53A2.63 2.63 0 0 0 12 20.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DashboardPage() {
  const highRiskPatients = patients.filter((patient) => patient.riskScore >= 70);

  async function handleNotification() {
    try {
      await notifyCareTeam(
        'Care team huddle reminder',
        `${highRiskPatients.length} high-risk patients need follow-up before the next shift handoff.`,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to send notification.';
      window.alert(message);
    }
  }

  return (
    <section className="content-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Operations Dashboard</p>
          <h2>Command center for care delivery performance</h2>
          <p className="muted-copy">
            Track occupancy, escalations, and patient risk without leaving the primary
            workflow.
          </p>
        </div>

        <div className="notification-cta">
          <div className="notification-cta-icon">
            <BellIcon />
          </div>
          <div className="notification-cta-copy">
            <span>Shift Handoff Alert</span>
            <strong>Notify the care team about high-risk follow-ups</strong>
          </div>
          <button type="button" className="notification-button" onClick={handleNotification}>
            Send Alert
          </button>
        </div>
      </div>

      <div className="metric-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="dashboard-panels">
        <article className="panel panel-highlight">
          <p className="eyebrow">Shift Priorities</p>
          <h3>High-risk patients requiring immediate review</h3>
          <ul className="priority-list">
            {highRiskPatients.map((patient) => (
              <li key={patient.id}>
                <strong>{patient.name}</strong>
                <span>{patient.condition}</span>
                <em>
                  {patient.attendingDoctor} · Risk {patient.riskScore}
                </em>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="eyebrow">Care Team Summary</p>
          <h3>Today’s operational notes</h3>
          <ul className="summary-list">
            <li>Bed occupancy is above the 82% target in intensive care.</li>
            <li>Discharge throughput improved due to streamlined pharmacy approvals.</li>
            <li>Neurology is seeing elevated observation demand during the evening shift.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
