import { AppRouter } from '@/app/providers/router/AppRouter.tsx';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { AuthProvider } from '@/app/providers/auth/AuthProvider.tsx';
import '@/shared/auth/client.config.ts';

const App = () => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-right" />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </HeroUIProvider>
  );
};

export default App;
