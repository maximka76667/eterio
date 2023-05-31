import React, { useEffect, useState } from 'react';
import './App.sass';
import { Header, Loading } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import api from './dataServices/api';
import LoginPopup from './components/LoginPopup/LoginPopup';
import authApi from './dataServices/auth';
import CurrentUserContext from './contexts/CurrentUserContext';
import RegistrationPopup from './components/RegistrationPopup/RegistrationPopup';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import UserUpdate from './interfaces/UserUpdate';
import InfoPopup from './components/InfoPopup/InfoPopup';
import CommunityDrinksContext from './contexts/CommunityDrinksContext';
import { Bottle, Category, Drink, DrinkCreate, User } from './interfaces';
import CategoriesContext from './contexts/CategoriesContext';
import UsersContext from './contexts/UsersContext';
import { BottlesContext } from './contexts';

function App() {
  // Drinks
  const [allDrinks, setAllDrinks] = useState<Drink[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [communityDrinks, setCommunityDrinks] = useState<Drink[]>([]);

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);

  // Users
  const [users, setUsers] = useState<User[]>([]);

  // Bottles
  const [bottles, setBottles] = useState<Bottle[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    api
      .getDrinks(source)
      .then((res) => {
        setAllDrinks(res);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    api
      .getCategories(source)
      .then((res) => {
        setCategories(res);
      })
      .catch((error) => {
        showError(error);
      });

    fetchUsers(source);

    api
      .getBottles()
      .then((res) => setBottles(res))
      .catch((error) => showError(error));

    return () => {
      source.cancel();
    };
  }, []);

  function fetchUsers(source: CancelTokenSource) {
    api
      .getUsers(source)
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        showError(error);
      });
  }

  useEffect(() => {
    const [matchDrinks, nonMatchDrinks] = partition<Drink>(
      allDrinks,
      (drink) => !drink.is_community
    );

    setDrinks(matchDrinks);
    setCommunityDrinks(nonMatchDrinks);
  }, [allDrinks]);

  function partition<T>(array: T[], callback: (element: T) => boolean) {
    const matches: T[] = [];
    const nonMatches: T[] = [];

    if (array !== undefined) {
      array.forEach((element) =>
        (callback(element) ? matches : nonMatches).push(element)
      );
    }

    return [matches, nonMatches];
  }

  // Popups
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  // Info
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [info, setInfo] = useState<{ title: string; message: string }>({
    title: 'Info title',
    message: 'Info message'
  });

  // Current user context
  const [currentUser, setCurrentUser] = useState(null);

  // Sidebar mobiles opened state
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  function showError(error: AxiosError) {
    setInfo({ title: error.name, message: error.message });
    setIsInfoPopupOpen(true);
  }

  function showInfo(info: { title: string; message: string }) {
    setIsInfoPopupOpen(true);
    setInfo(info);
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
            // change it to cookies
          })
          .catch((err) => console.log(err));
      })
      .catch((error: AxiosError) => {
        console.log(error);
        showError(error);
      });
  }

  function handleRegistration(email: string, name: string, password: string) {
    authApi
      .register(email, name, password)
      .then(() => {
        toggleAuthPopups(true);
      })
      .catch((error) => {
        showError(error);
        console.log(error);
      });
  }

  function handleToggleFavorite(isFavorite: boolean, drinkId: string) {
    const token = localStorage.getItem('access-token');

    if (currentUser === null || token == null) {
      setIsLoginPopupOpen(true);
      return;
    }

    api
      .toggleFavorite(isFavorite, token, drinkId)
      .then((res) => {
        const newAllDrinks = allDrinks.map((drink) => {
          if (drink.id === drinkId) {
            return { ...res };
          }
          return drink;
        });

        setAllDrinks(newAllDrinks);
      })
      .catch((error) => {
        showError(error);
        console.log(error);
      });
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('access-token');
  }

  const toggleAuthPopups = (toSignin: boolean) => {
    setIsRegistrationPopupOpen(!toSignin);
    setIsLoginPopupOpen(toSignin);
  };

  async function updateUser(newUser: UserUpdate) {
    try {
      const token = localStorage.getItem('access-token');

      if (token === null) {
        return;
      }

      const updatedUser = await api.updateUser(token, newUser);

      setCurrentUser(updatedUser);

      showInfo({ title: 'Perfect!', message: 'User updated successfully' });

      const source = axios.CancelToken.source();
      fetchUsers(source);
    } catch (error: any) {
      showError(error);
      console.log(error);
    }
  }

  function handleCreateDrink(newDrink: DrinkCreate) {
    const token = localStorage.getItem('access-token');

    if (token === null) {
      return;
    }

    api
      .createDrink(token, newDrink)
      .then((newCreatedDrink) => {
        setCommunityDrinks((drinks) => [...drinks, newCreatedDrink]);
      })
      .catch((error) => {
        console.log(error);
        showError(error);
      });
  }

  function handleDeleteDrink(id: string) {
    const token = localStorage.getItem('access-token');

    if (token === null) {
      return;
    }

    api
      .deleteDrink(token, id)
      .then(() => {
        const newAllDrinks = allDrinks.filter((drink) => drink.id !== id);
        setAllDrinks(newAllDrinks);
      })
      .catch((error) => {
        console.log(error);
        showError(error);
      });
  }

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
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('access-token');
        showError(error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header
          isSidebarOpened={isSidebarOpened}
          closeSidebar={closeSidebar}
          openLoginPopup={() => setIsLoginPopupOpen(true)}
          openRegistrationPopup={() => setIsRegistrationPopupOpen(true)}
          handleLogout={handleLogout}
        />
        <DrinksContext.Provider value={drinks}>
          <UsersContext.Provider value={users}>
            <CommunityDrinksContext.Provider value={communityDrinks}>
              <CategoriesContext.Provider value={categories}>
                <BottlesContext.Provider value={bottles}>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <Content
                      isSidebarOpened={isSidebarOpened}
                      toggleSidebar={() => {
                        setIsSidebarOpened(
                          (isSidebarOpened) => !isSidebarOpened
                        );
                      }}
                      closeSidebar={closeSidebar}
                      onToggleFavorite={handleToggleFavorite}
                      onUserUpdate={updateUser}
                      onOpenLoginPopup={() => setIsLoginPopupOpen(true)}
                      onCreateDrink={handleCreateDrink}
                      onDeleteDrink={handleDeleteDrink}
                    />
                  )}
                </BottlesContext.Provider>
              </CategoriesContext.Provider>
            </CommunityDrinksContext.Provider>
          </UsersContext.Provider>
        </DrinksContext.Provider>
        <LoginPopup
          handleLogin={handleLogin}
          onClose={() => setIsLoginPopupOpen(false)}
          redirectSignup={() => toggleAuthPopups(false)}
          isOpen={isLoginPopupOpen}
        />
        <RegistrationPopup
          handleRegistration={handleRegistration}
          redirectSignin={() => toggleAuthPopups(true)}
          onClose={() => setIsRegistrationPopupOpen(false)}
          isOpen={isRegistrationPopupOpen}
        />
        {info !== undefined && (
          <InfoPopup
            classNames='lg:w-1/3 sm:w-5/6'
            title={info.title}
            message={info.message}
            isOpen={isInfoPopupOpen}
            onClose={() => setIsInfoPopupOpen(false)}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
