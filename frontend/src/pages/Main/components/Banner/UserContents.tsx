import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import { useNavBar, useReadUserInfo } from '../../hooks';

export const UserContents = () => {
  const { user, isLoading } = useReadUserInfo();
  const { nicknameChangeModalHandler } = useNavBar();

  return (
    <>
      {isLoading ? (
        <Typography>로딩중</Typography>
      ) : (
        <>
          <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
            <Flexbox alignItems="end" style={{ columnGap: '0.25rem' }}>
              <Typography color="secondary" size={1.25} weight="700">
                {user?.data.nickname}
              </Typography>
              <Typography color="light" weight="700" size={0.875}>
                님 오늘도 와주셨군요!
              </Typography>
            </Flexbox>
            <Typography color="disabled" size={0.875} weight="500">
              {user?.data.email}
            </Typography>
          </Flexbox>
          <Typography
            color="disabled"
            size={0.875}
            onClick={nicknameChangeModalHandler}
          >
            <a>닉네임 수정</a>
          </Typography>
        </>
      )}
    </>
  );
};
