import { createGuest } from '@/services/apiGuests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreatingGuests } = useMutation(
    guest => createGuest(guest),
    {
      mutationKey: ['guests'],
      onSuccess: () => {
        queryClient.invalidateQueries(['guests']);
        toast.success('Guest was successfully created.');
      },
      onError: () => {
        toast.error("There was an error. Guest couldn't be created.");
      },
    }
  );

  return { mutate, isCreatingGuests };
}
