import usePopupStore from '../../stores/usePopupStore';
import { PopupData } from './Popup.types';

export type PopupPushProps = Pick<
  PopupData,
  'title' | 'opacity' | 'blur' | 'type' | 'color' | 'children' | 'onClose'
>;

const usePopup = () => {
  const { pushPopup, updatePopup } = usePopupStore();

  const push = (popupProps: PopupPushProps) => {
    pushPopup({
      ...popupProps,
      isClosing: false,
    });
  };

  const pop = () => {
    updatePopup();
  };

  return { push, pop };
};

export default usePopup;
