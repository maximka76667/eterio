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
import UsersContext from '../../contexts/UsersContext';

import imageNotFound from '../../images/image-not-found.jpg';

interface CommunityDrinksLinkProps {
  drink: Drink;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
}

const CommunityDrinkLink = ({
  drink: { id, code, name, img, favorites, author },
  onToggleFavorite
}: CommunityDrinksLinkProps) => {
  const currentUser = useContext(CurrentUserContext);
  const users = useContext(UsersContext);

  const authorUser = users.find((user) => user.id === author);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    onToggleFavorite(isFavorite, id);

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
        'text-lg sidebar__link w-full ff-montse py-4 px-4 flex flex-col' +
        (isActive ? ' sidebar__link_active' : '')
      }
      to={code}
    >
      <div
        className='w-full h-full flex justify-center items-center'
        style={{ backgroundColor: '#e6e6e6' }}
      >
        <img
          className='w-full h-[450px] rounded object-cover'
          src={img !== '' ? img : imageNotFound}
          alt={name}
        />
      </div>
      <div className='sidebar__info w-full mt-5 pb-2 px-4 flex flex-col gap-5'>
        <div className='w-full flex justify-between'>
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
        <div className='flex items-center gap-2'>
          <img
            className='w-8 h-8 object-cover rounded-full'
            src={authorUser?.avatar}
            alt={authorUser?.name}
          />
          <p className='text-sm'>{authorUser?.name}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default CommunityDrinkLink;