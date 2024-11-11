import Button from '../../../../components/Button';
import useModal from '../../../../hooks/useModal';
import { DataTable } from '../DataTable/DataTable';
import { Header } from './Header';

export const TestResultModal = () => {
  const modal = useModal();

  return (
    <>
      <Header />
      <DataTable data={[]} colWidths={[50, 50]} headers={['1', '2']} />
      <Button
        color="delete"
        onClick={() => {
          modal.pop();
        }}
      >
        닫기
      </Button>
    </>
  );
};
