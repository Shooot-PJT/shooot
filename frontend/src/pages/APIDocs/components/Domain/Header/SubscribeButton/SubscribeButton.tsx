import { IoNotifications } from 'react-icons/io5';
import { CustomTooltip } from '../../../../../../components/CustomToolTip';
import * as s from './SubscribeButton.css';
import { DomainInfo } from '../../Domain.data.types';

export const SubscribeButton = ({
  isSubscribed,
}: {
  isSubscribed: DomainInfo['isSubscribed'];
}) => {
  const tooltipTitle = isSubscribed ? '알림 구독' : '알림 구독';
  return (
    <CustomTooltip title={tooltipTitle} placement="top">
      <div
        className={s.BellSubscriptionRecipe({
          isSubscribed,
        })}
      >
        <IoNotifications />
      </div>
    </CustomTooltip>
  );
};
