import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { Cabin } from '../cabins/useCabins';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export interface CabinReservation {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  status: string;
  totalPrice: number;
  cabins: CabinName;
  guests: GuestInfo;
}

interface GuestInfo {
  fullName: string;
  email: string;
}

type CabinName = {
  name: Cabin['name'];
};

export type GetBookingsProps = {
  filter: { field: string; value: string } | null;
  sortBy: { field: string; direction: string };
  page: number;
};

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // I could add {method: value} to the object to specify what query i want to send, eg. gt, eq

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  }) as {
    data: { data: CabinReservation[]; count: number };
    isLoading: boolean;
  };

  // PRE-FETCHING
  const pageCount = Math.ceil(count ? count / PAGE_SIZE : 1);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, count, isLoading };
}
