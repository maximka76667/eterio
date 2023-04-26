import React, { useEffect, useState } from 'react';
import './App.sass';
import { Header, Loading } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import { DrinkInterface } from './interfaces';
import api from './utils/api';
import LoginPopup from './components/LoginPopup/LoginPopup';
import authApi from './utils/auth';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  async function getDrinks() {
    setIsLoading(true);
    const drinks = await api.getDrinks();
    setDrinks(drinks);
    setIsLoading(false);
  }

  useEffect(() => {
    getDrinks().catch((err) => console.log(err));
  }, []);

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpened((isSidebarOpened) => !isSidebarOpened);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  function toggleIsPopupOpen(isOpen: boolean) {
    setIsLoginPopupOpen(isOpen);
  }

  function openLoginPopup() {
    toggleIsPopupOpen(true);
  }

  function handleLogin(email: string, password: string) {
    auth(email, password)
      .then((res) => {
        getCurrentUser(res.access_token)
          .then((currentUser) => setCurrentUser(currentUser))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        // todo error popup
      });
  }

  async function auth(email: string, password: string) {
    return await authApi.login(email, password);
  }

  async function getCurrentUser(token: string) {
    return await api.getCurrentUser(token);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header
          isSidebarOpened={isSidebarOpened}
          closeSidebar={closeSidebar}
          openLoginPopup={openLoginPopup}
        />
        <DrinksContext.Provider value={drinks}>
          {isLoading ? (
            <Loading />
          ) : (
            <Content
              isSidebarOpened={isSidebarOpened}
              toggleSidebar={toggleSidebar}
              closeSidebar={closeSidebar}
            />
          )}
        </DrinksContext.Provider>
        <LoginPopup
          handleLogin={handleLogin}
          onClose={() => toggleIsPopupOpen(false)}
          isOpen={isLoginPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
