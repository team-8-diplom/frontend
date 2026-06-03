import { useState } from 'react';
import { Button, Chip, Textarea } from '@heroui/react';
import type { Topic } from '@/entities/topic/ui/TopicCard/TopicCard.tsx';
import { useProfile } from '@/app/providers/profile/ProfileContext.ts';
import { getMatchPercentage } from '@/features/match-skill/lib/getMatchPercentage.tsx';
import { StarIcon } from '@/shared/ui/icons/StarIcon.tsx';
import { MatchBar } from '@/features/match-skill/ui/MatchBar/MatchBar.tsx';
import { useNavigate } from 'react-router-dom';

export const ThemeDetailPanel = ({ topic }: { topic: Topic }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [text, setText] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);
  const matchPercentage = getMatchPercentage(topic.skills, profile?.skills) ?? 0;

  const handleFavoriteClick = () => setIsFavorite((prev) => !prev);
  const handleText = (text: string) => {
    if (text.length <= 600) {
      setText(text);
    }
  };
  const handleApplyClick = () => {
    // TODO submit logic
    navigate('/application-success');
  };

  return (
    <div className="relative w-[68%] min-w-[400px] bg-white rounded-[30px] border flex flex-col p-7 border-[#D4D4D8]">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-7 right-7 text-2xl cursor-pointer focus:outline-none"
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <StarIcon selected={isFavorite} />
      </button>

      <div className="flex flex-col flex-grow gap-y-3">
        {matchPercentage >= 80 ? (
          <p className="text-green-600 text-xs font-medium">Рекомендовано</p>
        ) : (
          <div className="h-4" />
        )}

        <h1 className="text-[36px] font-bold leading-tight">{topic.title}</h1>

        <div className="mt-3">
          <p className="text-sm font-bold text-[#71717A] mb-0.5">Описание:</p>
          <p className="text-[18px] text-gray-700">{topic.description}</p>
        </div>

        <div className="mt-3">
          <p className="text-sm font-bold text-[#71717A] mb-1">Навыки</p>
          <div className="flex flex-wrap gap-2">
            {topic.skills.map((skill) => (
              <Chip key={skill} size="lg" variant="faded" color="default">
                {skill}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm font-bold text-[#71717A] mb-1">Оценка мотивации</p>
          <MatchBar matchPercentage={matchPercentage} />
        </div>

        <div className="flex flex-col flex-grow mt-3">
          <p className="text-sm font-bold text-[#71717A] mb-1">Мотивационное письмо</p>
          <Textarea
            value={text}
            onValueChange={handleText}
            placeholder="Напишите мотивационное письмо..."
            minRows={2}
            maxRows={6}
            className="flex-grow"
          />
          <p className="text-xs text-gray-500 mt-1">Количество символов: {text.length}/600</p>
        </div>
      </div>

      <Button onPress={handleApplyClick} color="primary" className="w-full mt-4" size="lg">
        Подать заявку
      </Button>
    </div>
  );
};
