import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.sass';
import logo from '../../images/logo512.png';
import HeaderProps from './HeaderProps';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  openLoginPopup
}: HeaderProps) => {
  const { pathname } = useLocation();

  const currentUser = useContext(CurrentUserContext);
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
      <div className='header__auth-buttons'>
        <button className='header__auth-button'>Sign up</button>
        <button className='header__auth-button' onClick={openLoginPopup}>
          Sign in
        </button>
      </div>
      {currentUser?.id}
    </header>
  );
};

export default Header;
