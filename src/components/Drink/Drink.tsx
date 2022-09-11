import React, { useEffect, useState } from 'react'
import { DrinkInterface } from '../../interfaces';
import Glass from '../Glass/Glass';
import "./Drink.sass"

const Drink = ({ drink }: { drink: DrinkInterface }) => {

  const [ingredientList, setIngredientList] = useState<{ name: string, amount: number }[]>([]);
  const [ingredientCount, setIngredientCount] = useState<number>(0);

  useEffect(() => {
    setIngredientList([]);
    setIngredientCount(0);
    for (const ingridient in drink.ingredients) {
      setIngredientCount((ingredientCount) => ingredientCount + drink.ingredients[ingridient]);
      setIngredientList((ingredientList) => [...ingredientList, { name: ingridient, amount: drink.ingredients[ingridient] }]);
    }
  }, [drink])

  return (
    <div className='drink'>
      <h1 className='drink__name'>{drink.name}</h1>
      <p className='drink__description'>{drink.description}</p>
      <h2 className='drink__subheading'>Ingredients</h2>
      <ul className='drink__ingredients'>
        {
          ingredientList.map(ingredient => (
            <li className='drink__ingredients-item' key={ingredient.name}>
              {ingredient.name}
            </li>
          ))
        }
      </ul>
      <h2 className='drink__subheading'>Extra Ingredients</h2>
      <ul className='drink__extra'>
        {
          drink.extra.map(extra => (
            <li className='drink__extra-item' key={extra}>
              {extra}
            </li>
          ))
        }
      </ul>
      <h2 className='drink__subheading'>Proportions</h2>
      <Glass ingredientCount={ingredientCount} ingredientList={ingredientList} />
    </div >
  )
}

export default Drink