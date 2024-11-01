import { useRef, useState } from 'react';
import Flexbox from '../../components/Flexbox';
import Textfield from '../../components/Textfield';
import Typography from '../../components/Typography';
import { CommonError } from '../../types/ErrorType';
import Button from '../../components/Button';
import { validateNickname } from '../../pages/Signup/utils/validator';

interface NicknameChangePopupProps {
  nickname: string;
  popHandler: () => void;
  changeHandler: (nickname: string) => void;
}

export const NicknameChangePopup = ({
  nickname,
  popHandler,
  changeHandler,
}: NicknameChangePopupProps) => {
  const nickRef = useRef<HTMLInputElement>(null);
  const [err, setError] = useState<CommonError>({ isError: false, errMsg: '' });

  const handler = (nickname: string) => {
    if (nickname.trim().length) {
      const res = validateNickname(nickname);
      setError(() => res);

      if (!res.isError) {
        changeHandler(nickname);
      } else {
        setError(() => ({
          isError: true,
          errMsg: '사용할 수 없는 닉네임입니다',
        }));
      }
    } else {
      setError(() => ({
        isError: true,
        errMsg: '닉네임을 입력해주세요',
      }));
    }
  };

  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      <Typography size={1.25} weight="700">
        닉네임 수정
      </Typography>
      <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
        <Typography color="disabled" size={0.875} weight="500">
          기존 닉네임
        </Typography>
        <Typography weight="600">{nickname}</Typography>
      </Flexbox>
      <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
        <Typography color="disabled" size={0.875} weight="500">
          기존 닉네임
        </Typography>
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Textfield ref={nickRef} ratio={5.5} size={2.5} fullWidth />
          {err.isError && (
            <Typography color="delete" size={0.8125} weight="500">
              {err.errMsg}
            </Typography>
          )}
        </Flexbox>
      </Flexbox>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
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
  );
};
