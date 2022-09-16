import React, { useState, useEffect, useContext } from 'react'
import DrinksContext from '../../contexts/DrinksContext';
import { HomeProps } from '../../interfaces'
import Bottle from '../Bottle/Bottle';
import "./Home.sass"

const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps) => {

  const drinks = useContext(DrinksContext);

  const [isPouring, setIsPouring] = useState(false);
  const [glassContent, setGlassContent] = useState<{ [key: string]: number }>({})

  const [currentDrink, setCurrentDrink] = useState("");
  const [currentDrinkCode, setCurrentDrinkCode] = useState("");

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

  function searchMatches() {
    for (const drink of drinks) {
      console.log(compareComposition(drink.ingredients, glassContent));
    }
  }

  function compareComposition(drink1: { [key: string]: number }, drink2: { [key: string]: number }) {
    let result = 0;
    console.log(drink1);
    console.log(drink2);

    for (const ingr in drink1) {
      if (drink2[ingr]) {
        result += (drink1[ingr] < drink2[ingr] ? drink1[ingr] : drink2[ingr]) / 6.5 * 100;
      }
    }
    return result;
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

  useEffect(() => {
    setCurrentDrinkCode(formatDrinkName(currentDrink));
  }, [currentDrink])

  function formatDrinkName(drink: string) {
    return drink.replaceAll(" ", "-")
  }

  return (
    <div className='home'>
      {/* <h1 className='home__title'>Welcome to <span className='home__name'>Alcopedia</span></h1>
      <p className='home__text'>Here you can find ingredients and proportions for cocktails' preparing</p>
      <button className={`home__sidebar-button ${!isSidebarOpened ? "home__sidebar-button_animated" : ""}`} onClick={toggleSidebar}>Search for a drink</button> */}

      <div className='home__glass glass'>
        {
          Object.keys(glassContent).map((key) => (
            <div className={`glass__ingredient ${formatDrinkName(key)}`} key={key} style={{ height: `${glassContent[key] * 10}%` }}></div>
          ))
        }
      </div>
      <button className='home__current-drink' data-type={currentDrinkCode} onMouseDown={pourDrink} onMouseUp={unpourDrink} onMouseLeave={unpourDrink}>
        <div className={`home__drink home__${currentDrinkCode} ${isPouring ? "home__drink_pouring" : ""}`}></div>
      </button>
      {
        bottles.map((bottle) => (
          <Bottle bottle={bottle} changeDrink={changeDrink} />
        ))
      }
      <button className='home__matches-button' onClick={searchMatches}>Find matches</button>
      <div className='matches'>

      </div>
    </div>
  )
}

export default Home