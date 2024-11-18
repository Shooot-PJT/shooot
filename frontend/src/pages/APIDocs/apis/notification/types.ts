export interface Notification {
  id: string;
  isRead: boolean;
  createdAt: string;
  message: NotificationMessage;
}

export interface NotificationMessage {
  api?: {
    id: number;
    name: string;
  };
  domain?: {
    id: number;
    name: string;
  };
  message: string;
  project?: {
    id: number;
    name: string;
  };
}
