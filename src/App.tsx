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
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

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
        if (res.data.ok === true) {
          login(res.data.token);

          console.log(res.data.token);

          auth
            .getUser(res.data.token)
            .then((res) => {
              if (res.status === 200) {
                setUser(res.data.user);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token);

    if (token === undefined || token === null || token === '') {
      setIsLoggedIn(false);
    } else {
      auth
        .getUser(token)
        .then((res) => {
          if (res.status === 200) {
            login(token);
            setUser(res.data.user);
          }
        })
        .catch((err) => console.log(err));
      // auth
      //   .verifyToken(JSON.parse(token))
      //   .then((res) => {
      //     console.log(token);
      //     // login(token);
      //     // setUser(res.data.succ);
      //     setIsLoggedIn(true);
      //   })
      //   .catch((err) => {
      //     console.log('Error: ', err);
      //     setIsLoggedIn(false);
      //   });
    }
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
