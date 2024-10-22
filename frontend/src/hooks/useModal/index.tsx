import useModalStore, { ModalData } from '../../stores/useModalStore';

export type ModalPushProps = Pick<
  ModalData,
  'children' | 'animation' | 'onClose'
>;

const useModal = () => {
  const { pushModal, updateModal } = useModalStore();

  const push = ({
    children,
    animation = 'center',
    onClose,
  }: ModalPushProps) => {
    pushModal({
      children,
      animation,
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
