import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const session = useAppStore((state) => state.session);
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
