import { Method } from './MethodHeader.types';
import * as s from './MethodHeader.css';
import Typography from '../../../../../../../components/Typography';
import { METHODS } from '../../../../../types/methods';

interface MethodHeaderProps {
  method: Method | 'method';
}
export const getFontColorByMethod = (method: string | null) => {
  return (typeof method) in METHODS ? 'light' : 'dark';
};

const MethodHeader = ({ method }: MethodHeaderProps) => {
  const fontColor = getFontColorByMethod(method);

  return (
    <div className={s.methodHeader({ method })}>
      <Typography weight="600" size={0.9} color={fontColor}>
        {method?.toUpperCase()}
      </Typography>
    </div>
  );
};

export default MethodHeader;
