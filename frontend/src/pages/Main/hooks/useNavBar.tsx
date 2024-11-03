import { useMutation, useQueries } from '@tanstack/react-query';
import { useNavBarStore } from '../../../stores/navbarStore';
import usePopup from '../../../hooks/usePopup';
import { addProject, changeNickname, editProject, getUserInfo } from '../apis';
import { getProjectInfo, getProjectMembers } from '../../MyProject/apis';
import { useEffect } from 'react';
import useModal from '../../../hooks/useModal';
import Typography from '../../../components/Typography';
import { AddProjectRequest, EditProjectRequest } from '../types';
import { NicknameChangePopup } from '../popups/Banner/NicknameChangeModal';
import { ProjectWriteModal } from '../popups/Banner/ProjectWriteModal/ProjectWriteModal';
import { InviteMembersModal } from '../popups/Banner/InviteMembersModal/InviteMembersModal';

export const useNavBar = () => {
  const navbarStore = useNavBarStore();
  const modal = useModal();
  const popup = usePopup();
  const [userInfo, projectInfo, memberInfo] = useQueries({
    queries: [
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getUserInfo(),
        staleTime: 5 * 60 * 1000,
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

  // 프로젝트 생성
  const addProjectMutation = useMutation({
    mutationKey: ['add-project'],
    mutationFn: async (info: AddProjectRequest) => await addProject(info),
    onSuccess: () => {
      popup.push({
        title: '프로젝트 생성',
        children: <Typography>프로젝트를 생성하였습니다.</Typography>,
        onClose: () => {
          modal.pop();
          navbarStore.setProject(addProjectMutation.data!.data.projectId);
          navbarStore.setMenu(0);
        },
      });
    },
    onError: () => {
      popup.push({
        title: '프로젝트 생성 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
        type: 'fail',
      });
    },
  });
  const addProjectModalHandler = () => {
    modal.push({
      children: (
        <ProjectWriteModal
          popHandler={modalPopHandler}
          addHandler={addProjectMutation.mutate}
        />
      ),
    });
  };

  // 프로젝트 수정
  const editProjectMutation = useMutation({
    mutationKey: ['edit-project'],
    mutationFn: async (params: EditProjectRequest) =>
      await editProject(
        params.projectId,
        params.name,
        params.memo,
        params.logo,
      ),
    onSuccess: () => {
      popup.push({
        title: '프로젝트 수정',
        children: <Typography>프로젝트가 수정되었습니다.</Typography>,
        onClose: () => {
          modal.pop();
          navbarStore.setProject(editProjectMutation.data!.data.projectId);
          navbarStore.setMenu(0);
        },
      });
    },
    onError: () => {
      popup.push({
        title: '프로젝트 수정 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
        type: 'fail',
      });
    },
  });
  const editProjectModalHandler = () => {
    modal.push({
      children: (
        <ProjectWriteModal
          type="edit"
          projectInfo={projectInfo.data?.data}
          popHandler={modalPopHandler}
          editHandler={editProjectMutation.mutate}
        />
      ),
    });
  };

  // 팀원 초대
  const inviteMembersModalHandler = () => {
    modal.push({
      children: (
        <InviteMembersModal
          projectId={projectInfo.data!.data.projectId}
          popHandler={modalPopHandler}
        />
      ),
    });
  };

  useEffect(() => {
    if (navbarStore.menu !== 2) {
      projectInfo.refetch();
      memberInfo.refetch();
    }
  }, [navbarStore.menu, navbarStore.project]);

  return {
    menu: navbarStore.menu,
    userInfo: userInfo.data?.data,
    projectInfo: projectInfo.data?.data,
    memberInfo: memberInfo.data?.data,
    nicknameChangeModalHandler,
    addProjectModalHandler,
    editProjectModalHandler,
    inviteMembersModalHandler,
  };
};
