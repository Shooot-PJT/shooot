import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS } from '../../utils/KEYS';
import { removeProjectByProjectId } from '../../apis/projectApis';
import usePopup from '../../../../hooks/usePopup';
import useModal from '../../../../hooks/useModal';
import { useNavBarStore } from '../../../../stores/navbarStore';
import Typography from '../../../../components/Typography';

export const useRemoveProjectByProjectId = () => {
  const popup = usePopup();
  const modal = useModal();
  const queryClient = useQueryClient();
  const navbarStore = useNavBarStore();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.removeProjectByProjectId],
    mutationFn: async (projectId: number) =>
      await removeProjectByProjectId(projectId),
    onSuccess: () => {
      popup.push({
        title: '프로젝트 삭제',
        children: <Typography>프로젝트가 삭제되었습니다.</Typography>,
        onClose: () => {
          modal.pop();
          navbarStore.setMenu(2);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.readProjectList],
          });
        },
      });
    },
    onError: () => {
      popup.push({
        title: '프로젝트 삭제 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
        type: 'fail',
      });
    },
  });

  return { mutate };
};
