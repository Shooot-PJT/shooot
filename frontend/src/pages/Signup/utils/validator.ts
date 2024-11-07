const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nicknameRegex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\s]{2,16}$/;

export const validateEmail = (email: string) => {
  if (!email) {
    return { isError: true, errMsg: '이메일을 입력해주세요' };
  } else if (!emailRegex.test(email)) {
    return { isError: true, errMsg: '올바른 이메일 형식이 아닙니다' };
  } else {
    return { isError: false, errMsg: '' };
  }
};

export const validateCode = (code: string) => {
  if (!code) {
    return { isError: true, errMsg: '인증코드를 입력해주세요' };
  } else {
    return { isError: false, errMsg: '' };
  }
};

export const validatePassword = (password: string) => {
  if (!password) {
    return { isError: true, errMsg: '비밀번호를 입력해주세요' };
  } else {
    return { isError: false, errMsg: '' };
  }
};

export const validateNickname = (nickname: string) => {
  if (!nickname) {
    return { isError: true, errMsg: '닉네임을 입력해주세요' };
  } else if (!nicknameRegex.test(nickname)) {
    return { isError: true, errMsg: '올바른 닉네임 형식이 아닙니다' };
  } else {
    return { isError: false, errMsg: '' };
  }
};
