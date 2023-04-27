import { useEffect, useState } from 'react';
import { DrinkInterface } from '../interfaces';
import api from '../utils/api';

const useFetchDrinks = () => {
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getDrinks()
      .then(setDrinks)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    drinks,
    isLoading
  };
};

export default useFetchDrinks;
