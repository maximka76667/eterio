import React from 'react';
import PopupProps from './PopupProps';
import './Popup.sass';

const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__overlay' onClick={onClose}></div>
      <div className='popup__content lg:w-3/6 sm:w-full md:w-5/6'>
        {children}
        <button className='popup__close-button' onClick={onClose}>
          <span className='popup__close-button-stick'></span>
          <span className='popup__close-button-stick'></span>
        </button>
      </div>
    </div>
  );
};

export default Popup;
