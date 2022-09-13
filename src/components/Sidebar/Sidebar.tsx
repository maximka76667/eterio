import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import { DrinkInterface, SidebarProps } from '../../interfaces';
import Search from '../Search/Search';
import "./Sidebar.sass"

const Sidebar = ({ isOpened, onListItemClick }: SidebarProps) => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkInterface[]>([]);

  let navigate = useNavigate();

  function handleSearch(search: string) {
    setSearch(search);
  }

  function directRandomDrink() {
    const randomIndex = Math.floor(Math.random() * drinks.length);
    navigate(drinks[randomIndex].code);
    onListItemClick();
  }

  useEffect(() => {
    const newDrinks = drinks.filter((drink) => drink.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredDrinks(newDrinks);
  }, [search, drinks])

  return (
    <div className={`sidebar-wrapper ${isOpened ? "sidebar-wrapper_opened" : ""}`}>
      <aside className='sidebar'>
        <Search search={search} onSearch={handleSearch} />
        <ul className='sidebar__list'>
          <li className='sidebar__item'>
            <button className="sidebar__link sidebar__link_random" onClick={directRandomDrink}>Get a random drink</button>
          </li>
          {
            filteredDrinks.length !== 0 ? filteredDrinks.map((drink) => (
              <li key={drink._id} className='sidebar__item'>
                <NavLink onClick={onListItemClick} className={
                  ({ isActive }) => "sidebar__link" +
                    (isActive ? " sidebar__link_active" : "")
                } to={drink.code}>
                  {drink.name}
                </NavLink>
              </li>
            )) : <li className='sidebar__item'><p className='sidebar__not-found'>Nothing is found</p></li>
          }
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar