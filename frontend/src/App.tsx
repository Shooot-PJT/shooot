import './App.css';
import useModal from './hooks/useModal';
import ModalPortal from './hooks/useModal/ModalPortal';

function App() {
  const modal = useModal();
  const handleModal = () => {
    modal.push({
      children: (
        <>
          <button onClick={modal.pop}>하이용</button>
          <button onClick={handleModal}>모달추가</button>
        </>
      ),
    });
  };
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleModal();
        }}
      >
        백드랍
      </button>
      <ModalPortal />
    </>
  );
}

export default App;
