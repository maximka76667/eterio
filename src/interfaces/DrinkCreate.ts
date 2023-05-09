import Drink from './Drink';

export default interface DrinkCreate extends Omit<Drink, 'id'> {}
