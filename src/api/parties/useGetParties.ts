import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../convex/_generated/api';

export const useGetParties = () => {
  const { data, isLoading } = useQuery(convexQuery(api.parties.get, {}));

  return { parties: data ?? [], isLoading } as const;
};
