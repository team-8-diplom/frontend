import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '@/shared/ui/icons/HeartIcon';
import { BellIcon } from '@/shared/ui/icons/BellIcon';
import { UserIcon } from '@/shared/ui/icons/UserIcon';

interface HeaderProps {
  onAddTopic?: () => void;
  title?: string;
}

export const Header = ({ onAddTopic, title = 'Дипломные темы' }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#D9D9D9] border-b border-black" style={{ minHeight: 80 }}>
      <div className="max-w-[1440px] mx-auto px-4 h-full flex items-center justify-between" style={{ minHeight: 80 }}>
        {/* Название страницы */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {title}
          </span>
        </div>

        {/* Правая группа */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAddTopic ?? (() => navigate('/propose'))}
            className="hidden sm:flex items-center justify-center px-6 py-3 rounded-lg border border-black bg-[#E8DEF8] text-[#4A4459] font-medium text-base leading-6 tracking-[0.15px] hover:bg-[#ddd4f5] transition-colors"
            style={{ fontFamily: 'Roboto', height: 56 }}
          >
            Добавить тему
          </button>

          <button
            className="relative flex items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity"
            aria-label="Избранное"
          >
            <HeartIcon className="text-[#1D1B20]" />
          </button>

          <button
            className="relative flex items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity"
            aria-label="Уведомления"
          >
            <BellIcon className="text-[#1D1B20]" />
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[#B3261E] text-white text-[11px] font-medium leading-4 px-1">
              1
            </span>
          </button>

          <button
            className="relative flex items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity"
            aria-label="Профиль"
          >
            <UserIcon className="text-[#1D1B20]" />
          </button>
        </div>
      </div>
    </header>
  );
};
