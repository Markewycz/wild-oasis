import styled from 'styled-components';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';
import { StaysType } from '../dashboard/useRecentStays';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 5.625rem 1fr 4.375rem 5.625rem;
  gap: 0.75rem;
  align-items: center;

  font-size: 0.875rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

type TodayItemProps = {
  activity: StaysType;
};
export default function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
