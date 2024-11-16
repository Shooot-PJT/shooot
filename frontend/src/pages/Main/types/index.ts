export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  color: string;
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
