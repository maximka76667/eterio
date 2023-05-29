import React, {
  useState,
  useEffect,
  useContext,
  MouseEventHandler
} from 'react';
import { CurrentUserContext } from '../../contexts';
import { Drink } from '../../interfaces';
import { NavLink } from 'react-router-dom';
import FavoritesStar from '../FavoritesStar/FavoritesStar';

interface CommunityDrinksLinkProps {
  drink: Drink;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
}

const CommunityDrinkLink = ({
  drink: { id, code, name, img, favorites },
  onToggleFavorite
}: CommunityDrinksLinkProps) => {
  const currentUser = useContext(CurrentUserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const [isFavoriting, setIsFavoriting] = useState(false);

  const toggleFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setIsFavoriting(true);

    onToggleFavorite(isFavorite, id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsFavoriting(false);
      })

    if (currentUser == null) {
      return;
    }

    setIsFavorite((isFavorite) => !isFavorite);
  };

  useEffect(() => {
    if (currentUser === null) {
      setIsFavorite(false);
      return;
    }

    if (favorites.includes(currentUser.id)) {
      setIsFavorite(true);
    }
  }, [currentUser]);

  return (
    <NavLink
      className={({ isActive }) =>
        'text-lg sidebar__link w-full h-[550px] ff-montse py-4 px-4 flex flex-col' +
        (isActive ? ' sidebar__link_active' : '')
      }
      to={code}
    >
      <div
        className='w-full h-full flex justify-center items-center'
        style={{ backgroundColor: '#e6e6e6' }}
      >
        <img
          className='w-full h-full rounded object-cover'
          src={img}
          alt={name}
        />
      </div>
      <div className='sidebar__info w-full mt-5 pb-2 px-4 flex justify-between'>
        <p>{name}</p>
        <button
          className={`flex sidebar__favorites ${
            isFavorite ? 'sidebar__favorites_active' : ''
          }`}
          onClick={toggleFavorite}
        >
          <p className='mr-2'>{favorites.length}</p>
          <FavoritesStar />
        </button>
      </div>
    </NavLink>
  );
};

export default CommunityDrinkLink;
