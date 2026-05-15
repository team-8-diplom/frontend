import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-6xl font-bold leading-none text-gray-800 mb-4">404</h1>
      <h2 className="text-xl font-medium leading-7 text-gray-800 mb-2">Страница не найдена</h2>
      <p className="text-xl font-medium leading-7 text-gray-800 mb-6">
        Возможно, вы ввели неверный адрес или страница была удалена
      </p>
      <Button color="primary" variant="solid" size="md" radius="full" onPress={() => navigate('/themes')}>
        Перейти к темам
      </Button>
    </div>
  );
};
