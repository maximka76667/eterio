import Drink from '../../interfaces/Drink';

export default interface MatchProps {
  match: {
    drink: Drink;
    match: number;
  };
}
