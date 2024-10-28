export const testcaseDummyList: Record<
  number,
  {
    headers: string[];
    rows: { key: string; value: string; description: string }[];
  }
> = {
  0: {
    headers: ['Key', 'Value', 'Description'],
    rows: [
      { key: 'query', value: '영화', description: '검색할 쿼리값' },
      { key: 'category', value: '액션', description: '카테고리 필터' },
    ],
  },
  1: {
    headers: ['Key', 'Value', 'Description'],
    rows: [
      { key: 'id', value: '123', description: '리소스 ID' },
      { key: 'lang', value: 'kr', description: '언어 설정' },
    ],
  },
  2: {
    headers: ['Key', 'Value', 'Description'],
    rows: [
      {
        key: 'Authorization',
        value: 'Bearer token',
        description: '인증 토큰',
      },
      {
        key: 'Content-Type',
        value: 'application/json',
        description: '콘텐츠 유형',
      },
    ],
  },
  3: {
    headers: ['Key', 'Value', 'Description'],
    rows: [
      { key: 'username', value: 'testuser', description: '사용자 이름' },
      {
        key: 'password',
        value: 'password123',
        description: '사용자 비밀번호',
      },
    ],
  },
};
