import Groups3Icon from "@mui/icons-material/Groups3";
import {
  AppBar,
  Box,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const EncountersNavBar = () => {
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
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            overflow="hidden"
          >
            <Typography fontWeight="bold" variant="h6">
              Combat Chronicle
            </Typography>
            <Chip
              variant={palette.mode === "dark" ? "outlined" : "filled"}
              size="small"
              label="BETA"
              color="success"
              sx={{ fontSize: 8, height: 16 }}
            />
          </Stack>

          <IconButton onClick={() => navigate("parties")}>
            <Groups3Icon
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
