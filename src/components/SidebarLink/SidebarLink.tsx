import React, { MouseEventHandler, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarLinkProps } from '../../interfaces';
import FavoritesStar from '../FavoritesStar/FavoritesStar';
import './SidebarLink.sass';

const SidebarLink = ({
  drink: { code, name },
  onListItemClick
}: SidebarLinkProps) => {
  const handleAddFavorites: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(e);
    setIsFavorites((isFavorites) => !isFavorites);
  };

  const [isFavorites, setIsFavorites] = useState(false);

  return (
    <NavLink
      onClick={onListItemClick}
      className={({ isActive }) =>
        'sidebar__link' + (isActive ? ' sidebar__link_active' : '')
      }
      to={code}
    >
      {name}
      <button
        className={`sidebar__favorites ${
          isFavorites ? 'sidebar__favorites_active' : ''
        }`}
        onClick={handleAddFavorites}
      >
        <FavoritesStar />
      </button>
    </NavLink>
  );
};

export default SidebarLink;
