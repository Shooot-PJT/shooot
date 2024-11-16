type Endpoint =
  | 'projects'
  | 'tests'
  | 'domains'
  | 'subscriptions'
  | 'apis'
  | 'logs'
  | 'testcases'
  | 'toggle';

export const Endpoint: { [E in Endpoint]: E } = {
  projects: 'projects',
  tests: 'tests',
  domains: 'domains',
  subscriptions: 'subscriptions',
  apis: 'apis',
  logs: 'logs',
  testcases: 'testcases',
  toggle: 'toggle',
};
