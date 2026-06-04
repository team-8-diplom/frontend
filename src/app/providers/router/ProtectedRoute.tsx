import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // TODO: раскомментировать перед релизом
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
};
