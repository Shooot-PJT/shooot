import usePopup from '../../../hooks/usePopup';
import Typography from '../../../components/Typography';
import { useCode } from './useCode';
import { useEmail } from './useEmail';
import { ReactNode } from 'react';
import { usePwdAndNick } from './usePwdAndNick';
import { ErrorType, useErrorStore, useStepStore } from '../stores/signupStore';

export const useSignup = () => {
  const popup = usePopup();
  const errStore = useErrorStore();
  const stepStore = useStepStore();

  /* 회원가입에서 사용하는 팝업 push */
  const push = (
    title: string,
    children: ReactNode,
    type: 'success' | 'fail',
    onClose?: () => void,
  ) => {
    popup.push({
      title: title,
      children: (
        <Typography weight="500" size={0.875}>
          {children}
        </Typography>
      ),
      type: type,
      onClose: onClose,
    });
  };

  /* error 지정 */
  const error = (type: ErrorType, isError: boolean, errMsg: string) => {
    errStore.setError(type, { isError: isError, errMsg: errMsg });
  };

  /* step 진행 */
  const nextStep = () => stepStore.nextStep();

  const emailHook = useEmail({ push, error, nextStep });
  const codeHook = useCode({ push, error, nextStep });
  const pwdAndNickHook = usePwdAndNick({ push, error, nextStep });

  return { stepStore, errStore, emailHook, codeHook, pwdAndNickHook };
};
