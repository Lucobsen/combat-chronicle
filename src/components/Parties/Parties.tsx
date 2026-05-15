import { Box, Container, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { PartyList } from './PartyList/PartyList';

const fallbackComponent = (
  <Container sx={{ px: 2, pt: 10, pb: 8 }}>
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h4" sx={{ color: 'error' }} align="center">
        Something has gone wrong!
      </Typography>
    </Box>
  </Container>
);

export const Parties = () => (
  <ErrorBoundary fallback={fallbackComponent}>
    <PartyList />
  </ErrorBoundary>
);
