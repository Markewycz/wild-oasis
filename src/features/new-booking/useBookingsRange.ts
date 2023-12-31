import { getStaysFromRange } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { addDays, subDays } from 'date-fns';

export function useBookingsRange(date, range = 90) {
  const dateFrom = subDays(date, range).toISOString();
  const dateTo = addDays(date, range).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getStaysFromRange(dateFrom, dateTo),
    queryKey: ['bookings-range'],
  });

  return { bookings, isLoading };
}
