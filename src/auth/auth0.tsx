import { useContext } from 'react';
import { CustomAuth0Context } from './auth0Types';

export const useAuth0Context = () => {
  const context = useContext(CustomAuth0Context);

  if (context === undefined) {
    throw new Error('useAuth0Context must be used within Auth0Wrapper');
  }

  return context;
};
