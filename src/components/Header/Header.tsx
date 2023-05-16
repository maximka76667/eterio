import React, { useContext } from 'react';
import './Header.sass';
import HeaderProps from './HeaderProps';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LogoWrapper from '../LogoWrapper/LogoWrapper';
import { NavLink } from 'react-router-dom';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  openLoginPopup,
  openRegistrationPopup,
  handleLogout
}: HeaderProps) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className='header'>
      <div className='flex items-center gap-10'>
        <LogoWrapper
          closeSidebar={closeSidebar}
          isSidebarOpened={isSidebarOpened}
        />
        <NavLink className='text-xl' to='/mixer'>
          Mixer
        </NavLink>
      </div>
      <div className='header__auth-buttons'>
        {currentUser != null ? (
          <>
            <button
              className='header__auth-button w-[100px] py-2 px-4 ff-montse'
              onClick={handleLogout}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              className='header__auth-button w-[100px] py-2 px-4 ff-amasic'
              onClick={openRegistrationPopup}
            >
              Sign up
            </button>
            <button
              className='header__auth-button w-[100px] py-2 px-4 ff-amasic'
              onClick={openLoginPopup}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
