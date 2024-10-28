import Flexbox from '../../components/Flexbox';
import { Logo } from './Logo';
import Textfield from '../../components/Textfield';
import { useRef } from 'react';
import Button from '../../components/Button';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const loginHandler = () => {
    console.log(emailRef.current?.value);
    console.log(pwdRef.current?.value);
  };

  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      alignItems="center"
      style={{
        width: '100%',
        height: '100vh',
        rowGap: '2rem',
      }}
    >
      <Logo />
      <Flexbox
        flexDirections="col"
        style={{ minWidth: '20rem', rowGap: '1rem' }}
      >
        <Textfield
          ref={emailRef}
          fullWidth
          size={2.5}
          placeholder="아이디를 입력해주세요"
        />
        <Textfield
          ref={pwdRef}
          fullWidth
          size={2.5}
          placeholder="비밀번호를 입력해주세요"
        />
      </Flexbox>
      <div style={{ width: '20rem' }}>
        <Button fullWidth paddingY={0.5} onClick={() => loginHandler()}>
          로그인
        </Button>
      </div>
    </Flexbox>
  );
};
