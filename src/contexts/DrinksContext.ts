import { createContext } from 'react';
import { Drink } from '../interfaces';

const DrinksContext = createContext<Drink[]>([]);

export default DrinksContext;
