import { useState, useEffect } from 'react';
import { User } from '../interfaces';
import { api } from '../dataServices';
import axios, { AxiosError } from 'axios';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState<AxiosError | null>(null);

  function onUserUpdate(updatedUser: User) {
    setUsers((users) =>
      users.map((user) => {
        if (user.id === updatedUser.id) {
          console.log(updatedUser);
          return updatedUser;
        }
        return user;
      })
    );
  }

  useEffect(() => {
    const source = axios.CancelToken.source();

    api
      .getUsers(source)
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        setError(error);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return { users, error, onUserUpdate };
};

export default useUsers;
