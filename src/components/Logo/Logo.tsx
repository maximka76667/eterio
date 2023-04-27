import React from 'react';
import logo from '../../images/logo512.png';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isSidebarOpened: boolean;
  closeSidebar: () => void;
}

const Logo = ({ isSidebarOpened, closeSidebar }: LogoProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' || isSidebarOpened ? (
        <Link to='/' onClick={closeSidebar} className='header__logo '>
          {' '}
          <img className='header__logo-img' src={logo} alt='Alcopedia' />{' '}
          <p className='ff-montse text-2xl'>Alcopedia</p>
        </Link>
      ) : (
        <p className='header__logo ff-montse text-2xl'>
          <img className='header__logo-img' src={logo} alt='Alcopedia' />
          Alcopedia
        </p>
      )}
    </>
  );
};

export default Logo;
