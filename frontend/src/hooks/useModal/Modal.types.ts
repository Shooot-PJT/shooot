import { ReactNode } from 'react';

export type ModalColor = '100' | '200' | '300';

export interface ModalData {
  color?: ModalColor;
  children: ReactNode;
  onClose?: () => void;
  isClosing: boolean;
}
