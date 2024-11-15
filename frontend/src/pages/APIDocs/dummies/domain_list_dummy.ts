import { DomainInfo } from '../components/Domain/Domain.data.types';

export const DOMAIN_INFO_LIST_DUMMY: DomainInfo[] = [
  {
    domainId: 1,
    projectId: 1,
    title: 'egg',
    description: '계란을 깨서 적금하는 도메인입니다.',
    isSubscribed: true,
  },
  {
    domainId: 2,
    projectId: 1,
    title: 'mission',
    description: '쏠쏠한 미션 관련 도메인입니다.',
    isSubscribed: false,
  },
  {
    domainId: 3,
    projectId: 1,
    title: 'user',
    description: '회원 관련 도메인입니다.',
    isSubscribed: true,
  },
  {
    domainId: 4,
    projectId: 1,
    title: 'quiz',
    description: '퀴즈 관련 도메인입니다.',
    isSubscribed: false,
  },
  {
    domainId: 5,
    projectId: 1,
    title: 'account',
    description: '은행 계좌 관련 도메인입니다.',
    isSubscribed: true,
  },
];
