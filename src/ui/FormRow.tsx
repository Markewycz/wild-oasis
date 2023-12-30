import { FieldError, FieldErrorsImpl } from 'react-hook-form';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15rem 1fr 1.2fr;
  gap: 1.5rem;

  padding: 0.75rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 0.875rem;
  color: var(--color-red-700);
`;

type FormRowProps = {
  label?: string;
  children: React.ReactNode;
  error?: string | FieldError | FieldErrorsImpl | undefined;
};

export default function FormRow({ label, error, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && (
        <Label htmlFor={(children as React.ReactElement)?.props?.id}>
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error as string}</Error>}
    </StyledFormRow>
  );
}
