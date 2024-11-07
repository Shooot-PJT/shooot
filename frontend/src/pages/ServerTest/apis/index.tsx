import { api, multipart } from '../../../apis/interceptors';
import {
  DeleteJarFileRequest,
  GetJarFilesRequest,
  UploadJarFileRequest,
} from '../types';

export const uploadJarFile = (request: UploadJarFileRequest) => {
  const formData = new FormData();
  const projectIdDto = JSON.stringify({ projectId: request.projectId });

  formData.append('jarFile', request.jarFile);
  formData.append('dockerComposeFile', request.dockerComposeFile);
  formData.append(
    'projectIdDto',
    new Blob([projectIdDto], { type: 'application/json' }),
  );

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  return multipart.post('/projects/jarFile', formData);
};

export const getJarFiles = (request: GetJarFilesRequest) => {
  return api.get(`/projects/${request.projectId}/jarFile`);
};

export const deleteJarFile = (request: DeleteJarFileRequest) => {
  return api.delete(`/projects/jarFile/${request.projectJarFileId}`);
};
