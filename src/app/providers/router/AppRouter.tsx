import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

import { LoginPage } from '@/pages/login-page/ui/LoginPage';
import { RegisterPage } from '@/pages/register-page/ui/RegisterPage';

import { ThemeDetailPage } from '@/pages/theme-page/ui/ThemeDetailPage';
import { ThemesListPage } from '@/pages/themes-page/ui/ThemesListPage';
import { MyThemesPage } from '@/pages/my-themes-page/ui/MyThemesPage';
import { FavoritesPage } from '@/pages/favorites-page/ui/FavoritesPage';
import { ProfilePage } from '@/pages/profile-page/ui/ProfilePage';
import { ProposeTopicPage } from '@/pages/propose/ui/ProposeTopicPage';
import { MyApplicationsPage } from '@/pages/my-applications-page/ui/MyApplicationsPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные (без авторизации) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Темы доступны всем */}
        <Route path="/" element={<ThemesListPage />} />
        <Route path="/themes" element={<ThemesListPage />} />
        <Route path="/themes/:id" element={<ThemeDetailPage />} />

        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={['student']} />}>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['teacher', 'student']} />}>
            <Route path="/my-themes" element={<MyThemesPage />} />
            <Route path="/propose" element={<ProposeTopicPage />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
