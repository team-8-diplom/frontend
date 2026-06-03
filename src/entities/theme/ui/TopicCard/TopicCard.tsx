import { useState, useMemo } from 'react';
import { Button, Chip, Avatar } from '@heroui/react';
import { useProfile } from '@/app/providers/profile/ProfileContext';
import { StarIcon } from '@/shared/ui/icons/StarIcon.tsx';
import { useNavigate } from 'react-router-dom';
import { MatchBar } from '@/features/match-skill/ui/MatchBar/MatchBar.tsx';
import { getMatchPercentage } from '@/features/match-skill/lib/getMatchPercentage.tsx';

export interface Topic {
  id: string;
  title: string;
  description: string;
  institute: string;
  teacher: string;
  email: string;
  skills: string[];
}

interface TopicCardProps {
  topic: Topic;
  onFavoriteToggle?: (topicId: string, isFavorite: boolean) => void;
  onApply?: (topicId: string) => void;
  initialFavorite?: boolean;
}

export const TopicCard = ({ topic, onFavoriteToggle, onApply, initialFavorite = false }: TopicCardProps) => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const matchPercentage = useMemo(() => {
    return getMatchPercentage(topic.skills, profile?.skills);
  }, [profile?.skills, topic.skills]);

  const handleFavoriteClick = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    onFavoriteToggle?.(topic.id, newState);
  };

  const handleApplyClick = () => {
    onApply?.(topic.id);
  };

  const MAX_VISIBLE_CHIPS = 4;
  const visibleSkills = topic.skills.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenCount = topic.skills.length - MAX_VISIBLE_CHIPS;

  return (
    <div
      className={`relative w-[874px] h-[456px] bg-white rounded-xl border flex flex-col p-7 ${
        matchPercentage >= 80 ? 'border-[#17C964]' : 'border-[#D4D4D8]'
      }`}
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-7 right-7 text-2xl cursor-pointer focus:outline-none"
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <StarIcon selected={isFavorite} />
      </button>

      <div className="flex flex-row flex-grow gap-x-6">
        <div className="w-[500px] flex-shrink-0 flex flex-col gap-[14px]">
          <div className="h-[106px] flex flex-col cursor-pointer " onClick={() => navigate(`/themes/${topic.id}`)}>
            {matchPercentage >= 80 && <p className="text-green-600 text-xs font-medium">Рекомендовано</p>}
            {matchPercentage < 80 && <div className="h-[16px]" />}
            <h1 className="text-[30px] font-bold leading-tight line-clamp-2 mt-1 hover:text-gray-500">{topic.title}</h1>
          </div>

          <div className="h-[80px] overflow-hidden flex items-center">
            <p className="text-[18px] text-gray-700 line-clamp-3">{topic.description}</p>
          </div>

          <MatchBar matchPercentage={matchPercentage} />

          <div className="h-[52px] flex items-center gap-3">
            <Avatar name={topic.teacher} size="sm" />
            <div>
              <p className="text-sm font-bold">{topic.teacher}</p>
              <p className="text-xs text-gray-500">{topic.institute}</p>
            </div>
          </div>
        </div>

        <div className="flex-grow flex items-start justify-end mt-[120px]">
          <div className="flex flex-wrap gap-2 max-h-[100px] justify-end">
            {visibleSkills.map((skill) => (
              <Chip key={skill} size="lg" variant="faded" color="default">
                {skill}
              </Chip>
            ))}
            {hiddenCount > 0 && (
              <Chip variant="faded" size="lg" color="default">
                +{hiddenCount}
              </Chip>
            )}
          </div>
        </div>
      </div>

      <Button onPress={handleApplyClick} color="primary" className="w-full mt-7" size="lg">
        Подать заявку
      </Button>
    </div>
  );
};
