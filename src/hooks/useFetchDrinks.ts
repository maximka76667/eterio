import { useEffect, useState } from 'react';
import { Drink } from '../interfaces';
import api from '../utils/api';
import axios, { AxiosError } from 'axios';

const useFetchDrinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    api
      .getDrinks(source)
      .then(setDrinks)
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return {
    drinks,
    isLoading,
    error
  };
};

export default useFetchDrinks;
