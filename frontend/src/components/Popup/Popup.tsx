import { useRef } from 'react';
import usePopupStore from '../../stores/usePopupStore';
import * as s from './Popup.css';
import Typography from '../Typography';
import Button from '../Button';
import Flexbox from '../Flexbox';
import { PopupData } from './Popup.types';
import useModalStore from '../../stores/useModalStore';

type PopupProps = PopupData;

const Popup = ({
  color = '300',
  title,
  type = 'success',
  children,
  onClose,
  isClosing,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const { popups, popPopup, updatePopup } = usePopupStore();
  const { modals } = useModalStore();

  const handleOnClose = (e: React.AnimationEvent) => {
    if (e.target === popupRef.current && isClosing && onClose) {
      onClose();
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === popupRef.current && isClosing) {
      if (popups.length === 1 && modals.length === 0) {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
      popPopup();
    }
  };

  return (
    <div
      className={`${s.container} ${isClosing ? s.popupOut : s.popupIn}`}
      ref={popupRef}
      onClick={updatePopup}
      onAnimationStart={handleOnClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={s.popup({ background: color })}>
        <div>
          <Typography size={1.5} weight="600">
            {title}
          </Typography>
        </div>
        <div className={s.contentContainer}>
          <div className={s.content}>{children}</div>
        </div>
        <Flexbox justifyContents="end">
          <Button
            color={type === 'success' ? 'primary' : 'delete'}
            onClick={updatePopup}
            children="확인"
            rounded={0.5}
            paddingX={1}
            paddingY={0.5}
          />
        </Flexbox>
      </div>
    </div>
  );
};

export default Popup;