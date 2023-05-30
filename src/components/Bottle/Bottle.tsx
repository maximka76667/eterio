import React, { MouseEventHandler } from 'react';
import BottleProps from './BottleProps';
import './Bottle.sass';

const Bottle = ({ bottle, changeDrink, onClick }: BottleProps) => {
  const className = bottle.name.replaceAll(' ', '-').toLowerCase();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    changeDrink(bottle.name.toLowerCase());
    onClick(e);
  };

  return (
    <button className='bottle' onClick={handleClick} type='button'>
      <div className={`bottle__img bottle_${className}`} />
      <p className='bottle__name'>{bottle.name}</p>
    </button>
  );
};

export default Bottle;
