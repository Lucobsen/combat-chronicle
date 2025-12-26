import Groups3RoundedIcon from '@mui/icons-material/Groups3Rounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Chip,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

const NavigationsItems = [
  {
    label: 'Home',
    to: '/',
    icon: <ListAltRoundedIcon sx={{ color: '#fff' }} />,
  },
  {
    label: 'Parties',
    to: '/parties',
    icon: <Groups3RoundedIcon sx={{ color: '#fff' }} />,
  },
];

export const Navbar = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            borderRight: '1px solid #fff',
            height: '100%',
            bgcolor: ({ palette }) => palette.background.default,
            width: '65vw',
            maxWidth: '300px',
            color: '#fff',
          }}
          role="presentation"
        >
          <List>
            {NavigationsItems.map(({ label, to, icon }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpen(false);
                    navigate({ to });
                  }}
                  disableRipple
                  disableTouchRipple
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
