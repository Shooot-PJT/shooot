import { HiMiniChevronDown, HiMiniChevronUp } from 'react-icons/hi2';
import Icon from '../../../../../../../components/Icon';
import { CustomTooltip } from '../../../../../../../components/CustomToolTip';

interface CollapseIconProps {
  isOpen: boolean;
}

export const CollapseIcon = ({ isOpen }: CollapseIconProps) => {
  const tooltipTitle = isOpen ? '접기' : '펼치기';
  return (
    <CustomTooltip title={tooltipTitle} placement="right-start">
      <div>
        <Icon background="none" color="disabled" size={1.5}>
          {isOpen ? <HiMiniChevronDown /> : <HiMiniChevronUp />}
        </Icon>
      </div>
    </CustomTooltip>
  );
};
