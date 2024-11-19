import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS } from '../../utils/KEYS';
import { AddProjectRequest } from '../../types';
import { createProject } from '../../apis/projectApis';
import usePopup from '../../../../hooks/usePopup';
import useModal from '../../../../hooks/useModal';
import { useNavBarStore } from '../../../../stores/navbarStore';
import Typography from '../../../../components/Typography';

export const useCreateProject = () => {
  const popup = usePopup();
  const modal = useModal();
  const navbarStore = useNavBarStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.createProject],
    mutationFn: async (info: AddProjectRequest) => await createProject(info),
    onSuccess: (data) => {
      popup.push({
        title: '프로젝트 생성',
        children: <Typography>프로젝트를 생성하였습니다.</Typography>,
        onClose: () => {
          modal.pop();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.readProjectList],
          });
          navbarStore.setProject(data.data.projectId);
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

  return { addProject: mutate };
};
