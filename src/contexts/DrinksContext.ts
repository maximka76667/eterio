import { createContext } from 'react';
import { IDrink } from '../interfaces';

const DrinksContext = createContext<IDrink[]>([]);

export default DrinksContext;
