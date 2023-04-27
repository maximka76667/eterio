import { createContext } from 'react';

const BottlesContext = createContext<string[]>([
  'Vodka',
  'Cranberry juice',
  'Orange juice',
  'Coke',
  'Rum'
]);

export default BottlesContext;
