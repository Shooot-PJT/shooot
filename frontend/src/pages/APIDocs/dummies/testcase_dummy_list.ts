export interface TestCaseHeaderInfo {
  id: number;
  statusCode: string;
  description: string;
}

export const testCaseSummaryList: TestCaseHeaderInfo[] = [
  {
    id: 1,
    statusCode: '200',
    description: '정상 응답 케이스 1입니다. 슈웃 해주세요.',
  },
  {
    id: 2,
    statusCode: '200',
    description: '정상 응답 케이스 2입니다. 슈웃 해주세요.',
  },
  {
    id: 3,
    statusCode: '401',
    description: '비인가 처리 확인용 테스트입니다.',
  },
  {
    id: 4,
    statusCode: '500',
    description: '서버 에러가 의도된 케이스입니다. 슈웃해주세요.',
  },
];

export const testCaseDetailList = [{}, {}];

// export const

export const testcaseExpectedResponseDummy = {
  schema: '',
};

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
