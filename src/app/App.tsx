import { AppRouter } from '@/app/providers/router/AppRouter.tsx';
import { HeroUIProvider } from '@heroui/react';
import { AuthProvider } from '@/app/providers/auth/AuthProvider.tsx';
import '@/shared/api/client.config';

const App = () => {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </HeroUIProvider>
  );
};

export default App;
