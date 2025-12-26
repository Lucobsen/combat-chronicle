import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      style={{ position: 'absolute', bottom: '50%', right: '50%' }}
      onClick={() => loginWithRedirect()}
      className="button login"
    >
      Log In
    </button>
  );
};

export default LoginButton;
