import React, { useEffect, useState } from 'react'
import Ingredient from '../Ingredient/Ingredient';
import "./Drink.sass"

const Drink = () => {

  const [ingredientList, setIngredientList] = useState<{ name: string, amount: number }[]>([]);
  const [ingredientCount, setIngredientCount] = useState<number>(0);

  const drink: { name: string, ingredients: { [key: string]: number }, extra: string[], description: string } = {
    name: "Rum & Coke",
    ingredients: {
      rum: 1,
      coke: 2
    },
    extra: ["lime"],
    description: "The rum and Coke is an unbelievably simple yet satisfying cocktail. Everything that you need to know about mixing this popular drink is right there in the name. That said, even the easiest of mixed drinks can be made just a little better (or worse) and deserves a bit more attention than it often receives."
  }

  useEffect(() => {
    for (const ingridient in drink.ingredients) {
      setIngredientCount((ingredientCount) => ingredientCount + drink.ingredients[ingridient]);
      setIngredientList((ingredientList) => [...ingredientList, { name: ingridient, amount: drink.ingredients[ingridient] }]);
    }
  }, [])

  return (
    <div className='drink'>
      <h2 className='drink__name'>{drink.name}</h2>
      <p>{drink.description}</p>
      <h3>Drinks:</h3>
      <ul>
        {
          ingredientList.map((ingredient) => {
            return (
              <li key={ingredient.name}>
                {ingredient.name}
              </li>
            )
          })
        }
      </ul>
      <h3>Extra Ingredients:</h3>
      <ul>
        {
          drink.extra.map((extra) => {
            return (
              <li key={extra}>
                {extra}</li>
            )
          })
        }
      </ul>
      <div className='glass'>
        <div className='glass__content'>
          {
            ingredientList.map((ingredient) => {
              return (
                <Ingredient ingredient={ingredient} ingredientCount={ingredientCount}></Ingredient>
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export default Drink