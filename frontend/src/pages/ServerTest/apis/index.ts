import { api, multipart } from '../../../apis/interceptors';
import { GetJarFilesRequest, UploadJarFileRequest } from '../types';

export const uploadJarFile = (request: UploadJarFileRequest) => {
  const formData = new FormData();

  const projectIdDto = JSON.stringify({ projectId: request.projectId });

  formData.append('jarfile', request.jarFile);
  formData.append('dockerComposefile', request.dockerComposeFile);
  formData.append('projectIdDto', projectIdDto);

  console.log(formData);
  return multipart.post('/projects/jarFile', formData);
};

export const getJarFiles = (request: GetJarFilesRequest) => {
  return api.get(`/projects/${request.projectId}/jarFile`);
};
