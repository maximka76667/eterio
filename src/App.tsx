import React, { useEffect, useState } from 'react';
import './App.sass';
import { Header, Loading } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import api from './utils/api';
import LoginPopup from './components/LoginPopup/LoginPopup';
import authApi from './utils/auth';
import CurrentUserContext from './contexts/CurrentUserContext';
import RegistrationPopup from './components/RegistrationPopup/RegistrationPopup';
import useFetchDrinks from './hooks/useFetchDrinks';

function App() {
  const { drinks, isLoading } = useFetchDrinks();

  // Popups' states
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  // Current user context
  const [currentUser, setCurrentUser] = useState(null);

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpened((isSidebarOpened) => !isSidebarOpened);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  function toggleIsLoginPopupOpen(isOpen: boolean) {
    setIsLoginPopupOpen(isOpen);
  }

  function toggleIsRegistrationPopupOpen(isOpen: boolean) {
    setIsRegistrationPopupOpen(isOpen);
  }

  function openLoginPopup() {
    toggleIsLoginPopupOpen(true);
  }

  function handleLogin(email: string, password: string) {
    authApi
      .login(email, password)
      .then((res) => {
        api
          .getCurrentUser(res.access_token)
          .then((currentUser) => {
            setCurrentUser(currentUser);
            setIsLoginPopupOpen(false);
            localStorage.setItem('access-token', res.access_token);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        // todo error popup
      });
  }

  function handleRegistration(email: string, name: string, password: string) {
    authApi
      .register(email, name, password)
      .then((res) => {
        console.log(res);
        toggleIsRegistrationPopupOpen(false);
        toggleIsLoginPopupOpen(true);
      })
      .catch((err) => console.log(err));
  }

  function handleToggleFavorite(isFavorite: boolean, drinkId: string) {
    const token = localStorage.getItem('access-token');

    if (token === null) {
      setIsLoginPopupOpen(true);
      return;
    }

    api
      .toggleFavorite(isFavorite, token, drinkId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('access-token');
  }

  const redirectAuthPopups = (toSignin: boolean) => {
    toggleIsRegistrationPopupOpen(!toSignin);
    toggleIsLoginPopupOpen(toSignin);
  };

  useEffect(() => {
    const token = localStorage.getItem('access-token');

    if (token === null) {
      return;
    }

    api
      .getCurrentUser(token)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        setIsLoginPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header
          isSidebarOpened={isSidebarOpened}
          closeSidebar={closeSidebar}
          openLoginPopup={openLoginPopup}
          openRegistrationPopup={() => toggleIsRegistrationPopupOpen(true)}
          handleLogout={handleLogout}
        />
        <DrinksContext.Provider value={drinks}>
          {isLoading ? (
            <Loading />
          ) : (
            <Content
              isSidebarOpened={isSidebarOpened}
              toggleSidebar={toggleSidebar}
              closeSidebar={closeSidebar}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </DrinksContext.Provider>
        <LoginPopup
          handleLogin={handleLogin}
          onClose={() => toggleIsLoginPopupOpen(false)}
          redirectSignup={() => redirectAuthPopups(false)}
          isOpen={isLoginPopupOpen}
        />
        <RegistrationPopup
          handleRegistration={handleRegistration}
          redirectSignin={() => redirectAuthPopups(true)}
          onClose={() => toggleIsRegistrationPopupOpen(false)}
          isOpen={isRegistrationPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
