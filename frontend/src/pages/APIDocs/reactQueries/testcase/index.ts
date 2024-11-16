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

// useGetTestCaseDetail 훅
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

// useAddTestCase 훅
export const useAddTestCase = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TestCaseDetailInfo,
    Error,
    { apiId: number; formData: AddTestCaseRequestBody }
  >({
    mutationFn: ({ apiId, formData }) => addTestCase({ apiId }, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });
    },
  });
};

// useRemoveTestCase 훅
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

// useEditTestCase 훅 추가 (필요 시)
export const useEditTestCase = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TestCaseDetailInfo,
    Error,
    { testcaseId: number; formData: FormData }
  >({
    mutationFn: ({ testcaseId, formData }) =>
      editTestCase({ testcaseId }, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['testCaseDetail', variables.testcaseId],
      });
    },
  });
};
