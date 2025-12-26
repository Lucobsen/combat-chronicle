import Groups3RoundedIcon from '@mui/icons-material/Groups3Rounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import LogoutButton from '../Login/LogoutButton';

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

interface MenuDrawerProps {
  closeDrawer: () => void;
}

export const MenuDrawer = ({ closeDrawer }: MenuDrawerProps) => {
  const navigate = useNavigate();

  return (
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
                closeDrawer();
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
      <LogoutButton />
    </Box>
  );
};
