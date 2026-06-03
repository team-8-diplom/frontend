import { Button, Chip, Avatar } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export interface ApplicationTopic {
  id: string;
  title: string;
  description: string;
  institute: string;
  teacher: string;
  email: string;
  skills: string[];
  status: 'pending' | 'accepted' | 'rejected';
}

interface ApplicationCardProps {
  application: ApplicationTopic;
}

const statusConfig = {
  pending: {
    label: 'Заявка в ожидании',
    borderColor: '#D4D4D8',
    bgColor: 'bg-white',
    badgeColor: 'warning' as const,
  },
  accepted: {
    label: 'Заявка принята',
    borderColor: '#17C964',
    bgColor: 'bg-[#17C964]/20',
    badgeColor: 'success' as const,
  },
  rejected: {
    label: 'Заявка отклонена',
    borderColor: '#F31260',
    bgColor: 'bg-[#F31260]/20',
    badgeColor: 'danger' as const,
  },
};

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const navigate = useNavigate();
  const status = statusConfig[application.status];

  return (
    <div
      className={`relative w-full max-w-[874px] mx-auto bg-white rounded-xl border flex flex-col p-4 sm:p-7 ${status.bgColor}`}
      style={{ borderColor: status.borderColor }}
    >
      <div className="absolute top-4 right-4 sm:top-7 sm:right-7">
        <Chip variant="flat" color={status.badgeColor} size="sm" radius="full">
          {status.label}
        </Chip>
      </div>

      <div className="flex flex-row flex-grow gap-x-4 sm:gap-x-6">
        <div className="flex-grow flex flex-col gap-2 sm:gap-[14px]">
          <div className="flex flex-col cursor-pointer" onClick={() => navigate(`/themes/${application.id}`)}>
            <h1 className="text-xl sm:text-[30px] font-bold leading-tight line-clamp-2 hover:text-gray-500">
              {application.title}
            </h1>
          </div>

          <div className="overflow-hidden flex items-center">
            <p className="text-sm sm:text-[18px] text-gray-700 line-clamp-2">{application.description}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
            <Avatar name={application.teacher} size="sm" />
            <div>
              <p className="text-xs sm:text-sm font-bold">{application.teacher}</p>
              <p className="text-xs text-gray-500">{application.institute}</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onPress={() => navigate(`/themes/${application.id}`)}
        color="primary"
        className="w-full mt-4 sm:mt-7"
        size="lg"
        variant="solid"
        radius="full"
      >
        Посмотреть детали темы
      </Button>
    </div>
  );
};
