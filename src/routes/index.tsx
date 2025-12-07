import { createFileRoute } from '@tanstack/react-router';
import { EncounterList } from '../components/Encounters/EncounterList/EncounterList';
import { DesktopWarning } from '../components/shared/DesktopWarning/DesktopWarning';
import { useIsMobile } from '../hooks/is-mobile.hook';

const Index = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return <EncounterList />;
};

export const Route = createFileRoute('/')({
  component: Index,
});
