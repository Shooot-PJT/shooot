export type BoxType = 'add' | 'info';

export interface ProjectInfo {
  projectId: number;
  name: string;
  englishName: string;
  logoImageUrl: string;
  memo: string;
  userCount: number;
  isOwner: boolean;
}

export interface ProjectMember {
  email: string;
  nickname: string;
}
