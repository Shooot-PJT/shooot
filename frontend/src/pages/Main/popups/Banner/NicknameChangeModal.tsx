import { useRef, useState } from 'react';
import { CommonError } from '../../../../types/ErrorType';
import { validateNickname } from '../../../Signup/utils/validator';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import Textfield from '../../../../components/Textfield';
import Button from '../../../../components/Button';
import { useApiHandler, useReadUserInfo } from '../../hooks';
import useModal from '../../../../hooks/useModal';

export const NicknameChangePopup = () => {
  /* 필요 정보 */
  const { user, isLoading } = useReadUserInfo();
  const { changeNickname } = useApiHandler();
  const modal = useModal();

  /* 자원 관리 */
  const nickRef = useRef<HTMLInputElement>(null);
  const [err, setError] = useState<CommonError>({ isError: false, errMsg: '' });

  /* 핸들러 */
  const handler = async (nickname: string) => {
    if (nickname.trim().length) {
      if (nickname === user?.data.nickname) {
        setError(() => ({
          isError: true,
          errMsg: '기존과 동일한 닉네임입니다',
        }));
      } else {
        const res = validateNickname(nickname);
        setError(() => res);

        if (!res.isError) {
          try {
            await changeNickname(nickname);
          } catch (error) {
            console.log(error);
            setError({
              isError: true,
              errMsg: '사용할 수 없는 닉네임입니다',
            });
          }
        }
      }
    } else {
      setError(() => ({
        isError: true,
        errMsg: '닉네임을 입력해주세요',
      }));
    }
  };

  return (
    <>
      {isLoading ? (
        <Typography>로딩중</Typography>
      ) : (
        <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
          <Typography size={1.25} weight="700">
            닉네임 수정
          </Typography>
          <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
            <Typography color="disabled" size={0.875} weight="500">
              기존 닉네임
            </Typography>
            <Typography weight="600">{user!.data.nickname}</Typography>
          </Flexbox>
          <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
            <Typography color="disabled" size={0.875} weight="500">
              새로운 닉네임
            </Typography>
            <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
              <Textfield
                ref={nickRef}
                ratio={5.5}
                size={2.5}
                fullWidth
                placeholder="대소문자, 한글, 숫자를 혼합한 1~16자"
              />
              {err.isError && (
                <Typography color="delete" size={0.8125} weight="500">
                  {err.errMsg}
                </Typography>
              )}
            </Flexbox>
          </Flexbox>
          <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
            <Button color="grey" onClick={() => modal.pop()}>
              취소
            </Button>
            <Button
              color="primary"
              onClick={() => handler(nickRef.current!.value.trim())}
            >
              변경
            </Button>
          </Flexbox>
        </Flexbox>
      )}
    </>
  );
};
