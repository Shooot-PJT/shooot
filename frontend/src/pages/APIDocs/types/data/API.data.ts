// import { TestCaseHeaderInfo } from '../../dummies/testcase_dummy_list';
// import { Method } from '../../types/methods';
// import { DomainInfo } from './Domain.data';
// import { ExpectedResponse, TableData } from './testcase.data';

// export type NominalUrl = string | null | undefined;
// export type TestResult = 'FAIL' | 'SUCCESS' | 'YET';
// export const TEST_RESULTS: Record<TestResult, TestResult> = {
//   FAIL: 'FAIL',
//   SUCCESS: 'SUCCESS',
//   YET: 'YET',
// };

// export interface APIRequestDocsContent {
//   params: TableData | null;
//   headers: TableData | null;
//   pathvariable: TableData | null;
//   body: Body;
//   expectedResponse: ExpectedResponse;
// }

// export interface APIRequestDocsInfo {
//   id: number;
//   domainId: DomainInfo['domainId'];
//   managerId: Manager['id'];
//   managerName: Manager['nickname'];
//   title: string;
//   description: string;
//   method: Method;
//   url: string; // 헤더용 대표 엔드포인트
//   createdAt?: string;
//   modifiedAt?: string;
//   isRealServer?: boolean;
//   isSecure?: boolean;
//   isDeleted?: boolean;
//   testStatus?: TestResult;
//   //
//   example_url?: string; // 예시용 자유양식 url (ExampleUrl)
//   example_content?: APIRequestDocsContent;
// }

// export interface APIDetailInfo {
//   requestDocs: APIRequestDocsInfo;
//   testCases?: Array<TestCaseHeaderInfo>;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   lastlog?: any; //미정, 정해지면 바꿀 예정
// }

// export interface APIHeaderInfo {
//   id: APIRequestDocsInfo['id'];
//   title: APIRequestDocsInfo['title'];
//   description: APIRequestDocsInfo['description'];
//   method: APIRequestDocsInfo['method'];
//   managerId: Manager['id'] | null;
//   managerName: Manager['nickname'] | null;
//   url?: APIRequestDocsInfo['url'];
//   isRealServer?: APIRequestDocsInfo['isRealServer'];
//   isSecure?: APIRequestDocsInfo['isSecure'];
//   testStatus?: APIRequestDocsInfo['testStatus'];
//   createdAt?: APIRequestDocsInfo['createdAt'];
//   modifiedAt?: APIRequestDocsInfo['modifiedAt'];
// }

// // 등록 시 기본값
// export interface APIBasicInfo {
//   id: APIRequestDocsInfo['id'];
//   title: APIRequestDocsInfo['title'];
//   description: APIRequestDocsInfo['description'];
//   method: APIRequestDocsInfo['method'];
//   manager?: Manager | null | undefined;
//   url?: APIRequestDocsInfo['url'];
// }

// // ===========================
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

// frontend/src/pages/APIDocs/types/data/API.data.ts
import { TestCaseHeaderInfo } from '../../dummies/testcase_dummy_list';
import { Method } from '../../types/methods';
import { DomainInfo } from './Domain.data';
import { ExpectedResponse, TableData, Body } from './TestCase.data';

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
  method: Method | null;
  example_url: string;
  title: string;
  description: string;
  managerId: number;
  managerName: string;
}

// export interface APIRequestDocsInfo {
//   id: number;
//   domainId: DomainInfo['domainId'];
//   managerId: number;
//   managerName: string;
//   title: string;
//   description: string;
//   method: Method;
//   url: string;
//   createdAt?: string;
//   modifiedAt?: string;
//   isRealServer?: boolean;
//   isSecure?: boolean;
//   isDeleted?: boolean;
//   testStatus?: TestResult;
//   example_url?: string;
//   example_content?: string;
// }

export interface APIRequestDocsInfo {
  id: number;
  domainId: DomainInfo['domainId'];
  managerId: Manager['id'];
  managerName: Manager['nickname'];
  title: string;
  description: string;
  method: Method | null;
  url: string; // 헤더용 대표 엔드포인트
  createdAt?: string;
  modifiedAt?: string;
  isRealServer?: boolean;
  isSecure?: boolean;
  isDeleted?: boolean;
  testStatus?: TestResult;
  //
  example_url?: string | null; // 예시용 자유양식 url (ExampleUrl)
  example_content?: APIRequestDocsContent | null;
}

export interface APIDetailInfo {
  requestDocs: APIRequestDocsContent & APIRequestDocsInfo;
  testCases?: Array<TestCaseHeaderInfo>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastlog?: any; //미정, 정해지면 바꿀 예정
}
