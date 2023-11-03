import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export interface StaysType {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  guests: { fullName: string };
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: string;
  totalPrice: number;
}

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    stay => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isLoading, confirmedStays, numDays };
}
