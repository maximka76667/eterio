import React, { useContext, useEffect, useState } from 'react';
import { Drink, Ingredient } from '../../interfaces';
import Glass from '../../components/Glass/Glass';
import './DrinkInfo.sass';
import { CurrentUserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';

interface DrinkInfoProps {
  drink: Drink;
  onDeleteDrink: (id: string) => void;
}

const DrinkInfo = ({ drink, onDeleteDrink }: DrinkInfoProps) => {
  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
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

  const handleDrinkDelete = () => {
    onDeleteDrink(drink.id);

    navigate('../');
  };

  return (
    <div className='drink'>
      <div className='drink__title'>
        <h1 className='drink__name ff-amatic font-bold text-7xl'>
          {drink.name}
        </h1>
        {currentUser !== null && drink.author === currentUser.id && (
          <button
            onClick={handleDrinkDelete}
            className='drink__delete bg-red-500 py-1.5 px-3 rounded-xl text-white hover:bg-red-600'
          >
            Delete
          </button>
        )}
      </div>
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

export default DrinkInfo;
