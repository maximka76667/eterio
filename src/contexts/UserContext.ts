import { createContext } from 'react';
import { UserInterface } from '../interfaces';

const UserContext = createContext<UserInterface>({
  name: '',
  email: '',
});

export default UserContext;
