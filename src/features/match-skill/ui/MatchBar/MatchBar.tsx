import { Progress } from '@heroui/react';

export const MatchBar = ({ matchPercentage }: { matchPercentage: number }) => {
  let color: 'success' | 'warning' | 'danger';

  if (matchPercentage >= 80) color = 'success';
  else if (matchPercentage >= 50) color = 'warning';
  else color = 'danger';

  return (
    <div>
      <p className="text-gray-600 mb-1">Совпадение ваших навыков: {matchPercentage}%</p>
      <Progress value={matchPercentage} className="max-w-md" color={color} />
    </div>
  );
};
