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
import ErrorPopup from './components/ErrorPopup/ErrorPopup';
import { AxiosError, AxiosResponse } from 'axios';
import UserUpdate from './interfaces/UserUpdate';
import InfoPopup from './components/InfoPopup/InfoPopup';
import CommunityDrinksContext from './contexts/CommunityDrinksContext';

function App() {
  const {
    drinks,
    communityDrinks,
    isLoading,
    error: fetchDrinksError
  } = useFetchDrinks();

  // Popups
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  // Error popup
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState<AxiosResponse>();
  // const [errorTitle, seterrorTitle] = useState('Error');
  // const [errorMessage, setErrorMessage] = useState('Something went wrong...');

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
    setErrorResponse(error.response);
    setIsErrorPopupOpen(true);
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
      .then((res) => console.log(res))
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
        throw new Error('Token error');
      }

      const updatedUser = await api.updateUser(token, newUser);

      setCurrentUser(updatedUser);

      showInfo({ title: 'Perfect!', message: 'User updated successfully' });
    } catch (error: any) {
      showError(error);
      console.log(error);
      throw new Error('Updating error');
    }
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
        console.log(error.response);
        showError(error);
      });
  }, []);

  useEffect(() => {
    if (fetchDrinksError === null) {
      return;
    }
    showError(fetchDrinksError);
  }, [fetchDrinksError]);

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
          <CommunityDrinksContext.Provider value={communityDrinks}>
            {isLoading ? (
              <Loading />
            ) : (
              <Content
                isSidebarOpened={isSidebarOpened}
                toggleSidebar={() => {
                  setIsSidebarOpened((isSidebarOpened) => !isSidebarOpened);
                }}
                closeSidebar={closeSidebar}
                onToggleFavorite={handleToggleFavorite}
                onUserUpdate={updateUser}
              />
            )}
          </CommunityDrinksContext.Provider>
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
        {errorResponse !== undefined && (
          <ErrorPopup
            classNames='lg:w-1/3 sm:w-5/6'
            errorMessage={errorResponse.data?.detail}
            errorTitle={errorResponse.request.statusText}
            isOpen={isErrorPopupOpen}
            onClose={() => setIsErrorPopupOpen(false)}
          />
        )}
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
