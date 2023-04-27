import React, { useEffect, useState } from 'react';
import { DrinkInterface } from '../../interfaces';
import Glass from '../Glass/Glass';
import './Drink.sass';

const Drink = ({ drink }: { drink: DrinkInterface }) => {
  const [ingredientList, setIngredientList] = useState<
    Array<{ name: string; amount: number }>
  >([]);
  const [ingredientCount, setIngredientCount] = useState<number>(0);

  useEffect(() => {
    setIngredientList([]);
    setIngredientCount(0);
    for (const ingridient in drink.ingredients) {
      setIngredientCount(
        (ingredientCount) => ingredientCount + drink.ingredients[ingridient]
      );
      setIngredientList((ingredientList) => [
        ...ingredientList,
        { name: ingridient, amount: drink.ingredients[ingridient] }
      ]);
    }
  }, [drink]);

  return (
    <div className='drink'>
      <h1 className='drink__name ff-amatic font-bold text-7xl'>{drink.name}</h1>
      <div className='drink__container'>
        <div
          className='drink__img'
          style={{ backgroundImage: `url(${drink.img})` }}
        />
      </div>
      <p className='drink__description'>{drink.description}</p>
      <h2 className='drink__subheading ff-amatic text-4xl font-bold'>
        Ingredients
      </h2>
      <ul className='drink__ingredients'>
        {ingredientList.map((ingredient) => (
          <li className='drink__ingredients-item' key={ingredient.name}>
            {ingredient.name}
          </li>
        ))}
      </ul>
      <h2 className='drink__subheading ff-amatic text-4xl font-bold'>
        Extra Ingredients
      </h2>
      <ul className='drink__extra'>
        {drink.extra.map((extra) => (
          <li className='drink__extra-item' key={extra}>
            {extra}
          </li>
        ))}
      </ul>
      <h2 className='drink__subheading ff-amatic text-4xl font-bold'>
        Proportions
      </h2>
      <Glass
        ingredientCount={ingredientCount}
        ingredientList={ingredientList}
        extras={drink.extra}
      />
    </div>
  );
};

export default Drink;
