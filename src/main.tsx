import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const router = createRouter({ routeTree, scrollRestoration: true });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <RouterProvider router={router} notFoundMode="root" />
    </ConvexProvider>
  </StrictMode>
);
