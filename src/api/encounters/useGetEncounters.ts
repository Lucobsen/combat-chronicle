import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../convex/_generated/api';

export const useGetEncounters = () => {
  const { data, isLoading } = useQuery(
    convexQuery(api.encounters.getEncounters, {})
  );

  return { encounters: data ?? [], isLoading } as const;
};
