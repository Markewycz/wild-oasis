import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import Select from './Select';

export type Option = {
  value: string;
  label: string;
};

type SortByProps = {
  options: Option[];
};

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
