export type Methods = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export const METHODS: Record<Methods, Methods> = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
