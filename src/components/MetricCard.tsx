interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
}

export function MetricCard({ label, value, trend }: MetricCardProps) {
  return (
    <article className="metric-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{trend}</span>
    </article>
  );
}
