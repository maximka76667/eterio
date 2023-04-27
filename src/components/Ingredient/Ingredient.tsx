import React from 'react';
import IngredientInterface from '../../interfaces/IngredientInterface';

const Ingredient = ({
  ingredient,
  ingredientCount
}: {
  ingredient: IngredientInterface;
  ingredientCount: number;
}) => {
  const height = (100 / ingredientCount) * ingredient.amount;
  const proportion = Math.floor(height);

  const className = ingredient.name.replaceAll(' ', '-');

  return (
    <div
      className={`glass__ingredient ${className}`}
      style={{ height: `${height}%` }}
    >
      <p className='ingredient__name'>{ingredient.name}</p>
      <p className='ingredient__amount'>
        {ingredient.amount / 100} ounces ({proportion}% of glass)
      </p>
    </div>
  );
};

export default Ingredient;
