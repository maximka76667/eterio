import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import LogoWrapperProps from './LogoWrapperProps';

const LogoWrapper = ({ isSidebarOpened, closeSidebar }: LogoWrapperProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' || isSidebarOpened ? (
        <Link to='/' onClick={closeSidebar} className='header__logo '>
          <Logo />
        </Link>
      ) : (
        <div className='header__logo text-2xl'>
          <Logo />
        </div>
      )}
    </>
  );
};

export default LogoWrapper;
