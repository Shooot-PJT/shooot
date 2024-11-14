import { HiMinusSm } from 'react-icons/hi';
import { BsExclamationLg } from 'react-icons/bs';
import { HiX } from 'react-icons/hi';
import { HiCheck } from 'react-icons/hi';
import { IoIosPlay } from 'react-icons/io';
import * as s from './StateIcon.css';
import Flexbox from '../../../../components/Flexbox';

export interface StateIconProps {
  state: '정상종료' | '배포중' | '런타임에러' | '빌드에러' | '빌드기록없음';
}

const handleIcon = (state: string) => {
  switch (state) {
    case '정상종료':
      return <HiCheck />;
    case '배포중':
      return <IoIosPlay />;
    case '런타임에러':
      return <HiX />;
    case '빌드에러':
      return <BsExclamationLg />;
    case '빌드기록없음':
      return <HiMinusSm />;
    default:
      return <HiCheck />;
  }
};

export const StateIcon = ({ state }: StateIconProps) => {
  return (
    <Flexbox
      dir="row"
      alignItems="center"
      justifyContents="center"
      style={{ width: '140px', gap: '0.5rem' }}
    >
      <div className={s.Icon({ state })}>{handleIcon(state)}</div>
      <div className={s.text({ state })}>{state}</div>
    </Flexbox>
  );
};
