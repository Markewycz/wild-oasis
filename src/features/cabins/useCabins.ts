import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export interface Cabin {
  created_at?: string;
  description: string;
  discount: number;
  id?: number;
  image: string | File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

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
