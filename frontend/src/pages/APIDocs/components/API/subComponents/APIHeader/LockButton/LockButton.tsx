import * as s from './LockButton.css';
import Icon from '../../../../../../../components/Icon';

import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';
import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { APIDetailInfo } from '../../../../../types/data/API.data';

interface LockButtonProps {
  isSecure: APIDetailInfo['requestDocs']['isSecure'];
  onClick?: () => void;
}

const LockButton = ({ isSecure, onClick }: LockButtonProps) => {
  const tooltipGuide = isSecure ? '권한 필요' : '권한 불필요';
  return (
    <CustomTooltip title={tooltipGuide}>
      <div onClick={onClick} className={s.lockButton({ isSecure })}>
        <Icon background="none" color="disabled">
          {isSecure ? <HiLockClosed /> : <HiLockOpen />}
        </Icon>
      </div>
    </CustomTooltip>
  );
};

export default LockButton;
