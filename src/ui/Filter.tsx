import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
`;

const FilterButton = styled.button<StyledFilterButton>`
  background-color: var(--color-grey-0);
  border: none;

  ${props =>
    props.active === 'true' &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.44rem 0.5rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type StyledFilterButton = {
  active: string;
};

interface FilterOption {
  value: string;
  label: string;
}

type FilterProps = {
  filterField: string;
  options: FilterOption[];
};

export default function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0]?.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    searchParams.delete('page');
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map(option => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={(option.value === currentFilter).toString()}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
