import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AppContext from '../components/AppContext';

type Props = {
  action: 'sign-in' | 'sign-up';
};
/**
 * Form that registers a user.
 */
export default function AuthPage({ action }: Props) {
  const navigate = useNavigate();
  /* TODO: Grab `user` and `handleSignIn` from `AppContext` */
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';

  return (
    <div>
      <div>
        <header>
          <h2>{welcomeMessage}</h2>
        </header>
      </div>
      <div>
        <AuthForm key={action} action={action} onSignIn={handleSignIn} />
      </div>
    </div>
  );
}
