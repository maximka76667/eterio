import React from 'react';
import logo from '../../images/logo512.png';

const Logo = () => {
  return (
    <>
      <img className='header__logo-img' src={logo} alt='Eterio' />
      <p className='ff-montse text-2xl hidden md:block'>Eterio</p>
    </>
  );
};

export default Logo;
