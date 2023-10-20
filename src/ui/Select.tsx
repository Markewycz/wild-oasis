import styled from 'styled-components';
import { Option } from './SortBy';
import { ChangeEvent } from 'react';

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${props =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type StyledSelectProps = {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type SelectProps = {
  type: string;
  options: Option[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Select({
  options,
  value,
  onChange,
  ...props
}: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
