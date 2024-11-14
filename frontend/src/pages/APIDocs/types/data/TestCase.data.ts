// frontend/src/pages/APIDocs/types/data/TestCase.data.ts

import { HttpStatusCode } from '../httpStatus';
import { APIRequestDocsInfo, TestResult } from './API.data';

export type TestCaseRequestType = 'MULTIPART' | 'JSON' | 'NONE';

// 기본 타입 정의
export type Key = string;
export type Value = string | number | boolean | null;
export type Description = string | null;
export type IsRequired = boolean | null;
export type Type = 'Text' | 'File' | string | null;
export type JsonData = object;

export type TableValueFormat = [Value, Description, Type, IsRequired];
export type TableData = Record<Key, TableValueFormat>;

// Expected Response 타입 정의
export interface ExpectedResponse {
  schema: string | null;
  example: JsonData | null;
}

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

export interface TestCaseContent {
  params: TableData | null;
  headers: TableData | null;
  pathvariable: TableData | null;
  body: Body;
  expectedResponse: ExpectedResponse;
}

export interface TestCaseDetailInfo {
  id: number; // 응답에서만 받음
  apiId: number; // 응답에서만 받음
  title: string;
  httpStatusCode: number;
  type: TestCaseRequestType;
  content: TestCaseContent;
  testStatus: 'YET' | 'SUCCESS' | 'FAILURE'; // 응답에서 받는 테스트 상태
  //
  createdAt?: string;
  modifiedAt?: string;
  isSecure?: boolean;
  isDeleted?: boolean;
}
