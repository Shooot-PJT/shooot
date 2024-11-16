// frontend/src/pages/APIDocs/reactQueries/testcase/index.ts

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
  AddTestCaseRequest,
  AddTestCaseRequestBody,
  AddTestCaseResponse,
  GetTestCaseDetailRequest,
  GetTestCaseDetailResponse,
  EditTestCaseRequest,
  EditTestCaseRequestBody,
  RemoveTestCaseRequest,
} from '../../apis/testcase/types';
import {
  TestCaseDetailInfo,
  APIDetailInfo,
  TestCaseHeaderInfo,
} from '../../types/data/API.data';

// useGetTestCaseDetail 훅
export const useGetTestCaseDetail = (
  { testcaseId }: GetTestCaseDetailRequest,
  options?: UseQueryOptions<TestCaseDetailInfo, Error>,
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
    TestCaseHeaderInfo, // AddTestCaseResponse가 아니라 TestCaseHeaderInfo로 변경
    Error,
    AddTestCaseRequestBody & { apiId: number }
  >({
    mutationFn: (data) => addTestCase({ apiId: data.apiId }, data),
    onSuccess: (newTestCase, variables) => {
      // API 상세 정보 쿼리 무효화하여 데이터 새로 고침
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });

      // 캐시 데이터 업데이트 (옵션)
      queryClient.setQueryData<APIDetailInfo | undefined>(
        ['apiDetail', variables.apiId],
        (oldData: APIDetailInfo | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            testCases: oldData.testCases
              ? [...oldData.testCases, newTestCase]
              : [newTestCase],
          };
        },
      );
    },
  });
};

// useRemoveTestCase 훅
export const useRemoveTestCase = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { apiId: number; testcaseId: number }>({
    mutationFn: ({ testcaseId }) => removeTestCase({ testcaseId }),
    onSuccess: (_, variables) => {
      // API 상세 정보 쿼리 무효화하여 데이터 새로 고침
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });

      // 캐시 데이터 업데이트 (옵션)
      queryClient.setQueryData<APIDetailInfo | undefined>(
        ['apiDetail', variables.apiId],
        (oldData: APIDetailInfo | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            testCases: oldData.testCases
              ? oldData.testCases.filter(
                  (testCase) => testCase.id !== variables.testcaseId,
                )
              : [],
          };
        },
      );
    },
  });
};
