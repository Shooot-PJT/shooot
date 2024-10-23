import useModalStore from '../../stores/useModalStore';
import { ModalData } from './Modal.types';

export type ModalPushProps = Pick<ModalData, 'color' | 'children' | 'onClose'>;

const useModal = () => {
  const { pushModal, updateModal } = useModalStore();

  const push = ({ color, children, onClose }: ModalPushProps) => {
    pushModal({
      color,
      children,
      onClose: onClose,
      isClosing: false,
    });
  };

  const pop = () => {
    updateModal();
  };

  return { push, pop };
};

export default useModal;
