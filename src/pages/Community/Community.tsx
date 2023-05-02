import React, { useContext, useEffect, useState } from 'react';
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import { Search } from '../../components';
import SidebarLinkFav from '../../components/SidebarLinkFav/SidebarLinkFav';
import { Drink } from '../../interfaces';

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
            <ul className='sidebar__list'>
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
      </>
    </div>
  );
};

export default Community;
