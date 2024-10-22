import ReactDOM from 'react-dom';
import Backdrop from '../../components/Backdrop';
import useModalStore from '../../stores/useModalStore';
import Modal from './Modal';

const ModalPortal = () => {
  const { modals } = useModalStore();
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      {modals.map((modal, index) => (
        <Backdrop isClosing={modal.isClosing} key={index}>
          <Modal
            animation={modal.animation}
            onClose={modal.onClose}
            isClosing={modal.isClosing}
          >
            {modal.children}
          </Modal>
        </Backdrop>
      ))}
    </>,
    modalRoot,
  );
};

export default ModalPortal;
