import React from 'react';
import PopupProps from './PopupProps';
import './Popup.sass';

const Popup = ({ isOpen, onClose, children, classNames }: PopupProps) => {
  return (
    <div className={`popup${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__overlay' onClick={onClose}></div>
      <div
        className={`popup__content max-w-full sm:max-w-full md:max-w-5/6 lg:max-w-3/6 ${
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
