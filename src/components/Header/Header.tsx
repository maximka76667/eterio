import React, {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useContext,
} from 'react';
import './Header.sass';
import logo from '../../images/logo512.png';
import { HeaderProps } from '../../interfaces';
import UserContext from '../../contexts/UserContext';
import Logo from '../Logo/Logo';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  signIn,
  isLoggedIn,
  logout,
  loginMessage,
}: HeaderProps) => {
  const user = useContext(UserContext);

  const [email, setEmail] = useState('');

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn(email);
  };

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
            <span className='header__login-message'>{loginMessage}</span>
            <input
              className='header__login-input'
              name='email'
              type='text'
              value={email}
              onChange={handleEmailChange}
            />
            <button className='header__login-button' type='submit'>
              Login
            </button>
          </form>
        </>
      )}
    </header>
  );
};

export default Header;
