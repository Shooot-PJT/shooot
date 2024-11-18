import { HiDocumentText } from 'react-icons/hi2';
import * as s from './DocsIcons.css';

interface DocsIconProps {
  active: boolean;
  onClick: () => void;
}

export const DocsIcon = ({ active, onClick }: DocsIconProps) => {
  return (
    <HiDocumentText
      className={active ? s.ActiveIcon : s.DeactiveIcon}
      onClick={(e) => {
        e.stopPropagation();
        if (active) onClick();
      }}
      size={24}
    />
  );
};
