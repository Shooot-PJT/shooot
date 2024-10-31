import { LoginHook } from '../types';
import Textfield from '../../../components/Textfield';
import Flexbox from '../../../components/Flexbox';

export const Form = ({ emailRef, pwdRef }: LoginHook) => {
  return (
    <Flexbox flexDirections="col" style={{ minWidth: '20rem', rowGap: '1rem' }}>
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
        type="password"
      />
    </Flexbox>
  );
};
