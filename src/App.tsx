import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

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

  // const login = (token) => {
  //   localStorage.setItem('token', JSON.stringify(token));
  //   setIsLoggedIn(true);
  // };

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setIsLoggedIn(false);
  // };

  const signIn = async (email: string) => {
    await auth.signIn(email);
  };

  const signInWithLink = async (email: string, magicLink: string) => {
    console.log(email, magicLink);
  };

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
