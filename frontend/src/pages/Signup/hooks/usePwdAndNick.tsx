import { signup } from '../apis';
import { HookProps } from '../types';
import { useNavigate } from 'react-router-dom';
import { validateNickname, validatePassword } from '../utils/validator';

export const usePwdAndNick = ({ push, error }: HookProps) => {
  const nav = useNavigate();
  const signupApi = async (email: string, pwd: string, nick: string) => {
    /* 회원가입 */
    await signup(email, pwd, nick)
      .then(() => {
        push(
          '회원가입 완료',
          <>
            회원가입이 완료되었습니다.
            <br />
            로그인으로 이동합니다.
          </>,
          'success',
          () => nav('/auth/login'),
        );
      })
      .catch((err) => {
        if (err.response.status === 500) {
          push(
            '서버 오류',
            <>
              서버 상 오류가 발생했습니다.
              <br />
              다시 시도해주세요.
            </>,
            'fail',
          );
        } else {
          push(
            '변경된 이메일',
            '이메일 인증 요청을 먼저 해주시기 바랍니다.',
            'fail',
          );
        }
      });
  };

  const signupHandler = async (email: string, pwd: string, nick: string) => {
    const pwdRes = validatePassword(pwd); // 비밀번호 validator
    const nickRes = validateNickname(nick); // 닉네임 validator
    error('password', pwdRes.isError, pwdRes.errMsg);
    error('nickname', nickRes.isError, nickRes.errMsg);

    if (!pwdRes.isError && !nickRes.isError) {
      await signupApi(email, pwd, nick);
    }
  };

  return { signupHandler };
};
