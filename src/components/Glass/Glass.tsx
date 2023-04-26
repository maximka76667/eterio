import React from 'react';
import GlassProps from './GlassProps';
import Extra from '../Extra/Extra';
import Ingredient from '../Ingredient/Ingredient';
import './Glass.sass';

const Glass = ({ ingredientList, ingredientCount, extras }: GlassProps) => {
  return (
    <div className='glass'>
      <div className='glass__tube' />
      <div className='glass__content'>
        <span className='glass__ice' />
        <span className='glass__ice' />
        {ingredientList.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.name}
              ingredient={ingredient}
              ingredientCount={ingredientCount}
            />
          );
        })}
        <>
          {extras.map((extra) => (
            <Extra key={extra} extra={extra} />
          ))}
        </>
      </div>
    </div>
  );
};

export default Glass;
