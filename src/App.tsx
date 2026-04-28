import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthBootstrap } from './hooks/useAuthBootstrap';

const AppShell = lazy(async () => ({
  default: (await import('./components/AppShell')).AppShell,
}));
const LoginPage = lazy(async () => ({
  default: (await import('./pages/LoginPage')).LoginPage,
}));
const DashboardPage = lazy(async () => ({
  default: (await import('./pages/DashboardPage')).DashboardPage,
}));
const AnalyticsPage = lazy(async () => ({
  default: (await import('./pages/AnalyticsPage')).AnalyticsPage,
}));
const PatientDetailsPage = lazy(async () => ({
  default: (await import('./pages/PatientDetailsPage')).PatientDetailsPage,
}));

function RouteLoader() {
  return (
    <div className="page-loader">
      <div className="loader-card">
        <span className="loader-pulse" />
        <p>Loading workspace module...</p>
      </div>
    </div>
  );
}

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
    <Suspense fallback={<RouteLoader />}>
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
    </Suspense>
  );
}
