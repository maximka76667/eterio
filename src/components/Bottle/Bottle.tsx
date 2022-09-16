import React from 'react'
import { BottleProps } from '../../interfaces'

const Bottle = ({ bottle, changeDrink }: BottleProps) => {

  const className = bottle.replaceAll(" ", "-").toLowerCase();

  return (
    <button className={`home__change home__change_${className}`} onClick={() => changeDrink(bottle.toLowerCase())}>{bottle}</button>
  )
}

export default Bottle