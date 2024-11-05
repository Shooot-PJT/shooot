import { Method } from '../../APIDocs/types/methods';

export type TestMethodType = 'FIXED' | 'SPIKE' | 'RAMP_UP';

export interface APITestFormData {
  apiId: number;
  method: TestMethodType;
  vuserNum: number;
  duration: number;
  checked: boolean;
}

export interface APITestResponse {
  includes: APIIncludeTestData[];
  excludes: APIExcludeTestData[];
}

export interface APIIncludeTestData {
  apiId: number;
  domainName?: string;
  method: Method;
  endPoint: string;
  description?: string;
  vuser: number;
  duration: number;
  testMethod: TestMethodType;
}

export interface APIExcludeTestData {
  method: Method;
  endPoint: string;
}
