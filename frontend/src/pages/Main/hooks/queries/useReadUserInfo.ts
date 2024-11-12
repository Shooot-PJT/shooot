import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../utils/KEYS';
import { readUserInfo } from '../../apis/userApis';

export const useReadUserInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.readUserInfo],
    queryFn: async () => await readUserInfo(),
    staleTime: 5 * 60 * 1000,
  });

  return { user: data, isLoading };
};
