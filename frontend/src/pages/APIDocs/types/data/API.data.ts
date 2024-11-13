import { TestCaseHeaderInfo } from '../../dummies/testcase_dummy_list';
import { Method } from '../../types/methods';
import { DomainInfo } from './Domain.data';
import { ExpectedResponse, TableData } from './testcase.data';

export type NominalUrl = string | null | undefined;
export type TestResult = 'FAIL' | 'SUCCESS' | 'YET';
export const TEST_RESULTS: Record<TestResult, TestResult> = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
  YET: 'YET',
};

export interface APIRequestDocsContent {
  params: TableData | null;
  headers: TableData | null;
  pathvariable: TableData | null;
  body: Body;
  expectedResponse: ExpectedResponse;
}

export interface APIRequestDocsInfo {
  id: number;
  domainId: DomainInfo['domainId'];
  managerId: Manager['id'];
  managerName: Manager['nickname'];
  title: string;
  description: string;
  method: Method;
  url: string; // 헤더용 대표 엔드포인트
  createdAt?: string;
  modifiedAt?: string;
  isDeveloped?: boolean;
  isSecure?: boolean;
  isDeleted?: boolean;
  testStatus?: TestResult;
  //
  example_url?: string; // 예시용 자유양식 url (ExampleUrl)
  example_content?: APIRequestDocsContent;
}

export interface APIDetailInfo {
  requestDocs: APIRequestDocsInfo;
  testCases?: Array<TestCaseHeaderInfo>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastlog?: any; //미정, 정해지면 바꿀 예정
}

// export interface APIDetailInfo {
//   apiId: number;
//   apiTitle: string;
//   apiDescription: string;
//   method: Method;
//   nominalUrl: NominalUrl;
//   isRealServer: boolean;
//   isSecure: boolean;
//   modifiedAt: string;
//   manager: Manager;
//   testStatus: TestResult;
// }

// 등록 시 기본값
export interface APIBasicInfo {
  id: APIRequestDocsInfo['id'];
  title: APIRequestDocsInfo['title'];
  description: APIRequestDocsInfo['description'];
  method: APIRequestDocsInfo['method'];
  manager?: Manager | null | undefined;
  url?: APIRequestDocsInfo['url'];
}

export interface APIHeaderInfo {
  apiId: APIRequestDocsInfo['id'];
  apiTitle: APIRequestDocsInfo['title'];
  apiDescription: APIRequestDocsInfo['description'];
  method: APIRequestDocsInfo['method'];
  isSecure?: APIRequestDocsInfo['isSecure'];
  manager?: Manager | null | undefined;
  nominalUrl?: APIRequestDocsInfo['url'];
  testStatus?: APIRequestDocsInfo['testStatus'];
}

// ===========================
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
  id: User['id'];
  nickname: User['nickname'];
}
