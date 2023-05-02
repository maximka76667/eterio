import React, { useContext } from 'react';
import './Main.sass';
import MainProps from './MainProps';

import { Route, Routes } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';

import { Home, DrinkInfo, Community, NotFound } from '../../pages';

const Main = ({ toggleSidebar, isSidebarOpened }: MainProps) => {
  const drinks = useContext(DrinksContext);

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
        <Route path='/community' element={<Community />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </main>
  );
};

export default Main;
