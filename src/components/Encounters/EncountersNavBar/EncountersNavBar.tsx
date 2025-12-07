import Groups3Icon from '@mui/icons-material/Groups3';
import {
  AppBar,
  Box,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

export const EncountersNavBar = () => {
  const { palette } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 'none',
          color: '#fff',
          borderBottom: '1px solid #fff',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: palette.common.black,
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
              variant={palette.mode === 'dark' ? 'outlined' : 'filled'}
              size="small"
              label="BETA"
              color="success"
              sx={{ fontSize: 8, height: 16 }}
            />
          </Stack>

          <IconButton>
            <Groups3Icon
              sx={{
                color: palette.common.white,
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
