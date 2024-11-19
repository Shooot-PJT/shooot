export type isSubscribe = boolean;

export interface DomainInfo {
  domainId: number;
  projectId: number;
  title: string;
  description: string;
  isSubscribe?: isSubscribe; // 요청자의 알림 구독여부
}
