import { useRef } from 'react';
import useModalStore, { ModalData } from '../../stores/useModalStore';
import * as s from './modal.css';

interface ModalProps extends ModalData {
  color?: '100' | '200' | '300';
}

const Modal = ({
  color = '100',
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
    <div
      className={`${s.container} ${isClosing ? s.modalOut : s.modalIn}`}
      ref={modalRef}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={s.modal({ background: color })}>{children}</div>
    </div>
  );
};

export default Modal;
