import React, { useContext } from 'react';
import './Header.sass';
import HeaderProps from './HeaderProps';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Logo from '../Logo/Logo';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  openLoginPopup,
  handleLogout
}: HeaderProps) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className='header'>
      <Logo closeSidebar={closeSidebar} isSidebarOpened={isSidebarOpened} />
      {currentUser != null ? (
        <div className='header__auth-buttons'>
          <p>{currentUser.email}</p>
          <button className='header__auth-button' onClick={handleLogout}>
            Sign out
          </button>
        </div>
      ) : (
        <div className='header__auth-buttons'>
          <button className='header__auth-button'>Sign up</button>
          <button className='header__auth-button' onClick={openLoginPopup}>
            Sign in
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
