import { createFileRoute } from '@tanstack/react-router';
import LoginButton from '../components/Login/LoginButton';
import { DesktopWarning } from '../components/shared/DesktopWarning/DesktopWarning';
import { useIsMobile } from '../hooks/is-mobile.hook';

const Login = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return <LoginButton />;
};

export const Route = createFileRoute('/login')({
  component: Login,
});
