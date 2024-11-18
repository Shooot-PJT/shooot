import useModalStore from '../../stores/useModalStore';
import { ModalData } from '../../components/Modal/Modal.types';

export type ModalPushProps = Pick<
  ModalData,
  'opacity' | 'blur' | 'color' | 'children' | 'onClose'
>;

const useModal = () => {
  const { pushModal, updateModal } = useModalStore();

  const push = (modalProps: ModalPushProps) => {
    pushModal({
      ...modalProps,
      isClosing: false,
    });
  };

  const pop = () => {
    updateModal();
  };

  return { push, pop };
};

export default useModal;
