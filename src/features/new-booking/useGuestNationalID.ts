import { getGuestByNationalID } from '@/services/apiGuests';
import { useQuery } from '@tanstack/react-query';

export function useGuestNationalID(nationalID: number) {
  const { data: guest, isLoading: isLoadingGuest } = useQuery({
    queryFn: () => getGuestByNationalID(nationalID),
    queryKey: [nationalID],
  });

  return { guest, isLoadingGuest };
}
