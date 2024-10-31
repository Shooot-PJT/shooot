import { Method } from '../../types/methods';

export interface APIBasicInfo {
  id: number;
  method: Method;
  title: string;
  description: string;
  manager: Manager | null | undefined;
}

// 엔드포인트 추후 추가 정의 필요.., mock/real endpoint.. 등
export type EndPoint = string | null | undefined;

// YET일지 null일지 undefined일지는 백엔드에 의존적이므로 추후 점검
export type TestResult = 'fail' | 'success' | 'yet'; // | null | undefined;

export const TEST_RESULTS: Record<TestResult, TestResult> = {
  fail: 'fail',
  success: 'success',
  yet: 'yet',
};

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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Manager extends Pick<User, 'id' | 'nickname'> {}
