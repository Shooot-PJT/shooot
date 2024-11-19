import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { apiTest, getApiTestLogs, testcaseTest } from '../../apis/apitest';
import usePopup from '../../../../hooks/usePopup';
import Typography from '../../../../components/Typography';
import { useCommonLoginStore } from '../../stores/commonLoginStore';
import { TestResponse } from '../../apis/apitest/types';

const MUTATION_KEYS = {
  testcaseTest: 'testcaseTest',
  apiTest: 'apiTest',
};

// 테스트케이스 테스트
export const useTestCaseTestMutation = () => {
  const popup = usePopup();
  const { session } = useCommonLoginStore();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.testcaseTest],
    mutationFn: async (testcaseId: number) =>
      await testcaseTest(testcaseId, session),
    onSuccess: (data) => {
      popup.push({
        title: '테케 테스트 결과',
        children: (
          <Typography>
            {data.data.testResult === 'SUCCESS'
              ? '테스트에 성공하였습니다!'
              : '테스트에 실패하였습니다...'}
          </Typography>
        ),
      });
    },
    onError: (err) => {
      console.log('test case error', err);
    },
  });

  return { testcaseTest: mutate };
};

// API 테스트
export const useApiTestMutation = () => {
  const popup = usePopup();
  const { session } = useCommonLoginStore();
  const getResult = (data: TestResponse[]) => {
    let result = true;
    data.forEach((data) => {
      if (data.testResult === 'FAIL') {
        result = false;
      }
    });
    return result;
  };

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.apiTest],
    mutationFn: async (apiId: number) => await apiTest(apiId, session),
    onSuccess: (data) => {
      popup.push({
        title: '테케 테스트 결과',
        children: (
          <>
            <Typography>
              {getResult(data.data)
                ? 'API 의 모든 케이스의 테스트에 성공하였습니다!'
                : 'API 의 일부 케이스의 테스트에 실패하였습니다...'}
            </Typography>
          </>
        ),
      });
    },
    onError: (err) => {
      console.log('api test error', err);
    },
  });

  return { apiTest: mutate };
};

// 테스트 로그 무한 스크롤
export const useApiTestLogInfiniteQuery = (apiId: number) => {
  const { session } = useCommonLoginStore();

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['logs', apiId],
    queryFn: async ({ pageParam }) => {
      const response = await getApiTestLogs(apiId, pageParam, session);
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageable.pageNumber === lastPage.pageable.pageSize - 1
        ? undefined
        : lastPage.pageable.pageNumber + 1,
  });

  return { logs: data, isLoading, hasNextPage, fetchNextPage };
};
