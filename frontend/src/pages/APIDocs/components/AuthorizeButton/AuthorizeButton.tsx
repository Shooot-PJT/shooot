import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';
import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';

export const AuthorizeButton = ({
  isAuthorized,
}: {
  isAuthorized: boolean;
}) => {
  const ButtonText = isAuthorized ? '인증 해제' : '인증하기';
  const ButtonColor = isAuthorized ? 'grey' : 'secondary';
  return (
    <Button color={ButtonColor} rounded={0.5}>
      {isAuthorized ? <HiLockClosed /> : <HiLockOpen />}
      <Typography weight="600">{ButtonText}</Typography>
    </Button>
  );
};
