import React, {
  MouseEventHandler,
  useState,
  useContext,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLinkProps from './SidebarLinkProps';
import FavoritesStar from '../FavoritesStar/FavoritesStar';
import './SidebarLink.sass';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const SidebarLink = ({
  drink: { id, code, name },
  onListItemClick,
  onToggleFavorite
}: SidebarLinkProps) => {
  const toggleFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    onToggleFavorite(isFavorite, id);
    setIsFavorite((isFavorite) => !isFavorite);
  };

  const user = useContext(CurrentUserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user === null) {
      setIsFavorite(false);
      return;
    }

    const favorites = user.favourite_drinks;

    if (favorites.includes(id)) {
      setIsFavorite(true);
    }
  }, [user]);

  return (
    <NavLink
      onClick={onListItemClick}
      className={({ isActive }) =>
        'text-lg sidebar__link ff-montse' +
        (isActive ? ' sidebar__link_active' : '')
      }
      to={code}
    >
      {name}
      <button
        className={`sidebar__favorites ${
          isFavorite ? 'sidebar__favorites_active' : ''
        }`}
        onClick={toggleFavorite}
      >
        <FavoritesStar />
      </button>
    </NavLink>
  );
};

export default SidebarLink;
