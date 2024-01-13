import { getAllSortedCountries } from '@/services/apiCountries';
import { useQuery } from '@tanstack/react-query';

export function useSortedCountries() {
  const { data: sortedCountries, isLoading } = useQuery({
    queryFn: getAllSortedCountries,
    queryKey: ['sortedCountries'],
  });

  return { sortedCountries, isLoading };
}
