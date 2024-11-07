import { ReactNode, useRef } from 'react';
import * as s from './Backdrop.css';

export interface BackDropProps {
  isClosing: boolean;
  opacity?: number;
  blur?: number;
  children: ReactNode;
}

export const Backdrop = ({
  isClosing,
  opacity = 40,
  blur = 0,
  children,
}: BackDropProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const isStorybook = window.location.port === '6006';

  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (e.target === backdropRef.current && !isClosing && !isStorybook) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === backdropRef.current && isClosing) {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  };

  return (
    <div
      className={`${s.backdrop} ${isClosing ? s.fadeOut : s.fadeIn}`}
      style={
        {
          '--opacity': opacity / 100,
          '--blur': `${(1 / 25) * blur}px`,
        } as React.CSSProperties
      }
      ref={backdropRef}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};
