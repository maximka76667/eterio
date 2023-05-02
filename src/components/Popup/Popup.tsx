import React from 'react';
import PopupProps from './PopupProps';
import './Popup.sass';

const Popup = ({ isOpen, onClose, children, classNames }: PopupProps) => {
  return (
    <div className={`popup${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__overlay' onClick={onClose}></div>
      <div
        className={`popup__content w-full sm:w-full md:w-5/6 lg:w-3/6 ${
          classNames ?? ''
        }`}
      >
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
