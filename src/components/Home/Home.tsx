import React from 'react'
import { HomeProps } from '../../interfaces'
import "./Home.sass"

const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps) => {
  return (
    <div className='home'>
      <h1 className='home__title'>Welcome to <span className='home__name'>Alcopedia</span></h1>
      <p className='home__text'>Here you can find ingredients and proportions for cocktails' preparing</p>
      <button className={`home__sidebar-button ${!isSidebarOpened ? "home__sidebar-button_animated" : ""}`} onClick={toggleSidebar}>Search for a drink</button>
    </div>
  )
}

export default Home