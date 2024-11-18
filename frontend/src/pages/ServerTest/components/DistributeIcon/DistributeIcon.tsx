import { HiRocketLaunch } from 'react-icons/hi2';
import * as s from './DistributeIcon.css';

interface DistributeIconProps {
  active: boolean;
  onClick: () => void;
}

export const DistributeIcon = ({ active, onClick }: DistributeIconProps) => {
  return (
    <div
      className={
        s.Container + ' ' + (active ? s.ActiveContainer : s.DeactiveContainer)
      }
      onClick={(e) => {
        e.stopPropagation();
        if (active) onClick();
      }}
    >
      <HiRocketLaunch
        className={active ? s.ActiveIcon : s.DeactiveIcon}
        size={20}
      />
    </div>
  );
};
