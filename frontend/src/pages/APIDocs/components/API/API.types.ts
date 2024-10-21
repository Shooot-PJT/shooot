export interface APIBasicInfo {
  title: string;
  description: string;
  managerName: string | null | undefined;
}

// 엔드포인트 추후 추가 정의 필요.., mock/real endpoint.. 등
export type EndPoint = string | null | undefined;

// YET일지 null일지 undefined일지는 백엔드에 의존적이므로 추후 점검
export type TestResult = 'FAIL' | 'SUCCESS' | 'YET'; // | null | undefined;

export const TEST_RESULTS: Record<TestResult, TestResult> = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
  YET: 'YET',
};
