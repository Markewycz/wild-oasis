import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: data => {
      toast.success(`Booking #${data.id} succesfully checked out`);
      queryClient.invalidateQueries(['bookings']);
    },

    onError: () => {
      toast.error('There was an error while checking out');
    },
  });

  return { checkOut, isCheckingOut };
}
