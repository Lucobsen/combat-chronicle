import { ThemeProvider } from '@mui/material';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SnackbarProvider } from 'notistack';
import { Navbar } from '../components/shared/Navbar/Navbar';
import { theme } from '../utils/ccTheme';
import { EncounterContextProvider } from '../utils/encounter-context-provider';
import { PartyContextProvider } from '../utils/party-context-provider';
import { ScreenSizeContextProvider } from '../utils/screen-size-context-provider';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider theme={theme}>
      <ScreenSizeContextProvider>
        <PartyContextProvider>
          <EncounterContextProvider>
            <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
              <Navbar />
              <Outlet />
              <Analytics />
              <TanStackRouterDevtools />
            </SnackbarProvider>
          </EncounterContextProvider>
        </PartyContextProvider>
      </ScreenSizeContextProvider>
    </ThemeProvider>
  ),
});
