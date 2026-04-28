export type PatientStatus = 'Admitted' | 'Stable' | 'Discharged' | 'Critical';

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-binary';
  condition: string;
  attendingDoctor: string;
  riskScore: number;
  admissionDate: string;
  status: PatientStatus;
  room: string;
  nextAppointment: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
}

export interface AuthSession {
  email: string;
  displayName: string;
  mode: 'firebase' | 'demo';
}
