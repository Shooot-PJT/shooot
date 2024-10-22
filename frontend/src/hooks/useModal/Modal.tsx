import { useRef } from 'react';
import useModalStore, { ModalData } from '../../stores/useModalStore';
import * as s from './modal.css';
type ModalProps = ModalData;

const Modal = ({
  children,
  animation = 'center',
  onClose,
  isClosing,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { popModal } = useModalStore();

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === modalRef.current && isClosing) {
      popModal();
    }
  };
  return (
    <div className={s.modal} ref={modalRef} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  );
};

export default Modal;
