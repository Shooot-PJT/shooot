import { ReactNode } from 'react';
import Typography from '../../../../../../../components/Typography';
import Button from '../../../../../../../components/Button';

interface TestButtonProps {
  children: ReactNode;
}

// interface ManagerAvatarProps {
//   id?: Manager['id'];
//   nickname?: Manager['nickname'];
//   rounded?: number;
//   size?: number;
// }

const TestButton = ({ children }: TestButtonProps) => {
  return <div>{children}</div>;
};

// 테스트 가능 상태 판별법, 테스트 API 나옴에 따라 추후 구현
TestButton.All = function All() {
  return (
    <Button paddingX={1} rounded={0.5}>
      <Typography size={0.75}>테스트</Typography>
    </Button>
  );
};

// 테스트 가능 상태 판별법, 테스트 API 나옴에 따라 추후 구현
TestButton.Domain = function Domain() {
  return (
    <Button paddingX={1} rounded={0.5}>
      <Typography size={0.75}>테스트</Typography>
    </Button>
  );
};

// 테스트 가능 상태 판별법, 테스트 API 나옴에 따라 추후 구현
TestButton.API = function API() {
  return (
    <Button paddingX={1} rounded={0.5}>
      <Typography size={0.75}>테스트</Typography>
    </Button>
  );
};

export default TestButton;
