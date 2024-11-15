import { api } from '../../../apis/interceptors';
import { ProjectInfo, ProjectMember } from '../types';

export const getMyProjectList = () => {
  return api.get<ProjectInfo[]>('/projects');
};

export const getProjectInfo = (projectId: number) => {
  return api.get<ProjectInfo>(`/projects/${projectId}`);
};

export const getProjectMembers = (projectId: number) => {
  return api.get<ProjectMember[]>(`/projects/${projectId}/participants`);
};
