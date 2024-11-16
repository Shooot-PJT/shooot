// frontend/src/pages/APIDocs/components/API/subComponents/APIBody/TestCase/TestCaseTable/TestCaseTable.types.ts

// 기본 타입 정의
export type Key = string;
export type Value = string | number | boolean | null;
export type Description = string | null;
export type IsRequired = boolean | null;
export type Type = 'Text' | 'File' | string | null;
export type JsonData = object;
export type TableValueFormat = [Value, Description, Type, IsRequired];
export type TableData = Record<Key, TableValueFormat>;

// FileMeta 타입 정의
export interface FileMeta {
  parameterVar: string;
  description: string | null;
}

// Request Body 구성 정의
export interface CustomFormData {
  datas: TableData | null;
  files: Record<string, Record<string, [string, FileMeta, Type, null]>> | null; // UUID: 단일 파일을 가진 TableValueFormat 형태
}

// Body 타입 정의 (formData와 raw가 상호 배타적으로 존재)
export interface Body {
  formData: CustomFormData | null;
  raw: JsonData | null;
}

// Expected Response 타입 정의
export interface ExpectedResponse {
  schema: string | null;
  example: JsonData | null;
}

export interface TestCaseContent {
  params: TableData | null;
  headers: TableData | null;
  pathvariable: TableData | null;
  body: Body;
  expectedResponse: ExpectedResponse;
}

// 추가된 TableRow 타입 정의
export interface TableRow {
  id: string;
  key: string;
  value: string;
  description: string;
}

// 추가된 TestCaseDetailInfo 타입 정의 (필요에 따라 수정)
export interface TestCaseDetailInfo {
  id: number;
  title: string;
  type: 'MULTIPART' | 'JSON' | 'NONE';
  content: TestCaseContent;
}
