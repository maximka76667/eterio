import { createContext } from 'react';
import { IUser } from '../interfaces';

const CurrentUserContext = createContext<IUser | null>(null);

export default CurrentUserContext;
