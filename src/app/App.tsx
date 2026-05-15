import { AppRouter } from '@/app/providers/router/AppRouter.tsx';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { AuthProvider } from '@/app/providers/auth/AuthProvider.tsx';
import '@/shared/auth/client.config.ts';
import { ProfileProvider } from '@/app/providers/profile/ProfileProvider.tsx';

const App = () => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-right" />
      <AuthProvider>
        <ProfileProvider>
          <AppRouter />
        </ProfileProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
};

export default App;
