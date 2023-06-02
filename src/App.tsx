import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import './App.sass';

import {
  Header,
  Loading,
  Content,
  LoginPopup,
  RegistrationPopup,
  InfoPopup
} from './components';

import { Bottle, Category, DrinkCreate, UserUpdate } from './interfaces';

import {
  BottlesContext,
  CategoriesContext,
  CommunityDrinksContext,
  DrinksContext as OfficialDrinksContext,
  CurrentUserContext,
  UsersContext
} from './contexts';

import { api } from './dataServices';
import { useCurrentUser, useDrinks, useUsers } from './hooks';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  // Drinks custom hook
  const {
    officialDrinks,
    communityDrinks,
    isLoading,
    error,
    onAddCommunityDrink,
    onToggleFavorite,
    onDeleteCommunityDrink
  } = useDrinks();

  // Users
  const { users, onUserUpdate } = useUsers();

  // Current user custom hook
  const {
    currentUser,
    error: userError,
    onLogin,
    onRegistration,
    onUpdateUser,
    onLogout
  } = useCurrentUser(onUserUpdate);

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);

  // Bottles
  const [bottles, setBottles] = useState<Bottle[]>([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    api
      .getCategories(source)
      .then((res) => {
        setCategories(res);
      })
      .catch((error) => {
        showError(error);
      });

    api
      .getBottles()
      .then((res) => setBottles(res))
      .catch((error) => showError(error));

    return () => {
      source.cancel();
    };
  }, []);

  // Popups
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  // Info
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [info, setInfo] = useState<{ title: string; message: string }>({
    title: 'Info title',
    message: 'Info message'
  });

  // Sidebar mobiles opened state
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  function showError(error: AxiosError) {
    console.log(error);
    setInfo({ title: error.name, message: error.message });
    setIsInfoPopupOpen(true);
  }

  function showInfo(info: { title: string; message: string }) {
    setIsInfoPopupOpen(true);
    setInfo(info);
  }

  function handleToggleFavorite(isFavorite: boolean, drinkId: string) {
    if (currentUser === null) {
      setIsLoginPopupOpen(true);
      return;
    }

    onToggleFavorite(isFavorite, drinkId);
  }

  const toggleAuthPopups = (toSignin: boolean) => {
    setIsRegistrationPopupOpen(!toSignin);
    setIsLoginPopupOpen(toSignin);
  };

  function handleCreateDrink(newDrink: DrinkCreate) {
    onAddCommunityDrink(newDrink);
  }

  function handleDeleteDrink(id: string) {
    onDeleteCommunityDrink(id);
  }

  useEffect(() => {
    const errorToShow = error ?? userError;

    if (errorToShow !== null) {
      showError(errorToShow);
    }
  }, [error]);

  // Current user
  function handleLogin(email: string, password: string) {
    onLogin(email, password)
      .then(() => setIsLoginPopupOpen(false))
      .catch(showError);
  }

  function handleRegistration(email: string, name: string, password: string) {
    onRegistration(email, name, password)
      .then(() => toggleAuthPopups(true))
      .catch(showError);
  }

  function handleLogout() {
    onLogout();
  }

  async function updateUser(newUser: UserUpdate) {
    const promise = onUpdateUser(newUser);

    promise
      .then(() => {
        showInfo({ title: 'Perfect!', message: 'User updated successfully' });
        navigate('/me');
      })
      .catch(showError);

    return await promise;
  }

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
        <OfficialDrinksContext.Provider value={officialDrinks}>
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
        </OfficialDrinksContext.Provider>
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
