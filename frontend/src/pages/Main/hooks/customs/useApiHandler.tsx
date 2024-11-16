import { useQueryClient } from '@tanstack/react-query';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import usePopup from '../../../../hooks/usePopup';
import { findMemberByEmail, updateUserNickname } from '../../apis/userApis';
import { QUERY_KEYS } from '../../utils/KEYS';
import { createInvitingMail } from '../../apis/projectApis';
import { UserInfo } from '../../types';

export const useApiHandler = () => {
  const popup = usePopup();
  const modal = useModal();
  const queryClient = useQueryClient();

  const changeNickname = async (nickname: string) => {
    await updateUserNickname(nickname)
      .then(() => {
        popup.push({
          title: '닉네임 변경',
          children: <Typography>닉네임을 변경하였습니다.</Typography>,
          onClose: () => {
            modal.pop();
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.readUserInfo],
            });
          },
        });
      })
      .catch(() => {
        popup.push({
          title: '닉네임 변경 실패',
          children: <Typography>다시 시도해주세요.</Typography>,
          type: 'fail',
        });
      });
  };

  const searchMember = async (email: string) => {
    try {
      const result = await findMemberByEmail(email);
      return result.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const sendInvitingMail = async (projectId: number, targets: UserInfo[]) => {
    if (targets.length) {
      targets.forEach(async (t: UserInfo, idx: number) => {
        await createInvitingMail(projectId, t.userId)
          .then(() => {
            if (idx + 1 === targets.length) {
              popup.push({
                title: '메일 전송',
                children: <Typography>초대 메일을 전송하였습니다.</Typography>,
                onClose: () => modal.pop(),
              });
            }
          })
          .catch(() => {
            popup.push({
              title: '메일 전송 실패',
              children: <Typography>메일 전송에 실패하였습니다.</Typography>,
              type: 'fail',
            });
          });
      });
    } else {
      popup.push({
        title: '메일 전송 실패',
        children: <Typography>초대할 사람이 없습니다.</Typography>,
        type: 'fail',
      });
    }
  };

  return { changeNickname, searchMember, sendInvitingMail };
};
