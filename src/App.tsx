import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.sass';
import { Drink, Header, Sidebar } from './components';
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
      <Header />
      <div className='content'>
        <Sidebar drinks={drinks} />
        <main className="main">
          <Routes>
            {
              drinks.map((drink) => (
                <Route key={drink._id} path={drink._id} element={<Drink drink={drink}></Drink>} />
              ))
            }
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
