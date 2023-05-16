import React from 'react';
import HomeProps from './HomeProps';
import './Home.sass';
import { NavLink } from 'react-router-dom';

// Component of the home page
const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps): JSX.Element => {
  return (
    <div className='home'>
      <h1 className='home__title text-8xl ff-montse'>
        Welcome to <span className='home__name'>Eterio</span>
      </h1>
      <p className='text-2xl ff-montse mt-2 mb-5'>
        Here you can find alcoholic drink recipes
      </p>
      <NavLink
        className='px-5 py-3 text-xl bg-emerald-600 text-white rounded-xl my-2'
        to='mixer'
      >
        YES I WANNA SEARCH SOMETHING
      </NavLink>
    </div>
  );
};

export default Home;
