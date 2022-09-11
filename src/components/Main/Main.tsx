import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import DrinksContext from '../../contexts/DrinksContext'
import Drink from '../Drink/Drink'
import Home from '../Home/Home'
import "./Main.sass"

const Main = () => {
  const drinks = useContext(DrinksContext);

  return (
    <main className="main">
      <Routes>
        <Route index element={<Home />} />
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