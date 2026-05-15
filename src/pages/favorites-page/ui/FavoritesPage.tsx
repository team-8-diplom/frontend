import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, addToast } from '@heroui/react';
import { Header } from '@/widgets/header';
import { TopicCard } from '@/entities/theme/ui/TopicCard/TopicCard';
import { MOCK_TOPICS_ALL } from '@/shared/mock/topics';

const FAVORITES_STORAGE_KEY = 'favorites';

export const FavoritesPage = () => {
  const navigate = useNavigate();

  const [favoritesIds, setFavoritesIds] = useState<string[]>(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!stored || JSON.parse(stored).length === 0) {
      return ['1', '2', '3', '4'];
    }

    return JSON.parse(stored);
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  const favoriteTopics = useMemo(() => {
    return MOCK_TOPICS_ALL.filter((topic) => favoritesIds.includes(topic.id));
  }, [favoritesIds]);

  const handleToggleFavorite = (topicId: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoritesIds((prev) => prev.filter((id) => id !== topicId));
      addToast({
        title: 'Удалено из избранного',
        description: 'Тема больше не в избранном',
        color: 'warning',
      });
    }
  };

  const handleApply = () => {
    addToast({
      title: 'Данный функционал пока не реализован',
      description: 'Но скоро всё будет хорошо',
      color: 'warning',
    });
  };

  const isEmpty = favoriteTopics.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto pt-12 pb-24">
          {isEmpty ? (
            <>
              <h1 className="text-6xl font-bold leading-none mb-12 text-gray-800">Избранное</h1>

              <div className="max-w-[440px] w-full">
                <p className="text-xl leading-7 font-medium text-gray-800 mb-6">У вас пока нет избранных тем</p>
                <p className="text-xl leading-7 font-medium text-gray-800">
                  Перейдите к списку тем и добавьте в избранное понравившиеся.
                </p>
              </div>

              <div className="mt-12">
                <Button color="primary" variant="solid" size="md" radius="full" onPress={() => navigate('/themes')}>
                  Смотреть темы
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold leading-none mb-12 text-gray-800">Избранное</h1>

              <div className="flex flex-col gap-6">
                {favoriteTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    onApply={handleApply}
                    initialFavorite={true}
                    onFavoriteToggle={handleToggleFavorite}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
