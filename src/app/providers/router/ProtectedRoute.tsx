import { Navigate, Outlet } from 'react-router-dom';

// TODO: реализовать приватный роут
const useAuth = () => {
  return { isAuthenticated: true };
};

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
