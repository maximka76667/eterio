import { useEffect, useState } from 'react';
import { Drink } from '../interfaces';
import api from '../utils/api';
import axios, { AxiosError } from 'axios';

const useFetchDrinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [communityDrinks, setCommunityDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    api
      .getDrinks(source)
      .then((res) => {
        const [matchDrinks, nonMatchDrinks] = partition<Drink>(
          res,
          (drink) => !drink.is_community
        );

        setDrinks(matchDrinks);
        setCommunityDrinks(nonMatchDrinks);
      })
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

  function partition<T>(array: T[], callback: (element: T) => boolean) {
    const matches: T[] = [];
    const nonMatches: T[] = [];

    array.forEach((element) =>
      (callback(element) ? matches : nonMatches).push(element)
    );

    return [matches, nonMatches];
  }

  return {
    drinks,
    communityDrinks,
    isLoading,
    error
  };
};

export default useFetchDrinks;
