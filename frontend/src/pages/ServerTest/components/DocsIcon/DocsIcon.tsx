import { HiDocumentText } from 'react-icons/hi2';
import * as s from './DocsIcons.css';

interface DocsIconProps {
  active: boolean;
}

export const DocsIcon = ({ active }: DocsIconProps) => {
  return (
    <HiDocumentText
      className={active ? s.ActiveIcon : s.DeactiveIcon}
      size={24}
    />
  );
};
