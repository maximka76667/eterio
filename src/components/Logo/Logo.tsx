import React from 'react';
import { LogoProps } from '../../interfaces';
import LogoContainer from '../LogoContainer/LogoContainer';
import logo from '../../images/logo512.png';

const Logo = ({ isSidebarOpened, closeSidebar }: LogoProps) => {
  return (
    <LogoContainer
      isSidebarOpened={isSidebarOpened}
      closeSidebar={closeSidebar}
    >
      <img className='header__logo-img' src={logo} alt='Alcopedia' />
      <span>Alcopedia</span>
    </LogoContainer>
  );
};

export default Logo;
