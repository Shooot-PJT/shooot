export type Method = 'post' | 'get' | 'put' | 'patch' | 'delete';

export const METHODS: Record<Method, Method> = {
  post: 'post',
  get: 'get',
  put: 'put',
  patch: 'patch',
  delete: 'delete',
};
