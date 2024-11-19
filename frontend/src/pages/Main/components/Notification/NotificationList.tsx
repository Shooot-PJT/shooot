import React from 'react';
import { IoClose } from 'react-icons/io5';
import Typography from '../../../../components/Typography';
import * as styles from './Notification.css';
import { Notification } from '../../../APIDocs/apis/notification/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { readNotification } from '../../../APIDocs/apis/notification';
import { bodNone } from '../../../APIDocs/components/API/subComponents/APIBody/RequestDocs/RequestContents/BodyNone/BodyNone.css';

interface NotificationListProps {
  notifications: Notification[];
  handleReadNotification: (notificationId: Notification['id']) => void;
  onClose: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  handleReadNotification,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const notificationListRef = React.useRef<HTMLDivElement>(null);

  const mutation = useMutation<void, unknown, string>({
    mutationFn: readNotification,
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({ queryKey: ['notificationCount'] });
      handleReadNotification(variable);
    },
    onError: (error) => {
      console.error('알림 읽기 처리 실패:', error);
    },
  });

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div
        className={styles.notificationListContainer}
        ref={notificationListRef}
        role="dialog"
        aria-label="알림 리스트"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="알림함 닫기"
        >
          <IoClose size={24} color="white" />
        </button>

        {/* 알림 리스트 */}
        <ul className={styles.notificationList}>
          {!notifications.filter((noti) => !noti.isRead).length ? (
            <div className={bodNone}>
              <Typography color="light">새로운 알림이 없습니다.</Typography>
            </div>
          ) : (
            notifications
              .filter((item) => !item.isRead)
              .map((notification: Notification) => (
                <li key={notification.id}>
                  <div
                    onClick={() => mutation.mutate(notification.id)}
                    className={styles.notificationItem}
                    role="button"
                    aria-label={`알림 읽기: ${notification.message.message}`}
                  >
                    <Typography size={0.875} color="light">
                      {notification.message.message}
                    </Typography>
                    {notification.message.project && (
                      <Typography size={0.75} color="light">
                        프로젝트: {notification.message.project.name}
                      </Typography>
                    )}
                    {notification.message.domain && (
                      <Typography size={0.75} color="light">
                        도메인: {notification.message.domain.name}
                      </Typography>
                    )}
                    {notification.message.api && (
                      <Typography size={0.75} color="light">
                        API: {notification.message.api.name}
                      </Typography>
                    )}
                  </div>
                </li>
              ))
          )}
        </ul>
      </div>
    </>
  );
};
