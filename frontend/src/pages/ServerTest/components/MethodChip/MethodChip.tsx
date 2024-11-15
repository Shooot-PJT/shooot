import Typography from '../../../../components/Typography';
import { Method } from '../../../APIDocs/types/methods';
import * as s from './MethodChip.css';

export interface MethodChipProps {
  method: Method;
}

export const MethodChip = ({ method }: MethodChipProps) => {
  return (
    <div className={s.chip({ method })}>
      <Typography size={0.875} weight="600">
        {method.toUpperCase()}
      </Typography>
    </div>
  );
};
