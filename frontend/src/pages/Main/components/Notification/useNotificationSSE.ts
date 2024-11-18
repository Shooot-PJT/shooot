import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Notification } from '../../../APIDocs/apis/notification/types';
import { getAPISSENotification } from '../../../APIDocs/apis/notification';

type OnNewNotificationCallback = () => void;

export const useNotificationsSSE = (
  isLoggedIn: boolean,
  onNewNotification: OnNewNotificationCallback,
) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const queryClient = useQueryClient();
  const callbackRef = useRef<OnNewNotificationCallback>(onNewNotification);
  const isInitial = useRef(true);

  const handleSetNotifications = (newNotification: Notification) => {
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleReadNotification = (notificationId: Notification['id']) => {
    setNotifications(
      notifications.filter((notification) => notification.id != notificationId),
    );
  };

  useEffect(() => {
    callbackRef.current = onNewNotification;
  }, [onNewNotification]);

  useEffect(() => {
    if (isLoggedIn && !eventSourceRef.current) {
      console.log('SSE 연결 시작');
      const eventSource = new EventSource(
        'https://shooot.co.kr/api/sse/login/connection',
        {
          withCredentials: true,
        },
      );
      eventSourceRef.current = eventSource;

      eventSource.onopen = async () => {
        console.log('SSE 연결 성공');

        await getAPISSENotification();
      };

      const handleNotificationData = (event: MessageEvent) => {
        if (isInitial.current) {
          console.log('초기 연결 메시지 무시:', event.data);
          isInitial.current = false;
          return;
        }

        try {
          const parsedData: Notification = JSON.parse(event.data);
          console.log('SSE 메시지 수신:', parsedData);
          handleSetNotifications(parsedData);

          queryClient.invalidateQueries({
            queryKey: ['notificationCount'],
          });

          callbackRef.current();
        } catch (e) {
          console.error('SSE 데이터 파싱 실패:', e);
        }
      };

      eventSource.addEventListener('notification_data', handleNotificationData);

      eventSource.onerror = (err) => {
        console.error('SSE 오류:', err);
        eventSource.close();
        eventSourceRef.current = null;
      };

      return () => {
        if (eventSourceRef.current) {
          console.log('SSE 연결 종료');
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };
    }
  }, [isLoggedIn, queryClient]);

  return { notifications, handleReadNotification };
};
