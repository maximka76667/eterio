import React from 'react';
import Popup from '../Popup/Popup';
import infoMarkImage from '../../images/info-mark.webp';

interface InfoPopupProps {
  title: string;
  message: string;
  onClose: () => void;
  isOpen: boolean;
  classNames: string;
}

const InfoPopup = ({
  title,
  message,
  classNames,
  ...props
}: InfoPopupProps) => {
  return (
    <Popup {...props} classNames={classNames}>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src={infoMarkImage}
            alt='Success mark'
          />
          <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>
            {title}
          </h2>
          <p className='mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900'>
            {message}
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default InfoPopup;
