import styled from 'styled-components';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import { useTodayActivity } from './useTodayActivity';
import Spinner from '../../ui/Spinner';
import TodayItem from './TodayItem';

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  grid-column: 1 / span 2;
  padding-top: 1.5rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities && activities?.length > 0 ? (
          <TodayList>
            {activities.map(activity => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity />
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
