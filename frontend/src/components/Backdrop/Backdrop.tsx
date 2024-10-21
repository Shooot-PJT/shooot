import { ReactNode, useEffect, useRef, useState } from 'react';
import * as s from './Backdrop.css';

export interface BackDropProps {
  isOpen: boolean;
  opacity?: number;
  blur?: number;
  children: ReactNode;
}

export const Backdrop = ({
  isOpen,
  opacity = 40,
  blur = 40,
  children,
}: BackDropProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  console.log('렌더링');

  useEffect(() => {
    if (isOpen && !isVisible) {
      setIsVisible(true);
    }
  }, [isOpen, isVisible]);

  const handleAnimationStart = (e: React.AnimationEvent) => {
    if (e.target === backdropRef.current && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === backdropRef.current && !isOpen) {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${s.backdrop} ${isOpen ? s.fadeIn : s.fadeOut}`}
      style={
        {
          '--opacity': opacity / 100,
          '--blur': `${(1 / 10) * blur}px`,
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
