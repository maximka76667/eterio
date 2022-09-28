import React, {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.sass';
import logo from '../../images/logo512.png';
import { HeaderProps } from '../../interfaces';
import UserContext from '../../contexts/UserContext';

const Header = ({
  closeSidebar,
  isSidebarOpened,
  signIn,
  isLoggedIn,
  logout,
}: HeaderProps) => {
  const { pathname } = useLocation();
  const user = useContext(UserContext);

  const [email, setEmail] = useState('');

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn(email);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className='header'>
      {pathname !== '/' || isSidebarOpened ? (
        <Link to='/' onClick={closeSidebar} className='header__logo'>
          {' '}
          <img className='header__logo-img' src={logo} alt='Alcopedia' />{' '}
          Alcopedia
        </Link>
      ) : (
        <p className='header__logo'>
          {' '}
          <img className='header__logo-img' src={logo} alt='Alcopedia' />{' '}
          Alcopedia
        </p>
      )}
      {isLoggedIn ? (
        <div>
          {user.email}
          {user.name}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form className='header__buttons' onSubmit={handleSubmit}>
          <input
            name='email'
            type='text'
            value={email}
            onChange={handleEmailChange}
          />
          <button className='header__login' type='submit'>
            Login
          </button>
        </form>
      )}
    </header>
  );
};

export default Header;
