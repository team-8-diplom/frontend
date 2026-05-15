import { useParams, useNavigate } from 'react-router-dom';
import { Button, Chip } from '@heroui/react';
import { MOCK_TOPICS_ALL } from '@/shared/mock/topics';
import { Header } from '@/widgets/header';

const CURRENT_ROLE = 'student'; // заглушка

export const ThemeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const topic = MOCK_TOPICS_ALL.find((t) => t.id === id);

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-[#49454F] font-medium">Тема не найдена</p>
        </div>
      </div>
    );
  }

  const isStudent = CURRENT_ROLE === 'student';

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 lg:px-[73px] py-6">
        <div className="mb-6 space-y-4">
          <h1 className="text-[36px] font-medium leading-relaxed tracking-[0.15px] text-black">{topic.title}</h1>

          <p className="text-[20px] leading-relaxed tracking-[0.15px] text-black">
            <span className="font-medium">Институт:</span> <span className="font-normal">{topic.institute}</span>
          </p>

          <p className="text-[20px] leading-relaxed tracking-[0.15px] text-black">
            <span className="font-medium">{isStudent ? 'ФИО преподавателя:' : 'ФИО студента:'}</span>{' '}
            <span className="font-normal">{topic.teacher}</span>
          </p>

          <p className="text-[20px] leading-relaxed tracking-[0.15px] text-black">
            <span className="font-medium">Почта:</span> <span className="font-normal">{topic.email}</span>
          </p>

          {isStudent && (
            <p className="text-[20px] leading-relaxed tracking-[0.15px] text-[#6750A4]">
              <span className="font-medium">Совпадение с вашими навыками:</span> <span className="font-normal">0%</span>
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {isStudent ? (
              <>
                <Button
                  className="bg-[#6750A4] text-white font-medium rounded-full px-6 py-2.5 h-auto"
                  onPress={() => console.log('Заявка на тему', topic.id)}
                >
                  Отправить заявку
                </Button>
                <Button
                  className="bg-[#6750A4] text-white font-medium rounded-full px-6 py-2.5 h-auto"
                  onPress={() => navigate('/propose')}
                >
                  Предложить свою тему
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-[#6750A4] text-white font-medium rounded-full px-6 py-2.5 h-auto"
                  onPress={() => console.log('Заявка на тему', topic.id)}
                >
                  Отправить заявку
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#F3EDF7] border border-[#CAC4D0] rounded-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-black mb-2">Описание</h2>
            <p className="text-sm text-[#1D1B20] leading-relaxed font-normal">
              {topic.fullDescription ?? topic.description}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-black mb-2">Навыки</h2>
            <div className="flex flex-wrap gap-2">
              {topic.skills?.length ? (
                topic.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    className="bg-[#E8DEF8] text-[#1D1B20] font-normal text-sm"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {skill}
                  </Chip>
                ))
              ) : (
                <span className="text-sm text-[#49454F]">Не указаны</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
