import { useRef } from 'react';
import usePopupStore from '../../stores/usePopupStore';
import * as s from './Popup.css';
import Typography from '../Typography';
import Button from '../Button';
import Flexbox from '../Flexbox';
import { PopupData } from './Popup.types';

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
  const { popPopup, updatePopup } = usePopupStore();

  const handleOnClose = (e: React.AnimationEvent) => {
    if (e.target === popupRef.current && isClosing && onClose) {
      onClose();
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target === popupRef.current && isClosing) {
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
        <Flexbox bg={color} justifyContent="end">
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
