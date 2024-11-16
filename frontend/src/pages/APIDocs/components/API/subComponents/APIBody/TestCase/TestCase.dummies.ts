// 테스트 케이스 등록 요청 1. 회원가입 요청 케이스

// ======================= 단일 TEST CASE DUMMY
export const dummmyTestcaseWithoutMeta: TestCase = {
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

export interface TestCaseHeaderInfo {
  id: number;
  statusCode: string;
  description: string;
}

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
