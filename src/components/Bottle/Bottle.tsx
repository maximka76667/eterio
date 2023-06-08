import React, { useState, MouseEventHandler } from 'react';
import BottleProps from './BottleProps';
import './Bottle.sass';

const Bottle = ({ bottle, changeDrink, onClick }: BottleProps) => {
  // const className = bottle.name.replaceAll(' ', '-').toLowerCase();

  const [imgSrc, setImgSrc] = useState(
    `${process.env.PUBLIC_URL}/images/${bottle.img}`
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    changeDrink(bottle);
    onClick(e);
  };

  return (
    <button className='bottle' onClick={handleClick} type='button'>
      <img
        className='bottle__img'
        src={imgSrc}
        onError={() =>
          setImgSrc(`${process.env.PUBLIC_URL}/images/bottle-not-found.png`)
        }
      />
      <p className='bottle__name'>{bottle.name}</p>
    </button>
  );
};

export default Bottle;
