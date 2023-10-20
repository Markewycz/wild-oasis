import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { Cabin } from './CabinTable';

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  }) as {
    data: Cabin[];
    isLoading: boolean;
  };

  return { cabins, isLoading };
}
