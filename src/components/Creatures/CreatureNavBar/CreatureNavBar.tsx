import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Link, Stack, Typography, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { TextModal } from '../../shared/Modals/TextModal';

interface INavBar {
  round: number;
  hasCreatures: boolean;
  onReset: () => void;
  encounterName: string;
  inProgress: boolean;
  startEncounter: () => void;
}

export const NavBar = ({
  encounterName,
  round,
  hasCreatures,
  onReset,
  inProgress,
  startEncounter,
}: INavBar) => {
  const { palette } = useTheme();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 'none',
            color: '#fff',
            borderBottom: `1px solid ${palette.common.white}`,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              backgroundColor: palette.background.default,
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              overflow="hidden"
            >
              <Link href="/" color={palette.common.white} underline="none">
                <ArrowBackIosIcon fontSize="small" />
              </Link>
              <Typography
                variant="h6"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                fontWeight="bold"
              >
                {encounterName}
              </Typography>
            </Stack>

            {hasCreatures &&
              (inProgress ? (
                <Button
                  sx={{
                    maxHeight: 32,
                    whiteSpace: 'nowrap',
                    minWidth: 82,
                    ml: 1,
                  }}
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => setIsResetModalOpen(true)}
                >
                  Round {round}
                </Button>
              ) : (
                <Button
                  sx={{
                    maxHeight: 32,
                    whiteSpace: 'nowrap',
                    minWidth: 152,
                    ml: 1,
                  }}
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={startEncounter}
                >
                  Start Encounter
                </Button>
              ))}
          </Toolbar>
        </AppBar>
      </Box>

      <TextModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={() => {
          onReset();
          setIsResetModalOpen(false);
        }}
        content="Do you wish to reset this encounter?"
      />
    </>
  );
};
