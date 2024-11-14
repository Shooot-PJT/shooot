import Button from '../../components/Button';
import Flexbox from '../../components/Flexbox';
import Graph from '../../components/Graph/Graph';
import Typography from '../../components/Typography';
import useModal from '../../hooks/useModal';
import usePopup from '../../hooks/usePopup';
import { DataTable } from '../ServerTest/components/DataTable/DataTable';

export const Tmp = () => {
  const modal = useModal();
  const popup = usePopup();

  const handleTestModal = () => {
    modal.push({
      children: (
        <div style={{ width: '80vw', minHeight: '100vh' }}>
          <Graph frameColor={'secondary'} lineColor={'secondary'} />
          <Graph frameColor={'put'} lineColor={'put'} />
          <Graph frameColor={'get'} lineColor={'get'} />
          <DataTable
            colWidths={[20, 20, 20, 20, 20]}
            headers={['1번', '2번', '3번', '4번', '5번']}
            data={[]}
          />
        </div>
      ),
    });
  };

  const handlePopup = () => {
    popup.push({
      title: '팝업입니다',
      children: (
        <>
          <Typography>내용입니다</Typography>
        </>
      ),
    });
  };

  const handleModal = () => {
    modal.push({
      children: (
        <Flexbox flexDirections="col">
          <Button onClick={modal.pop}>닫기</Button>
          <Button onClick={handleModal}>모달추가</Button>
        </Flexbox>
      ),
      onClose: () => {
        console.log(
          '%c슛🚀',
          'color:#825cff; font-size: 2rem; font-weight: 800',
        );
      },
    });
  };
  return (
    <>
      <Graph frameColor="primary" lineColor="primary" />
      <Button
        onClick={handleModal}
        children="모달추가"
        rounded={0.5}
        paddingX={0.5}
        paddingY={0.25}
      />
      <Button
        onClick={handlePopup}
        children="팝업추가"
        rounded={0.5}
        paddingX={0.5}
        paddingY={0.25}
      />
      <Button onClick={handleTestModal} children="테스트 모달" />
    </>
  );
};
