import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';

interface CabinFormData {
  image: File;
  description: string;
  discount: number;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
type CabinFormDataParams = {
  newCabinData: CabinFormData;
  id: number;
};

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation(
    ({ newCabinData, id }: CabinFormDataParams) => {
      return createUpdateCabin(newCabinData, id);
    },
    {
      onSuccess: () => {
        toast.success('Cabin successfully updated');

        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        });
      },
      onError: (err: Error) => toast.error(err.message),
    }
  );
  return { updateCabin, isUpdating };
}
