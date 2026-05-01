import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  institute: string;
  teacher: string;
}

export const TopicCard = ({ id, title, description, institute, teacher }: TopicCardProps) => {
  const navigate = useNavigate();

  const handleApply = () => {
    // заглушка – позже добавим логику подачи заявки
    console.log('Подана заявка на тему', id);
  };

  return (
    <div className="w-full border border-[#CAC4D0] rounded-sm bg-[#F3EDF7] p-4">
      <h2 className="text-black font-medium text-2xl leading-6 tracking-[0.15px] mb-2">{title}</h2>
      <p className="text-black font-medium text-sm leading-6 tracking-[0.15px] mb-2">{description}</p>
      <div className="flex flex-wrap gap-x-16 gap-y-1 mb-4">
        <span className="text-black font-medium text-sm leading-6 tracking-[0.15px]">{institute}</span>
        <span className="text-black font-medium text-sm leading-6 tracking-[0.15px]">{teacher}</span>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/themes/${id}`)}
          className="flex items-center justify-center px-4 py-2.5 rounded-full bg-[#6750A4] text-white font-medium text-sm leading-5 tracking-[0.1px] hover:bg-[#5a4491] transition-colors"
        >
          Подробнее
        </button>
        <button
          onClick={handleApply}
          className="flex items-center justify-center px-4 py-2.5 rounded-full bg-[#6750A4] text-white font-medium text-sm leading-5 tracking-[0.1px] hover:bg-[#5a4491] transition-colors"
        >
          Отправить заявку
        </button>
      </div>
    </div>
  );
};
