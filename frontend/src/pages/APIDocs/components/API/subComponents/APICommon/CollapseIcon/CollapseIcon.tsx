import { HiMiniChevronDown, HiMiniChevronUp } from 'react-icons/hi2';
import Icon from '../../../../../../../components/Icon';

interface CollapseIconProps {
  isOpen: boolean;
}

export const CollapseIcon = ({ isOpen }: CollapseIconProps) => {
  return (
    <Icon background="none" color="disabled" size={1.5}>
      {isOpen ? <HiMiniChevronDown /> : <HiMiniChevronUp />}
    </Icon>
  );
};
