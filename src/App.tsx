import React, { useEffect, useState } from 'react';
import './App.sass';
import { Header } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
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
      <DrinksContext.Provider value={drinks}>
        <Content />
      </DrinksContext.Provider>
    </div>
  );
}

export default App;
