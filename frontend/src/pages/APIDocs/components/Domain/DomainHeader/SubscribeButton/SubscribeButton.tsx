import { IoNotifications } from 'react-icons/io5';
import { CustomTooltip } from '../../../../../../components/CustomToolTip';
import * as s from './SubscribeButton.css';
import { DomainInfo } from '../../../../types/data/Domain.data';

interface SubscribeButtonProps {
  isSubscribe: DomainInfo['isSubscribe'];
  onToggleSubscribe: () => void;
}

export const SubscribeButton = ({
  isSubscribe,
  onToggleSubscribe,
}: SubscribeButtonProps) => {
  const tooltipTitle = isSubscribe ? '알림 구독 취소' : '알림 구독';
  return (
    <CustomTooltip title={tooltipTitle} placement="top">
      <div
        className={s.BellSubscriptionRecipe({ isSubscribe })}
        onClick={onToggleSubscribe}
        style={{ cursor: 'pointer' }}
      >
        <IoNotifications />
      </div>
    </CustomTooltip>
  );
};
