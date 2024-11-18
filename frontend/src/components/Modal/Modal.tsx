import { useRef } from 'react';
import useModalStore from '../../stores/useModalStore';
import usePopupStore from '../../stores/usePopupStore';
import * as s from './Modal.css';
import { ModalColor, ModalData } from './Modal.types';

interface ModalProps extends ModalData {
  color?: ModalColor;
  isMobile?: boolean;
}

const Modal = ({ color = '300', children, onClose, isClosing }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modals, popModal } = useModalStore();
  const { popups } = usePopupStore();

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === modalRef.current && isClosing) {
      if (popups.length === 0 && modals.length === 1) {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
      popModal();
    }
  };

  const handleOnClose = (e: React.AnimationEvent) => {
    if (e.target === modalRef.current && isClosing && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`${s.container} ${isClosing ? s.modalOut : s.modalIn}`}
      ref={modalRef}
      onAnimationStart={handleOnClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={s.modal({ background: color })}>
        <div className={s.contentContainer}>
          <div className={s.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
