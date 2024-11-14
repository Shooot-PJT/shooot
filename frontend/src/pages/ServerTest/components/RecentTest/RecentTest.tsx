import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { DataTable } from '../DataTable/DataTable';
import { StateIcon } from '../StateIcon/StateIcon';
import { TestResultModal } from '../TestResultModal/TestResultModal';

export const RecentTest = () => {
  const modal = useModal();

  const handleTestDetail = () => {
    modal.push({
      children: <TestResultModal />,
    });
  };

  const data = [
    [
      'myproject - 0.0.5',
      '2024-10-16 18:32:25',
      <StateIcon state="정상종료" />,
      <Typography color="primary">5</Typography>,
      <Typography color="primary">4분 17초</Typography>,
      <Button paddingY={0.3} onClick={handleTestDetail}>
        상세보기
      </Button>,
    ],
    [
      'myproject - 0.0.5',
      '2024-10-16 18:32:25',
      <StateIcon state="정상종료" />,
      <Typography color="primary">5</Typography>,
      <Typography color="primary">4분 17초</Typography>,
      <Button paddingY={0.3} onClick={handleTestDetail}>
        상세보기
      </Button>,
    ],
    [
      'myproject - 0.0.5',
      '2024-10-16 18:32:25',
      <StateIcon state="정상종료" />,
      <Typography color="primary">5</Typography>,
      <Typography color="primary">4분 17초</Typography>,
      <Button paddingY={0.3} onClick={handleTestDetail}>
        상세보기
      </Button>,
    ],
    [
      'myproject - 0.0.5',
      '2024-10-16 18:32:25',
      <StateIcon state="런타임에러" />,
      <Typography color="primary">5</Typography>,
      <Typography color="primary">4분 17초</Typography>,
      <Button paddingY={0.3} color="grey" disabled>
        상세보기
      </Button>,
    ],
    [
      'myproject - 0.0.5',
      '2024-10-16 18:32:25',
      <StateIcon state="정상종료" />,
      <Typography color="primary">5</Typography>,
      <Typography color="primary">4분 17초</Typography>,
      <Button paddingY={0.3} onClick={handleTestDetail}>
        상세보기
      </Button>,
    ],
  ];
  const headers = [
    '버전',
    '테스트 시작 시간',
    '테스트 작동 결과',
    '테스트 API 개수',
    '소요시간',
    '결과조회',
  ];
  const colWidths = [25, 25, 15, 10, 15, 20];
  return (
    <div>
      <Typography size={2}>최근 테스트 이력</Typography>
      <DataTable headers={headers} colWidths={colWidths} data={data} />
    </div>
  );
};
