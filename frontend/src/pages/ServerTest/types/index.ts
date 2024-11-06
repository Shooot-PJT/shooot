import { Method } from '../../APIDocs/types/methods';

export type TestMethodType = 'FIXED' | 'SPIKE' | 'RAMP_UP';

export type UploadState = 'Panding' | 'End' | 'None';

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

export interface UploadJarFileRequest {
  projectId: number;
  jarFile: File;
  dockerComposeFile: File;
}

export interface GetJarFilesRequest {
  projectId: number;
}

export type ProjectStatus = 'READY' | 'RUN' | 'RUNTIME_ERROR' | 'DONE';

export interface ProjectVersion {
  major: number;
  minor: number;
  patch: number;
  temporary: number;
}

export interface jarFiles {
  projectJarFileId: number;
  status: ProjectStatus;
  fileName: string;
  version: ProjectVersion;
}

export interface GetJarFilesResponse {
  Files: jarFiles[];
}
