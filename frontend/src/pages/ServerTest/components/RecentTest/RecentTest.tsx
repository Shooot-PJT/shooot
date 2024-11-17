import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { GetTestRecordResponse } from '../../types';
import { convertTestRecordTable } from '../../utils';
import { DataTable } from '../DataTable/DataTable';
import { TestResultModal } from '../TestResultModal/TestResultModal';

interface RecentTestProps {
  testRecords: GetTestRecordResponse[];
}

export const RecentTest = ({ testRecords }: RecentTestProps) => {
  const modal = useModal();

  const handleTestDetail = (id: number) => {
    modal.push({
      children: <TestResultModal id={id} />,
    });
  };

  const headers = [
    '파일명/버전',
    '테스트 시작 시간',
    '테스트 작동 결과',
    '테스트 API 개수',
    '소요시간',
    '결과조회',
  ];
  const colWidths = [25, 25, 15, 10, 15, 20];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography size={1.5} weight="600">
        최근 테스트 이력
      </Typography>
      <DataTable
        headers={headers}
        colWidths={colWidths}
        data={convertTestRecordTable(testRecords, handleTestDetail)}
      />
    </div>
  );
};
