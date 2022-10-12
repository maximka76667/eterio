import React, { useState } from 'react';
import './Header.sass';
import { HeaderProps } from '../../interfaces';
import Logo from '../Logo/Logo';
import UserInfo from '../UserInfo/UserInfo';
import LoginForm from '../LoginForm/LoginForm';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  signIn,
  isLoggedIn,
  logout,
  isLoginProcessing,
}: HeaderProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function toggleMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <header className='header'>
      <Logo closeSidebar={closeSidebar} isSidebarOpened={isSidebarOpened} />
      <button className='header__menu-button' onClick={toggleMenu}>
        👦🏼
      </button>
      {isLoggedIn ? (
        <UserInfo logout={logout} isMenuOpened={isMenuOpened} />
      ) : (
        <LoginForm
          signIn={signIn}
          isLoginProcessing={isLoginProcessing}
          isMenuOpened={isMenuOpened}
        />
      )}
    </header>
  );
};

export default Header;
