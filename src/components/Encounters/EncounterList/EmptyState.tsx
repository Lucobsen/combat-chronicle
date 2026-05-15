import { Button, Stack, Typography } from '@mui/material';

interface IEmptyStateProps {
  openModal: () => void;
}

export const EmptyState = ({ openModal }: IEmptyStateProps) => (
  <Stack
    spacing={2}
    sx={{
      alignItems: 'center',
      position: 'absolute',
      left: '50%',
      top: '30%',
      justifyContent: 'center',
      width: '60%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <Typography
      variant="h6"
      sx={{ alignSelf: 'center', color: '#fff' }}
      align="center"
    >
      Nat 1, no encounters found!
    </Typography>
    <Button
      variant="contained"
      color="success"
      sx={{ fontWeight: 'bold', width: 'fit-content' }}
      onClick={openModal}
    >
      Create new encounter
    </Button>
  </Stack>
);
