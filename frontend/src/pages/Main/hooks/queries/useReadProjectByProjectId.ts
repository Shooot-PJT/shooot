import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../utils/KEYS';
import { readProjectByProjectId } from '../../apis/projectApis';

export const useReadProjectByProjectId = (projectId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.readProjectByProjectId, projectId],
    queryFn: async () => await readProjectByProjectId(projectId),
    staleTime: 5 * 60 * 1000,
  });

  return { project: data, isLoading };
};
