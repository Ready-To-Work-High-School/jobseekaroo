
import { createContext } from 'react';
import { AuthContextType } from './authContext.types';

// Create context with undefined as default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
