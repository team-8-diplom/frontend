import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className="h-[152px] bg-[#F4F4F5] w-full mt-[90px]">
      <div className="max-w-[1280px] mx-auto h-full flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6 flex-wrap text-[16px] text-gray-400">
            <Link to="/themes">Темы</Link>
            <Link to="/favorites">Избранное</Link>
            <Link to="/my-applications">Мои заявки</Link>
            <Link to="/propose">Предложить тему</Link>
          </div>
          <Link to="/profile" className="text-[16px] text-gray-400">
            Личный кабинет
          </Link>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 text-[12px] font-bold">
          <p>© 2026 Платформа выбора тем дипломных работ.</p>
          <p>Сделано в рамках дипломного проекта</p>
        </div>
      </div>
    </footer>
  );
};
