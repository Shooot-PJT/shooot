import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS } from '../../utils/KEYS';
import { removeUserInfo } from '../../apis/userApis';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../../../hooks/usePopup';
import Typography from '../../../../components/Typography';
import { useNavBarStore } from '../../../../stores/navbarStore';

export const useRemoveUserInfo = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const popup = usePopup();
  const navbarStore = useNavBarStore();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.removeUserInfo],
    mutationFn: async () => await removeUserInfo(),
    onSuccess: () => {
      queryClient.clear();
      sessionStorage.clear();
      navbarStore.clear();
      nav('/auth/login');
    },
    onError: () => {
      popup.push({
        title: '로그아웃 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
        type: 'fail',
      });
    },
  });

  return { mutate };
};
