import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.sass';
import Drink from './components/Drink/Drink';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className='header__title'>Alcopedia</h1>
      </header>
      <div className='content'>
        <aside className='sidebar'>
          <Link className='sidebar__link' to="/rumncoke">Rum & Coke</Link>
        </aside>
        <main className="main">
          <Routes>
            <Route path="/rumncoke" element={<Drink></Drink>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
