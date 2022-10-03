import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Logo({
  isSidebarOpened,
  closeSidebar,
  children,
}: {
  isSidebarOpened: boolean;
  closeSidebar: () => void;
  children: JSX.Element[];
}) {
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

export default Logo;
