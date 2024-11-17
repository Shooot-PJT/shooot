import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  addTestCase,
  getTestCaseDetail,
  editTestCase,
  removeTestCase,
} from '../../apis/testcase';
import {
  AddTestCaseRequestBody,
  GetTestCaseDetailRequest,
} from '../../apis/testcase/types';
import { TestCaseDetailInfo } from '../../types/data/TestCase.data';

export const useGetTestCaseDetail = (
  { testcaseId }: GetTestCaseDetailRequest,
  options?: Omit<
    UseQueryOptions<TestCaseDetailInfo, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<TestCaseDetailInfo, Error>({
    queryKey: ['testCaseDetail', testcaseId],
    queryFn: () => getTestCaseDetail({ testcaseId }),
    ...options,
  });
};

export const useAddTestCase = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TestCaseDetailInfo,
    Error,
    { apiId: number; data: AddTestCaseRequestBody }
  >({
    mutationFn: ({ apiId, data }) => addTestCase({ apiId }, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });
    },
  });
};

export const useRemoveTestCase = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { apiId: number; testcaseId: number }>({
    mutationFn: ({ testcaseId }) => removeTestCase({ testcaseId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });
    },
  });
};

export const useEditTestCase = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TestCaseDetailInfo,
    Error,
    { testcaseId: number; data: AddTestCaseRequestBody }
  >({
    mutationFn: ({ testcaseId, data }) => editTestCase({ testcaseId }, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['testCaseDetail', variables.testcaseId],
      });
    },
  });
};
