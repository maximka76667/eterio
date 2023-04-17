import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import { DrinkInterface, SidebarProps } from '../../interfaces';
import Search from '../Search/Search';
import SidebarLink from '../SidebarLink/SidebarLink';
import './Sidebar.sass';

const Sidebar = ({ isOpened, onListItemClick }: SidebarProps) => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkInterface[]>([]);
  const [prevRandomIndex, setPrevRandomIndex] = useState<number>(0);

  const navigate = useNavigate();

  function handleSearch(search: string) {
    setSearch(search);
  }

  function directRandomDrink() {
    let randomIndex = Math.floor(Math.random() * drinks.length);

    while (true) {
      if (randomIndex !== prevRandomIndex) {
        break;
      }

      randomIndex = Math.floor(Math.random() * drinks.length);
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
              className='sidebar__link sidebar__link_random'
              onClick={directRandomDrink}
            >
              Get a random drink
            </button>
          </li>
          {filteredDrinks.length !== 0 ? (
            filteredDrinks.map((drink) => (
              <li key={drink._id} className='sidebar__item'>
                <SidebarLink drink={drink} onListItemClick={onListItemClick} />
              </li>
            ))
          ) : (
            <li className='sidebar__item'>
              <p className='sidebar__not-found'>Nothing is found</p>
            </li>
          )}
          <li className='sidebar__item'>
            <NavLink
              className={({ isActive }) =>
                'sidebar__link' + (isActive ? ' sidebar__link_active' : '')
              }
              to='/community'
            >
              Comunidad
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
