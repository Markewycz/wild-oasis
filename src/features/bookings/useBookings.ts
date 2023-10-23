import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { Cabin } from '../cabins/useCabins';
import { useSearchParams } from 'react-router-dom';

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

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  }) as {
    data: { data: CabinReservation[]; count: number };
    isLoading: boolean;
  };

  return { bookings, count, isLoading };
}
