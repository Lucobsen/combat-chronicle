import { ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithAuth0 } from 'convex/react-auth0';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Wrapper, useAuth0Context } from './auth/auth0';
import './index.css';
import { routeTree } from './routeTree.gen';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    isAuthenticated: false,
    isLoading: true,
    login: () => {},
    logout: () => {},
    user: null,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
const InnerApp = () => {
  const auth = useAuth0Context();

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <RouterProvider router={router} context={{ ...auth }} />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Wrapper>
      <ConvexProviderWithAuth0 client={convex}>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </ConvexProviderWithAuth0>
    </Auth0Wrapper>
  </StrictMode>
);
