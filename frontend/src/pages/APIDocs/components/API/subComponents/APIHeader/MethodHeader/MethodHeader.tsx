import { Method } from './MethodHeader.types';
import * as s from './MethodHeader.css';
import Typography from '../../../../../../../components/Typography';

interface MethodHeaderProps {
  method: Method;
}

const MethodHeader = ({ method }: MethodHeaderProps) => {
  return (
    <div className={s.methodHeader({ method })}>
      <Typography weight="600" size={0.9}>
        {method?.toUpperCase()}
      </Typography>
    </div>
  );
};

export default MethodHeader;
