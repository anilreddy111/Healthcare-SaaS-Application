import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthBootstrap } from './hooks/useAuthBootstrap';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { PatientDetailsPage } from './pages/PatientDetailsPage';

export default function App() {
  const { isReady } = useAuthBootstrap();

  if (!isReady) {
    return (
      <div className="page-loader">
        <div className="loader-card">
          <span className="loader-pulse" />
          <p>Loading care operations workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="patients" element={<PatientDetailsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
