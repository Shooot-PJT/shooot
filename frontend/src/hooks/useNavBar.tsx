import { useMutation, useQueries } from '@tanstack/react-query';
import { useNavBarStore } from '../stores/navbarStore';
import usePopup from './usePopup';
import { changeNickname, getUserInfo } from '../pages/Main/apis';
import { getProjectInfo, getProjectMembers } from '../pages/MyProject/apis';
import { useEffect } from 'react';
import useModal from './useModal';
import Typography from '../components/Typography';
import { NicknameChangePopup } from '../popups/Banner/NicknameChangeModal';

export const useNavBar = () => {
  const navbarStore = useNavBarStore();
  const modal = useModal();
  const popup = usePopup();
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

  // modal pop handler
  const modalPopHandler = () => modal.pop();

  // 닉네임 수정
  const nicknameChangeMutation = useMutation({
    mutationKey: ['nickname-change'],
    mutationFn: async (nickname: string) => await changeNickname(nickname),
    onSuccess: () => {
      popup.push({
        title: '닉네임 변경',
        children: <Typography>닉네임을 변경하였습니다.</Typography>,
        onClose: () => {
          modal.pop();
          userInfo.refetch();
        },
      });
    },
    onError: () => {
      popup.push({
        title: '닉네임 변경 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
        type: 'fail',
      });
    },
  });
  const nicknameChangeModalHandler = () => {
    modal.push({
      children: (
        <NicknameChangePopup
          nickname={userInfo.data!.data.nickname}
          popHandler={modalPopHandler}
          changeHandler={nicknameChangeMutation.mutate}
        />
      ),
    });
  };

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

  return {
    menu: navbarStore.menu,
    userInfo: userInfo.data?.data,
    projectInfo: projectInfo.data?.data,
    memberInfo: memberInfo.data?.data,
    nicknameChangeModalHandler,
  };
};
