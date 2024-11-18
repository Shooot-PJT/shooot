import { HiLockClosed } from 'react-icons/hi2';
import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { CommonLoginModal } from '../CommonLogin/CommonLoginModal';

export const AuthorizeButton = () => {
  const modal = useModal();
  const commonLoginModalHandler = () => {
    modal.push({
      children: <CommonLoginModal />,
    });
  };
  return (
    <Button color="delete" rounded={0.5} onClick={commonLoginModalHandler}>
      <HiLockClosed />
      <Typography weight="600">공용 로그인</Typography>
    </Button>
  );
};
