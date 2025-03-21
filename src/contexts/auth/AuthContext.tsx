
import { createContext } from 'react';
import { AuthContextType } from './authContext.types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
