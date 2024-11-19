import Flexbox from '../../../../../../../components/Flexbox';
import Typography from '../../../../../../../components/Typography';
import { ApiDetailLastLogInfo } from '../../../../../types/data/API.data';
import { HTTP_STATUS_CODES } from '../../../../../types/httpStatus';
import dayjs from 'dayjs';
import * as style from './TestLog.css';

interface TestLogItemProps {
  lastLog: ApiDetailLastLogInfo;
}

export const TestLogItem = ({ lastLog }: TestLogItemProps) => {
  return (
    <Flexbox alignItems="center" justifyContents="between">
      <Flexbox alignItems="center" style={{ columnGap: '0.5rem' }}>
        <div className={style.resultDot({ isSuccess: lastLog.isSuccess })} />
        <Typography
          size={0.875}
          color={lastLog.isSuccess ? 'originalGreen' : 'originalRed'}
        >
          {lastLog.isSuccess ? 'Success' : 'Fail'}
        </Typography>
        <div className={style.divi({ isSuccess: lastLog.isSuccess })} />
        <Typography size={0.875}>
          {lastLog.httpStatus} ({HTTP_STATUS_CODES[lastLog.httpStatus]})
        </Typography>
        <div className={style.divi({ isSuccess: lastLog.isSuccess })} />
        <Typography size={0.875}>
          {dayjs(lastLog.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
      </Flexbox>
      <Typography size={0.875} color="disabled">
        Tested by {lastLog.managerName}
      </Typography>
    </Flexbox>
  );
};
