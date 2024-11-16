// frontend/src/pages/APIDocs/types/data/API.data.ts

import { TestCaseContent } from '../../components/API/subComponents/APIBody/TestCase/TestCaseTable/TestCaseTable.types';
import { Method } from '../../types/methods';
import { DomainInfo } from './Domain.data';
import { TestCaseRequestType } from './TestCase.data';

export interface User {
  id: number;
  email: string;
  nickname: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface Participant extends User {
  isOwner: boolean;
  projectId: number;
}

export interface Manager {
  id: User['id'] | null;
  nickname: User['nickname'] | null;
}

export type NominalUrl = string | null | undefined;
export type TestResult = 'FAIL' | 'SUCCESS' | 'YET';
export const TEST_RESULTS: Record<TestResult, TestResult> = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
  YET: 'YET',
};

export type Key = string;
export type Value = string | number | boolean | null;
export type Description = string | null;
export type IsRequired = boolean | null;
export type Type = 'Text' | 'File' | string | null;
export type JsonData = object;

export type TableValueFormat = [Value, Description, Type, IsRequired];
export type TableData = Record<Key, TableValueFormat>;

export interface FileMeta {
  parameterVar: string;
  description: string | null;
}

type BodyRaw = object | null;

interface BodyFormData {
  datas: TableData | null;
  files: Record<Key, Record<string, [string, FileMeta, Type, null]>> | null;
}

type Body = BodyRaw | BodyFormData;

export interface ExpectedResponse {
  schema: string | null;
  example: JsonData | null;
}

export interface ExampleContent {
  params: TableData | null;
  pathvariable: TableData | null;
  headers?: BodyFormData | null;
  body?: Body | null;
  expectedResponse?: ExpectedResponse | null;
}

export interface RequestDocs {
  id: number;
  domainId: DomainInfo['domainId'];
  managerId?: Manager['id'];
  managerName?: Manager['nickname'];
  title?: string;
  description?: string;
  method?: Method | null;
  url?: string | null; // 헤더용 대표 엔드포인트
  example_url?: string | null;
  createdAt?: string | null;
  modifiedAt?: string;
  isRealServer?: boolean;
  isSecure?: boolean;
  isDeleted?: boolean;
  testStatus?: TestResult;
  example_content?: ExampleContent | null;
}

export interface TestCaseHeaderInfo {
  id: number;
  apiId: number;
  title: string;
  httpStatusCode: number;
  testStatus: 'YET' | 'SUCCESS' | 'FAILURE';
  createdAt?: string;
  modifiedAt?: string;
}

export interface APIDetailInfo {
  requestDocs: RequestDocs;
  testCases?: Array<TestCaseHeaderInfo>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastlog?: any; // 미정, 정해지면 변경 예정
}

export interface TestCaseDetailInfo {
  id: number; // 응답에서만 받음
  apiId: number; // 응답에서만 받음
  title: string;
  httpStatusCode: number;
  type: TestCaseRequestType;
  content: TestCaseContent;
  testStatus: 'YET' | 'SUCCESS' | 'FAILURE'; // 응답에서 받는 테스트 상태
  createdAt?: string;
  modifiedAt?: string;
  isSecure?: boolean;
  isDeleted?: boolean;
}
