import { api, multipart } from '../../../apis/interceptors';
import { AddProjectRequest, AddProjectResponse, UserInfo } from '../types';

export const getUserInfo = () => {
  return api.get<UserInfo>('/user/info');
};

export const changeNickname = (nickname: string) => {
  return api.patch('/user/info', { nickname: nickname });
};

export const addProject = (info: AddProjectRequest) => {
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

export const editProject = (
  projectId: number,
  name?: string,
  memo?: string,
  logo?: File,
) => {
  const requestData = {
    name: name ? name : null,
    memo: memo ? memo : null,
  };
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
  );

  if (logo) {
    formData.append('file', logo);
  }

  return multipart.patch<AddProjectResponse>(
    `/projects/${projectId}`,
    formData,
  );
};
