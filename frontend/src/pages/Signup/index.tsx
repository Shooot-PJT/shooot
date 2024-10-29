import Button from '../../components/Button';
import Flexbox from '../../components/Flexbox';
import Typography from '../../components/Typography';
import { useRef } from 'react';
import { useSignup } from './hooks/useSignup';
import { InputWithButton } from './components/InputWithButton';
import { InputWithoutButton } from './components/InputWithoutButton';

export const Signup = () => {
  const { stepStore, errStore, emailHook, codeHook, pwdAndNickHook } =
    useSignup();
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const nickRef = useRef<HTMLInputElement>(null);

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
      {/* 타이틀 */}
      <Typography size={3}>회원가입</Typography>

      {/* 폼 */}
      <Flexbox flexDirections="col" style={{ rowGap: '1rem' }}>
        {/* 이메일 */}
        <InputWithButton
          ref={emailRef}
          err={errStore.email}
          handler={async () =>
            await emailHook.emailHandler(emailRef.current!.value)
          }
          placeholder="이메일을 입력해주세요"
          button="코드 전송"
        />

        {/* 인증코드 */}
        {stepStore.step >= 1 && (
          <InputWithButton
            ref={codeRef}
            err={errStore.code}
            handler={async () =>
              await codeHook.codeHandler(
                emailRef.current!.value,
                codeRef.current!.value,
              )
            }
            placeholder="인증코드를 입력해주세요"
            button="인증"
          />
        )}

        {/* 비밀번호 */}
        {stepStore.step >= 2 && (
          <InputWithoutButton
            ref={pwdRef}
            err={errStore.password}
            placeholder="비밀번호를 입력해주세요"
          />
        )}

        {/* 닉네임 */}
        {stepStore.step >= 2 && (
          <InputWithoutButton
            ref={nickRef}
            err={errStore.nickname}
            placeholder="닉네임을 입력해주세요"
          />
        )}
      </Flexbox>

      {/* 회원가입 버튼 */}
      {stepStore.step === 2 && (
        <div style={{ width: '26rem', rowGap: '0.5rem' }}>
          <Button
            paddingY={0.75}
            rounded={0.5}
            fullWidth
            onClick={async () =>
              await pwdAndNickHook.signupHandler(
                emailRef.current!.value,
                pwdRef.current!.value,
                nickRef.current!.value,
              )
            }
          >
            <Typography size={0.875} weight="600">
              회원가입
            </Typography>
          </Button>
        </div>
      )}
    </Flexbox>
  );
};
