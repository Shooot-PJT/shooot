import { useEffect, useRef, useState } from 'react';
import useModalStore from '../../stores/useModalStore';
import * as s from './Modal.css';
import { ModalColor, ModalData } from './Modal.types';
import usePopupStore from '../../stores/usePopupStore';

interface ModalProps extends ModalData {
  color?: ModalColor;
  isMobile?: boolean;
}

const Modal = ({ color = '300', children, onClose, isClosing }: ModalProps) => {
  const [motionClass, setMotionClass] = useState<string>(s.modalOut);
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const { modals, popModal } = useModalStore();
  const { popups } = usePopupStore();

  useEffect(() => {
    if (!isClosing) {
      setMotionClass(s.modalIn);
      setIsOpening(true);
    } else {
      setMotionClass(s.modalOut);
      setIsOpening(false);
    }

    if (isClosing && onClose) {
      onClose();
    }
  }, [isClosing, onClose]);

  const handleTransitionEnd = () => {
    if (isClosing && !isOpening) {
      if (popups.length === 0 && modals.length === 1) {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
      popModal();
    }
  };

  return (
    <div
      className={`${s.container} ${motionClass}`}
      ref={modalRef}
      onTransitionEnd={handleTransitionEnd}
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
