import { Navigate, Outlet } from 'react-router-dom';

// TODO: реализовать ролевой роут
const useCurrentRole = () => {
  return 'student';
};

type RoleRouteProps = {
  allowedRoles: string[];
};

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const currentRole = useCurrentRole();

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
