import React from 'react';
import './Home.sass';
import { NavLink } from 'react-router-dom';

import officialImg from '../../images/home-official.webp';
import communityImg from '../../images/home-community.webp';

// Component of the home page
const Home = () => {
  return (
    <div className='home'>
      <h1 className='home__title text-8xl my-10 ff-montse text-center'>
        Welcome to <span className='home__name'>Eterio</span>
      </h1>
      <div className='grid sm:grid-cols-2 mt-10 w-full grid-cols-1'>
        <div className='w-full h-full flex flex-col justify-center items-center p-10 sm:p-0'>
          <p className='text-3xl ff-montse text-center w-2/3'>
            Find your cocktail by it&apos;s content!
          </p>
          <NavLink
            to='mixer'
            className='text-center text-xl ff-montse home__link text-white p-4 mt-5 rounded-full transition-all'
          >
            Official drinks mixer
          </NavLink>
        </div>

        <NavLink
          className='home__nav-link home__nav-link_top h-[250px] md:h-[300px] lg:h-[450px] text-xl text-white'
          to='mixer'
        >
          <img
            className='w-full h-full object-cover object-bottom'
            src={officialImg}
            alt='Official drinks'
          />
          <div className='home__nav-link__overlay'>
            <p className='text-center text-4xl ff-montse'>
              Official drinks mixer
            </p>
          </div>
        </NavLink>

        <NavLink
          className='home__nav-link home__nav-link_bottom text-xl h-[250px] md:h-[300px] lg:h-[450px] text-white'
          to='community'
        >
          <img
            className='w-full h-full object-cover object-bottom'
            src={communityImg}
            alt='Community drinks'
          />
          <div className='home__nav-link__overlay'>
            <p className='text-center text-4xl ff-montse'>Community drinks</p>
          </div>
        </NavLink>

        <div className='w-full flex-col h-full flex justify-center items-center p-10 sm:p-0'>
          <p className='text-3xl ff-montse text-center w-2/3'>
            Look what people figured out!
          </p>
          <NavLink
            to='community'
            className='text-center text-xl ff-montse home__link text-white p-4 mt-5 rounded-full transition-all'
          >
            Community drinks
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
