import { UserInfo } from '../../pages/Main/types';
import Flexbox from '../Flexbox';
import Typography from '../Typography';

interface UserContentsProps {
  userInfo?: UserInfo;
  handler?: () => void;
}

export const UserContents = ({ userInfo, handler }: UserContentsProps) => {
  return (
    <>
      <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
        <Flexbox alignItems="end" style={{ columnGap: '0.25rem' }}>
          <Typography color="secondary" size={1.25} weight="700">
            {userInfo?.nickname}
          </Typography>
          <Typography color="light" weight="700" size={0.875}>
            님 오늘도 와주셨군요!
          </Typography>
        </Flexbox>
        <Typography color="disabled" size={0.875} weight="500">
          {userInfo?.email}
        </Typography>
      </Flexbox>
      <Typography color="disabled" size={0.875} onClick={handler}>
        <a>닉네임 수정</a>
      </Typography>
    </>
  );
};
