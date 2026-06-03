import { useState, useMemo } from 'react';
import { Header } from '@/widgets/header';
import { MOCK_TOPICS_ALL } from '@/shared/mock/topics';
import { TopicSearchInput } from '@/features/theme-search/ui/TopicSearchInput.tsx';
import { TopicCard } from '@/entities/theme/ui/TopicCard/TopicCard.tsx';
import { addToast } from '@heroui/react';

const CURRENT_ROLE = 'student'; // заглушка

export const ThemesListPage = () => {
  const [search, setSearch] = useState('');

  const topicsForRole = useMemo(() => {
    if (CURRENT_ROLE === 'student') {
      return MOCK_TOPICS_ALL.filter((t) => t.author_type === 'teacher');
    }
    return MOCK_TOPICS_ALL.filter((t) => t.author_type === 'student');
  }, []);

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return topicsForRole;
    return topicsForRole.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.institute.toLowerCase().includes(query) ||
        t.teacher.toLowerCase().includes(query)
    );
  }, [search, topicsForRole]);

  const handleApply = () => {
    addToast({
      title: 'Данный функционал пока не реализован',
      description: 'Но скоро все будет хорошо',
      color: 'warning',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white items-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />
      <div className="flex flex-col max-w-[1280px] w-full">
        <TopicSearchInput search={search} setSearch={setSearch} />

        <div className="flex justify-between">
          <aside className="shrink-0 w-[280px] hidden sm:block">
            <div className="w-full border border-black bg-[#F3EDF7] rounded-sm p-4">
              <h2 className="text-black font-medium text-2xl leading-6 tracking-[0.15px]">Фильтры</h2>
              <p className="mt-4 text-sm text-[#49454F]">Здесь будут фильтры</p>
            </div>
          </aside>

          <div className="flex flex-col gap-2">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-16 text-[#49454F] font-medium text-base">
                По вашему запросу ничего не найдено
              </div>
            ) : (
              filteredTopics.map((topic) => <TopicCard key={topic.id} topic={topic} onApply={handleApply} />)            
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
