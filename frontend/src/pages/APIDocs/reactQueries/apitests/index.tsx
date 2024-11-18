import { useMutation } from '@tanstack/react-query';
import { apiTest, testcaseTest } from '../../apis/apitest';
import usePopup from '../../../../hooks/usePopup';
import Typography from '../../../../components/Typography';

const MUTATION_KEYS = {
  testcaseTest: 'testcaseTest',
  apiTest: 'apiTest',
};

// 테스트케이스 테스트
export const useTestCaseTestMutation = () => {
  const popup = usePopup();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.testcaseTest],
    mutationFn: async (testcaseId: number) => await testcaseTest(testcaseId),
    onSuccess: (data) => {
      popup.push({
        title: '테케 테스트 결과',
        children: <Typography>{data.data.testResult}</Typography>,
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

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.apiTest],
    mutationFn: async (apiId: number) => await apiTest(apiId),
    onSuccess: (data) => {
      popup.push({
        title: '테케 테스트 결과',
        children: (
          <>
            {data.data.map((response) => (
              <Typography>{response.testResult}</Typography>
            ))}
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
