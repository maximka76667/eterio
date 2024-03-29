import React, { useContext } from 'react';
import './Header.sass';
import HeaderProps from './HeaderProps';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LogoWrapper from '../LogoWrapper/LogoWrapper';
import { NavLink } from 'react-router-dom';

const Header = ({
  onLogoClick,
  isSidebarOpened,
  openLoginPopup,
  openRegistrationPopup,
  handleLogout
}: HeaderProps) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className='header'>
      <div className='flex items-center md:gap-20 gap-5'>
        <LogoWrapper
          onLogoClick={onLogoClick}
          isSidebarOpened={isSidebarOpened}
        />
        <NavLink className='header__nav-link text-xl' to='/mixer'>
          Mixer
        </NavLink>
      </div>
      <div className='header__auth-buttons'>
        {currentUser != null ? (
          <>
            <button className='header__auth-button' onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className='header__auth-link' onClick={openLoginPopup}>
              Log In
            </button>
            <button
              className='header__auth-button'
              onClick={openRegistrationPopup}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
