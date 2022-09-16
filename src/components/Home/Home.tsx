import React, { useState, useEffect } from 'react'
import { HomeProps } from '../../interfaces'
import Bottle from '../Bottle/Bottle';
import "./Home.sass"

const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps) => {

  const [isPouring, setIsPouring] = useState(false);
  const [glassContent, setGlassContent] = useState<{ [key: string]: number }>({})

  const [currentDrink, setCurrentDrink] = useState("");

  const [ingredientCount, setIngredientCount] = useState<number>(0);

  const bottles = [
    "Vodka",
    "Cranberry juice"
  ]

  function pourDrink() {
    setIsPouring(true);
  }

  function unpourDrink() {
    setIsPouring(false);
  }

  const changeDrink = (drink: string) => {
    setCurrentDrink(drink);
  }

  useEffect(() => {
    let bulking: NodeJS.Timer;

    if (currentDrink && isPouring && ingredientCount <= 10) {
      bulking = setInterval(() => {
        const initValue = glassContent[currentDrink] || 0;
        setGlassContent({ ...glassContent, [currentDrink]: Math.floor((initValue + 0.1) * 100) / 100 });
        console.log(glassContent);
      }, 100)
    }
    return () => clearInterval(bulking);
  }, [isPouring, glassContent, ingredientCount, currentDrink])

  useEffect(() => {
    let sum = 0;
    for (const key in glassContent) sum += glassContent[key];

    setIngredientCount(Math.floor(sum * 100) / 100);
    console.log(ingredientCount);
  }, [glassContent, ingredientCount])

  return (
    <div className='home'>
      {/* <h1 className='home__title'>Welcome to <span className='home__name'>Alcopedia</span></h1>
      <p className='home__text'>Here you can find ingredients and proportions for cocktails' preparing</p>
      <button className={`home__sidebar-button ${!isSidebarOpened ? "home__sidebar-button_animated" : ""}`} onClick={toggleSidebar}>Search for a drink</button> */}

      <div className='home__glass glass'>
        {
          Object.keys(glassContent).map((key) => (
            <div className={`glass__ingredient ${key}`} key={key} style={{ height: `${glassContent[key] * 10}%` }}></div>
          ))
        }
      </div>
      <button className='home__current-drink' data-type={currentDrink} onMouseDown={pourDrink} onMouseUp={unpourDrink} onMouseLeave={unpourDrink}>
        <div className={`home__drink home__${currentDrink} ${isPouring ? "home__drink_pouring" : ""}`}></div>
      </button>
      {
        bottles.map((bottle) => (
          <Bottle bottle={bottle} changeDrink={changeDrink} />
        ))
      }
    </div>
  )
}

export default Home