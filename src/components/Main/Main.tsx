import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import DrinksContext from '../../contexts/DrinksContext'
import { MainProps } from '../../interfaces'
import Drink from '../Drink/Drink'
import Home from '../Home/Home'
import "./Main.sass"

const Main = ({ toggleSidebar, isSidebarOpened }: MainProps) => {
  const drinks = useContext(DrinksContext);

  return (
    <main className="main">
      <Routes>
        <Route index element={<Home isSidebarOpened={isSidebarOpened} toggleSidebar={toggleSidebar} />} />
        {
          drinks.map((drink) => (
            <Route key={drink._id} path={drink.code} element={<Drink drink={drink}></Drink>} />
          ))
        }
      </Routes>
    </main>
  )
}

export default Main