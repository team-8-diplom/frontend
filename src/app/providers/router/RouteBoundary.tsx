import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { ErrorFallback } from '@/shared/ui/ErrorFallback';

export const RouteBoundary = ({ children }: { children: React.ReactNode }) => {
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
