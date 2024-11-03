export interface UserInfo {
  nickname: string;
  email: string;
}

export interface AddProjectRequest {
  name: string;
  englishName: string;
  memo: string;
  logo: File;
}

export interface AddProjectResponse {
  projectId: number;
}

export interface EditProjectRequest {
  projectId: number;
  name?: string;
  memo?: string;
  logo?: File;
}
