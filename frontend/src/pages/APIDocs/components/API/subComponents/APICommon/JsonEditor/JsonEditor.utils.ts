export const getJsonErrorMessage = (errorCode: number): string => {
  switch (errorCode) {
    case 1:
      return '잘못된 기호입니다.';
    case 2:
      return '잘못된 숫자 형식입니다.';
    case 3:
      return '속성 이름이 필요합니다.';
    case 4:
      return '값이 필요합니다.';
    case 5:
      return '콜론이 필요합니다.';
    case 6:
      return '쉼표가 필요합니다.';
    case 7:
      return '중괄호 닫기가 필요합니다.';
    case 8:
      return '대괄호 닫기가 필요합니다.';
    case 9:
      return '파일의 끝이 필요합니다.';
    case 10:
      return '잘못된 주석 토큰입니다.';
    case 11:
      return '주석이 비정상적으로 종료되었습니다.';
    case 12:
      return '문자열이 비정상적으로 종료되었습니다.';
    case 13:
      return '숫자가 비정상적으로 종료되었습니다.';
    case 14:
      return '잘못된 유니코드입니다.';
    case 15:
      return '잘못된 이스케이프 문자입니다.';
    case 16:
      return '잘못된 문자입니다.';
    default:
      return '알 수 없는 오류입니다.';
  }
};
