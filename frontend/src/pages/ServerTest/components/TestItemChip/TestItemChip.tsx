import { LuCpu } from 'react-icons/lu';
import { LuMemoryStick } from 'react-icons/lu';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { HiCheck } from 'react-icons/hi';
import { GiNetworkBars } from 'react-icons/gi';
import * as s from './TestItemChip.css';
import Flexbox from '../../../../components/Flexbox';

export interface StateIconProps {
  item: 'cpu' | 'memory' | 'network' | 'disk';
}

const handleIcon = (item: string) => {
  switch (item) {
    case 'cpu':
      return <LuCpu />;
    case 'memory':
      return <LuMemoryStick />;
    case 'network':
      return <GiNetworkBars />;
    case 'disk':
      return <FaRegFloppyDisk />;
    default:
      return <HiCheck />;
  }
};

const handleText = (item: string) => {
  switch (item) {
    case 'cpu':
      return 'CPU 점유율';
    case 'memory':
      return 'RAM 사용률';
    case 'network':
      return '네트워크 점유율';
    case 'disk':
      return '디스크 사용률';
    default:
      return <HiCheck />;
  }
};

export const TestItemChip = ({ item }: StateIconProps) => {
  return (
    <Flexbox
      dir="row"
      alignItems="center"
      justifyContents="center"
      style={{ width: '180px', gap: '0.5rem' }}
    >
      <div className={s.Icon({ item })}>{handleIcon(item)}</div>
      <div className={s.text({ item })}>{handleText(item)}</div>
    </Flexbox>
  );
};
