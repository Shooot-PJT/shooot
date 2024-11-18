import Flexbox from '../../../../../../../components/Flexbox';
import Typography from '../../../../../../../components/Typography';
import { HTTP_STATUS_CODES } from '../../../../../types/httpStatus';
import dayjs from 'dayjs';
import * as style from './TestLog.css';
import { LogItem } from '../../../../../apis/apitest/types';

interface TestLogModalItemProps {
  log: LogItem;
}

export const TestLogModalItem = ({ log }: TestLogModalItemProps) => {
  return (
    <Flexbox alignItems="center" justifyContents="between">
      <Flexbox alignItems="center" style={{ columnGap: '0.5rem' }}>
        <div className={style.resultDot({ isSuccess: log.isSuccess })} />
        <Typography
          size={0.875}
          color={log.isSuccess ? 'originalGreen' : 'originalRed'}
        >
          {log.isSuccess ? 'Success' : 'Fail'}
        </Typography>
        <div className={style.divi({ isSuccess: log.isSuccess })} />
        <Typography size={0.875}>
          {log.httpStatus} ({HTTP_STATUS_CODES[log.httpStatus]})
        </Typography>
        <div className={style.divi({ isSuccess: log.isSuccess })} />
        <Typography size={0.875}>
          {dayjs(log.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
      </Flexbox>
      <Typography size={0.875} color="disabled">
        Tested by {log.tester}
      </Typography>
    </Flexbox>
  );
};
