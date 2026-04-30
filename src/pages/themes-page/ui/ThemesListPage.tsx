import { useState, useMemo } from 'react';
import { Header } from '@/shared/ui/Header/Header';
import { TopicCard } from '@/shared/ui/TopicCard/TopicCard';
import { SearchIcon } from '@/shared/ui/icons/SearchIcon';
import { MOCK_TOPICS_ALL } from '@/shared/mock/topics';

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

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header title="Дипломные темы" />

      {/* Поиск */}
      <div className="w-full bg-white border-b border-[#CAC4D0] px-4 py-3">
        <div className="max-w-[1440px] mx-auto flex justify-center items-center gap-0">
          <div className="flex flex-1 max-w-[600px] items-center border border-[#CAC4D0] rounded-l-lg bg-[#F3EDF7] px-3 h-[58px]">
            <SearchIcon className="shrink-0 mr-2 text-[#49454F]" width={20} height={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по темам..."
              className="flex-1 min-w-0 bg-transparent text-[#1D1B20] font-medium text-base leading-6 tracking-[0.15px] placeholder:text-[#79747E] focus:outline-none"
            />
          </div>
          <button className="flex items-center justify-center px-6 h-[58px] bg-[#E8DEF8] text-[#4A4459] font-medium text-base leading-6 tracking-[0.15px] rounded-r-lg hover:bg-[#ddd4f5] transition-colors shrink-0">
            Найти
          </button>
        </div>
      </div>

      {/* Контент */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-6">
        <div className="flex gap-6 items-start">
          <aside className="shrink-0 w-[280px] hidden sm:block">
            <div className="w-full border border-black bg-[#F3EDF7] rounded-sm p-4">
              <h2 className="text-black font-medium text-2xl leading-6 tracking-[0.15px]">Фильтры</h2>
              <p className="mt-4 text-sm text-[#49454F]">Здесь будут фильтры</p>
            </div>
          </aside>

          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-16 text-[#49454F] font-medium text-base">
                По вашему запросу ничего не найдено
              </div>
            ) : (
              filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  description={topic.description}
                  institute={topic.institute}
                  teacher={topic.teacher}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
