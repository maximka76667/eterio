import { createContext } from 'react';
import IUser from '../interfaces/UserInterface';

const CurrentUserContext = createContext<IUser | null>(null);

export default CurrentUserContext;
