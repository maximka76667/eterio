import { createContext } from 'react';
import { User } from '../interfaces';

export default createContext<User | null>(null);
