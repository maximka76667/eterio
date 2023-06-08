import React, { FormEvent, useState, useContext } from 'react';
import Popup from '../Popup/Popup';
import { LoadingContext } from '../../contexts';
import './LoginPopup.sass';

import logo from '../../images/logo512.png';
import fountain from '../../images/fountain.gif';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  redirectSignup: () => void;
  handleLogin: (email: string, password: string) => void;
}

const LoginPopup = ({
  onClose,
  isOpen,
  redirectSignup,
  handleLogin
}: LoginPopupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useContext(LoadingContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(email, password);
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      classNames='w-full sm:w-full md:w-5/6 lg:w-3/6'
    >
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img className='mx-auto h-10 w-auto' src={logo} alt='Your Company' />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-emerald-600 hover:text-emerald-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
              >
                {isLoading ? (
                  <img className='submit-img' src={fountain} />
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don&apos;t have an account?{' '}
            <button
              onClick={redirectSignup}
              className='font-semibold leading-6 text-emerald-600 hover:text-emerald-500'
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default LoginPopup;
