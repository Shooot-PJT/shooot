import { Method } from '../../types/methods';

export type NominalUrl = string | null | undefined;
export type TestResult = 'FAIL' | 'SUCCESS' | 'YET';
export const TEST_RESULTS: Record<TestResult, TestResult> = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
  YET: 'YET',
};

export interface APIDetailInfo {
  apiId: number;
  apiTitle: string;
  apiDescription: string;
  method: Method;
  nominalUrl: NominalUrl;
  isRealServer: boolean;
  isSecure: boolean;
  modifiedAt: string;
  manager: Manager;
  testStatus: TestResult;
}

// 등록 시 기본값
export interface APIBasicInfo {
  apiId: APIDetailInfo['apiId'];
  apiTitle: APIDetailInfo['apiTitle'];
  apiDescription: APIDetailInfo['apiDescription'];
  method: Method;
  manager?: Manager | null | undefined;
  nominalUrl?: NominalUrl;
}

export interface APIHeaderInfo {
  apiId: APIDetailInfo['apiId'];
  apiTitle: APIDetailInfo['apiTitle'];
  apiDescription: APIDetailInfo['apiDescription'];
  method: APIDetailInfo['method'];
  isSecure?: APIDetailInfo['isSecure'];
  manager: APIDetailInfo['manager'];
  nominalUrl?: APIDetailInfo['nominalUrl'];
  testStatus?: APIDetailInfo['testStatus'];
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
