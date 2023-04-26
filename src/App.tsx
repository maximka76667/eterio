import React, { useEffect, useState } from 'react';
import './App.sass';
import { Header, Loading } from './components';
import Content from './components/Content/Content';
import DrinksContext from './contexts/DrinksContext';
import { DrinkInterface } from './interfaces';
import api from './utils/api';

function App() {
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getDrinks() {
    setIsLoading(true);
    const drinks = await api.getDrinks();
    setDrinks(drinks);
    setIsLoading(false);
  }

  useEffect(() => {
    getDrinks().catch((err) => console.log(err));
  }, []);

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }

  return (
    <div className='app'>
      <Header isSidebarOpened={isSidebarOpened} closeSidebar={closeSidebar} />
      <DrinksContext.Provider value={drinks}>
        {isLoading ? (
          <Loading />
        ) : (
          <Content
            isSidebarOpened={isSidebarOpened}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
          />
        )}
      </DrinksContext.Provider>
    </div>
  );
}

export default App;
