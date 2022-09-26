import React, { ChangeEventHandler, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.sass';
import logo from '../../images/logo512.png';
import { HeaderProps } from '../../interfaces';

const Header = ({ closeSidebar, isSidebarOpened }: HeaderProps) => {
  const { pathname } = useLocation();

  const [email, setEmail] = useState('');

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = () => {
    console.log(email);
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
      <div className='header__buttons'>
        <input
          name='email'
          type='text'
          value={email}
          onChange={handleEmailChange}
        />
        <button className='header__login' onClick={handleLogin}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
