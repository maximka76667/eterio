import React from 'react'
import IngredientInterface from '../../interfaces/IngredientInterface'

const Ingredient = ({ ingredient, ingredientCount }: { ingredient: IngredientInterface, ingredientCount: number }) => {
  const height = 100 / ingredientCount * ingredient.amount;
  const proportion = Math.floor(height);

  return (
    <div className={`glass__ingredient glass__ingredient_${ingredient.name}`} style={{ height: `${height}%` }}>
      <p className='ingredient__name'>{ingredient.name}</p>
      <p className='ingredient__amount'>{ingredient.amount} ounces ({proportion}% of glass)</p>
    </div>
  )
}

export default Ingredient