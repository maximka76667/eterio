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
  UsersContext,
  LoadingContext
} from './contexts';

import { api } from './dataServices';
import {
  useCurrentUser,
  useDrinks,
  useUsers,
  useWindowDimensions
} from './hooks';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const { width: windowWidth } = useWindowDimensions();
  function handleListItemClick() {
    if (windowWidth <= 768) {
      return closeSidebar();
    }
  }

  // Users
  const { users, onUserUpdate } = useUsers();

  // Current user custom hook
  const {
    currentUser,
    error: userError,
    token,
    onLogin,
    onRegistration,
    onUpdateUser,
    onGoogleAuth,
    onLogout
  } = useCurrentUser(onUserUpdate);

  // Drinks custom hook
  const {
    officialDrinks,
    communityDrinks,
    isLoading: isDrinksLoading,
    error,
    onAddCommunityDrink,
    onToggleFavorite,
    onDeleteCommunityDrink
  } = useDrinks(token);

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
      .catch(showError);

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
  const [isLoading, setIsLoading] = useState(false);

  // Info
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [info, setInfo] = useState<{ title: string; message: string }>({
    title: 'Info title',
    message: 'Info message'
  });

  // Sidebar mobiles opened state
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  useEffect(() => {
    if (windowWidth <= 768) {
      setIsSidebarOpened(false);
    }
  }, []);

  function showError(error: AxiosError<{ detail?: string }>) {
    console.log(error);
    setInfo({
      title: error.response?.data.detail ?? 'Error',
      message: error.message
    });
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

  useEffect(() => {
    const errorToShow = error ?? userError;

    if (errorToShow !== null) {
      showError(errorToShow);
    }
  }, [error]);

  // Current user
  function handleLogin(email: string, password: string) {
    setIsLoading(true);
    onLogin(email, password)
      .then(() => setIsLoginPopupOpen(false))
      .catch(showError)
      .finally(() => setIsLoading(false));
  }

  function handleRegistration(email: string, name: string, password: string) {
    setIsLoading(true);

    onRegistration(email, name, password)
      .then(() => toggleAuthPopups(true))
      .catch(showError)
      .finally(() => setIsLoading(false));
  }

  function handleGoogleAuth(email: string, name: string, password: string) {
    setIsLoading(true);
    onGoogleAuth(email, name, password)
      .then(() => setIsLoginPopupOpen(false))
      .catch(showError)
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    onLogout();
  }

  async function updateUser(newUser: UserUpdate) {
    const promise = onUpdateUser(newUser);

    setIsLoading(true);

    promise
      .then(() => {
        showInfo({ title: 'Perfect!', message: 'User updated successfully' });
        navigate('/me');
      })
      .catch(showError)
      .finally(() => {
        setIsLoading(false);
      });

    return await promise;
  }

  // Drinks
  function handleCreateDrink(newDrink: DrinkCreate) {
    setIsLoading(true);

    onAddCommunityDrink(newDrink)
      .then(() => {
        navigate('/community');
      })
      .catch(showError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteDrink(id: string) {
    setIsLoading(true);

    onDeleteCommunityDrink(id)
      .then(() => {
        navigate('/community');
      })
      .catch(showError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoadingContext.Provider value={isLoading}>
        <div className='app'>
          <Header
            isSidebarOpened={isSidebarOpened}
            onLogoClick={handleListItemClick}
            openLoginPopup={() => setIsLoginPopupOpen(true)}
            openRegistrationPopup={() => setIsRegistrationPopupOpen(true)}
            handleLogout={handleLogout}
          />
          <OfficialDrinksContext.Provider value={officialDrinks}>
            <UsersContext.Provider value={users}>
              <CommunityDrinksContext.Provider value={communityDrinks}>
                <CategoriesContext.Provider value={categories}>
                  <BottlesContext.Provider value={bottles}>
                    {isDrinksLoading ? (
                      <Loading />
                    ) : (
                      <Content
                        windowWidth={windowWidth}
                        onListItemClick={handleListItemClick}
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
            onGoogleAuth={handleGoogleAuth}
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
      </LoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
