import React, { useEffect } from 'react'
import IngredientInterface from '../../interfaces/IngredientInterface'

const Ingredient = ({ ingredient, ingredientCount }: { ingredient: IngredientInterface, ingredientCount: number }) => {
  const height = 100 / ingredientCount * ingredient.amount;

  useEffect(() => {
    console.log(height);
  }, []);

  return (
    <div className={`glass__ingredient glass__ingredient_${ingredient.name}`} key={ingredient.name} style={{ height: `${height}%` }}>
      {ingredient.amount}
    </div>
  )
}

export default Ingredient