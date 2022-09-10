import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.sass';
import Drink from './components/Drink/Drink';
import { DrinkInterface } from './interfaces';
import api from './utils/api';

function App() {

  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);

  async function getDrinks() {
    const { drinks } = await api.getDrinks()

    setDrinks(drinks);
  }

  useEffect(() => {
    getDrinks();
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1 className='header__title'>Alcopedia</h1>
      </header>
      <div className='content'>
        <div className='sidebar-wrapper'>
          <aside className='sidebar'>
            <ul className='sidebar__list'>
              {
                drinks.map((drink) => {
                  return (
                    <li className='sidebar__item'>
                      <NavLink className={
                        ({ isActive }) => "sidebar__link" +
                          (isActive ? " sidebar__link_active" : "")
                      } to={drink._id}>{drink.name}</NavLink>
                    </li>
                  )
                })
              }
            </ul>
          </aside>
        </div>
        <main className="main">
          <Routes>
            {
              drinks.map((drink) => {
                return (
                  <Route path={drink._id} element={<Drink drink={drink}></Drink>} />
                )
              })
            }
          </Routes>
        </main>
        <>
          {
            drinks && drinks.map((drink) => {
              console.log(drink);
            })
          }
        </>
      </div>
    </div>
  );
}

export default App;
