import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => {
      return createUpdateCabin(newCabinData, id);
    },
    onSuccess: () => {
      toast.success('Cabin successfully updated');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { updateCabin, isUpdating };
}
