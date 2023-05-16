import React, { useContext } from 'react';
import './Main.sass';
import MainProps from './MainProps';

import { Outlet, Route, Routes } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';

import { Home, DrinkInfo, Community, NotFound } from '../../pages';
import UserInfo from '../../pages/UserInfo/UserInfo';
import EditUser from '../../pages/EditUser/EditUser';
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import AddDrink from '../../pages/AddDrink/AddDrink';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Mixer from '../../pages/Mixer/Mixer';

const Main = ({
  toggleSidebar,
  isSidebarOpened,
  onUserUpdate,
  onListItemClick,
  onToggleFavorite,
  onOpenLoginPopup,
  onCreateDrink,
  onDeleteDrink
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
        <Route path='mixer' element={<Mixer />} />
        {drinks?.map((drink) => (
          <Route
            key={drink.id}
            path={drink.code}
            element={
              <DrinkInfo
                onDeleteDrink={onDeleteDrink}
                drink={drink}
              ></DrinkInfo>
            }
          />
        ))}

        {/* Community Routes START */}
        <Route path='community' element={<Outlet />}>
          <Route
            index
            element={
              <Community
                onListItemClick={onListItemClick}
                onToggleFavorite={onToggleFavorite}
                openLoginPopup={onOpenLoginPopup}
              />
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path='add'
              element={<AddDrink onCreateDrink={onCreateDrink} />}
            />
          </Route>
          {communityDrinks?.map((drink) => (
            <Route
              key={drink.id}
              path={drink.code}
              element={
                <DrinkInfo onDeleteDrink={onDeleteDrink} drink={drink} />
              }
            />
          ))}
        </Route>
        {/* Community Routes END */}

        {/* Me Routes START */}
        <Route element={<PrivateRoute />}>
          <Route path='me' element={<Outlet />}>
            <Route index element={<UserInfo />} />
            <Route
              path='edit'
              element={<EditUser onUserUpdate={onUserUpdate} />}
            />
          </Route>
        </Route>
        {/* Me Routes END */}

        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
