import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { EncounterContextProvider } from "./utils/encounter-context-provider";
import { PartyContextProvider } from "./utils/party-context-provider";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mainTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );




  return (
    <ThemeProvider theme={mainTheme}>
      <PartyContextProvider>
        <EncounterContextProvider>
          <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
            {/* <BrowserRouter>
              <Routes>
                <Route element={<EncountersPage />} path="" />
                <Route element={<CreaturesPage />} path=":id" />
                <Route element={<PartyPage />} path="parties" />
              </Routes>
            </BrowserRouter> */}
          </SnackbarProvider>
        </EncounterContextProvider>
      </PartyContextProvider>
    </ThemeProvider>
  );
};

export default App;
