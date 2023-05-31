import { createContext } from 'react';
import { Bottle } from '../interfaces';

const BottlesContext = createContext<Bottle[]>([]);

export default BottlesContext;
