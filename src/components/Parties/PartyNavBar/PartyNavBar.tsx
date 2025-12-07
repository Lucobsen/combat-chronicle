import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const PartyNavBar = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          color: palette.text.primary,
          borderBottom: `1px solid ${palette.text.primary}`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: palette.background.paper,
          }}
        >
          <Typography fontWeight="bold" variant="h6">
            Parties
          </Typography>

          <IconButton onClick={() => navigate("../")}>
            <HomeIcon
              sx={{
                color:
                  palette.mode === "dark"
                    ? palette.common.white
                    : palette.common.black,
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
