import { Method } from '../../APIDocs/types/methods';

export type TestMethodType = 'FIXED' | 'SPIKE' | 'RAMP_UP';

export type UploadState = 'Pending' | 'End' | 'Error' | 'None';

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

export interface DeleteJarFileRequest {
  projectJarFileId: number;
}

export type ProjectStatus = 'READY' | 'RUN' | 'RUNTIME_ERROR' | 'DONE' | 'NONE';

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
