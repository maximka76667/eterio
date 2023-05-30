import { createContext } from 'react';
import { Bottle } from '../interfaces';

const BottlesContext = createContext<Bottle[]>([]);

// 'Vodka',
//   'Cranberry juice',
//   'Orange juice',
//   'Coke',
// 'Rum'

export default BottlesContext;
