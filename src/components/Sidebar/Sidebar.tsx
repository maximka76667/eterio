import React, { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import "./Sidebar.sass"

const Sidebar = () => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  }

  return (
    <div className='sidebar-wrapper'>
      <aside className='sidebar'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={search} onChange={handleChange} />
        </form>
        <ul className='sidebar__list'>
          {
            drinks.filter((drink) => {
              if (drink.name.toLowerCase().includes(search.toLowerCase()))
                return drink;
              return null;
            }).map((drink) => (
              <li key={drink._id} className='sidebar__item'>
                <NavLink className={
                  ({ isActive }) => "sidebar__link" +
                    (isActive ? " sidebar__link_active" : "")
                } to={drink._id}>
                  {drink.name}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar