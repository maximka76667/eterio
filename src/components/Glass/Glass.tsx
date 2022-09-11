import React from 'react'
import { IngredientInterface } from '../../interfaces'
import Ingredient from '../Ingredient/Ingredient'
import "./Glass.sass"

const Glass = ({ ingredientList, ingredientCount }: { ingredientList: IngredientInterface[], ingredientCount: number }) => {
  return (
    <div className='glass'>
      <div className='glass__content'>
        {
          ingredientList.map((ingredient) => {
            return (
              <Ingredient key={ingredient.name} ingredient={ingredient} ingredientCount={ingredientCount}></Ingredient>
            )
          })
        }
      </div>
    </div>
  )
}

export default Glass