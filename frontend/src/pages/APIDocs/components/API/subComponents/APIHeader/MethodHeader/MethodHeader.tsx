import * as s from './MethodHeader.css';
import Typography from '../../../../../../../components/Typography';
import { Method, METHODS } from '../../../../../types/methods';

interface MethodHeaderProps {
  method?: Method | null | 'method';
}
export const getFontColorByMethod = (method?: Method | null | 'method') => {
  return (typeof method) in METHODS ? 'light' : 'dark';
};

export const getMethodStringByMethod = (method?: Method | null | 'method') => {
  return (typeof method) in METHODS ? method : undefined;
};

const MethodHeader = ({ method }: MethodHeaderProps) => {
  const fontColor = getFontColorByMethod(method);
  // const METHOD = getMethodStringByMethod(method);
  return (
    <div className={s.methodHeader({ method: method as Method | undefined })}>
      <Typography weight="600" size={0.9} color={fontColor}>
        {method?.toUpperCase()}
      </Typography>
    </div>
  );
};

export default MethodHeader;
