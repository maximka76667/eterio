import Drink from '../../interfaces/IDrink';

export default interface MatchProps {
  match: {
    drink: Drink;
    match: number;
  };
}
