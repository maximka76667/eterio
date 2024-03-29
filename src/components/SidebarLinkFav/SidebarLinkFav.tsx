import React, {
  MouseEventHandler,
  useState,
  useContext,
  useEffect
} from 'react';
import FavoritesStar from '../FavoritesStar/FavoritesStar';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import SidebarLink from '../SidebarLink/SidebarLink';
import { Drink } from '../../interfaces';

interface SidebarLinkFavProps {
  drink: Drink;
  onListItemClick: () => void;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
  onClick: () => void;
}

const SidebarLinkFav = ({
  drink: { id, code, name, favorites },
  onListItemClick,
  onToggleFavorite,
  ...props
}: SidebarLinkFavProps) => {
  const currentUser = useContext(CurrentUserContext);
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
    <SidebarLink extraClass='' link={code} onListItemClick={onListItemClick}>
      <>
        {name}
        <button
          className={`sidebar__favorites ${
            isFavorite ? 'sidebar__favorites_active' : ''
          }`}
          onClick={toggleFavorite}
        >
          <FavoritesStar />
        </button>
      </>
    </SidebarLink>
  );
};

export default SidebarLinkFav;
