import { type ReactNode, useMemo, useState } from 'react';
import { isTokenValid } from '@/shared/util/tokenValidator.ts';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken && isTokenValid(storedToken)) {
      return storedToken;
    }
    return null;
  });

  const isAuthenticated = useMemo(() => isTokenValid(token), [token]);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
  };

  return <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
