import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { Cabin } from '../cabins/useCabins';

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
export default function useBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  }) as {
    data: CabinReservation[];
    isLoading: boolean;
  };

  return { bookings, isLoading };
}
