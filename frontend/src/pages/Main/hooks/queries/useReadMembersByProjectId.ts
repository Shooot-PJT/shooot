import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../utils/KEYS';
import { readMembersByProjectId } from '../../apis/projectApis';

export const useReadMembersByProjectId = (projectId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.readMembersByProjectId, projectId],
    queryFn: async () => await readMembersByProjectId(projectId),
    staleTime: 5 * 60 * 1000,
  });

  return { members: data, isLoading };
};
