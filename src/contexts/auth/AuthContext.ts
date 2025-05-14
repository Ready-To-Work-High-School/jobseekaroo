
import { createContext } from 'react';
import { AuthContextType } from './authContext.types';

// Create context with null as default value
export const AuthContext = createContext<AuthContextType | null>(null);
