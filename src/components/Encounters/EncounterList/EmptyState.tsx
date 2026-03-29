import { Button, Stack, Typography } from '@mui/material';

interface IEmptyStateProps {
  openModal: () => void;
}

export const EmptyState = ({ openModal }: IEmptyStateProps) => (
  <Stack
    position="absolute"
    left="50%"
    top="30%"
    justifyContent="center"
    width="60%"
    spacing={2}
    alignItems="center"
    sx={{
      transform: 'translate(-50%, -50%)',
    }}
  >
    <Typography
      variant="h6"
      alignSelf="center"
      textAlign="center"
      color="white"
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
