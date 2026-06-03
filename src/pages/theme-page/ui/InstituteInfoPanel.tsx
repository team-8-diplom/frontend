import { Card, CardBody, CardHeader } from '@heroui/react';
import instituteImg from '../assets/bank.png';

export const InstituteInfoPanel = ({ institute }: { institute: string }) => {
  return (
    <Card shadow="none" className="border border-[#D4D4D8] rounded-[30px]">
      <CardHeader>
        <img src={instituteImg} className="w-[56px] h-[56px]" alt="Institute" />
      </CardHeader>
      <CardBody>
        <p className="text-[14px] pl-2">{institute}</p>
      </CardBody>
    </Card>
  );
};
