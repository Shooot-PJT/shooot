export const hasMinStringLength = (text: string) => {
  if (!text) {
    return '아무것도 입력하지 않았어요';
  }
  if (text.length < 3) {
    return '최소 세글자 이상 입력해주세요';
  }
  return true;
};

export const validateStringInput = (text: string) => {
  const validationMessage = hasMinStringLength(text);
  if (validationMessage !== true) {
    return validationMessage;
  }
  return true;
};
