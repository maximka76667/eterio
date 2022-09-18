import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.sass';
import logo from '../../images/logo512.png';
import { HeaderProps } from '../../interfaces';

const Header = ({ closeSidebar, isSidebarOpened }: HeaderProps) => {
  const { pathname } = useLocation();

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
    </header>
  );
};

export default Header;
