export type isSubscribed = boolean;

export interface DomainInfo {
  domainId: number;
  projectId: number;
  title: string;
  description: string;
  isSubscribed: isSubscribed; // 요청자의 알림 구독여부
}
