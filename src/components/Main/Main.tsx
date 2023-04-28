import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import MainProps from './MainProps';
import Drink from '../Drink/Drink';
import Home from '../Home/Home';
import './Main.sass';
import Community from '../Community/Community';
import NotFound from '../NotFound/NotFound';

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
        {drinks.map((drink) => (
          <Route
            key={drink.id}
            path={drink.code}
            element={<Drink drink={drink}></Drink>}
          />
        ))}
        <Route path='/community' element={<Community />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </main>
  );
};

export default Main;
