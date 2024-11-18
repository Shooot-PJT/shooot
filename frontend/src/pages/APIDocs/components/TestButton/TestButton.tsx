import { ReactNode } from 'react';
import Typography from '../../../../components/Typography';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import { HiCodeBracketSquare } from 'react-icons/hi2';
import {
  useApiTestMutation,
  useTestCaseTestMutation,
} from '../../reactQueries/apitests';

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

TestButton.Domain = function Domain() {
  return (
    <Button color="grey" rounded={0.5} paddingX={0.75}>
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
