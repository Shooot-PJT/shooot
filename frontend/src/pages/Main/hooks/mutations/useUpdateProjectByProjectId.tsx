import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditProjectRequest } from '../../types';
import { MUTATION_KEYS, QUERY_KEYS } from '../../utils/KEYS';
import { updateProjectByProjectId } from '../../apis/projectApis';
import useModal from '../../../../hooks/useModal';
import usePopup from '../../../../hooks/usePopup';
import Typography from '../../../../components/Typography';

export const useUpdateProjectByProjectId = () => {
  const modal = useModal();
  const popup = usePopup();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.updateProjectByProjectId],
    mutationFn: async (info: EditProjectRequest) =>
      await updateProjectByProjectId(info),
    onSuccess: (data) => {
      popup.push({
        title: '프로젝트 수정',
        children: <Typography>프로젝트가 수정되었습니다.</Typography>,
        onClose: () => {
          modal.pop();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.readProjectList],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.readProjectByProjectId, data.data.projectId],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.readMembersByProjectId, data.data.projectId],
          });
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

  return { editProject: mutate };
};
