import Drink from '../../interfaces/DrinkInterface';

export default interface MatchProps {
  match: {
    drink: Drink;
    match: number;
  };
}
