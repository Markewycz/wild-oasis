import { getStaysFromRange } from '@/services/apiBookings';
import { RANGE_BOOKINGS } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { addDays, subDays } from 'date-fns';

export function useBookingsRange(date: Date) {
  const dateFrom = subDays(date, RANGE_BOOKINGS).toISOString();
  const dateTo = addDays(date, RANGE_BOOKINGS).toISOString();

  const {
    data: bookings,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: () => getStaysFromRange(dateFrom, dateTo),
    queryKey: ['bookings-range'],
    refetchOnWindowFocus: false,
    // enabled: false,
  });

  return { bookings, isLoading, isRefetching, refetch };
}
