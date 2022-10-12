import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import LineLoader from '../LineLoader/LineLoader';
import * as validator from 'email-validator';
import { LoginFormProps } from '../../interfaces';

const LoginForm = ({
  signIn,
  isLoginProcessing,
  isMenuOpened,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isChangedOnce, setIsChangedOnce] = useState(false);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChangedOnce(true);
    setEmail(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn(email);
  };

  useEffect(() => {
    setIsValidEmail(validator.validate(email));
  }, [email]);

  return (
    <form
      className={`header__login-form ${
        isMenuOpened ? 'header__login-form_opened' : ''
      }`}
      onSubmit={handleSubmit}
    >
      <span className='header__loader'>
        {isLoginProcessing && <LineLoader />}
      </span>
      <input
        className={`header__login-input ${
          !isValidEmail && isChangedOnce ? 'header__login-input_invalid' : ''
        }`}
        placeholder='Enter valid email'
        name='email'
        type='text'
        value={email}
        onChange={handleEmailChange}
      />
      <button
        className='header__login-button'
        disabled={!isValidEmail}
        type='submit'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
