import ReactDOM from 'react-dom';
import Backdrop from '../../components/Backdrop';
import useModalStore from '../../stores/useModalStore';
import Modal from '../../components/Modal/Modal';
import darkTheme from '../../styles/darkTheme.css';
import React from 'react';

const ModalPortal = () => {
  const { modals } = useModalStore();
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={darkTheme}>
      {modals.map((modal, index) => (
        <React.Fragment key={index}>
          <Backdrop
            isClosing={modal.isClosing}
            opacity={modal.opacity}
            blur={modal.blur}
          >
            <Modal onClose={modal.onClose} isClosing={modal.isClosing}>
              {modal.children}
            </Modal>
          </Backdrop>
        </React.Fragment>
      ))}
    </div>,
    modalRoot,
  );
};

export default ModalPortal;
