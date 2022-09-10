import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.sass"

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className='header__logo'>Alcopedia</Link>
    </header>
  )
}

export default Header