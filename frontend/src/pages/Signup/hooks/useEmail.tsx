import { HookProps } from '../types';
import { validateEmail } from '../utils/validator';
import { checkEmailDuplicate, sendCode } from '../apis';

export const useEmail = ({ push, error, nextStep }: HookProps) => {
  /* 이메일 전송 */
  const sendCodeApi = async (email: string) => {
    await sendCode(email)
      .then(() => {
        push('이메일 전송 완료', '이메일이 전송되었습니다.', 'success', () =>
          nextStep(),
        );
      })
      .catch(() => error('email', true, '사용할 수 없는 이메일입니다'));
  };

  /* 이메일 중복 검증 */
  const checkEmailDuplicateApi = async (email: string) => {
    await checkEmailDuplicate(email)
      .then(async (res) => {
        if (res.data.isValid) {
          error('email', false, ''); // 확인 성공
          await sendCodeApi(email);
        } else {
          error('email', true, '사용할 수 없는 이메일입니다'); // 이메일 중복
        }
      })
      .catch((err) => {
        console.log(err);
        push(
          '서버 오류',
          <>
            서버 상 오류가 발생했습니다.
            <br />
            다시 시도해주세요.
          </>,
          'fail',
        );
      });
  };

  /* handler */
  const emailHandler = async (email: string) => {
    const res = validateEmail(email); // 이메일 validator
    error('email', res.isError, res.errMsg);

    if (!res.isError) {
      await checkEmailDuplicateApi(email);
    }
  };

  return { emailHandler };
};
