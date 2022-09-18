import Drink from './DrinkInterface';

export default interface MatchProps {
  match: {
    drink: Drink;
    match: number;
  };
}
