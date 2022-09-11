import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Header.sass"
import logo from "../../images/logo512.png"

const Header = () => {

  const { pathname } = useLocation();

  return (
    <header className="header">
      <img className='header__logo-img' src={logo} alt="" />
      {
        pathname !== "/" ?
          <Link to="/" className='header__logo'>Alcopedia</Link> :
          <p className='header__logo'>Alcopedia</p>}
    </header>
  )
}

export default Header