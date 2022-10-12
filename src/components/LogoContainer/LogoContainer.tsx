import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoContainerProps } from '../../interfaces';

function LogoContainer({
  isSidebarOpened,
  closeSidebar,
  children,
}: LogoContainerProps) {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' || isSidebarOpened ? (
        <Link to='/' onClick={closeSidebar} className='header__logo'>
          {children}
        </Link>
      ) : (
        <p className='header__logo'>{children}</p>
      )}
    </>
  );
}

export default LogoContainer;
