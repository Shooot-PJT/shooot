import * as s from './LockButton.css';
import Icon from '../../../../../../../components/Icon';

import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';
import { CustomTooltip } from '../../../../../../../components/CustomToolTip';

interface LockButtonProps {
  needAuthorize: boolean;
  onClick?: () => void;
}

const LockButton = ({ needAuthorize, onClick }: LockButtonProps) => {
  const tooltipGuide = needAuthorize ? '권한 필요' : '권한 불필요';
  return (
    <CustomTooltip title={tooltipGuide}>
      <div onClick={onClick} className={s.lockButton({ needAuthorize })}>
        <Icon background="none" color="disabled">
          {needAuthorize ? <HiLockClosed /> : <HiLockOpen />}
        </Icon>
      </div>
    </CustomTooltip>
  );
};

export default LockButton;
