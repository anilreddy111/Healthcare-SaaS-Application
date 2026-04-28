import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { admissionsTrend, departmentLoad } from '../data/patients';

const chartColors = ['#1f6feb', '#0e9f6e', '#f59e0b', '#d946ef', '#ef4444'];

export function AnalyticsPage() {
  return (
    <section className="content-stack">
      <div className="page-heading page-heading-wide">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Operational intelligence across admissions and departments</h2>
          <p className="muted-copy">
            A compact analytics view gives leadership and operations teams a quick pulse
            on throughput and staffing pressure.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <article className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">7-day Trend</p>
              <h3>Admissions vs discharges</h3>
            </div>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionsTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="admissions" fill="#1f6feb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="discharged" fill="#0e9f6e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Department Mix</p>
              <h3>Current patient distribution</h3>
            </div>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentLoad}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {departmentLoad.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
}
