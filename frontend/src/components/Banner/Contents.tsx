import { useQueries } from '@tanstack/react-query';
import { useNavBarStore } from '../../stores/navbarStore';
import Flexbox from '../Flexbox';
import Typography from '../Typography';
import { getUserInfo } from '../../pages/Main/apis';
import { useEffect } from 'react';

export const Contents = () => {
  const navbarStore = useNavBarStore();
  const [userInfo, projectInfo] = useQueries({
    queries: [
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getUserInfo(),
        enabled: false,
      },
      {
        queryKey: ['projectinfo'],
        queryFn: () => console.log('project info'),
        enabled: false,
      },
    ],
  });

  useEffect(() => {
    if (navbarStore.menu === 2) {
      userInfo.refetch();
    } else {
      projectInfo.refetch();
    }
  }, [navbarStore.menu]);

  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      style={{
        width: '100%',
        rowGap: '3rem',
      }}
    >
      {navbarStore.menu != 2 ? (
        <>project info</>
      ) : (
        <>
          <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
            <Flexbox alignItems="end" style={{ columnGap: '0.25rem' }}>
              <Typography color="secondary" size={1.25} weight="700">
                {userInfo.data?.data.nickname}
              </Typography>
              <Typography color="light" weight="700" size={0.875}>
                님 오늘도 와주셨군요!
              </Typography>
            </Flexbox>
            <Typography color="disabled" size={0.875} weight="500">
              {userInfo.data?.data.email}
            </Typography>
          </Flexbox>

          <Typography color="disabled" size={0.875}>
            <a>닉네임 수정</a>
          </Typography>
        </>
      )}
    </Flexbox>
  );
};
