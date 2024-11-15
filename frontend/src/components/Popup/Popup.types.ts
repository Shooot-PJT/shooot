import { ReactNode } from 'react';
import { ModalColor } from '../Modal/Modal.types';

export type PopupColor = ModalColor;

export interface PopupData {
  title: string;
  color?: PopupColor;
  children: ReactNode;
  type?: 'success' | 'fail';
  opacity?: number;
  blur?: number;
  onClose?: () => void;
  isClosing: boolean;
}
