import { useQueries } from '@tanstack/react-query';
import { useNavBarStore } from '../../stores/navbarStore';
import Flexbox from '../Flexbox';
import Typography from '../Typography';
import { getUserInfo } from '../../pages/Main/apis';
import { useEffect } from 'react';
import { getProjectInfo, getProjectMembers } from '../../pages/MyProject/apis';
import { HiUser } from 'react-icons/hi2';
import Icon from '../Icon';
import { IconColor } from '../Icon/Icon.types';
import { CustomTooltip } from '../CustomToolTip';

const colors: IconColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'disabled',
  'get',
  'post',
  'put',
  'patch',
  'delete',
];

export const Contents = () => {
  const navbarStore = useNavBarStore();
  const [userInfo, projectInfo, memberInfo] = useQueries({
    queries: [
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getUserInfo(),
        enabled: false,
      },
      {
        queryKey: ['projectinfo', navbarStore.project],
        queryFn: async () => await getProjectInfo(navbarStore.project),
        enabled: false,
      },
      {
        queryKey: ['memberInfo', navbarStore.project],
        queryFn: async () => await getProjectMembers(navbarStore.project),
        enabled: false,
      },
    ],
  });

  useEffect(() => {
    if (navbarStore.menu === 2) {
      userInfo.refetch();
    } else {
      projectInfo.refetch();
      memberInfo.refetch();
    }
  }, [navbarStore.menu]);

  useEffect(() => {
    if (navbarStore.menu !== 2) {
      projectInfo.refetch();
      memberInfo.refetch();
    }
  }, [navbarStore.project]);

  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      style={{
        width: '100%',
        rowGap: '3rem',
      }}
    >
      {navbarStore.menu !== 2 ? (
        <>
          <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
            <Flexbox alignItems="center" style={{ columnGap: '0.25rem' }}>
              <Typography color="secondary" size={1.25} weight="700">
                {projectInfo.data?.data.name}
              </Typography>
              <Typography color="light" weight="700" size={0.875}>
                {projectInfo.data?.data.englishName}
              </Typography>
            </Flexbox>
            <Flexbox style={{ columnGap: '0.5rem' }}>
              {memberInfo.data?.data.length ? (
                <>
                  {memberInfo.data.data.map((member) => (
                    <CustomTooltip title={member.nickname}>
                      <div>
                        <Icon
                          key={member.email}
                          size={1}
                          rounded={999}
                          color={colors[Math.floor(Math.random() * 8)]}
                        >
                          <HiUser />
                        </Icon>
                      </div>
                    </CustomTooltip>
                  ))}
                </>
              ) : (
                <Typography size={0.875} weight="600">
                  팀원을 초대해보세요!
                </Typography>
              )}
            </Flexbox>
          </Flexbox>
          <Flexbox style={{ columnGap: '0.5rem' }}>
            <Typography color="disabled" size={0.875}>
              <a>팀원 초대</a>
            </Typography>
            <Typography color="disabled" size={0.875}>
              <a>팀원 추방</a>
            </Typography>
            <Typography color="disabled" size={0.875}>
              <a>정보 수정</a>
            </Typography>
          </Flexbox>
        </>
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
