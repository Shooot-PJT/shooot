import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { Manager } from './ManagerAvatar.types';
import { HiMiniUser } from 'react-icons/hi2';
import { getRandomColor } from '../../../../../utils';
import * as style from './ManagerAvatar.css';
import colorPalette from '../../../../../../../styles/colorPalette';

interface ManagerAvatarProps {
  id?: Manager['id'];
  nickname?: Manager['nickname'];
  rounded?: number;
  size?: number;
}

// 간이구현
const ManagerAvatar = ({
  id,
  nickname,
  rounded = 99,
  size = 1.2,
}: ManagerAvatarProps) => {
  const bgColor = id ? getRandomColor() : colorPalette.grey[600];
  const tooltipTitle = id ? nickname : '담당자 미정';

  return (
    <CustomTooltip title={tooltipTitle}>
      <div
        className={style.managerAvatar}
        style={{
          backgroundColor: bgColor,
          borderRadius: `${rounded}rem`,
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      >
        <HiMiniUser
          style={{
            width: `${size / 1.1}rem`,
            height: `${size / 1.1}rem`,
          }}
        />
      </div>
    </CustomTooltip>
  );
};

export default ManagerAvatar;
