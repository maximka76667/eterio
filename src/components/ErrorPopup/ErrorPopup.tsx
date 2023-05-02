import React from 'react';
import Popup from '../Popup/Popup';

interface ErrorPopupProps {
  errorTitle: string;
  errorMessage: string;
  onClose: () => void;
  isOpen: boolean;
  classNames: string;
}

const ErrorPopup = ({
  errorTitle,
  errorMessage,
  classNames,
  ...props
}: ErrorPopupProps) => {
  return (
    <Popup {...props} classNames={classNames}>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>
            {errorTitle}
          </h2>
          <p className='mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900'>
            {errorMessage}
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default ErrorPopup;
