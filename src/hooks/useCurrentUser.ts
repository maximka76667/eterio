import { useState, useEffect } from 'react';
import useToken from './useToken';
import { User, UserUpdate } from '../interfaces';
import { api, authApi } from '../dataServices';
import { AxiosError } from 'axios';

const useCurrentUser = (onUserUpdate: (newUser: User) => void) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const { token, onTokenChange } = useToken();

  async function onUpdateUser(newUser: UserUpdate) {
    if (token === null) {
      return;
    }

    const updatedUser = await api.updateUser(token, newUser);

    setCurrentUser(updatedUser);

    onUserUpdate(updatedUser);
  }

  async function onLogin(email: string, password: string) {
    const res = await authApi.login(email, password);

    const promise = api.getCurrentUser(res.access_token);
    const currentUser = await promise;
    setCurrentUser(currentUser);
    onTokenChange(res.access_token);

    return await promise;
  }

  async function onRegistration(email: string, name: string, password: string) {
    return await authApi.register(email, name, password);
  }

  function onLogout() {
    setCurrentUser(null);
    localStorage.removeItem('access-token');
  }

  useEffect(() => {
    if (token === null) {
      return;
    }

    api
      .getCurrentUser(token)
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((error) => {
        localStorage.removeItem('access-token');
        setError(error);
      });
  }, []);

  return {
    error,
    currentUser,
    onUpdateUser,
    onLogin,
    onRegistration,
    onLogout
  };
};

export default useCurrentUser;
