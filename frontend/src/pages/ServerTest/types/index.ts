import { MutableRefObject } from 'react';
import { Method } from '../../APIDocs/types/methods';

export type TestMethodType = 'FIXED' | 'SPIKE' | 'RAMP_UP';

export type UploadState = 'Pending' | 'End' | 'Error' | 'None';

export type ProjectStatus =
  | 'BUILD_ERROR'
  | 'RUN'
  | 'RUNTIME_ERROR'
  | 'DONE'
  | 'NONE'
  | 'DEPLOY';

export interface APITestFormData {
  apiId: number;
  method: TestMethodType;
  vuserNum: number;
  duration: number;
  checked: boolean;
}

export interface APITestListResponse {
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

export interface UploadJarFileRequest {
  projectId: number;
  jarFile: File;
  dockerComposeFile: File;
}

export interface GetJarFilesRequest {
  projectId: number;
}

export interface DeleteJarFileRequest {
  projectJarFileId: number;
}

export interface ProjectVersion {
  major: number;
  minor: number;
  patch: number;
  temporary: number;
}

export interface jarFile {
  projectJarFileId: number;
  status: ProjectStatus;
  fileName: string;
  version: ProjectVersion;
}

export type GetJarFilesResponse = jarFile[];

export interface ConnectProjectSSERequest {
  projectId: number;
}

export interface DeployFileRequest {
  projectJarFileId: number;
}

export interface StopDeployFileRequest {
  projectJarFileId: number;
}

export interface GetAPIConfigsRequest {
  projectJarFileId: number;
}

export interface ExecuteApiTestRequest {
  projectJarFileId: number;
  endPointSettings: EndPointSetting[];
}

export interface EndPointSetting {
  apiId: number;
  method: TestMethodType;
  vuserNum: number;
  duration: number;
}

export interface TestSSEData {
  curr: TestDataList;
  avg: TestDataList;
  max: TestDataList;
  min: TestDataList;
  method?: Method;
  url?: string;
}
export interface TestDataList {
  cpu: number;
  memory: number;
  network: number;
  disk: number;
}

export interface TestSSE {
  eventSourceRef: MutableRefObject<EventSource | null>;
  testData: TestSSEData[];
}

export type TestStatus = 'none' | 'start' | 'end';

export interface StopApiTestRequest {
  projectJarFileId: number;
  projectId: number;
}

export interface GetTestRecordResponse {
  stressTestLogId: number;
  title: string;
  startTime: string;
  status: 'DONE' | 'INTERRUPTED';
  count: number;
  duration: number;
}

export interface GetTestRecordRequest {
  projectId: number;
}

export interface GetTestRecordDetailRequest {
  stressTestLogId: number;
}

export interface GetTestRecordDetailResponse {
  httpMethod: Method;
  url: string;
  duration: number;
  testMethod: TestMethodType;
  avgCpu: number;
  maxCpu: number;
  minCpu: number;
  avgMemory: number;
  maxMemory: number;
  minMemory: number;
  avgDisk: number;
  maxDisk: number;
  minDisk: number;
  avgNetwork: number;
  maxNetwork: number;
  minNetwork: number;
  vuser: number;
}
