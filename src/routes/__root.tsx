import { ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SnackbarProvider } from 'notistack';
import type { Auth0ContextType } from '../auth/auth0';
import { Navbar } from '../components/shared/Navbar/Navbar';
import { theme } from '../utils/ccTheme';
import { ScreenSizeContextProvider } from '../utils/screen-size-context-provider';

export const Route = createRootRouteWithContext<Auth0ContextType>()({
  component: () => (
    <ThemeProvider theme={theme}>
      <ScreenSizeContextProvider>
        <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
          <Navbar />
          <Outlet />
          <Analytics />
          <ReactQueryDevtools />
          <TanStackRouterDevtools position="bottom-right" />
        </SnackbarProvider>
      </ScreenSizeContextProvider>
    </ThemeProvider>
  ),
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      // Auth0 handles login redirects, so just trigger login
      context.login();
      return;
    }
  },
});
