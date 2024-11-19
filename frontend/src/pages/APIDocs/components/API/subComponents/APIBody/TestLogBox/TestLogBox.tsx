import Flexbox from '../../../../../../../components/Flexbox';
import Typography from '../../../../../../../components/Typography';
import useModal from '../../../../../../../hooks/useModal';
import usePopup from '../../../../../../../hooks/usePopup';
import palette from '../../../../../../../styles/colorPalette';
import { ApiDetailLastLogInfo } from '../../../../../types/data/API.data';
import { TestLogItem } from './TestLogItem';
import { TestLogModal } from './TestLogModal';

interface TestLogBoxProps {
  apiId: number;
  lastLog?: ApiDetailLastLogInfo;
}

export const TestLogBox = ({ apiId, lastLog }: TestLogBoxProps) => {
  const modal = useModal();
  const popup = usePopup();

  const modalHandler = () => {
    if (lastLog) {
      modal.push({
        children: <TestLogModal apiId={apiId} />,
      });
    } else {
      popup.push({
        title: '테스트 로그',
        children: <Typography>테스트 이력이 존재하지 않습니다</Typography>,
        type: 'fail',
      });
    }
  };
  return (
    <Flexbox flexDirections="col" alignItems="start" style={{ rowGap: '1rem' }}>
      <Flexbox justifyContents="between" style={{ width: '100%' }}>
        <Typography>마지막으로 수행된 테스트 로그</Typography>
        <Typography size={0.825} color="disabled" onClick={modalHandler}>
          <div style={{ textDecoration: 'underline' }}>로그 더보기</div>
        </Typography>
      </Flexbox>
      <Flexbox
        flexDirections="col"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '1rem',
          backgroundColor: palette.grey['900'],
          borderRadius: '0.5rem',
        }}
      >
        {lastLog ? (
          <TestLogItem lastLog={lastLog} />
        ) : (
          <Typography>테스트를 진행해보세요</Typography>
        )}
      </Flexbox>
    </Flexbox>
  );
};
