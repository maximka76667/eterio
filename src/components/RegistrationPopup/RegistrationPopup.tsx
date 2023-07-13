import React, { FormEvent, useState, useContext } from 'react';
import Popup from '../Popup/Popup';

import fountain from '../../images/fountain.svg';
import { LoadingContext } from '../../contexts';

import eye from '../../images/eye.png';
import hiddenEye from '../../images/hidden.png';

interface RegistrationPopupProps {
  isOpen: boolean;
  handleRegistration: (email: string, name: string, password: string) => void;
  redirectSignin: () => void;
  onClose: () => void;
}

const RegistrationPopup = ({
  isOpen,
  handleRegistration,
  redirectSignin,
  onClose
}: RegistrationPopupProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useContext(LoadingContext);

  const [isHidden, setIsHidden] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleRegistration(email, name, password);
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      classNames='w-full sm:w-full md:w-5/6 lg:w-3/6'
    >
      <div className='flex flex-1 flex-col justify-center px-6 py-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='popup__title text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>
            Create a new account
          </h2>
        </div>

        <div className='popup__form-wrapper sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='popup__form' onSubmit={handleSubmit}>
            <div>
              <div className='mt-2'>
                <input
                  id='signup__email'
                  placeholder='Email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='popup__input block w-full rounded-md border-0'
                />
              </div>
            </div>

            <div>
              <div className='mt-2'>
                <input
                  id='signup__name'
                  placeholder='Name'
                  name='name'
                  type='name'
                  autoComplete='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='popup__input block w-full rounded-md border-0'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-2 relative'>
                <input
                  id='signup__password'
                  placeholder='Password'
                  name='password'
                  type={isHidden ? 'password' : 'text'}
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='popup__input block w-full rounded-md border-0 text-gray-900'
                />
                <button
                  onClick={() => setIsHidden((isHidden) => !isHidden)}
                  className='popup__hide-password'
                  type='button'
                >
                  <img src={isHidden ? hiddenEye : eye} />
                </button>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='popup__submit-button flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
              >
                {isLoading ? (
                  <img className='submit-img' src={fountain} />
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>

          <p className='popup__redirect-link mt-2 text-center text-sm text-gray-500'>
            Already has an account?{' '}
            <button
              onClick={redirectSignin}
              className='font-semibold leading-6 text-emerald-600 hover:text-emerald-500 transition-all'
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default RegistrationPopup;
