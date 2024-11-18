type Endpoint =
  | 'projects'
  | 'tests'
  | 'domains'
  | 'subscribe'
  | 'notification'
  | 'count'
  | 'apis'
  | 'logs'
  | 'testcases'
  | 'toggle';

export const Endpoint: { [E in Endpoint]: E } = {
  projects: 'projects',
  tests: 'tests',
  domains: 'domains',
  subscribe: 'subscribe',
  notification: 'notification',
  count: 'count',
  apis: 'apis',
  logs: 'logs',
  testcases: 'testcases',
  toggle: 'toggle',
};
