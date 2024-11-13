import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { Manager } from './ManagerAvatar.types';
import { HiMiniUser } from 'react-icons/hi2';
import { getRandomColor } from '../../../../../utils';
import * as style from './ManagerAvatar.css';
import colorPalette from '../../../../../../../styles/colorPalette';
import Typography from '../../../../../../../components/Typography';
import Flexbox from '../../../../../../../components/Flexbox';

interface ManagerAvatarProps {
  manager?: Manager;
  rounded?: number;
  size?: number;
  withLabel?: boolean;
}

const ManagerAvatar = ({
  manager,
  rounded = 99,
  size = 1.2,
  withLabel = false,
}: ManagerAvatarProps) => {
  const bgColor = manager?.nickname ? getRandomColor() : colorPalette.grey[600];
  const tooltipTitle = manager?.nickname ? manager?.nickname : '담당자 미정';

  return (
    <Flexbox flexDirections="row" style={{ gap: '1rem', alignItems: 'center' }}>
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
      {withLabel && (
        <Typography
          color={'disabled'}
          style={{
            height: 'max-content',
            width: 'max-content',
          }}
        >
          {tooltipTitle}
        </Typography>
      )}
    </Flexbox>
  );
};

export default ManagerAvatar;
