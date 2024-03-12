import { getGuests } from '@/services/apiGuests';
import { useQuery } from '@tanstack/react-query';

export function useGuests() {
  const { data: guests, isLoading: isLoadingGuests } = useQuery({
    queryFn: getGuests,
    queryKey: ['guests'],
  });

  return { guests, isLoadingGuests };
}
