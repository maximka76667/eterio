import React, { MouseEventHandler, useState, useEffect } from 'react'
import { HomeProps } from '../../interfaces'
import "./Home.sass"

const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps) => {

  const [isPouring, setIsPouring] = useState(false);
  const [drink, setDrink] = useState<{ [key: string]: number }>({
    "cranberry juice": 2,
  })
  const [ingredientCount, setIngredientCount] = useState<number>(2);
  const [drinkType, setDrinkType] = useState<string>("");

  const pourDrink: MouseEventHandler<HTMLButtonElement> = (e) => {
    const drinkType = (e.target as HTMLInputElement).getAttribute("data-type")!;
    setDrinkType(drinkType);
    setIsPouring(true);
  }

  function unpourDrink() {
    setIsPouring(false);
  }

  useEffect(() => {
    let bulking: NodeJS.Timer;

    if (isPouring && ingredientCount < 10) {
      bulking = setInterval(() => {
        const initValue = drink[drinkType] || 0;
        setDrink({ ...drink, [drinkType]: Math.floor((initValue + 0.1) * 10) / 10 });
        setIngredientCount(Math.floor((ingredientCount + 0.1) * 10) / 10);
        console.log(drink);
        console.log(ingredientCount);
      }, 100)
    }
    return () => clearInterval(bulking);
  }, [isPouring, drink, drinkType, ingredientCount])


  return (
    <div className='home'>
      {/* <h1 className='home__title'>Welcome to <span className='home__name'>Alcopedia</span></h1>
      <p className='home__text'>Here you can find ingredients and proportions for cocktails' preparing</p>
      <button className={`home__sidebar-button ${!isSidebarOpened ? "home__sidebar-button_animated" : ""}`} onClick={toggleSidebar}>Search for a drink</button> */}

      <div className='home__glass glass'>
        <>
          {
            Object.keys(drink).map((key) => {
              return <div className={`glass__ingredient glass__ingredient_${key}`} key={key} style={{ height: `${drink[key] * 10}%` }}></div>
            })
          }
        </>
      </div>
      <button className='home__button' data-type="vodka" onMouseDown={pourDrink} onMouseUp={unpourDrink} onMouseLeave={unpourDrink}>
        <div className={`home__vodka ${isPouring ? "home__vodka_pouring" : ""}`}></div>
      </button>
    </div>
  )
}

export default Home