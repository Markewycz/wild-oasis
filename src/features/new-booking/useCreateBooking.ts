import { createBooking } from '@/services/apiBookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateBooking(setStep) {
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isCreatingBooking,
  } = useMutation(newBooking => createBooking(newBooking), {
    mutationKey: ['new-booking'],
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      toast.success('Booking successfully created.');
      setStep('1');
    },
    onError: () => {
      toast.error("There was an error. Booking couldn't be created.");
    },
  });

  return { mutate, isCreatingBooking };
}
