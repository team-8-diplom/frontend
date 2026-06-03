import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_TOPICS_ALL } from '@/shared/mock/topics';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ThemeDetailPanel } from '@/pages/theme-page/ui/ThemeDetailPanel.tsx';
import type { Topic } from '@/entities/topic/ui/TopicCard/TopicCard.tsx';
import { ArrowIcon } from '@/shared/ui/icons/ArrowIcon.tsx';
import { InstituteInfoPanel } from '@/pages/theme-page/ui/InstituteInfoPanel.tsx';
import { TeacherInfoPanel } from '@/pages/theme-page/ui/TeacherInfoPanel.tsx';

export const ThemeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const topic = MOCK_TOPICS_ALL.find((t) => t.id === id) as Topic;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-[1440px] w-full px-4 mx-auto pt-6">
        <div className="flex gap-2 mb-8 items-center lg:pl-[7%]">
          <p
            onClick={() => navigate('/')}
            className="cursor-pointer text-gray-500 underline underline-offset-3 hover:text-black"
          >
            Темы
          </p>
          <ArrowIcon />
          <p className="w-[270px] truncate underline underline-offset-3 cursor-pointer">
            {topic ? topic.title : 'Тема не найдена'}
          </p>
        </div>

        {topic ? (
          <div className="flex justify-center gap-10">
            <ThemeDetailPanel topic={topic} />
            <div className="flex flex-col gap-3 w-[20%]">
              <InstituteInfoPanel institute={topic.institute} />
              <TeacherInfoPanel teacher={topic.teacher} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg text-[#49454F] font-medium">Тема не найдена</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
