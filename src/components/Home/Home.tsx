import React from 'react'
import { HomeProps } from '../../interfaces'
import "./Home.sass"

const Home = ({ toggleSidebar }: HomeProps) => {
  return (
    <div className='home'>
      <h1 className='home__title'>Welcome to Alcopedia</h1>
      <p className='home__text'>Here you can find ingredients and proportions for cocktails' preparing</p>
      <button className='home__sidebar-button' onClick={toggleSidebar}>Search for a drink</button>
    </div>
  )
}

export default Home