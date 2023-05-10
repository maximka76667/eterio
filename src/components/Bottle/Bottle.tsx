import React, { MouseEventHandler } from 'react';
import BottleProps from './BottleProps';
import './Bottle.sass';

const Bottle = ({ bottle, changeDrink, onClick }: BottleProps) => {
  const className = bottle.replaceAll(' ', '-').toLowerCase();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    changeDrink(bottle.toLowerCase());
    onClick(e);
  };

  return (
    <button className='bottle' onClick={handleClick} type='button'>
      <div className={`bottle__img bottle_${className}`} />
      <p className='bottle__name'>{bottle}</p>
    </button>
  );
};

export default Bottle;
