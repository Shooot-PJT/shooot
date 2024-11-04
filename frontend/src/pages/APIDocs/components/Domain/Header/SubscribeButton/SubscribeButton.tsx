import { IoNotifications } from 'react-icons/io5';
import { CustomTooltip } from '../../../../../../components/CustomToolTip';
import * as s from './SubscribeButton.css';

export const SubscribeButton = ({
  isSubscribed,
}: {
  isSubscribed: boolean;
}) => {
  const tooltipTitle = isSubscribed ? '알림 구독' : '알림 구독';
  return (
    <CustomTooltip title={tooltipTitle} placement="right-start">
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
