import { MouseEventHandler } from 'react';
import { Bottle } from '../../interfaces';

export default interface BottleProps {
  bottle: Bottle;
  changeDrink: (drink: Bottle) => void;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
