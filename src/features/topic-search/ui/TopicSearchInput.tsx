import { Button, Input } from '@heroui/react';
import { Magnifier } from '@/shared/ui/icons/Magnifier.tsx';
import type { FC } from 'react';

type SearchInputProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const TopicSearchInput: FC<SearchInputProps> = ({ search, setSearch }) => {
  return (
    <div className="flex gap-6 my-[48px]">
      <Input
        startContent={<Magnifier />}
        placeholder="Название темы или имя преподавателя"
        variant="bordered"
        size="lg"
        color="default"
        radius="full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="min-w-[200px]"
      />
      <Button color="primary" radius="full" size="lg" className="max-w-[200px] w-full">
        Найти
      </Button>
    </div>
  );
};
