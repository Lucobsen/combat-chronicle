import { Box, Container, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { PartyList } from '../components/Parties/PartyList/PartyList';
import { DesktopWarning } from '../components/shared/DesktopWarning/DesktopWarning';
import { useIsMobile } from '../hooks/is-mobile.hook';

const fallbackComponent = (
  <Container sx={{ px: 2, pt: 10, pb: 8 }}>
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h4" color="error" textAlign="center">
        Something has gone wrong!
      </Typography>
    </Box>
  </Container>
);

const Parties = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return (
    <ErrorBoundary fallback={fallbackComponent}>
      <PartyList />
    </ErrorBoundary>
  );
};

export const Route = createFileRoute('/parties')({
  component: Parties,
});
