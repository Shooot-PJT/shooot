import React, { ReactNode, useState, useCallback } from 'react';
import { Contents } from './Contents';
import { Img } from './Img';
import { useResize } from '../../../../hooks/useResize';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import { useReadUserInfo } from '../../hooks';
import {
  getAPISSENotification,
  getNotificationCount,
} from '../../../APIDocs/apis/notification';
import { IoNotifications } from 'react-icons/io5';
import { CustomTooltip } from '../../../../components/CustomToolTip';
import { useQuery } from '@tanstack/react-query';
import { useNotificationsSSE } from '../Notification/useNotificationSSE';
import * as styles from './Banner.css';
import colorPalette from '../../../../styles/colorPalette';
import { NotificationList } from '../Notification/NotificationList';

interface BannerProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Banner = ({ children, ...props }: BannerProps) => {
  const { isLarge } = useResize();
  const { user, isLoading: isUserLoading } = useReadUserInfo();
  const [isNotiListOpen, setIsNotiListOpen] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const handleNewNotification = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 1000);
  }, []);

  const { notifications, handleReadNotification } = useNotificationsSSE(
    !!user,
    handleNewNotification,
  );

  const {
    isLoading: isNotificationsInitialLoading,
    isError: isNotificationsError,
  } = useQuery<void>({
    queryKey: ['notifications'],
    queryFn: getAPISSENotification,
    enabled: !!user,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: unReadCount = 0,
    isLoading: isCountInitialLoading,
    isError: isCountError,

    refetch: refetchCount,
  } = useQuery<number>({
    queryKey: ['notificationCount'],
    queryFn: getNotificationCount,
    enabled: !!user,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleOpen = () => {
    setIsNotiListOpen(true);

    refetchCount();
  };

  const handleClose = () => {
    setIsNotiListOpen(false);
  };

  if (isUserLoading || isNotificationsInitialLoading || isCountInitialLoading) {
    return (
      <div className={styles.bannerContainer} {...props}>
        <Flexbox
          flexDirections="col"
          style={{ padding: '2rem', alignItems: 'center' }}
        >
          <Typography>로딩중</Typography>
        </Flexbox>
      </div>
    );
  }

  if (isNotificationsError || isCountError) {
    const error = isNotificationsError
      ? '알림 목록을 불러오는 중 오류가 발생했습니다.'
      : '알림 개수를 불러오는 중 오류가 발생했습니다.';
    console.log(error);
  }

  return (
    <div className={styles.bannerContainer} {...props}>
      <Flexbox
        justifyContents="between"
        style={{ width: '100%', columnGap: '6rem' }}
      >
        {isLarge && <Img src="woman" />}
        <Contents />
        <Img src="man" />
        {children}
      </Flexbox>

      {/* 알림 아이콘 */}
      <div
        className={`${styles.notificationIcon} ${isShaking ? styles.notificationIconShake : ''}`}
        onClick={handleOpen}
        id="notification-icon"
        tabIndex={0}
        role="button"
        aria-label="알림함 열기"
      >
        <CustomTooltip title={'알림함 열기'}>
          <div
            style={{
              color: colorPalette.amber[300],
              fontSize: '2.5em',
              position: 'relative',
            }}
          >
            <IoNotifications />
            {unReadCount > 0 && (
              <div className={styles.notificationCount}>
                <Typography color="light" weight="600" size={0.75}>
                  {unReadCount}
                </Typography>
              </div>
            )}
          </div>
        </CustomTooltip>
      </div>

      {/* 알림 리스트 */}
      {isNotiListOpen && (
        <NotificationList
          notifications={notifications}
          onClose={handleClose}
          handleReadNotification={handleReadNotification}
        />
      )}
    </div>
  );
};
