import { useMutation } from '@tanstack/react-query';
import { LoginInfo } from '../../components/CommonLogin/CommonLoginModal';
import { commonLogin } from '../../apis/commonLogin';
import usePopup from '../../../../hooks/usePopup';
import { useCommonLoginStore } from '../../stores/commonLoginStore';
import useModal from '../../../../hooks/useModal';
import Typography from '../../../../components/Typography';
import { HTTP_STATUS_CODES } from '../../types/httpStatus';

export const useCommonLoginMutation = () => {
  const popup = usePopup();
  const modal = useModal();
  const commonLoginStore = useCommonLoginStore();

  const { mutate } = useMutation({
    mutationKey: ['commonLogin'],
    mutationFn: async (infos: LoginInfo[]) => {
      const data: Record<string, string> = {};
      infos.forEach((info) => (data[info.key] = info.value));

      const response = await commonLogin(data);
      return response.data;
    },
    onSuccess: (data) => {
      commonLoginStore.setSession(data.session);
      popup.push({
        title: `${data.responseCode} (${HTTP_STATUS_CODES[data.responseCode]})`,
        children: <Typography>{data.responseMessage}</Typography>,
        onClose: () => modal.pop(),
      });
    },
    onError: () => {
      if (commonLoginStore.session) commonLoginStore.setSession('');
    },
  });

  return { mutate };
};
