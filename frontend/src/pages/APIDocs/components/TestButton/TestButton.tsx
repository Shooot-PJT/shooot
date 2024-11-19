import { ReactNode } from 'react';
import Typography from '../../../../components/Typography';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import { HiCodeBracketSquare } from 'react-icons/hi2';
import {
  useApiTestMutation,
  useTestCaseTestMutation,
} from '../../reactQueries/apitests';
import usePopup from '../../../../hooks/usePopup';
import { useGetAPIList } from '../../reactQueries/api';
import { GetAPIListRequest } from '../../apis/api/types';
import { useCommonLoginStore } from '../../stores/commonLoginStore';
import { apiTest } from '../../apis/apitest';

interface TestButtonProps {
  children: ReactNode;
}

const TestButton = ({ children }: TestButtonProps) => {
  return <div>{children}</div>;
};

TestButton.All = function All() {
  return (
    <Button paddingX={1} rounded={0.5}>
      <Typography size={0.75}>테스트</Typography>
    </Button>
  );
};

interface DomainTestButtonProps {
  domainId: number;
}

const testAPI = async (apiId: number, session: string) => {
  const response = await apiTest(apiId, session);
  const result = response.data;
  let res = true;
  result.forEach((r) => {
    if (r.testResult === 'FAIL') res = false;
  });
  return res;
};

TestButton.Domain = function Domain({ domainId }: DomainTestButtonProps) {
  const popup = usePopup();
  const apiList = useGetAPIList({ domainId } as GetAPIListRequest);
  const { session } = useCommonLoginStore();
  const domainTestHandler = async () => {
    if (apiList.data) {
      if (apiList.data.length) {
        let result = true;
        apiList.data.forEach((api) => {
          if (!testAPI(api.id, session)) {
            result = false;
          }
        });

        if (result) {
          popup.push({
            title: '도메인 테스트 성공',
            children: (
              <Typography>모든 API 테스트에 통과하였습니다!</Typography>
            ),
          });
        } else {
          popup.push({
            title: '도메인 테스트 실패',
            children: (
              <Typography>일부 API 테스트에 실패했습니다...</Typography>
            ),
          });
        }
      } else {
        popup.push({
          title: '도메인 테스트',
          children: <Typography>테스트 할 API 가 없습니다</Typography>,
          type: 'fail',
        });
      }
    }
  };

  return (
    <Button
      color="grey"
      rounded={0.5}
      paddingX={0.75}
      onClick={() => domainTestHandler()}
    >
      <Icon background="none" size={1.5} color="disabled">
        <HiCodeBracketSquare />
      </Icon>
      <Typography>도메인 테스트</Typography>
    </Button>
  );
};

// API 버튼
interface ApiTestButtonProps {
  apiId: number;
}

TestButton.API = function API({ apiId }: ApiTestButtonProps) {
  const { apiTest } = useApiTestMutation();

  return (
    <Button
      paddingX={1}
      rounded={0.5}
      color="grey"
      onClick={() => apiTest(apiId)}
    >
      <Typography size={0.75}>API 테스트</Typography>
    </Button>
  );
};

// 테스트케이스 버튼
interface TestCaseTestButtonProps {
  testcaseId: number;
}

TestButton.TestCase = function TestCase({
  testcaseId,
}: TestCaseTestButtonProps) {
  const { testcaseTest } = useTestCaseTestMutation();

  return (
    <Button
      paddingX={1}
      rounded={0.5}
      color="grey"
      onClick={() => testcaseTest(testcaseId)}
    >
      <Typography size={0.75}>케이스 테스트</Typography>
    </Button>
  );
};

export default TestButton;
