import { Button } from '@heroui/react';

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  error?: Error;
  onRetry?: () => void;
}

export const ErrorFallback = ({
  title = 'Ошибка загрузки страницы',
  description = 'Что-то пошло не так при открытии этого раздела. Вы можете попробовать ещё раз или перейти в другой раздел.',
  error,
  onRetry,
}: ErrorFallbackProps) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
    <h1 className="text-6xl font-bold leading-none text-gray-800 mb-4">{title}</h1>
    <h2 className="text-xl font-medium leading-7 text-gray-800 mb-2">{description}</h2>
    {onRetry && (
      <Button color="primary" variant="solid" size="md" radius="full" onPress={onRetry} className="mt-4">
        Попробовать снова
      </Button>
    )}
    {import.meta.env.DEV && error && (
      <pre className="mt-6 text-gray-800 text-sm text-left max-w-full overflow-auto whitespace-pre-wrap">
        {error.message}
      </pre>
    )}
  </div>
);
