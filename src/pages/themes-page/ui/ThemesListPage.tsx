import { useState, useMemo } from 'react';
import { Header } from '@/widgets/header';
import { MOCK_TOPICS_ALL } from '@/shared/mock/topics';
import { TopicSearchInput } from '@/features/topic-search/ui/TopicSearchInput.tsx';
import { TopicCard } from '@/entities/topic/ui/TopicCard/TopicCard.tsx';
import { addToast } from '@heroui/react';
import { TopicFilters } from '@/features/topic-filter/ui/TopicFilters.tsx';
import { getMatchPercentage } from '@/features/match-skill/lib/getMatchPercentage.tsx';
import { useProfile } from '@/app/providers/profile/ProfileContext.ts';
import { Footer } from '@/widgets/footer';

const CURRENT_ROLE = 'student'; // заглушка

export const ThemesListPage = () => {
  const { profile } = useProfile();
  const [search, setSearch] = useState('');
  const [skillMatchFilter, setSkillMatchFilter] = useState<string>('all');

  const topicsForRole = useMemo(() => {
    if (CURRENT_ROLE === 'student') {
      return MOCK_TOPICS_ALL.filter((t) => t.author_type === 'teacher');
    }
    return MOCK_TOPICS_ALL.filter((t) => t.author_type === 'student');
  }, []);

  const filteredTopics = useMemo(() => {
    let result = topicsForRole;
    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.institute.toLowerCase().includes(query) ||
          t.teacher.toLowerCase().includes(query)
      );
    }

    if (skillMatchFilter && skillMatchFilter !== 'all') {
      const userSkills = profile?.skills ?? [];
      result = result.filter((topic) => {
        const percent = getMatchPercentage(topic.skills, userSkills);
        switch (skillMatchFilter) {
          case 'high':
            return percent >= 80;
          case 'medium':
            return percent >= 50 && percent <= 79;
          case 'low':
            return percent < 50;
          default:
            return true;
        }
      });
    }

    return result;
  }, [search, topicsForRole, skillMatchFilter, profile?.skills]);

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
          <TopicFilters selectedValue={skillMatchFilter} onValueChange={setSkillMatchFilter} />
          <div className="flex flex-col gap-[28px]">
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
      <Footer />
    </div>
  );
};
