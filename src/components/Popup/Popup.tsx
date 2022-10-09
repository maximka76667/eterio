import React from 'react';
import { PopupProps } from '../../interfaces';
import './Popup.sass';

const Popup = ({
  isPopupOpened,
  closePopup,
  popupTitle,
  loginMessage,
}: PopupProps) => {
  return (
    <div className={`popup ${isPopupOpened ? 'popup_visible' : ''}`}>
      <div className='popup__overlay' onClick={closePopup}></div>
      <div className='popup__content'>
        <h2 className='popup__title'>{popupTitle}</h2>
        <p className='popup__message'>{loginMessage}</p>
        <button className='popup__close-button' onClick={closePopup}>
          X
        </button>
      </div>
    </div>
  );
};

export default Popup;
