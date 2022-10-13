import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.sass';
import { Auth, Header, Loading, Popup } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import UserContext from './contexts/UserContext';
import { DrinkInterface, UserInterface } from './interfaces';
import api from './utils/api';
import auth from './utils/auth';

function App() {
  const [user, setUser] = useState<UserInterface>({ name: '', email: '' });
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);

  // Main Loading
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginProcessing, setIsLoginProcessing] = useState(false);

  // Sidebar States
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  // Popup States
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  // Drinks functions
  async function getDrinks() {
    return (await api.getDrinks()).data.drinks;
  }

  // Sidebar functions
  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  // Popup functions
  function closePopup() {
    setIsPopupOpened(false);
  }

  function showNotification(title: string, message: string, err?: Error) {
    setIsPopupOpened(true);
    setPopupTitle(title);
    if (err) {
      return setPopupMessage(`${message}. ${err.message}`);
    }
    setPopupMessage(message);
  }

  // Auth functions
  const authorize = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);

    auth
      .getUser(token)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        logout();
        console.log(err);
      });
  };

  const signIn = (email: string) => {
    setIsLoginProcessing(true);
    auth
      .signIn(email)
      .then(() => {
        showNotification('Got you! 🙃', 'Check link in your email!');
      })
      .catch((err: Error) => {
        console.log(err);
        showNotification(
          'Oopsy! 🦀',
          'Something went wrong! Please try again',
          err
        );
      })
      .finally(() => {
        setIsLoginProcessing(false);
      });
  };

  const signInWithLink = (email: string, magicLink: string) => {
    auth
      .signInWithLink(email, magicLink)
      .then((res) => {
        authorize(res.data.token);
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  function checkToken() {
    const token = localStorage.getItem('token');

    if (token === undefined || token === null || token === '') {
      return;
    }

    authorize(token);
  }

  // Fetch drinks and check auth token
  useEffect(() => {
    setIsAppLoading(true);
    Promise.all([getDrinks(), checkToken()])
      .then(([drinks]) => {
        setDrinks(drinks);
      })
      .catch((err) => {
        console.log(err);
        showNotification('Oops', 'Error on loading app', err);
      })
      .finally(() => {
        setIsAppLoading(false);
      });
  }, []);

  return (
    <div className='app'>
      <UserContext.Provider value={user}>
        <Routes>
          <Route
            path='/auth/:email/:link'
            element={<Auth signInWithLink={signInWithLink} />}
          />
          <Route
            path='/*'
            element={
              <>
                <Header
                  isSidebarOpened={isSidebarOpened}
                  closeSidebar={closeSidebar}
                  signIn={signIn}
                  isLoggedIn={isLoggedIn}
                  logout={logout}
                  isLoginProcessing={isLoginProcessing}
                />
                <DrinksContext.Provider value={drinks}>
                  {isAppLoading ? (
                    <Loading size={5} />
                  ) : (
                    <Content
                      isSidebarOpened={isSidebarOpened}
                      toggleSidebar={toggleSidebar}
                      closeSidebar={closeSidebar}
                    />
                  )}
                </DrinksContext.Provider>
              </>
            }
          />
        </Routes>
      </UserContext.Provider>
      <Popup
        isPopupOpened={isPopupOpened}
        closePopup={closePopup}
        popupTitle={popupTitle}
        loginMessage={popupMessage}
      />
    </div>
  );
}

export default App;
