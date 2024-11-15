import { ReactNode } from 'react';
import Typography from '../../../../components/Typography';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import { HiCodeBracketSquare } from 'react-icons/hi2';

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

TestButton.API = function API() {
  return (
    <Button paddingX={1} rounded={0.5} color="grey">
      <Typography size={0.75}>API 테스트</Typography>
    </Button>
  );
};

TestButton.TestCase = function TestCase() {
  return (
    <Button paddingX={1} rounded={0.5} color="grey">
      <Typography size={0.75}>케이스 테스트</Typography>
    </Button>
  );
};

export default TestButton;
