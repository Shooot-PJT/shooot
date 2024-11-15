import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginError } from '../types';
import { login } from '../apis';

export const useLogin = () => {
  const nav = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<LoginError>({
    isError: false,
    errMsg: '',
  });

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async () =>
      await login(emailRef.current!.value, pwdRef.current!.value),
    onSuccess: () => nav('/'),
    onError: () =>
      setLoginError(() => ({
        isError: true,
        errMsg: '아이디 또는 비밀번호가 잘못되었습니다.',
      })),
  });
  const loginHandler = () => {
    if (emailRef.current && pwdRef.current) {
      if (
        !emailRef.current.value.trim().length ||
        !pwdRef.current.value.trim().length
      ) {
        setLoginError(() => ({
          isError: true,
          errMsg: '아이디 또는 비밀번호를 입력해주세요',
        }));
      } else {
        mutate();
      }
    }
  };

  return { emailRef, pwdRef, loginError, loginHandler };
};
