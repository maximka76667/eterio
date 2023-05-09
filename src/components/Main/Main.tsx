import React, { useContext } from 'react';
import './Main.sass';
import MainProps from './MainProps';

import { Route, Routes } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';

import { Home, DrinkInfo, Community, NotFound } from '../../pages';
import UserInfo from '../../pages/UserInfo/UserInfo';
import EditUser from '../../pages/EditUser/EditUser';
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import AddDrink from '../../pages/AddDrink/AddDrink';

const Main = ({
  toggleSidebar,
  isSidebarOpened,
  onUserUpdate,
  onListItemClick,
  onToggleFavorite,
  onOpenLoginPopup,
  onCreateDrink
}: MainProps) => {
  const drinks = useContext(DrinksContext);
  const communityDrinks = useContext(CommunityDrinksContext);

  return (
    <main className='main'>
      <Routes>
        <Route
          index
          element={
            <Home
              isSidebarOpened={isSidebarOpened}
              toggleSidebar={toggleSidebar}
            />
          }
        />
        {drinks?.map((drink) => (
          <Route
            key={drink.id}
            path={drink.code}
            element={<DrinkInfo drink={drink}></DrinkInfo>}
          />
        ))}
        <Route
          path='/community'
          element={
            <Community
              onListItemClick={onListItemClick}
              onToggleFavorite={onToggleFavorite}
              openLoginPopup={onOpenLoginPopup}
            />
          }
        />
        <Route
          path='community/add'
          element={<AddDrink onCreateDrink={onCreateDrink} />}
        />
        {communityDrinks?.map((drink) => (
          <Route
            key={drink.id}
            path={`community/${drink.code}`}
            element={<DrinkInfo drink={drink}></DrinkInfo>}
          />
        ))}
        <Route path='/me' element={<UserInfo />} />
        <Route
          path='/me/edit'
          element={<EditUser onUserUpdate={onUserUpdate} />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
