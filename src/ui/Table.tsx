import styled from 'styled-components';
import { TableContext, useTableContext } from '../hooks/useTableContext';
// import { Cabin } from '../features/cabins/useCabins';
// import { CabinReservation } from '../features/bookings/useBookings';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 0.875rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<StyledCommonRow>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  column-gap: 1.5rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1rem 1.5rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 0.75rem 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.25rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 0.75rem;

  &:not(:has(*)) {
    display: none;
  }
`;

type StyledCommonRow = {
  columns: string | null;
};

type TableProps = {
  columns: string;
  children: React.ReactNode;
};

type HeaderProps = {
  children: React.ReactNode;
};

type RowProps = {
  children: React.ReactNode;
};

export default function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: HeaderProps) {
  const { columns } = useTableContext();

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }: RowProps) {
  const { columns } = useTableContext();

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }: any) {
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
