import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import DrinksContext from '../../contexts/DrinksContext'
import Drink from '../Drink/Drink'
import "./Main.sass"

const Main = () => {
  const drinks = useContext(DrinksContext);

  return (
    <main className="main">
      <Routes>
        {
          drinks.map((drink) => (
            <Route key={drink._id} path={drink._id} element={<Drink drink={drink}></Drink>} />
          ))
        }
      </Routes>
    </main>
  )
}

export default Main