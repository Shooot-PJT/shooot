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

// TESTCASE 타입 정의
type Key = string;
export type Value = string | null;
export type Description = string | null;
export type IsRequired = boolean | null;
export type Type = 'Text' | 'File' | null;
export type FileName = string;
export type FileMeta = { key: Key; description: Description };
export type UUID = string;

export type TableValueFormat = [Value, Description, Type, IsRequired];

export type TableValueFormatParams = [Value, Description, null, null];
export type TableValueFormatPathVariable = [Value, Description, null, null];
export type TableValueFormatHeader = [Value, Description, null, null];
export type TableValueFormatBody_FormData_datas = [
  Value,
  Description,
  Type,
  null,
];
export type TableValueFormatBody_FormData_files = [Value, FileMeta, Type, null];

export type TableData_Params = Record<Key, TableValueFormatParams>;
export type TableData_PathVariable = Record<Key, TableValueFormatPathVariable>;
export type TableData_Header = Record<Key, TableValueFormatHeader>;
export type TableData_Body_FormData_datas = Record<
  Key,
  TableValueFormatBody_FormData_datas
>;

export type TableData_Body_FormData_files = Record<
  FileName,
  TableValueFormatBody_FormData_files
>;

export type TableData_Body_FormData_UUID = Record<
  UUID,
  Record<FileName, TableValueFormatBody_FormData_files>
>;

export type JsonData_Raw = object;
export type JsonData_Response = object;

export interface TestCase {
  title: string;
  httpStatusCode: number;
  type: 'MULTIPART' | 'JSON';
  content: {
    params: TableData_Params | null;
    pathvariable: TableData_PathVariable | null;
    headers: TableData_Header | null;
    body: {
      formData: {
        datas: TableData_Body_FormData_datas | null;
        files: TableData_Body_FormData_UUID | null;
      };
      raw: object | null;
    };
    expectedResponse: null | {
      schema: string | null;
      example: JsonData_Response | null;
    };
  };
}
//

const dummmyTestcase: TestCase = {
  title: '회원가입 응답',
  httpStatusCode: 200,
  type: 'MULTIPART',
  content: {
    params: {
      locale: ['ko_KR', '사용자 언어 설정', null, null],
    },
    pathvariable: null,
    headers: {
      ContentType: ['multipart/form-data', null, null, null],
    },
    body: {
      formData: {
        datas: {
          username: ['홍길동', '사용자 이름', 'Text', null],
          email: ['gildong@example.com', '사용자 이메일', 'Text', null],
          password: ['securepassword123', '비밀번호', 'Text', null],
          phoneNumber: ['010-1234-5678', '휴대전화 번호', 'Text', null],
        },
        files: {
          UUID1: {
            FILENAME: [
              's3주소.com',
              { key: 'profile_image', description: '프로필 이미지' },
              'File',
              null,
            ],
          },
        },
      },
      raw: null,
    },
    expectedResponse: {
      schema:
        "[{\n  'userId': number,\n  'userName': string,\n  'email': string\n }...]\n",
      example: [
        {
          userId: 123,
          userName: '홍길동',
          email: 'gildong@example.com',
        },
      ],
    },
  },
};

// export const dummyTestcaseList: TestCase[] = [
//   {
//     title: '회원가입 응답',
//     httpStatusCode: 200,
//     type: 'MULTIPART',
//     content: {
//       params: {
//         locale: ['ko_KR', '사용자 언어 설정', null, null],
//       },
//       headers: {
//         ContentType: ['multipart/form-data', null, null, null],
//       },
//       pathvariable: null,
//       body: {
//         formData: {
//           datas: {
//             username: ['홍길동', '사용자 이름', 'Text', null],
//             email: ['gildong@example.com', '사용자 이메일', 'Text', null],
//             password: ['securepassword123', '비밀번호', 'Text', null],
//             phoneNumber: ['010-1234-5678', '휴대전화 번호', 'Text', null],
//           },
//           files: {
//             UUID1: {
//               '프로필 이미지': [
//                 's3주소.com',
//                 { key: 'profile_image', description: '프로필 이미지' },
//                 'File',
//                 true,
//               ],
//             },
//           },
//         },
//         raw: null,
//       },
//       expectedResponse: {
//         schema:
//           "[{\n  'userId': number,\n  'userName': string,\n  'email': string\n }...]\n",
//         example: [
//           {
//             userId: 123,
//             userName: '홍길동',
//             email: 'gildong@example.com',
//           },
//         ],
//       },
//     },
//   },

