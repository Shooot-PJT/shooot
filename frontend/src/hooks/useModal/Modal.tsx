import { useEffect, useRef, useState } from 'react';
import useModalStore from '../../stores/useModalStore';
import * as s from './modal.css';
import { ModalColor, ModalData } from './Modal.types';

interface ModalProps extends ModalData {
  color?: ModalColor;
  isMobile?: boolean;
}

const Modal = ({
  color = '300',
  children,
  onClose,
  isClosing,
  isMobile = false,
}: ModalProps) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [moveY, setMoveY] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { popModal, updateModal } = useModalStore();

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.setProperty('--moveY', `${moveY}px`);
    }
  }, [moveY]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null) {
      const diff = e.touches[0].clientY - startY;
      if (diff > 0) {
        setMoveY(diff);
        if (modalRef.current) {
          modalRef.current.style.transform = `translateY(${diff}px)`;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (moveY > 100) {
      if (modalRef.current) {
        updateModal();
      }
    } else {
      if (modalRef.current) {
        modalRef.current.style.transition = 'transform 0.4s ease';
        modalRef.current.style.transform = `translateY(0)`;
      }
      setMoveY(0);
    }
    setStartY(null);
  };

  const handleOnClose = (e: React.AnimationEvent) => {
    if (e.target === modalRef.current && isClosing && onClose) {
      onClose();
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === modalRef.current && isClosing) {
      popModal();
    }
  };

  return (
    <div
      className={`${s.container} ${isClosing ? s.modalOut : s.modalIn}`}
      ref={modalRef}
      onAnimationStart={handleOnClose}
      onAnimationEnd={handleAnimationEnd}
      style={
        {
          '--moveY': moveY,
        } as React.CSSProperties
      }
    >
      <div className={s.modal({ background: color })}>
        {isMobile && (
          <div
            ref={headerRef}
            className={s.modalHeader}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={s.bar}></div>
          </div>
        )}
        <div className={s.contentContainer}>
          <div className={s.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
