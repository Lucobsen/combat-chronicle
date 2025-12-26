import { useAuth0 } from '@auth0/auth0-react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { MenuDrawer } from '../../Drawers/MenuDrawer';

export const Navbar = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  return (
    <>
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
              backgroundColor: ({ palette }) => palette.background.default,
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
                label="BETA"
                color="success"
                sx={{ fontSize: 8, height: 16 }}
              />
            </Stack>
            {isAuthenticated && (
              <IconButton
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => setOpen(true)}
              >
                <MenuRoundedIcon
                  sx={{
                    color: palette.common.white,
                  }}
                />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <MenuDrawer closeDrawer={() => setOpen(false)} />
      </Drawer>
    </>
  );
};
