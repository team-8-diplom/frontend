import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { ApplicationCard, type ApplicationTopic } from '@/entities/application/ui/ApplicationCard/ApplicationCard';

const MOCK_APPLICATIONS: ApplicationTopic[] = [
  {
    id: '1',
    title: 'Разработка веб-приложения на React',
    description: 'Создать современное веб-приложение с использованием React, TypeScript и Node.js',
    institute: 'Институт информационных технологий',
    teacher: 'Иванов Петр Сергеевич',
    email: 'petr@example.com',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    status: 'pending',
  },
  {
    id: '2',
    title: 'Анализ данных с использованием Python',
    description: 'Разработать систему для анализа больших данных и построения прогнозов',
    institute: 'Институт информационных технологий',
    teacher: 'Сидорова Анна Михайловна',
    email: 'anna@example.com',
    skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'SQL'],
    status: 'accepted',
  },
  {
    id: '3',
    title: 'Мобильное приложение для здоровья',
    description: 'Создать приложение для отслеживания физической активности и питания',
    institute: 'Институт биомедицинских систем',
    teacher: 'Козлов Дмитрий Алексеевич',
    email: 'dmitry@example.com',
    skills: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    status: 'rejected',
  },
];

export const MyApplicationsPage = () => {
  const navigate = useNavigate();
  const applications = MOCK_APPLICATIONS;

  // Пустое состояние
  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="pt-12">
              <h1 className="text-6xl font-bold leading-none mb-12 text-gray-900">У вас пока нет заявок</h1>

              <Button color="primary" variant="solid" size="md" radius="full" onPress={() => navigate('/themes')}>
                Смотреть темы
              </Button>

              <div className="pb-24"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Состояние с заявками
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="pt-12">
            <h1 className="text-6xl font-bold leading-none mb-12 text-gray-900">Мои заявки</h1>

            <div className="flex flex-col gap-7">
              {applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>

            <div className="pb-24"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
