import { api } from '../../../../apis/interceptors';
import { Endpoint as EP } from '../../constants/endpoint';

export const getAPISSENotification = async (): Promise<void> => {
  await api.get<void>(`/${EP.notification}`);
};

export const getNotificationCount = async (): Promise<number> => {
  const response = await api.get<number>(`/${EP.notification}/${EP.count}`);
  return response.data;
};

export const readNotification = async (
  notificationId: string,
): Promise<void> => {
  await api.post(`/${EP.notification}/${notificationId}`);
};
