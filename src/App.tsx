import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.sass';
import Drink from './components/Drink/Drink';
import { DrinkInterface } from './interfaces';
import api from './utils/api';

function App() {

  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const [search, setSearch] = useState("");

  async function getDrinks() {
    const { drinks } = await api.getDrinks()

    setDrinks(drinks);
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    getDrinks();
  }, [])

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className='header__logo'>Alcopedia</Link>
      </header>
      <div className='content'>
        <div className='sidebar-wrapper'>
          <aside className='sidebar'>
            <form>
              <input type="text" value={search} onChange={handleChange} />
            </form>
            <ul className='sidebar__list'>
              {
                drinks.filter((drink) => {
                  if (drink.name.toLowerCase().includes(search))
                    return drink;
                  return null;
                }).map((drink) => {
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
      </div>
    </div>
  );
}

export default App;
