import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.sass';
import logo from '../../images/logo512.png';
import { HeaderProps } from '../../interfaces';

const Header = ({ closeSidebar, isSidebarOpened, signIn }: HeaderProps) => {
  const { pathname } = useLocation();

  const [email, setEmail] = useState('');

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = () => {
    signIn(email);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <header className='header'>
      {pathname !== '/' || isSidebarOpened ? (
        <Link to='/' onClick={closeSidebar} className='header__logo'>
          {' '}
          <img className='header__logo-img' src={logo} alt='Alcopedia' />{' '}
          Alcopedia
        </Link>
      ) : (
        <p className='header__logo'>
          {' '}
          <img className='header__logo-img' src={logo} alt='Alcopedia' />{' '}
          Alcopedia
        </p>
      )}
      <form className='header__buttons' onSubmit={handleSubmit}>
        <input
          name='email'
          type='text'
          value={email}
          onChange={handleEmailChange}
        />
        <button className='header__login' onClick={handleLogin}>
          Login
        </button>
      </form>
    </header>
  );
};

export default Header;