//   // 테스트 케이스 등록 요청 2. 로그인 요청 케이스
//   {
//     title: '로그인 요청',
//     httpStatusCode: 200,
//     type: 'JSON',
//     content: {
//       params: null,
//       headers: {
//         ContentType: ['application/json', null, null, null],
//       },
//       pathvariable: null,
//       body: {
//         formData: null,
//         raw: {
//           datas: {
//             username: 'gildong',
//             password: 'securepassword123',
//           },
//           files: null,
//         },
//       },
//       expectedResponse: {
//         schema: "{ 'token': string, 'userId': number }",
//         example: {
//           token: 'abcdef123456',
//           userId: 123,
//         },
//       },
//     },
//   },

//   // 테스트 케이스 등록 응답 2. 로그인 요청 케이스
//   {
//     title: '로그인 응답',
//     httpStatusCode: 200,
//     type: 'JSON',
//     apiTestCaseRequestId: 1002,
//     content: {
//       params: null,
//       headers: {
//         ContentType: ['application/json', null, null, null],
//       },
//       pathvariable: null,
//       body: {
//         formData: null,
//         raw: {
//           datas: {
//             username: 'gildong',
//             password: 'securepassword123',
//           },
//           files: null,
//         },
//       },
//       expectedResponse: {
//         schema: "{ 'token': string, 'userId': number }",
//         example: {
//           token: 'abcdef123456',
//           userId: 123,
//         },
//       },
//     },
//   },

//   // 테스트 케이스 등록 요청 3. 상품 상세 조회 요청
//   {
//     title: '상품 상세 조회 요청',
//     httpStatusCode: 200,
//     type: 'JSON', //NONE인데 일단 JSON으로 표시(서버 수정되면 바꾸기)
//     content: {
//       params: {
//         lang: ['ko', '언어 설정', 'Text', true],
//       },
//       headers: {
//         Authorization: ['Bearer xyz789token', null, null, null],
//       },
//       pathvariable: {
//         productId: ['prod12345', '상품 ID', 'Text', true],
//       },
//       body: {
//         formData: null,
//         raw: null,
//       },
//       expectedResponse: {
//         schema: "[{\n 'productId': string,\n 'productName': string\n }...]\n",
//         example: [
//           {
//             productId: 'prod12345',
//             productName: '새로운 상품',
//           },
//         ],
//       },
//     },
//   },

//   // 테스트 케이스 등록 응답 3. 상품 상세 조회 응답
//   {
//     title: '상품 상세 조회 응답',
//     httpStatusCode: 200,
//     type: 'JSON',
//     requestType: 'get',
//     content: {
//       params: {
//         lang: ['ko', '언어 설정', 'Text', true],
//       },
//       headers: {
//         Authorization: ['Bearer xyz789token', null, null, null],
//       },
//       pathvariable: {
//         productId: ['prod12345', '상품 ID', 'Text', true],
//       },
//       body: {
//         formData: null,
//         raw: null,
//       },
//       expectedResponse: {
//         schema: "[{\n 'productId': string,\n 'productName': string\n }...]\n",
//         example: [
//           {
//             productId: 'prod12345',
//             productName: '새로운 상품',
//           },
//         ],
//       },
//     },
//   },
// ];

// // export const testcaseDummyList: Record<
// //   number,
// //   {
// //     headers: string[];
// //     rows: { key: string; value: string; description: string }[];
// //   }
// // > = {
// //   0: {
// //     headers: ['Key', 'Value', 'Description'],
// //     rows: [
// //       { key: 'query', value: '영화', description: '검색할 쿼리값' },
// //       { key: 'category', value: '액션', description: '카테고리 필터' },
// //     ],
// //   },
// //   1: {
// //     headers: ['Key', 'Value', 'Description'],
// //     rows: [
// //       { key: 'id', value: '123', description: '리소스 ID' },
// //       { key: 'lang', value: 'kr', description: '언어 설정' },
// //     ],
// //   },
// //   2: {
// //     headers: ['Key', 'Value', 'Description'],
// //     rows: [
// //       {
// //         key: 'Authorization',
// //         value: 'Bearer token',
// //         description: '인증 토큰',
// //       },
// //       {
// //         key: 'Content-Type',
// //         value: 'application/json',
// //         description: '콘텐츠 유형',
// //       },
// //     ],
// //   },
// //   3: {
// //     headers: ['Key', 'Value', 'Description'],
// //     rows: [
// //       { key: 'username', value: 'testuser', description: '사용자 이름' },
// //       {
// //         key: 'password',
// //         value: 'password123',
// //         description: '사용자 비밀번호',
// //       },
// //     ],
// //   },
// // };
