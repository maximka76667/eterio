import React, {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react';
import './Header.sass';
import logo from '../../images/logo512.png';
import { HeaderProps } from '../../interfaces';
import UserContext from '../../contexts/UserContext';
import Logo from '../Logo/Logo';
import LineLoader from '../LineLoader/LineLoader';
import * as validator from 'email-validator';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  signIn,
  isLoggedIn,
  logout,
  isLoginProcessing,
}: HeaderProps) => {
  const user = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isChangedOnce, setIsChangedOnce] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChangedOnce(true);
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  function validateEmail(email: string) {
    if (!validator.validate(email)) {
      return setIsValidEmail(false);
    }
    return setIsValidEmail(true);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn(email);
  };

  useEffect(() => {
    setIsValidForm(isValidEmail);
  }, [email]);

  return (
    <header className='header'>
      <Logo isSidebarOpened={isSidebarOpened} closeSidebar={closeSidebar}>
        <img className='header__logo-img' src={logo} alt='Alcopedia' />
        <span>Alcopedia</span>
      </Logo>
      {isLoggedIn ? (
        <div className='header__user-info'>
          <span className='header__user-email'>{user.email}</span>
          <button className='header__logout' onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <form className='header__login-form' onSubmit={handleSubmit}>
            <span className='header__loader'>
              {isLoginProcessing && <LineLoader />}
            </span>
            <input
              className={`header__login-input ${
                !isValidEmail && isChangedOnce
                  ? 'header__login-input_invalid'
                  : ''
              }`}
              placeholder='Enter valid email'
              name='email'
              type='text'
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className='header__login-button'
              disabled={!isValidForm}
              type='submit'
            >
              Login
            </button>
          </form>
        </>
      )}
    </header>
  );
};

export default Header;
