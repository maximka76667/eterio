import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import { Drink } from '../../interfaces';
import Search from '../Search/Search';
import SidebarLink from '../SidebarLink/SidebarLink';
import './Sidebar.sass';
import SidebarProps from './SidebarProps';
import SidebarLinkFav from '../SidebarLinkFav/SidebarLinkFav';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AdvancedFilter from '../AdvancedFilter/AdvancedFilter';
import NestedSidebarLink from '../NestedSidebarLink/NestedSidebarLink';

import { ReactComponent as DiceIcon } from '../../images/dice.svg';
import { ReactComponent as TogglerIcon } from '../../images/menu-width-icon.svg';

const Sidebar = ({
  isOpened,
  onListItemClick,
  onToggleFavorite
}: SidebarProps) => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);
  const [prevRandomIndex, setPrevRandomIndex] = useState<number>(0);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  function handleSearch(search: string) {
    setSearch(search);
  }

  function directRandomDrink() {
    if (filteredDrinks.length === 0) {
      return;
    }

    let randomIndex = 0;

    if (filteredDrinks.length !== 1) {
      randomIndex = Math.floor(Math.random() * filteredDrinks.length);

      while (true) {
        if (randomIndex !== prevRandomIndex) {
          break;
        }

        randomIndex = Math.floor(Math.random() * filteredDrinks.length);
      }
    }

    navigate(filteredDrinks[randomIndex].code);
    setPrevRandomIndex(randomIndex);
    onListItemClick();
  }

  useEffect(() => {
    if (drinks === undefined) {
      return;
    }

    let newDrinks = drinks.filter((drink) =>
      drink.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategories.length !== 0) {
      newDrinks = newDrinks.filter((drink) =>
        selectedCategories.includes(drink.category)
      );
    }

    setFilteredDrinks(newDrinks);
  }, [search, drinks, selectedCategories]);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCategories((selectedCategories) => [
        ...selectedCategories,
        categoryName
      ]);

      return;
    }

    setSelectedCategories((selectedCategories) =>
      selectedCategories.filter((selectedCategory) => {
        return selectedCategory !== categoryName;
      })
    );
  };

  function handleListItemClick(index: number) {
    onListItemClick();
    setPrevRandomIndex(index);
  }

  return (
    <div
      className={`sidebar-wrapper ${isOpened ? 'sidebar-wrapper_opened' : ''}`}
    >
      <aside className='sidebar'>
        {drinks !== undefined && (
          <>
            <Search search={search} onSearch={handleSearch} />
            <ul className='sidebar__list'>
              <li className='sidebar__item'>
                <AdvancedFilter onChange={handleOnChange} />
                <button
                  className='sidebar__link sidebar__link_random text-lg py-3 px-3 mt-1'
                  onClick={directRandomDrink}
                >
                  Get a random drink
                  <DiceIcon width='24' height='24' fill='white' />
                </button>
              </li>
              {filteredDrinks.length !== 0 ? (
                filteredDrinks.map((drink, index) => (
                  <li key={drink.id} className='sidebar__item'>
                    <SidebarLinkFav
                      drink={drink}
                      onListItemClick={() => handleListItemClick(index)}
                      onToggleFavorite={onToggleFavorite}
                      onClick={() => setPrevRandomIndex(index)}
                    />
                  </li>
                ))
              ) : (
                <li className='sidebar__item'>
                  <p className='sidebar__not-found'>Nothing is found</p>
                </li>
              )}
            </ul>
          </>
        )}
        <SidebarLink
          extraClass='sidebar__link_dark mb-1'
          onListItemClick={onListItemClick}
          link='/community'
        >
          Community
        </SidebarLink>
        {currentUser != null && (
          <NestedSidebarLink
            extraClass='px-4'
            mainActiveClass='sidebar__link_nested_active'
            secondaryActiveClass='sidebar__link_nested-secondary_active'
            onListItemClick={onListItemClick}
            link='/me'
          >
            <div className='sidebar__user flex items-center'>
              <img
                className='inline-block h-10 w-10 rounded-full ring-2 ring-white mr-4 object-cover'
                src={currentUser.avatar}
                alt=''
              />
              <p className='sidebar__username'>{currentUser.name}</p>
            </div>
          </NestedSidebarLink>
        )}
      </aside>
      <button className='sidebar__toggler-button'>
        <TogglerIcon fill='black' />
      </button>
    </div>
  );
};

export default Sidebar;
