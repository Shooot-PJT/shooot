import Typography from '../../../../../../../../../components/Typography';
import * as s from './BodyNone.css';
export const BodyNone = () => {
  return (
    <div className={s.bodNone}>
      <Typography size={1}>이 요청은 body를 필요로 하지 않습니다.</Typography>
    </div>
  );
};
