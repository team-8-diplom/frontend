import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from '@/pages/login-page/ui/LoginPage';
import { RegisterPage } from '@/pages/register-page/ui/RegisterPage';

import { ThemeDetailPage } from '@/pages/theme-page/ui/ThemeDetailPage';
import { ThemesListPage } from '@/pages/themes-page/ui/ThemesListPage';
import { MyThemesPage } from '@/pages/my-themes-page/ui/MyThemesPage';
import { FavoritesPage } from '@/pages/favorites-page/ui/FavoritesPage';
import { ProfilePage } from '@/pages/profile-page/ui/ProfilePage';
import { MyApplicationsPage } from '@/pages/my-applications-page/ui/MyApplicationsPage';
import { ApplicationSuccessPage } from '@/pages/application-success-page/ui/ApplicationSuccessPage';

import { NotFoundPage } from '@/pages/not-found-page/ui/NotFoundPage';
import { RouteBoundary } from '@/app/providers/router/RouteBoundary.tsx';
import React from 'react';
import { ProtectedRoute } from '@/app/providers/router/ProtectedRoute.tsx';
import { RoleRoute } from '@/app/providers/router/RoleRoute.tsx';
import { ProposeTopicPage } from '@/pages/propose/ui/ProposeTopicPage.tsx';

const publicRoutes = [
  { path: '/login', Component: LoginPage },
  { path: '/register', Component: RegisterPage },
  { path: '/', Component: ThemesListPage },
  { path: '/themes/:id', Component: ThemeDetailPage },
  { path: '*', Component: NotFoundPage },
];

const studentRoutes = [
  { path: '/favorites', Component: FavoritesPage },
  { path: '/my-applications', Component: MyApplicationsPage },
  { path: '/application-success', Component: ApplicationSuccessPage },
  { path: '/propose', Component: ProposeTopicPage },
];

const teacherRoutes = [{ path: '/my-themes', Component: MyThemesPage }];

const protectedRoutes = [{ path: '/profile', Component: ProfilePage }];

const RouteWrapper = ({ Component }: { Component: React.ComponentType }) => (
  <RouteBoundary>
    <Component />
  </RouteBoundary>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/themes" element={<Navigate to="/" replace />} />

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<RouteWrapper Component={Component} />} />
        ))}

        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<RouteWrapper Component={Component} />} />
          ))}

          <Route element={<RoleRoute allowedRoles={['student']} />}>
            {studentRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<RouteWrapper Component={Component} />} />
            ))}
          </Route>

          <Route element={<RoleRoute allowedRoles={['teacher']} />}>
            {teacherRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<RouteWrapper Component={Component} />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
