import React, {
  FormEvent,
  useState,
  useContext,
  useRef,
  useEffect
} from 'react';
import Popup from '../Popup/Popup';
import { LoadingContext } from '../../contexts';
import './LoginPopup.sass';

import fountain from '../../images/fountain.gif';

import eye from '../../images/eye.png';
import hiddenEye from '../../images/hidden.png';

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
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current && isOpen) {
      inputElement.current.focus();
    }
  }, [isOpen]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isHidden, setIsHidden] = useState(true);

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
      <div className='flex min-h-full flex-1 flex-col justify-center py-10 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='popup__title text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        {/* TO DO hiding password, clear password validation, stay logged in checkbox */}
        <div className='popup__form-wrapper sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='mt-2'>
                <input
                  ref={inputElement}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='popup__input block w-full rounded-md placeholder:text-gray-400 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='mt-5 relative'>
              <input
                id='password'
                name='password'
                type={isHidden ? 'password' : 'text'}
                autoComplete='current-password'
                required
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className='popup__input block w-full rounded-md px-4 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6'
              />
              <button
                onClick={() => setIsHidden((isHidden) => !isHidden)}
                className='popup__hide-password'
                type='button'
              >
                <img src={isHidden ? hiddenEye : eye} />
              </button>
            </div>
            <div className='flex items-center justify-end'>
              <div className='m-1 text-sm'>
                <a
                  href='#'
                  className='font-semibold text-emerald-600 hover:text-emerald-500 transition-all'
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='popup__submit-button flex w-full justify-center rounded-md px-3 py-2 font-semibold leading-6 text-white shadow-sm'
              >
                {isLoading ? (
                  <img className='popup__submit-img' src={fountain} />
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <p className='popup__redirect-link mt-2 text-center text-sm text-gray-500'>
            Don&apos;t have an account?{' '}
            <button
              onClick={redirectSignup}
              className='font-semibold leading-6 text-emerald-600 hover:text-emerald-500 transition-all'
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
