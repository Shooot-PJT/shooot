import { HiRocketLaunch } from 'react-icons/hi2';
import * as s from './DistributeIcon.css';

interface DistributeIconProps {
  active: boolean;
}

export const DistributeIcon = ({ active }: DistributeIconProps) => {
  return (
    <div
      className={
        s.Container + ' ' + (active ? s.ActiveContainer : s.DeactiveContainer)
      }
    >
      <HiRocketLaunch
        className={active ? s.ActiveIcon : s.DeactiveIcon}
        size={20}
      />
    </div>
  );
};
