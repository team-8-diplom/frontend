import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { ErrorFallback } from '@/shared/ui/ErrorFallback';

import { LoginPage } from '@/pages/login-page/ui/LoginPage';
import { RegisterPage } from '@/pages/register-page/ui/RegisterPage';

import { ThemeDetailPage } from '@/pages/theme-page/ui/ThemeDetailPage';
import { ThemesListPage } from '@/pages/themes-page/ui/ThemesListPage';
import { MyThemesPage } from '@/pages/my-themes-page/ui/MyThemesPage';
import { FavoritesPage } from '@/pages/favorites-page/ui/FavoritesPage';
import { ProfilePage } from '@/pages/profile-page/ui/ProfilePage';
import { ProposeTopicPage } from '@/pages/propose/ui/ProposeTopicPage';
import { MyApplicationsPage } from '@/pages/my-applications-page/ui/MyApplicationsPage';
import { ApplicationSuccessPage } from '@/pages/application-success-page/ui/ApplicationSuccessPage';

import { NotFoundPage } from '@/pages/not-found-page/ui/NotFoundPage';

const RouteBoundary = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <ErrorBoundary
      resetKeys={[location.pathname]}
      fallback={({ error, reset }) => (
        <ErrorFallback
          title="Ошибка загрузки страницы"
          description="Что-то пошло не так при открытии этого раздела. Вы можете попробовать ещё раз или перейти в другой раздел."
          error={error}
          onRetry={reset}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RouteBoundary>
              <LoginPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/register"
          element={
            <RouteBoundary>
              <RegisterPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/"
          element={
            <RouteBoundary>
              <ThemesListPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/themes"
          element={
            <RouteBoundary>
              <ThemesListPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/themes/:id"
          element={
            <RouteBoundary>
              <ThemeDetailPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <RouteBoundary>
              <ProfilePage />
            </RouteBoundary>
          }
        />
        <Route
          path="/application-success"
          element={
            <RouteBoundary>
              <ApplicationSuccessPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/favorites"
          element={
            <RouteBoundary>
              <FavoritesPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/my-themes"
          element={
            <RouteBoundary>
              <MyThemesPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/propose"
          element={
            <RouteBoundary>
              <ProposeTopicPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/my-applications"
          element={
            <RouteBoundary>
              <MyApplicationsPage />
            </RouteBoundary>
          }
        />
        <Route
          path="*"
          element={
            <RouteBoundary>
              <NotFoundPage />
            </RouteBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
