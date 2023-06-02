import { useEffect, useState } from 'react';
import { Drink, DrinkCreate } from '../interfaces';
import api from '../dataServices/api';
import axios, { AxiosError } from 'axios';
import useToken from './useToken';

const useDrinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [officialDrinks, setOfficialDrinks] = useState<Drink[]>([]);
  const [communityDrinks, setCommunityDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const { token } = useToken();

  function onAddCommunityDrink(newDrink: DrinkCreate) {
    if (token === null) {
      return;
    }

    api
      .createDrink(token, newDrink)
      .then((newDrink) => {
        setCommunityDrinks((drinks) => [...drinks, newDrink]);
      })
      .catch(setError);
  }

  function onToggleFavorite(isFavorite: boolean, drinkId: string) {
    if (token === null) {
      return;
    }

    api
      .toggleFavorite(isFavorite, token, drinkId)
      .then((res) => {
        const newDrinks = drinks.map((drink) => {
          if (drink.id === drinkId) {
            return { ...res };
          }
          return drink;
        });

        setDrinks(newDrinks);
      })
      .catch(setError);
  }

  function onDeleteCommunityDrink(id: string) {
    if (token === null) {
      return;
    }

    api
      .deleteDrink(token, id)
      .then(() => {
        const newDrinks = drinks.filter((drink) => drink.id !== id);
        setDrinks(newDrinks);
      })
      .catch(setError);
  }

  useEffect(() => {
    // Fetch drinks
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

  useEffect(() => {
    const [officialDrinks, communityDrinks] = partition<Drink>(
      drinks,
      (drink) => !drink.is_community
    );

    setOfficialDrinks(officialDrinks);
    setCommunityDrinks(communityDrinks);
  }, [drinks]);

  return {
    drinks,
    officialDrinks,
    communityDrinks,
    isLoading,
    error,
    onToggleFavorite,
    onAddCommunityDrink,
    onDeleteCommunityDrink
  };
};

export default useDrinks;
