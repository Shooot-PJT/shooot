import { useEffect, useRef, useState } from 'react';
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
  const [motionClass, setMotionClass] = useState<string>(s.popupOut);
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const { popups, popPopup, updatePopup } = usePopupStore();
  const { modals } = useModalStore();

  useEffect(() => {
    if (!isClosing) {
      setMotionClass(s.popupIn);
      setIsOpening(true);
    } else {
      setMotionClass(s.popupOut);
      setIsOpening(false);
    }

    if (isClosing && onClose) {
      onClose();
    }
  }, [isClosing, onClose]);

  const handleTransitionEnd = () => {
    if (isClosing && !isOpening) {
      if (popups.length === 1 && modals.length === 0) {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
      popPopup();
    }
  };

  return (
    <div
      className={`${s.container} ${motionClass}`}
      ref={popupRef}
      onClick={updatePopup}
      onTransitionEnd={handleTransitionEnd}
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
