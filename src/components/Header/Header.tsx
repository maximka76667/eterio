import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Header.sass"

const Header = () => {

  const { pathname } = useLocation();

  return (
    <header className="header">
      {
        pathname !== "/" ?
          <Link to="/" className='header__logo'>Alcopedia</Link> :
          <p className='header__logo'>Alcopedia</p>}
    </header>
  )
}

export default Header