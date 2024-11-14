// frontend/src/pages/APIDocs/types/data/TestCase.data.ts
import { HttpStatusCode } from '../httpStatus';
import { APIRequestDocsInfo, TestResult } from './API.data';

type TestCaseType = 'MULTIPART' | 'JSON' | 'NONE';

// 기본 타입 정의
type Key = string;
type Value = string | number | boolean | null;
type Description = string | null;
type IsRequired = boolean | null;
type Type = 'Text' | 'File' | null;
type JsonData = object;

export type TableValueFormat = [Value, Description, Type, IsRequired];
export type TableData = Record<Key, TableValueFormat>;

// Expected Response 타입 정의
export interface ExpectedResponse {
  schema: string | null;
  example: JsonData | null;
}

// Request Body 구성 정의
export interface FormData {
  datas: TableData | null;
  files: Record<string, TableData> | null; // UUID: 단일 파일을 가진 TableValueFormat 형태
}

export interface RawData {
  datas: JsonData | null;
  files: null;
}

// Body 타입 정의 (formData와 raw가 상호 배타적으로 존재)
export interface Body {
  formData: FormData | null;
  raw: RawData | null;
}

export interface TestCaseContent {
  params: TableData | null;
  headers: TableData | null;
  pathvariable: TableData | null;
  body: Body;
  expectedResponse: ExpectedResponse;
}

export interface TestCaseDetailInfo {
  id: number;
  apiId: APIRequestDocsInfo['id'];
  title: string;
  httpStatusCode: HttpStatusCode;
  type: TestCaseType;
  apiTestCaseRequestId: number;
  requestType: string;
  content: TestCaseContent;
  createdAt?: string;
  modifiedAt?: string;
  isSecure?: boolean;
  isDeleted?: boolean;
  testStatus?: TestResult;
}

export interface TestCaseHeaderInfo {
  id: TestCaseDetailInfo['id'];
  apiId: TestCaseDetailInfo['apiId'];
  title: TestCaseDetailInfo['title'];
  httpStatusCode: TestCaseDetailInfo['httpStatusCode'];
  testStatus: TestCaseDetailInfo['testStatus'];
  createdAt: TestCaseDetailInfo['createdAt'];
  modifiedAt: TestCaseDetailInfo['modifiedAt'];
}
