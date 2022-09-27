import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.sass';
import { Auth, Header, Loading } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import { DrinkInterface } from './interfaces';
import api from './utils/api';
import auth from './utils/auth';

function App() {
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const login = (token: string) => {
    localStorage.setItem('token', JSON.stringify(token));
    setIsLoggedIn(true);
  };

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setIsLoggedIn(false);
  // };

  const signIn = (email: string) => {
    auth
      .signIn(email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithLink = (email: string, magicLink: string) => {
    auth
      .signInWithLink(email, magicLink)
      .then((res) => {
        if (res !== null) {
          login(res.data.token);
        }
      })
      .catch((err) => console.log(err));
  };

  const verifyToken = async (token: string) => {
    auth
      .verifyToken(token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token);

    if (token === null) {
      return setIsLoggedIn(false);
    }

    verifyToken(JSON.parse(token))
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='app'>
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
    </div>
  );
}

export default App;
