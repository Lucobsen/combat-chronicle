import { createContext } from 'react';

export interface Auth0ContextType {
  isAuthenticated: boolean;
  user: unknown;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

export const CustomAuth0Context = createContext<Auth0ContextType | undefined>(
  undefined
);
