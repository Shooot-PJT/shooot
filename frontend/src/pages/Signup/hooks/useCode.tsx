import { HookProps } from '../types';
import { validateCode } from '../utils/validator';
import { verifyEmailAndCode } from '../apis';

export const useCode = ({ push, error, nextStep }: HookProps) => {
  /* 코드 검증 */
  const verifyEmailAndCodeApi = async (email: string, code: string) => {
    await verifyEmailAndCode(email, code)
      .then((res) => {
        if (res.data.isValid) {
          push('인증코드 확인', '인증코드가 확인되었습니다.', 'success', () =>
            nextStep(),
          );
        } else {
          error('code', true, '잘못된 인증코드입니다');
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          push(
            '변경된 이메일',
            '이메일 인증 요청을 먼저 해주시기 바랍니다.',
            'fail',
          );
        } else {
          push(
            '서버 오류',
            <>
              서버 상 오류가 발생했습니다.
              <br />
              다시 시도해주세요.
            </>,
            'fail',
          );
        }
      });
  };

  /* handler */
  const codeHandler = async (email: string, code: string) => {
    const res = validateCode(code); // 인증코드 validator
    error('code', res.isError, res.errMsg);

    if (!res.isError) {
      await verifyEmailAndCodeApi(email, code);
    }
  };

  return { codeHandler };
};
