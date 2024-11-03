import { HiMinusSm } from 'react-icons/hi';
import { BsExclamationLg } from 'react-icons/bs';
import { HiX } from 'react-icons/hi';
import { HiCheck } from 'react-icons/hi';
import { IoIosPlay } from 'react-icons/io';
import * as s from './StateIcon.css';
import Flexbox from '../../../../components/Flexbox';

export interface StateIconProps {
  state: 'Approved' | 'Pending' | 'Disabled' | 'Error' | 'No-Build-Yet';
}

const handleIcon = (state: string) => {
  switch (state) {
    case 'Approved':
      return <HiCheck />;
    case 'Pending':
      return <IoIosPlay />;
    case 'Disabled':
      return <HiX />;
    case 'Error':
      return <BsExclamationLg />;
    case 'No-Build':
      return <HiMinusSm />;
    default:
      return <HiCheck />;
  }
};

export const StateIcon = ({ state }: StateIconProps) => {
  return (
    <Flexbox dir="row" style={{ width: '120px', gap: '0.5rem' }}>
      <div className={s.Icon({ state })}>{handleIcon(state)}</div>
      <div className={s.text({ state })}>{state}</div>
    </Flexbox>
  );
};
