import { createFileRoute } from '@tanstack/react-router';
import { PartyList } from '../components/Parties/PartyList/PartyList';
import { DesktopWarning } from '../components/shared/DesktopWarning/DesktopWarning';
import { useIsMobile } from '../hooks/is-mobile.hook';

export const Parties = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return <PartyList />;
};

export const Route = createFileRoute('/parties')({
  component: Parties,
});
