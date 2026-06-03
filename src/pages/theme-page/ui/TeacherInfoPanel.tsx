import { Card, CardBody, CardHeader } from '@heroui/react';
import teacherImg from '../assets/teacher.png';

export const TeacherInfoPanel = ({ teacher }: { teacher: string }) => {
  return (
    <Card shadow="none" className="border border-[#D4D4D8] rounded-[30px]">
      <CardHeader>
        <img src={teacherImg} className="w-[56px] h-[56px]" alt="Teacher" />
      </CardHeader>
      <CardBody>
        <p className="text-[14px] pl-2">{teacher}</p>
      </CardBody>
    </Card>
  );
};
