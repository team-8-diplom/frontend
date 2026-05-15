import { Routes, Route, BrowserRouter } from 'react-router-dom';

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

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Все страницы открыты для просмотра (временно) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ThemesListPage />} />
        <Route path="/themes" element={<ThemesListPage />} />
        <Route path="/themes/:id" element={<ThemeDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/application-success" element={<ApplicationSuccessPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/my-themes" element={<MyThemesPage />} />
        <Route path="/propose" element={<ProposeTopicPage />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
