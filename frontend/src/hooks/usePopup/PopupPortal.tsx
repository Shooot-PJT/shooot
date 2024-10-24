import ReactDOM from 'react-dom';
import usePopupStore from '../../stores/usePopupStore';
import Backdrop from '../../components/Backdrop';
import darkTheme from '../../styles/darkTheme.css';
import React from 'react';
import Popup from './Popup';

const PopupPortal = () => {
  const { popups } = usePopupStore();
  const popupRoot = document.getElementById('popup-root');

  if (!popupRoot) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={darkTheme}>
      {popups.map((popup, index) => (
        <React.Fragment key={index}>
          <Backdrop
            opacity={popup.opacity}
            blur={popup.blur}
            isClosing={popup.isClosing}
          >
            <Popup
              title={popup.title}
              type={popup.type}
              onClose={popup.onClose}
              isClosing={popup.isClosing}
            >
              {popup.children}
            </Popup>
          </Backdrop>
        </React.Fragment>
      ))}
    </div>,
    popupRoot,
  );
};

export default PopupPortal;
