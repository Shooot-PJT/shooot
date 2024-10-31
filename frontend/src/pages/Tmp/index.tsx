import Button from '../../components/Button';
import Flexbox from '../../components/Flexbox';
import Graph from '../../components/Graph/Graph';
import Typography from '../../components/Typography';
import useModal from '../../hooks/useModal';
import usePopup from '../../hooks/usePopup';

export const Tmp = () => {
  const modal = useModal();
  const popup = usePopup();

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
      <Graph frameColor="primary" lineColor="put" />
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
    </>
  );
};
