import ReactDOM from 'react-dom';
import Backdrop from '../../components/Backdrop';
import useModalStore from '../../stores/useModalStore';
import Modal from './Modal';
import darkTheme from '../../styles/darkTheme.css';
import { Mobile } from '../../components/Layout/Mobile';
import { Desktop } from '../../components/Layout/Desktop';
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
          <Desktop>
            <Backdrop
              isClosing={modal.isClosing}
              opacity={modal.opacity}
              blur={modal.blur}
            >
              <Modal onClose={modal.onClose} isClosing={modal.isClosing}>
                {modal.children}
              </Modal>
            </Backdrop>
          </Desktop>
          <Mobile>
            <Backdrop isClosing={modal.isClosing}>
              <Modal
                onClose={modal.onClose}
                isClosing={modal.isClosing}
                isMobile={true}
              >
                {modal.children}
              </Modal>
            </Backdrop>
          </Mobile>
        </React.Fragment>
      ))}
    </div>,
    modalRoot,
  );
};

export default ModalPortal;
