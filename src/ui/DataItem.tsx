import styled from 'styled-components';

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-brand-600);
  }
`;

type DataItemProps = {
  icon: React.ReactElement;
  label: string;
  children: React.ReactNode;
};

function DataItem({ icon, label, children }: DataItemProps) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
