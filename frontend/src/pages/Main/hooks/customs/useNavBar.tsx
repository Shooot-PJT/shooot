import { useQueryClient } from '@tanstack/react-query';
import { useNavBarStore } from '../../../../stores/navbarStore';
import useModal from '../../../../hooks/useModal';
import { NicknameChangePopup } from '../../popups/Banner/NicknameChangeModal';
import { ProjectWriteModal } from '../../popups/Banner/ProjectWriteModal/ProjectWriteModal';
import { InviteMembersModal } from '../../popups/Banner/InviteMembersModal/InviteMembersModal';
import { KickMemberModal } from '../../popups/Banner/KickMemberModal/KickMemberModal';
import { ProjectRemoveModal } from '../../popups/Banner/ProjectRemoveModal';
import { QUERY_KEYS } from '../../utils/KEYS';
import { useEffect } from 'react';

export const useNavBar = () => {
  const navbarStore = useNavBarStore();
  const modal = useModal();
  const queryClient = useQueryClient();

  // 닉네임 수정
  const nicknameChangeModalHandler = () => {
    modal.push({
      children: <NicknameChangePopup />,
    });
  };

  // 프로젝트 생성
  const addProjectModalHandler = () => {
    modal.push({
      children: <ProjectWriteModal />,
    });
  };

  // 프로젝트 수정
  const editProjectModalHandler = () => {
    modal.push({
      children: <ProjectWriteModal type="edit" />,
    });
  };

  // 팀원 초대
  const inviteMembersModalHandler = () => {
    modal.push({
      children: <InviteMembersModal />,
    });
  };

  // 팀원 추방
  const kickMemberModalHandler = () => {
    modal.push({
      children: <KickMemberModal />,
      onClose: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.readProjectList],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.readProjectByProjectId, navbarStore.project],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.readMembersByProjectId, navbarStore.project],
        });
      },
    });
  };

  // 프로젝트 삭제
  const removeProjectModalHandler = () => {
    modal.push({
      children: <ProjectRemoveModal />,
    });
  };

  useEffect(() => {
    if (navbarStore.menu !== 2) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.readProjectByProjectId, navbarStore.project],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.readMembersByProjectId, navbarStore.project],
      });
    }
  }, [navbarStore.menu, navbarStore.project]);

  return {
    menu: navbarStore.menu,
    nicknameChangeModalHandler,
    addProjectModalHandler,
    editProjectModalHandler,
    inviteMembersModalHandler,
    kickMemberModalHandler,
    removeProjectModalHandler,
  };
};
