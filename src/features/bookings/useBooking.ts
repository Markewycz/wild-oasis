import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export interface DetailedCabinReservation {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: string;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: string;
  totalPrice: number;
  cabins: DetailedCabin;
  guests: DetailedGuest;
}

interface DetailedCabin {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

interface DetailedGuest {
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
}

export default function useBooking() {
  const { bookingId } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => {
      if (bookingId) return getBooking(bookingId);
    },
    retry: false,
  });

  return { booking, isLoading };
}
