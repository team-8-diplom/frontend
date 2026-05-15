import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@/widgets/header';

export const ApplicationSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="pt-12">
            <h1 className="text-6xl font-bold leading-none mb-12 text-gray-900">Заявка успешно отправлена!</h1>

            <div className="max-w-[440px] w-full">
              <p className="text-xl font-normal leading-7 text-gray-900 mb-6">
                Преподаватель получил вашу мотивацию
                <br />и скоро даст ответ.
              </p>
              <p className="text-xl font-normal leading-7 text-gray-900">
                Вы можете отслеживать статус заявки.
                <br />А пока ничего не мешает поискать другие интересные темы.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              <Button color="primary" variant="solid" size="md" radius="full" onPress={() => navigate('/themes')}>
                Смотреть новые темы
              </Button>
              <Button
                color="primary"
                variant="light"
                size="md"
                radius="full"
                onPress={() => navigate('/my-applications')}
              >
                Посмотреть статус заявки
              </Button>
            </div>

            <div className="pb-24"></div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};
