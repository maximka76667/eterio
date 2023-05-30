import React, {
  MouseEventHandler,
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

    const newDrinks = communityDrinks.filter((communityDrink) =>
      communityDrink.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredDrinks(newDrinks);
  }, [search, communityDrinks]);

  function compareDates(dateA: Date, dateB: Date) {
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  }

  return (
    <div>
      Community
      <>
        {communityDrinks !== undefined && (
          <>
            <Search search={search} onSearch={handleSearch} />
            <ul className='community__list grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
              <NavLink
                className={({ isActive }) =>
                  'text-lg sidebar__link w-full h-[550px] ff-montse py-4 px-4 flex flex-col' +
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
                  <p className='sidebar__not-found'>Nothing is found</p>
                </li>
              )}
            </ul>
          </>
        )}
      </>
    </div>
  );
};

export default Community;
