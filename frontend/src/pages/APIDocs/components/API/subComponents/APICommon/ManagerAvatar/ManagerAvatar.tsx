import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { HiUser } from 'react-icons/hi2';
import Typography from '../../../../../../../components/Typography';
import Flexbox from '../../../../../../../components/Flexbox';
import { APIDetailInfo } from '../../../../../types/data/API.data';
import Icon from '../../../../../../../components/Icon';
import { IconColor } from '../../../../../../../components/Icon/Icon.types';

interface ManagerAvatarProps {
  manager?: {
    id?: APIDetailInfo['requestDocs']['managerId'];
    nickname?: APIDetailInfo['requestDocs']['managerName'];
    profileColor?: APIDetailInfo['requestDocs']['profileColor'];
  };
  withLabel?: boolean;
}

const ManagerAvatar = ({ manager, withLabel = false }: ManagerAvatarProps) => {
  const tooltipTitle = manager?.nickname ? manager?.nickname : '담당자 미정';

  return (
    <Flexbox flexDirections="row" style={{ gap: '1rem', alignItems: 'center' }}>
      <CustomTooltip title={tooltipTitle}>
        <div>
          <Icon
            size={1}
            rounded={999}
            color={manager?.profileColor?.toLowerCase() as IconColor}
          >
            <HiUser />
          </Icon>
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
