import { createContext } from 'react';
import { User } from '../interfaces';

const CurrentUserContext = createContext<User | null>(null);

export default CurrentUserContext;
