import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import { IDrink } from '../../interfaces';
import Search from '../Search/Search';
import SidebarLink from '../SidebarLink/SidebarLink';
import './Sidebar.sass';
import SidebarProps from './SidebarProps';
import SidebarLinkFav from '../SidebarLinkFav/SidebarLinkFav';

const Sidebar = ({
  isOpened,
  onListItemClick,
  onToggleFavorite
}: SidebarProps) => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState<IDrink[]>([]);
  const [prevRandomIndex, setPrevRandomIndex] = useState<number>(0);

  const navigate = useNavigate();

  function handleSearch(search: string) {
    setSearch(search);
  }

  function directRandomDrink() {
    let randomIndex = 0;

    if (drinks.length !== 1) {
      randomIndex = Math.floor(Math.random() * drinks.length);

      while (true) {
        if (randomIndex !== prevRandomIndex) {
          break;
        }

        randomIndex = Math.floor(Math.random() * drinks.length);
      }
    }

    navigate(drinks[randomIndex].code);
    setPrevRandomIndex(randomIndex);
    onListItemClick();
  }

  useEffect(() => {
    const newDrinks = drinks.filter((drink) =>
      drink.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDrinks(newDrinks);
  }, [search, drinks]);

  return (
    <div
      className={`sidebar-wrapper ${isOpened ? 'sidebar-wrapper_opened' : ''}`}
    >
      <aside className='sidebar'>
        <Search search={search} onSearch={handleSearch} />
        <ul className='sidebar__list'>
          <li className='sidebar__item'>
            <button
              className='sidebar__link sidebar__link_random ff-montse text-lg py-3 px-3'
              onClick={directRandomDrink}
            >
              Get a random drink
            </button>
          </li>
          {filteredDrinks.length !== 0 ? (
            filteredDrinks.map((drink) => (
              <li key={drink.id} className='sidebar__item'>
                <SidebarLinkFav
                  drink={drink}
                  onListItemClick={onListItemClick}
                  onToggleFavorite={onToggleFavorite}
                />
              </li>
            ))
          ) : (
            <li className='sidebar__item'>
              <p className='sidebar__not-found'>Nothing is found</p>
            </li>
          )}
          <li className='sidebar__item'>
            <SidebarLink
              extraClass='bg-indigo-500'
              onListItemClick={onListItemClick}
              link='/community'
            >
              Community
            </SidebarLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
