import { useNavigate } from 'react-router-dom';
import { LoginHook } from '../types';
import Typography from '../../../components/Typography';
import Flexbox from '../../../components/Flexbox';
import Button from '../../../components/Button';
import { useEffect } from 'react';

export const Result = ({ loginError, loginHandler }: LoginHook) => {
  const nav = useNavigate();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        loginHandler();
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      alignItems="center"
      style={{ minWidth: '20rem', rowGap: '1rem' }}
    >
      <Button fullWidth paddingY={0.5} rounded={0.5} onClick={loginHandler}>
        로그인
      </Button>
      {loginError.isError && (
        <Typography size={0.875} color="delete" weight="600">
          {loginError.errMsg}
        </Typography>
      )}
      <Flexbox
        justifyContents="center"
        alignItems="center"
        style={{ width: '100%', columnGap: '0.5rem' }}
      >
        <Typography size={0.8125} color="disabled" weight="500">
          아직 계정이 없으신가요?
        </Typography>
        <Typography
          size={0.875}
          color="secondary"
          weight="600"
          onClick={() => nav('/auth/signup')}
        >
          회원가입
        </Typography>
      </Flexbox>
    </Flexbox>
  );
};
