import { createContext } from 'react';
import { DrinkInterface } from '../interfaces';

const DrinksContext = createContext<DrinkInterface[]>([]);

export default DrinksContext;
