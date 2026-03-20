import { Routes, Route } from 'react-router-dom';

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
    <Routes>
      {/* публичные */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* всё остальное - авторизованные */}
      <Route element={<ProtectedRoute />}>
        {/* студент */}
        <Route element={<RoleRoute allowedRoles={['student']} />}>
          <Route path="/" element={<ThemesListPage />} />
          <Route path="/themes" element={<ThemesListPage />} />
          <Route path="/themes/:id" element={<ThemeDetailPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/propose" element={<ProposeTopicPage />} />
          <Route path="/my-themes" element={<MyThemesPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
        </Route>

        {/* преподаватель */}
        <Route element={<RoleRoute allowedRoles={['teacher']} />}>
          <Route path="/" element={<ThemesListPage />} />
          <Route path="/themes" element={<ThemesListPage />} />
          <Route path="/themes/:id" element={<ThemeDetailPage />} />

          <Route path="/my-themes" element={<MyThemesPage />} />
          <Route path="/propose" element={<ProposeTopicPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
