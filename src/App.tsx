import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { theme } from "./utils/ccTheme";
import { EncounterContextProvider } from "./utils/encounter-context-provider";
import { PartyContextProvider } from "./utils/party-context-provider";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
