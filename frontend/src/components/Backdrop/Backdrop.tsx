import { ReactNode, useRef, useEffect } from 'react';
import * as s from './Backdrop.css';

export interface BackDropProps {
  isClosing: boolean;
  opacity?: number;
  blur?: number;
  children: ReactNode;
}

export const Backdrop = ({ isClosing, children }: BackDropProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const isStorybook = window.location.port === '6006';

  useEffect(() => {
    const backdropElement = backdropRef.current;
    if (backdropElement && !isClosing && !isStorybook) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  }, [isClosing, isStorybook]);

  return (
    <div className={`${s.backdrop}`} ref={backdropRef}>
      {children}
    </div>
  );
};
