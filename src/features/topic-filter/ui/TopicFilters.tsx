import { Accordion, AccordionItem, Radio, RadioGroup } from '@heroui/react';

type TopicFilterProps = {
  selectedValue: string | null;
  onValueChange: (value: string) => void;
};

export const TopicFilters = ({ selectedValue, onValueChange }: TopicFilterProps) => {
  return (
    <Accordion
      selectionMode="multiple"
      variant="splitted"
      className="w-[300px] min-w-[200px]"
      defaultExpandedKeys={['skills']}
    >
      <AccordionItem key="skills" title="Совпадение навыков" subtitle="В процентах">
        <RadioGroup value={selectedValue} onValueChange={onValueChange}>
          <Radio value="all">Все темы</Radio>
          <Radio value="high">Высокое (≥80%)</Radio>
          <Radio value="medium">Среднее (50-79%)</Radio>
          <Radio value="low">Низкое (&lt;50%)</Radio>
        </RadioGroup>
      </AccordionItem>

      <AccordionItem title="Кафедра"></AccordionItem>

      <AccordionItem title="Преподаватели"></AccordionItem>

      <AccordionItem title="Навыки"></AccordionItem>
    </Accordion>
  );
};
