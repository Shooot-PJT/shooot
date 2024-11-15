import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../utils/KEYS';
import { readProjectList } from '../../apis/projectApis';

export const useReadProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.readProjectList],
    queryFn: async () => await readProjectList(),
    staleTime: 5 * 60 * 1000,
  });

  return { projectList: data, isLoading };
};
