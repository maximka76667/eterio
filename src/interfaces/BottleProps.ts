import { MouseEventHandler } from "react";

export default interface BottleProps {
  bottle: string,
  changeDrink: (drink: string) => void,
  onClick: MouseEventHandler<HTMLButtonElement>
}