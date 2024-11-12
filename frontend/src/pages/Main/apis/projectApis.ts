import { api, multipart } from '../../../apis/interceptors';
import { ProjectInfo, ProjectMember } from '../../MyProject/types';
import {
  AddProjectRequest,
  AddProjectResponse,
  EditProjectRequest,
} from '../types';

export const readProjectList = () => {
  return api.get<ProjectInfo[]>('/projects');
};

export const readProjectByProjectId = (projectId: number) => {
  return api.get<ProjectInfo>(`/projects/${projectId}`);
};

export const readMembersByProjectId = (projectId: number) => {
  return api.get<ProjectMember[]>(`/projects/${projectId}/participants`);
};

export const createProject = (info: AddProjectRequest) => {
  const requestData = {
    name: info.name,
    englishName: info.englishName,
    memo: info.memo,
  };
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
  );
  formData.append('file', info.logo);

  return multipart.post<AddProjectResponse>('/projects', formData);
};

export const updateProjectByProjectId = (info: EditProjectRequest) => {
  const requestData = {
    name: info.name ? info.name : null,
    memo: info.memo ? info.memo : null,
  };
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
  );

  if (info.logo) {
    formData.append('file', info.logo);
  }

  return multipart.patch<AddProjectResponse>(
    `/projects/${info.projectId}`,
    formData,
  );
};

export const createInvitingMail = (projectId: number, userId: number) => {
  return api.post(`/projects/${projectId}/invite`, { userId: userId });
};

export const removeMemberByProjectIdAndUserId = (
  projectId: number,
  userId: number,
) => {
  return api.delete(`/projects/${projectId}/users/${userId}`);
};

export const removeProjectByProjectId = (projectId: number) => {
  return api.delete(`/projects/${projectId}`);
};
