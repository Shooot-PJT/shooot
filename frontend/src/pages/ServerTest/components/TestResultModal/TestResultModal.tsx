import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { DataTable } from '../DataTable/DataTable';
import { Header } from './Header';

export const TestResultModal = () => {
  const modal = useModal();
  const headers = ['데이터 이름', '평균 값', '최고값', '최저값', '현재값'];

  return (
    <>
      <Header />
      <DataTable data={[]} colWidths={[28, 18, 18, 18, 18]} headers={headers} />
      <Flexbox justifyContents="end" style={{ marginTop: '1rem' }}>
        <Button
          color="delete"
          paddingX={2}
          paddingY={0.5}
          onClick={() => {
            modal.pop();
          }}
        >
          닫기
        </Button>
      </Flexbox>
    </>
  );
};
