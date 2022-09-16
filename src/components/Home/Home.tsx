import React, { MouseEventHandler, useState, useEffect } from 'react'
import { HomeProps } from '../../interfaces'
import Bottle from '../Bottle/Bottle';
import "./Home.sass"

const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps) => {

  const [isPouring, setIsPouring] = useState(false);
  const [glassContent, setGlassContent] = useState<{ [key: string]: number }>({})

  const [currentDrink, setCurrentDrink] = useState("");

  const [ingredientCount, setIngredientCount] = useState<number>(0);
  const [drinkType, setDrinkType] = useState<string>("");

  const bottles = [
    "vodka",
    "cranberry-juice"
  ]

  const pourDrink: MouseEventHandler<HTMLButtonElement> = (e) => {
    const drinkType = (e.target as HTMLInputElement).getAttribute("data-type")!;
    setDrinkType(drinkType);
    setIsPouring(true);
  }

  function unpourDrink() {
    setIsPouring(false);
  }

  const changeDrink: MouseEventHandler<HTMLButtonElement> = (e) => {
    const drinkType = (e.target as HTMLInputElement).getAttribute("data-type")!;

    setCurrentDrink(drinkType);
  }

  useEffect(() => {
    let bulking: NodeJS.Timer;

    if (isPouring && ingredientCount < 10) {
      bulking = setInterval(() => {
        const initValue = glassContent[drinkType] || 0;
        setGlassContent({ ...glassContent, [drinkType]: Math.floor((initValue + 0.1) * 100) / 100 });
        setIngredientCount(ingredientCount => Math.floor((ingredientCount + 0.1) * 100) / 100);
        console.log(glassContent);
        console.log(ingredientCount);
      }, 100)
    }
    return () => clearInterval(bulking);
  }, [isPouring, glassContent, drinkType, ingredientCount])


  return (
    <div className='home'>
      {/* <h1 className='home__title'>Welcome to <span className='home__name'>Alcopedia</span></h1>
      <p className='home__text'>Here you can find ingredients and proportions for cocktails' preparing</p>
      <button className={`home__sidebar-button ${!isSidebarOpened ? "home__sidebar-button_animated" : ""}`} onClick={toggleSidebar}>Search for a drink</button> */}

      <div className='home__glass glass'>
        {
          Object.keys(glassContent).map((key) => (
            <div className={`glass__ingredient glass__ingredient_${key}`} key={key} style={{ height: `${glassContent[key] * 10}%` }}></div>
          ))
        }
      </div>
      {/* <button className='home__button' data-type="vodka" onMouseDown={pourDrink} onMouseUp={unpourDrink} onMouseLeave={unpourDrink} onClick={chooseDrink}>
        <div className={`home__drink home__vodka ${isPouring ? "home__drink_pouring" : ""}`}></div>
      </button>
      <button className='home__drink home__orange juice'>Change Drink</button>
      <button className='home__button' data-type="vodka" onMouseDown={pourDrink} onMouseUp={unpourDrink} onMouseLeave={unpourDrink} onClick={chooseDrink}>
        <div className={`home__drink home__orange ${isPouring ? "home__drink_pouring" : ""}`}></div>
      </button> */}
      <button className='home__button' data-type={currentDrink} onMouseDown={pourDrink} onMouseUp={unpourDrink} onMouseLeave={unpourDrink}>
        <div className={`home__drink home__${currentDrink} ${isPouring ? "home__drink_pouring" : ""}`}></div>
      </button>
      <button className='home__change_vodka' data-type="vodka" onClick={changeDrink}>Vodka</button>
      <button className='home__change_cranberry-juice' data-type="cranberry-juice" onClick={changeDrink}>Cranberry Juice</button>
      {
        bottles.map((bottle) => (
          <Bottle />
        ))
      }
    </div>
  )
}

export default Home