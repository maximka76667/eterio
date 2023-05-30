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
import { CategoriesContext } from '../../contexts';

const Sidebar = ({
  isOpened,
  onListItemClick,
  onToggleFavorite
}: SidebarProps) => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);
  const [prevRandomIndex, setPrevRandomIndex] = useState<number>(0);

  const categories = useContext(CategoriesContext);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  function toggleFilter() {
    setIsFilterOpen((isFilterOpen) => !isFilterOpen);
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
                <button
                  className='sidebar__link sidebar__link_random ff-montse text-lg py-3 px-3'
                  onClick={toggleFilter}
                >
                  Advanced filter
                  <i
                    className={`sidebar__menu-open-icon ${
                      isFilterOpen ? 'sidebar__menu-open-icon_opened' : ''
                    }`}
                  ></i>
                </button>
                <div
                  className={`flex-col sidebar__filter ${
                    isFilterOpen
                      ? 'sidebar__filter_open my-1 px-3 pt-0.5 pb-3'
                      : ''
                  }`}
                >
                  <h3 className='ff-montse text-lg'>Category</h3>
                  <div className='w-4/5 mx-auto grid grid-cols-2 gap-1 mt-2'>
                    {categories.map(({ id, name }) => (
                      <div key={id} className='flex items-center'>
                        <input
                          id={name}
                          type='checkbox'
                          value={name}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          onChange={(event) => handleOnChange(event, name)}
                        />
                        <label
                          htmlFor={name}
                          className='ml-2 text-sm ff-montse text-gray-900 dark:text-gray-300'
                        >
                          {name}
                        </label>
                      </div>
                    ))}

                    {/* <input
                      id='default-checkbox'
                      type='checkbox'
                      value=''
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='default-checkbox'
                      className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Default checkbox
                    </label> */}
                  </div>
                </div>
                <button
                  className='sidebar__link sidebar__link_random ff-montse text-lg py-3 px-3 mt-1'
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
          <SidebarLink
            extraClass='px-4'
            onListItemClick={onListItemClick}
            link='/me'
          >
            <div className='sidebar__user flex items-center'>
              <img
                className='inline-block h-10 w-10 rounded-full ring-2 ring-white mr-4 object-cover'
                src={currentUser.avatar}
                alt=''
              />
              <p>{currentUser.name}</p>
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                navigate('/me/edit');
              }}
            >
              Edit
            </button>
          </SidebarLink>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
