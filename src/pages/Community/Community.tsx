import React, {
  MouseEventHandler,
  ChangeEvent,
  useContext,
  useEffect,
  useState
} from 'react';
import './Community.sass';

import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import { Search } from '../../components';
import { Drink } from '../../interfaces';
import CommunityDrinkLink from '../../components/CommunityDrinkLink/CommunityDrinkLink';
import { NavLink, useNavigate } from 'react-router-dom';
import plusIcon from '../../images/plus.png';
import { CurrentUserContext } from '../../contexts';
import AdvancedFilter from '../../components/AdvancedFilter/AdvancedFilter';

interface CommunityProps {
  onListItemClick: () => void;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
  openLoginPopup: () => void;
}

const Community = ({
  onListItemClick,
  onToggleFavorite,
  openLoginPopup
}: CommunityProps) => {
  const communityDrinks = useContext(CommunityDrinksContext);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  function handleSearch(search: string) {
    setSearch(search);
  }

  const addDrinkRedirect: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (currentUser === null) {
      event.preventDefault();
      openLoginPopup();
      return;
    }

    navigate('add');
  };

  useEffect(() => {
    if (communityDrinks === undefined) {
      return;
    }

    let newDrinks = communityDrinks.filter((communityDrink) =>
      communityDrink.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategories.length !== 0) {
      newDrinks = newDrinks.filter((drink) =>
        selectedCategories.includes(drink.category)
      );
    }

    setFilteredDrinks(newDrinks);
  }, [search, communityDrinks, selectedCategories]);

  function compareDates(dateA: Date, dateB: Date) {
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  }

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
    <div className='flex flex-col items-center'>
      <h2 className='text-6xl text-center mb-10'>Community</h2>

      {communityDrinks !== undefined && (
        <>
          <div className='lg:w-1/2 w-full'>
            <Search search={search} onSearch={handleSearch} />
            <div className='m-2'></div>
            <AdvancedFilter onChange={handleOnChange} />
          </div>
          <ul className='community__list grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            <NavLink
              className={({ isActive }) =>
                'text-lg sidebar__link w-full h-[550px] py-4 px-4 flex flex-col' +
                (isActive ? ' sidebar__link_active' : '')
              }
              to='add'
              onClick={addDrinkRedirect}
            >
              <div
                className='w-full h-full flex justify-center items-center'
                style={{ backgroundColor: '#e6e6e6' }}
              >
                <img
                  className='w-1/2 object-cover object-center'
                  src={plusIcon}
                  alt='plus'
                />
              </div>
              <div className='sidebar__info w-full mt-5 pb-2 px-4 flex justify-between'>
                <p>Add a drink</p>
              </div>
            </NavLink>
            {filteredDrinks.length !== 0 ? (
              filteredDrinks
                .reverse()
                .sort((a, b) => compareDates(a.date, b.date))
                .map((drink) => (
                  <li key={drink.id} className='sidebar__item'>
                    <CommunityDrinkLink
                      drink={drink}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </li>
                ))
            ) : (
              <li className='sidebar__item'>
                <p className='community__not-found'>Nothing is found</p>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Community;
