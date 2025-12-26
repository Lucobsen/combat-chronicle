import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { type ReactNode } from 'react';
import { CustomAuth0Context } from './auth0Types';

const Auth0ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, loginWithRedirect, logout, isLoading } =
    useAuth0();

  const contextValue = {
    isAuthenticated,
    user,
    login: loginWithRedirect,
    logout: () =>
      logout({ logoutParams: { returnTo: window.location.origin } }),
    isLoading,
  };

  return (
    <CustomAuth0Context.Provider value={contextValue}>
      {children}
    </CustomAuth0Context.Provider>
  );
};

export const Auth0Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Auth0ContextProvider>{children}</Auth0ContextProvider>
    </Auth0Provider>
  );
};
