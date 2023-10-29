import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type MutationFnArgs = {
  bookingId: number;
  breakfast:
    | {
        hasBreakfast: true;
        extrasPrice: number;
        totalPrice: number;
      }
    | Record<string, never>;
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationKey: ['bookings'],
    mutationFn: ({ bookingId, breakfast }: MutationFnArgs) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: data => {
      toast.success(`Booking #${data.id} succesfully checked in`);
      queryClient.invalidateQueries(['bookings']);
      navigate('/');
    },

    onError: () => {
      toast.error('There was an error while checking in');
    },
  });

  return { checkIn, isCheckingIn };
}
