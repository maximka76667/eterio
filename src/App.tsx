import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.sass';
import { Auth, Header, Loading } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import UserContext from './contexts/UserContext';
import { DrinkInterface, UserInterface } from './interfaces';
import api from './utils/api';
import auth from './utils/auth';

function App() {
  const [user, setUser] = useState<UserInterface>({ name: '', email: '' });
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginMessage, setLoginMessage] = useState('');

  async function getDrinks() {
    setIsLoading(true);
    const { drinks } = await api.getDrinks();
    setDrinks(drinks);
    setIsLoading(false);
  }

  useEffect(() => {
    getDrinks().catch((err) => console.log(err));
  }, []);

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const authorize = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);

    auth
      .getUser(token)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  };

  const signIn = (email: string) => {
    setLoginMessage('');
    auth
      .signIn(email)
      .then((res) => {
        if (res.data.ok === true) {
          setLoginMessage('Check link in your email!');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginMessage('Something went wrong! Please try again');
      });
  };

  const signInWithLink = (email: string, magicLink: string) => {
    auth
      .signInWithLink(email, magicLink)
      .then((res) => {
        if (res.data.ok === true) {
          authorize(res.data.token);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === undefined || token === null || token === '') {
      return;
    }

    authorize(token);
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
                  loginMessage={loginMessage}
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
              </>
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
