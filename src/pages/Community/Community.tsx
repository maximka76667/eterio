import React, { useContext, useEffect, useState } from 'react';
import './Community.sass';

import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import { Search } from '../../components';
import { Drink } from '../../interfaces';
import CommunityDrinkLink from '../../components/CommunityDrinkLink/CommunityDrinkLink';
import { NavLink } from 'react-router-dom';
import plusIcon from '../../images/plus.png';

interface CommunityProps {
  onListItemClick: () => void;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
}

const Community = ({ onListItemClick, onToggleFavorite }: CommunityProps) => {
  const communityDrinks = useContext(CommunityDrinksContext);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);

  function handleSearch(search: string) {
    setSearch(search);
  }

  useEffect(() => {
    if (communityDrinks === undefined) {
      return;
    }

    const newDrinks = communityDrinks.filter((communityDrink) =>
      communityDrink.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredDrinks(newDrinks);
  }, [search, communityDrinks]);

  return (
    <div>
      Community
      <>
        {communityDrinks !== undefined && (
          <>
            <Search search={search} onSearch={handleSearch} />
            <ul className='community__list'>
              <NavLink
                className={({ isActive }) =>
                  'text-lg sidebar__link w-full h-[550px] ff-montse py-4 px-4 flex flex-col' +
                  (isActive ? ' sidebar__link_active' : '')
                }
                to='add'
              >
                <div
                  className='w-full h-full flex justify-center items-center'
                  style={{ backgroundColor: '#e6e6e6' }}
                >
                  <img
                    className='w-1/2 object-cover object-center'
                    src={plusIcon}
                    alt='321'
                  />
                </div>
                <div className='sidebar__info w-full mt-5 pb-2 px-4 flex justify-between'>
                  <p>Add a drink</p>
                </div>
              </NavLink>
              {filteredDrinks.length !== 0 ? (
                filteredDrinks.map((drink) => (
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
