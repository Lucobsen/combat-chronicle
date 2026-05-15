import { Button, Stack, Typography } from '@mui/material';

interface IEmptyStateProps {
  openModal: () => void;
}

export const EmptyState = ({ openModal }: IEmptyStateProps) => (
  <Stack
    spacing={2}
    sx={{
      position: 'absolute',
      left: '50%',
      top: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <Typography
      align="center"
      sx={{ variant: 'h6', alignSelf: 'center', color: '#fff' }}
    >
      Nat 1, no parties found!
    </Typography>
    <Button
      variant="contained"
      color="success"
      sx={{ fontWeight: 'bold', width: 'fit-content' }}
      onClick={openModal}
    >
      Add party
    </Button>
  </Stack>
);
